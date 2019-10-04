import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { ConfigTableService } from 'src/app/services/config-table.service';
import { UserCollectionService } from '../../../services/user-collection.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  public pokemonListData = [];
  public pokemonCurrentList = [];
  public selectedPokemonCollection = [];
  public config = {};
  public itemPerPageOptions = [5, 10, 15, 25];
  public pokemonListSubscription: Subscription;
  public pokemonCurrentCollectionSubscription: Subscription;

  constructor(public pokeapiService: PokeapiService,
              public configTableService: ConfigTableService,
              public userCollection: UserCollectionService) { }

  ngOnInit() {
    this.pokemonListSubscription = this.pokeapiService.pokemonData$.subscribe((res: any) => {
      this.pokemonListData = res;
    });

    this.pokemonListSubscription = this.pokeapiService.pokemonCurrentList$.subscribe((res: any) => {
      this.pokemonCurrentList = res;
    });

    this.pokemonCurrentCollectionSubscription = this.userCollection.currentCollection$.subscribe((res: any) => {
      this.selectedPokemonCollection = res;
    });

    this.config = this.configTableService.config;
  }

  ngOnDestroy() {
    if (this.pokemonListSubscription) {
      this.pokemonListSubscription.unsubscribe();
    }
    if (this.pokemonCurrentCollectionSubscription) {
      this.pokemonCurrentCollectionSubscription.unsubscribe();
    }
  }

  onFilterChanged(event) {
    if (event.length > 0) {
      this.pokemonCurrentList = this.pokemonListData.filter((pokemon) =>
        pokemon['name'].includes(event.toLowerCase())
      );
    } else {
      this.pokemonCurrentList = this.pokemonListData;
    }
    this.pokeapiService.pokemonCurrentList$.next(this.pokemonCurrentList);
    this.configTableService.config.totalItems = this.pokemonCurrentList.length;
  }

  onItemsPerPageChanged(event) {
    this.configTableService.config.itemsPerPage = event;
  }
  
  getSelectedPokemon() {
   
  }
}
