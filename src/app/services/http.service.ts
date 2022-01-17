import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseURL = 'http://pokedex-back-dev.eu-west-2.elasticbeanstalk.com/';

  constructor(private httpClient: HttpClient) { }

  get(url: string, params = {}): Observable<any> {
    return this.httpClient.get(this.baseURL + url, params);
  }

  post(url: string, params = {}): Observable<any> {
    return this.httpClient.post(this.baseURL + url, params);
  }

  delete(url: string, params = {}): Observable<any> {
    return this.httpClient.delete(this.baseURL + url, params);
  }

  patch(url: string, params = {}): Observable<any> {
    return this.httpClient.patch(this.baseURL + url, params);
  }

}
