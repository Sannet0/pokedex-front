import { Component, Input } from '@angular/core';
import { IPokemon } from '../../interface/pokemon-interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent {

  constructor(private pokemonService: PokemonService) {}

  @Input() pokemonName: string;
  pokemon: IPokemon;
  isDataLoaded = false;

  ngOnInit () {
    this.pokemonService.getPokemonByName(this.pokemonName).subscribe((pokemon) => {
      this.pokemon = pokemon;
      this.pokemon.name = this.pokemonName;
      this.isDataLoaded = true;
    });
  }
}
