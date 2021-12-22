import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PokemonService } from '../services/pokemon.service';
import { PageEvent } from '@angular/material/paginator';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private pokemonService: PokemonService, private router: Router) {
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allTypes.slice())),
    );
  }

  isUserInFavorites = this.router.url === '/favorites';
  isUserAuth = !!localStorage.getItem('token');

  pokemons: string[];
  pokemonCount: number;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50];
  pageEvent: PageEvent;

  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  typeCtrl = new FormControl();
  filteredTypes: Observable<string[]>;
  types: string[] = [];
  allTypes: string[] = [
    'normal', 'poison', 'psychic', 'grass', 'ground', 'ice', 'fire', 'rock', 'dragon', 'water', 'bug', 'dark', 'fighting', 'ghost', 'steel', 'flying', 'electric', 'fairy'];

  @ViewChild('typesInput') typesInput: ElementRef<HTMLInputElement>;

  search = this.formBuilder.group({
    name: new FormControl('')
  });
  searchName: string;
  searchTypes: string[];

  ngOnInit() {
    if (this.router.url === '/pokemons') {
      this.pokemonService.getPokemonList(0, 10).subscribe((pokemons) => {
        this.pokemonCount = pokemons.count;
        this.pokemons = pokemons.pokemons;
      });
    }
    if (this.isUserInFavorites) {
      this.pokemonService.getFavoritesPokemonList(0, 10).subscribe((pokemons) => {
        this.pokemonCount = pokemons.count;
        this.pokemons = pokemons.pokemons;
      });
    }
  }

  setPageSizeOptions(event: PageEvent): void {
    const {pageSize, pageIndex} = event;

    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    const offset = pageSize * pageIndex;

    if (this.router.url === '/pokemons') {
      if (this.searchName || this.searchTypes.length){
        this.pageIndex = 0;
        this.findFiltred(offset, pageSize);
      } else {
        this.pokemonService.getPokemonList(offset, pageSize).subscribe((pokemons) => {
          this.pokemonCount = pokemons.count;
          this.pokemons = pokemons.pokemons;
        });
      }
    }
    if (this.router.url === '/favorites') {
      this.pokemonService.getFavoritesPokemonList(offset, pageSize).subscribe((pokemons) => {
        this.pokemonCount = pokemons.count;
        this.pokemons = pokemons.pokemons;
      });
    }
  }

  submit(): void {
    this.searchName = this.search.value.name;
    this.searchTypes = this.types;

    this.findFiltred(0, 10);
    this.types = [];
    this.search.reset();
  }

  findFiltred(offset: number, limit: number) {
    if (this.searchName && this.searchTypes.length){
      this.pokemonService.filterPokemonsByTypeAndName(offset, limit, this.searchTypes, this.searchName).subscribe((pokemons) => {
        this.pokemonCount = pokemons.count;
        this.pokemons = pokemons.pokemons;
      });
    } else if (this.searchTypes.length){
      this.pokemonService.filterPokemonsByType(offset, limit, this.searchTypes).subscribe((pokemons) => {
        this.pokemonCount = pokemons.count;
        this.pokemons = pokemons.pokemons;
      });
    } else if (this.searchName) {
      this.pokemonService.searchPokemonListByName(offset, limit, this.searchName).subscribe((pokemons) => {
        this.pokemonCount = pokemons.count;
        this.pokemons = pokemons.pokemons;
      });
    }
  }

  addType(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.types.push(value);
    }
    event.chipInput!.clear();

    this.typeCtrl.setValue(null);
  }

  removeType(fruit: string): void {
    const index = this.types.indexOf(fruit);

    if (index >= 0) {
      this.types.splice(index, 1);
    }
  }

  selectedType(event: MatAutocompleteSelectedEvent): void {
    this.types.push(event.option.viewValue);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTypes.filter(type => type.toLowerCase().includes(filterValue));
  }

  changePage(): void {
    if (this.isUserInFavorites){
      this.router.navigate(['pokemons']).then();
    } else {
      this.router.navigate(['favorites']).then();
    }
  }

  logOut(): void {
    localStorage.setItem('token', '');
    localStorage.setItem('refToken', '');
    this.router.navigate(['auth']).then();
  }

  logIn(): void {
    this.router.navigate(['auth']).then();
  }
}
