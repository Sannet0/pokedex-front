import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Output() degreesPokemonCountEvent = new EventEmitter<void>();

  pokemon: IPokemon;
  isDataLoaded = false;

  degreesPokemonCountEventEmiter = () => this.degreesPokemonCountEvent.emit();

  ngOnInit (): void {
    this.pokemonService.getPokemonByName(this.pokemonName).subscribe((pokemon: IPokemon) => {
      this.pokemon = pokemon;
      this.isDataLoaded = true;
    });
  }
}
