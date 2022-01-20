import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService, private httpClient: HttpClient) { }

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.httpService.get('pokemons?offset=' + offset + '&limit=' + limit);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.httpService.get('pokemons/' + name);
  }

  searchPokemonListByName(offset: number, limit: number, name: string): Observable<any> {
    return this.httpService.get('pokemons/search/' + name + '?offset=' + offset + '&limit=' + limit);
  }

  filterPokemonsByType(offset: number, limit: number, types: string[]) {
    const typeString = this.typesToString(types);
    return this.httpService.get('pokemons/filtred/' + typeString + '?offset=' + offset + '&limit=' + limit);
  }

  filterPokemonsByTypeAndName(offset: number, limit: number, types: string[], name: string): Observable<any> {
    const typeString = this.typesToString(types);
    return this.httpService.get('pokemons/filtred/' + typeString + '/' + name + '?offset=' + offset + '&limit=' + limit);
  }

  typesToString(types: string[]) {
    return types.reduce((type, preType) => type + ',' + preType, '').replace(',', '');
  }

  getFavoritesPokemonList(offset: number, limit: number): Observable<any> {
    return this.httpService.get('favorites?offset=' + offset + '&limit=' + limit);
  }

  addPokemonToFavorite(name: string) {
    return this.httpService.post('favorites/' + name);
  }

  deletePokemonFromFavorite(name: string) {
    return this.httpService.delete('favorites/' + name);
  }

  login(login: string, password: string): Observable<{ jwt: string; rt: string }> {
    return this.httpService.post('user/login', { login, password });
  }

  registration(login: string, password: string, repPassword: string): Observable<{ jwt: string; rt: string }> {
    return this.httpService.post('user/registration', { login, password, repPassword });
  }

  authWithRefToken(token: string): Observable<{ jwt: string; rt: string }> {
    return this.httpService.patch('token', { token });
  }

  isAutoCreatedBucketExist() {
    return this.httpService.get('bucket');
  }

  createBucket() {
    return this.httpService.post('bucket');
  }

  deleteBucket() {
    return this.httpService.delete('bucket');
  }

  uploadFile(name: string, file: FormData) {
    return this.httpService.post(`bucket/file/${ name }`, file);
  }

  deleteFile(name: string) {
    return this.httpService.delete(`bucket/file/${ name }`);
  }

  downloadFile(name: string) {
    return this.httpService.get(`bucket/file/${ name }`);
  }

  fileList() {
    return this.httpService.get('bucket/filelist');
  }
}
