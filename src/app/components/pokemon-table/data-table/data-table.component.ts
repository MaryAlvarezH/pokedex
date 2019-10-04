import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { ConfigTableService } from 'src/app/services/config-table.service';
import { UserCollectionService } from '../../../services/user-collection.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
  public pokemonListSubscription: Subscription;
  public tableConfigSubscription: Subscription;
  public userCollectionSubscription: Subscription;
  public pokemonListData = [];
  public pokemonCurrentList = [];
  public userCollection = [];
  public activeSelection = true;
  public config: any;
  public currentOrderByOrder;

  constructor(public pokeapiService: PokeapiService,
              public configTableService: ConfigTableService,
              public userCollectionService: UserCollectionService ) { }

  ngOnInit() {
    this.pokemonListSubscription = this.pokeapiService.pokemonData$.subscribe((res: any) => {
      this.pokemonListData = res;
    });
    this.pokemonListSubscription = this.pokeapiService.pokemonCurrentList$.subscribe((res: any) => {
      this.pokemonCurrentList = res;
    });
    this.userCollectionSubscription = this.userCollectionService.currentCollection$.subscribe((res: any) => {
      this.userCollection = res;
    });
    this.addPaginationConfig();
  }

  ngOnDestroy() {
    if (this.pokemonListSubscription !== undefined) {
      this.pokemonListSubscription.unsubscribe();
    }
    if (this.userCollectionSubscription !== undefined) {
      this.userCollectionSubscription.unsubscribe();
    }
  }

  addPaginationConfig() {
    if (this.pokemonListData.length > 0) {
      this.pokemonCurrentList = this.pokemonListData;
      this.configTableService.config.totalItems = this.pokemonCurrentList.length;
      this.config = this.configTableService.config;
    } else {
      setTimeout(() => {
        this.addPaginationConfig();
      }, 1000);
    }
  }

  sortPokemonListBy(property) {
    if (this.currentOrderByOrder !== 'asc') {
      this.pokemonCurrentList.sort(this.orderPokemonList(property, 'asc'));
    } else {
      this.pokemonCurrentList.sort(this.orderPokemonList(property, 'desc'));
    }
    this.config.currentPage = 1;
    this.populateUserSelection();
  }


  orderPokemonList(property, sortOrder) {
    if (this.pokemonCurrentList[0].selected) {
    }
    this.currentOrderByOrder = sortOrder;

    let statOrder;
    switch (property) {
      case 'speed':
        statOrder = 0;
        break;
      case 'defense':
        statOrder = 3;
        break;
      case 'attack':
        statOrder = 4;
        break;
    }
    if (statOrder !== 0 && statOrder !== 3 && statOrder !== 4) {
      if (sortOrder === 'asc') {
        return (a, b) => a[property] < b[property] ? -1 : 1;
      }
      return (a, b) =>  a[property] > b[property] ? -1 : 1;

    }
    if (sortOrder === 'asc') {
      return (a, b) => a.stats[statOrder].base_stat === b.stats[statOrder].base_stat ? 0
                     : a.stats[statOrder].base_stat < b.stats[statOrder].base_stat ? -1 : 1;

    }
    return (a, b) => a.stats[statOrder].base_stat === b.stats[statOrder].base_stat ? 0
                   : b.stats[statOrder].base_stat < a.stats[statOrder].base_stat ? -1 : 1;
    }

    onSelectionChanged(event) {
      const selectedItem = event.target.value;
      if (event.target.checked && !this.userCollection.includes(selectedItem)) {
          this.userCollection.push(selectedItem);
      }
      if (!event.target.checked && this.userCollection.includes(selectedItem)) {
        this.userCollection.splice(this.userCollection.indexOf(selectedItem), 1);
      }
      this.userCollectionService.currentCollection$.next(this.userCollection);
      this.populateUserSelection();
      this.updateEnableSelection();
    }

    populateUserSelection() {
      if (this.pokemonCurrentList[0].id === 1) {
        for (let i = 0; i < this.pokemonCurrentList.length; i++) {
          this.pokemonCurrentList[i]['selected'] = false;
          for (const selectedItem of this.userCollection) {
            if (this.pokemonCurrentList[i].id == selectedItem) {
              this.pokemonCurrentList[i]['selected'] = true;
            }
          }
        }
      } else {
        for (let i = this.pokemonCurrentList.length - 1; i >= 0; i--) {
          this.pokemonCurrentList[i]['selected'] = false;
          for (const selectedItem of this.userCollection) {
            if (this.pokemonCurrentList[i].id == selectedItem) {
              this.pokemonCurrentList[i]['selected'] = true;
            }
          }
        }
      }
    }
  
    updateEnableSelection() {
      if (this.userCollection.length === 10) {
        this.activeSelection = false;
      }
    }
}
