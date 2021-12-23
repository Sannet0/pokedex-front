import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';

import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { IAuthData } from '../interface/auth-data-interface';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
    private apiService: ApiService,
    private storageService: StorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authData: IAuthData = this.storageService.getAuthData();
    const authReq = request.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${ authData.token }`)
    });

    return next.handle(authReq).pipe(
      tap((event: any) => {
        if (event instanceof HttpResponse && this.router.url === '/auth') {
          this.router.navigate(['pokemons']).then();
        }
      }),
      catchError((error) => {
        if (error.status === 401) {
          return this.handleAuthError(authReq, next);
        }
        if (error.status === 404) {
          this.router.navigate(['notfound']).then();
        }
        return next.handle(request);
      })
    );
  }

  handleAuthError(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('refToken') || '';
    return this.apiService.authWithRefToken(token).pipe(
      switchMap((tokens: { jwt: string; rt: string }) => {
        this.storageService.setAuthData(tokens.jwt, tokens.rt);

        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + tokens.jwt)
        });
        return next.handle(cloned);
      }),
      catchError((error) => {
        if (error.status === 403) {
          this.storageService.setAuthData('', '');
          this.router.navigate(['auth']).then();
        }
        return next.handle(req);
      })
    );
  }
}
