import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  login(login: string, password: string): void {
    this.apiService.login(login, password).subscribe(token => {
      localStorage.setItem('token', token.jwt);
      localStorage.setItem('refToken', token.rt);
    });
  }

  registration(login: string, password: string, repPassword: string): void {
    this.apiService.registration(login, password, repPassword).subscribe(token => {
      localStorage.setItem('token', token.jwt);
      localStorage.setItem('refToken', token.rt);
    });
  }

  authWithRefToken(token: string) {
    this.apiService.authWithRefToken(token).subscribe(token => {
      localStorage.setItem('token', token.jwt);
      localStorage.setItem('refToken', token.rt);
    });
  }

}
