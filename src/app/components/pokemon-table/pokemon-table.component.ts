import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {
  @Input() pokemonListData
  public pokemonList = [];
  config: any;
  public collection;
  public itemPerPageOptions;
  public currentOrderByOrder;

  constructor() { }

  ngOnInit() {
    this.addPaginationConfig();
  }

  addPaginationConfig() {
    if (this.pokemonListData.length>0) {
      this.pokemonList = this.pokemonListData;
      this.loadPaginationConfig();
    } else {
      setTimeout(()=> {
        this.addPaginationConfig();
      },1000)
    }
  }

  loadPaginationConfig() {
    this.itemPerPageOptions =[5,10,15,30,50,100, this.pokemonList.length]
    this.collection = { count: this.pokemonList.length, data: this.pokemonList };
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.collection.count,
    };
  }


  public onPageChanged(event){
    this.config.currentPage = event;
  }

  public onItemsPerPageChanged(event) {
    if (event === 'All') {
      event = this.pokemonList.length
    }
    this.config.itemsPerPage = event;
  }

  onFilterChanged(event) {
    if (event.length>0) {
      this.pokemonList = this.pokemonListData.filter((pokemon)=>
        pokemon['name'].includes(event.toLowerCase())
      );
    } else {
      this.pokemonList = this.pokemonListData
    }
    this.loadPaginationConfig();
  }

  sortPokemonListBy(property) {

    if (this.currentOrderByOrder !== 'asc') {
      this.pokemonList.sort(this.orderPokemonList(property,'asc'))
    } else {
      this.pokemonList.sort(this.orderPokemonList(property,'desc'))
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
