import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }

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
    const typeString = types.reduce((type, preType) => type + ',' + preType, '');
    return this.httpService.get('pokemons/filtred/' + typeString + '?offset=' + offset + '&limit=' + limit);
  }

  filterPokemonsByTypeAndName(offset: number, limit: number, types: string[], name: string): Observable<any> {
    const typeString = types.reduce((type, preType) => type + ',' + preType, '');
    return this.httpService.get('pokemons/filtred/' + typeString + '/' + name + '?offset=' + offset + '&limit=' + limit);
  }

  getFavoritesPokemonList(offset: number, limit: number): Observable<any> {
    return this.httpService.get('favorites?offset=' + offset + '&limit=' + limit);
  }

  changePokemonFavoriteStatus(name: string, isFavorite: boolean): Observable<any> {
    return this.httpService.patch('favorites', { name, isFavorite });
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
}
