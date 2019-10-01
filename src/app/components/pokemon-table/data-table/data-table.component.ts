import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { ConfigTableService } from 'src/app/services/config-table.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnDestroy {
  public pokemonListSubscription: Subscription;
  public tableConfigSubscription: Subscription;
  public pokemonListData = []
  public pokemonCurrentList = [];
  
 
  public config: any;
  public collection;
  public currentOrderByOrder;

  constructor(public pokeapiService: PokeapiService,
              public configTableService: ConfigTableService ) { }

  ngOnInit() {
    this.pokemonListSubscription = this.pokeapiService.pokemonData$.subscribe((res:any)=> {
      this.pokemonListData = res;
    });

    this.pokemonListSubscription = this.pokeapiService.pokemonCurrentList$.subscribe((res:any)=> {
      this.pokemonCurrentList = res;
    });
   
    this.addPaginationConfig();
  }

  ngOnDestroy(){
    if(this.pokemonListSubscription !== undefined) {
      this.pokemonListSubscription.unsubscribe();
    }
  }

  addPaginationConfig() {
    if (this.pokemonListData.length>0) {
      this.pokemonCurrentList = this.pokemonListData;
      this.configTableService.config.totalItems = this.pokemonCurrentList.length;
      this.config = this.configTableService.config
    } else {
      setTimeout(()=> {
        this.addPaginationConfig();
      },1000)
    }
  }

  sortPokemonListBy(property) {

    if (this.currentOrderByOrder !== 'asc') {
      this.pokemonCurrentList.sort(this.orderPokemonList(property,'asc'))
    } else {
      this.pokemonCurrentList.sort(this.orderPokemonList(property,'desc'))
    }
    this.config.currentPage=1;

  }

  orderPokemonList(property, sortOrder){
    this.currentOrderByOrder = sortOrder;

    let statOrder;
    switch (property) {
      case 'speed':
        statOrder = 0
        break;
      case 'defense':
        statOrder = 3
        break
      case 'attack':
        statOrder = 4
        break; 
    }
    
    if (statOrder!==0 && statOrder!==3 && statOrder!==4) {
      if (sortOrder === 'asc') {
        return (a, b) => a[property] == b[property] ? 0 : a[property] < b[property] ? -1 : 1
      }
      return (a, b) => a[property] == b[property] ? 0 : b[property] < a[property] ? -1 : 1

    }

    if (sortOrder === 'asc') {
  
      return (a, b) => a['stats'][statOrder]['base_stat'] == b['stats'][statOrder]['base_stat'] ? 0 
                     : a['stats'][statOrder]['base_stat'] < b['stats'][statOrder]['base_stat'] ? -1 : 1

    }
    return (a, b) => a['stats'][statOrder]['base_stat'] == b['stats'][statOrder]['base_stat'] ? 0 
                   : b['stats'][statOrder]['base_stat'] < a['stats'][statOrder]['base_stat'] ? -1 : 1

    }
    
}
