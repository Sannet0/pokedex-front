import { Component, Input, OnInit } from '@angular/core';
import { IPokemon } from '../../../interface/pokemon-interface';
import { PokemonService } from '../../../services/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loaded-item-page',
  templateUrl: './loaded-item-page.component.html',
  styleUrls: ['./loaded-item-page.component.scss']
})
export class LoadedItemPageComponent {

  constructor(private pokemonService: PokemonService, private router: Router) { }

  @Input() pokemon: IPokemon;
  isUserInFavorites = this.router.url === '/favorites';
  isHide = false;

  setPokemonFavorite() {
    this.pokemon.isFavorite = !this.pokemon.isFavorite;
    if (this.isUserInFavorites){
      this.isHide = true;
    }
    this.pokemonService.changePokemonFavoriteStatus(this.pokemon.name, this.pokemon.isFavorite).subscribe();
  }
}
