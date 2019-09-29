import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-table',
  templateUrl: './pokemon-table.component.html',
  styleUrls: ['./pokemon-table.component.scss']
})
export class PokemonTableComponent implements OnInit {
  @Input() pokemonList
  config: any;
  public collection;

  constructor() { }

  ngOnInit() {
    this.addPaginationConfig();
  }

  addPaginationConfig() {
    if (this.pokemonList.length>0) {
      this.loadPaginationConfig();
    } else {
      setTimeout(()=> {
        this.addPaginationConfig();
      },1000)
    }
  }

  loadPaginationConfig() {
    this.collection = { count: this.pokemonList.length, data: this.pokemonList };
    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.collection.count,
    };
  }


  public pageChanged(event){
    console.log(event)
    this.config.currentPage = event;
  }

}
