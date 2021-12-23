import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { IPokemon } from '../../../interface/pokemon-interface';
import { PokemonService } from '../../../services/pokemon.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-loaded-item-page',
  templateUrl: './loaded-item-page.component.html',
  styleUrls: ['./loaded-item-page.component.scss', '../../chips-colors.css']
})
export class LoadedItemPageComponent {

  constructor(
    private pokemonService: PokemonService,
    private router: Router,
    private storageService: StorageService
  ) { }

  @Input() pokemon: IPokemon;
  @Output() degreesPokemonCountEvent = new EventEmitter<void>();

  isUserInFavorites = this.router.url === '/favorites';
  isHide = false;
  isUserAuth = !!this.storageService.getAuthData().token;

  setPokemonFavorite(): void {
    this.pokemon.isFavorite = !this.pokemon.isFavorite;
    if (this.isUserInFavorites) {
      this.isHide = true;
      this.degreesPokemonCountEvent.emit();
    }
    if (this.pokemon.isFavorite) {
      this.pokemonService.addPokemonToFavorite(this.pokemon.name).subscribe();
    } else {
      this.pokemonService.deletePokemonFromFavorite(this.pokemon.name).subscribe();
    }
  }
}
