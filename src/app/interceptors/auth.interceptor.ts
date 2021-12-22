import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private apiService: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: new HttpHeaders().set('Authorization', `Bearer ${ localStorage.getItem('token') || '' }`)
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
      switchMap((item: { jwt: string; rt: string }) => {
        localStorage.setItem('token', item.jwt);
        localStorage.setItem('refToken', item.rt);

        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + item.jwt)
        });
        return next.handle(cloned);
      }),
      catchError((error) => {
        if (error.status === 403) {
          localStorage.setItem('token', '');
          localStorage.setItem('refToken', '');
          this.router.navigate(['auth']).then();
        }
        return next.handle(req);
      })
    );
  }
}
