import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private apiService: ApiService) { }

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.apiService.getPokemonList(offset, limit);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.apiService.getPokemonByName(name);
  }

  searchPokemonListByName(offset: number, limit: number, name: string) {
    return this.apiService.searchPokemonListByName(offset, limit, name);
  }

  filterPokemonsByType(offset: number, limit: number, types: string[]) {
    return this.apiService.filterPokemonsByType(offset, limit, types);
  }

  filterPokemonsByTypeAndName(offset: number, limit: number, types: string[], name: string) {
    return this.apiService.filterPokemonsByTypeAndName(offset, limit, types, name);
  }

  getFavoritesPokemonList(offset: number, limit: number) {
    return this.apiService.getFavoritesPokemonList(offset, limit);
  }

  changePokemonFavoriteStatus(name: string, isFavorite: boolean) {
    return this.apiService.changePokemonFavoriteStatus(name, isFavorite);
  }
}
