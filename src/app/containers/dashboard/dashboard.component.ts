import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public pokemonList: Array<object> = [];
  constructor(private pokeapiService: PokeapiService) { 
  }

  ngOnInit() {
    this.getPokemonList();
  }

  async getPokemonList() {
    this.pokemonList = await this.pokeapiService.getPokemonData();
    console.log('pokemonList', this.pokemonList)
  }
}
