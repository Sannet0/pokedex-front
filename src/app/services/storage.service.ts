import { Injectable } from '@angular/core';

import { IAuthData } from '../interface/auth-data-interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  getAuthData (): IAuthData {
    const authStringData: string = localStorage.getItem('authData') || '';
    let parseAuthData: IAuthData = {
      token: '',
      refToken: ''
    };
    if (authStringData) {
      parseAuthData = JSON.parse(authStringData);
    }
    return parseAuthData;
  }

  setAuthData (token: string, refToken: string): void {
    const stringifyData: string = JSON.stringify({
      token,
      refToken
    });
    localStorage.setItem('authData', stringifyData);
  }
}
