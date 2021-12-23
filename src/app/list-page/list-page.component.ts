import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PokemonService } from '../services/pokemon.service';
import { pokemonTypes } from '../consts';
import { IPokemonList } from '../interface/pokemon-list-interface';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss', './chips-colors.css']
})
export class ListPageComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pokemonService: PokemonService,
    private storageService: StorageService
  ) {
    this.filteredTypes = this.typeCtrl.valueChanges.pipe(
      startWith(null),
      map((type: string | null) => (type ? this._filter(type) : this.allTypes.slice())),
    );
  }

  isUserInFavorites = this.router.url === '/favorites';
  isUserAuth = !!this.storageService.getAuthData().token;

  pokemons: string[];
  pokemonCount: number;

  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [10, 20, 50];
  pageEvent: PageEvent;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  typeCtrl = new FormControl();
  filteredTypes: Observable<string[]>;
  types: string[] = [];
  allTypes: string[] = pokemonTypes;
  @ViewChild('typesInput') typesInput: ElementRef<HTMLInputElement>;

  search = this.formBuilder.group({
    name: new FormControl('')
  });
  searchName: string;
  searchTypes: string[] = [];

  ngOnInit() {
    const offset = this.pageIndex * this.pageSize;
    if (this.router.url === '/pokemons') {
      this.getPokemonCorrectList(offset, this.pageSize);
    }
    if (this.isUserInFavorites) {
      this.pokemonService.getFavoritesPokemonList(offset, this.pageSize).subscribe((pokemonsList: IPokemonList) => {
        this.overwriteValues(pokemonsList.count, pokemonsList.pokemons);
      });
    }
  }

  setPageSizeOptions(event: PageEvent): void {
    const {pageSize, pageIndex} = event;

    this.pageIndex = pageIndex;
    this.pageSize = pageSize;

    const offset = pageSize * pageIndex;

    if (this.router.url === '/pokemons') {
      if (this.searchName || this.searchTypes.length) {
        this.findWithFilters(offset, pageSize);
      } else {
        this.getPokemonCorrectList(offset, pageSize);
      }
    }
    if (this.router.url === '/favorites') {
      this.pokemonService.getFavoritesPokemonList(offset, pageSize).subscribe((pokemonsList: IPokemonList) => {
        this.overwriteValues(pokemonsList.count, pokemonsList.pokemons);
      });
    }
  }

  submit(): void {
    this.pageIndex = 0;
    this.searchName = this.search.value.name;
    this.searchTypes = this.types;
    this.findWithFilters(this.pageIndex, this.pageSize);
  }


  findWithFilters(offset: number, limit: number): void {
    if (this.searchName && this.searchTypes.length) {
      this.pokemonService.filterPokemonsByTypeAndName(offset, limit, this.searchTypes, this.searchName).subscribe((pokemonsList: IPokemonList) => {
        this.overwriteValues(pokemonsList.count, pokemonsList.pokemons);
      });
    } else if (this.searchTypes.length) {
      this.pokemonService.filterPokemonsByType(offset, limit, this.searchTypes).subscribe((pokemonsList: IPokemonList) => {
        this.overwriteValues(pokemonsList.count, pokemonsList.pokemons);
      });
    } else if (this.searchName) {
      this.pokemonService.searchPokemonListByName(offset, limit, this.searchName).subscribe((pokemonsList: IPokemonList) => {
        this.overwriteValues(pokemonsList.count, pokemonsList.pokemons);
      });
    } else {
      this.getPokemonCorrectList(offset, limit);
    }
  }

  getPokemonCorrectList(offset: number, limit: number) {
    this.pokemonService.getPokemonList(offset, limit).subscribe((pokemonsList: IPokemonList) => {
      this.overwriteValues(pokemonsList.count, pokemonsList.pokemons);
    });
  }


  overwriteValues(count: number, pokemons: string[]) {
    this.pokemonCount = count;
    this.pokemons = pokemons;
  }

  addType(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.types.push(value);
    }
    event.chipInput!.clear();

    this.typeCtrl.setValue(null);
  }

  removeType(type: string): void {
    const index = this.types.indexOf(type);
    if (index >= 0) {
      this.types.splice(index, 1);
    }

    this.submit();
  }

  selectedType(event: MatAutocompleteSelectedEvent): void {
    this.types.push(event.option.viewValue);
    this.typesInput.nativeElement.value = '';
    this.typeCtrl.setValue(null);

    this.submit();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTypes.filter(type => type.toLowerCase().includes(filterValue));
  }

  changePage(): void {
    if (this.isUserInFavorites) {
      this.router.navigate(['pokemons']).then();
    } else {
      this.router.navigate(['favorites']).then();
    }
  }

  logOut(): void {
    this.storageService.setAuthData('', '');
    this.isUserAuth = false;
  }

  logIn(): void {
    this.router.navigate(['auth']).then();
  }

  degreesPokemonCount() {
    this.pokemonCount--;
  }
}
