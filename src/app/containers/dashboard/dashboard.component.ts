import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public pokemonListData: Array<object> = [];
  constructor(private pokeapiService: PokeapiService) { 
  }

  ngOnInit() {
    this.getpokemonListData();
  }

  async getpokemonListData() {
    await this.pokeapiService.getPokemonData();
  }
}
