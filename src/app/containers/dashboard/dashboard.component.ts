import { Component, OnInit } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pokemonData: Array<object> = [];
  constructor(private pokeapiService: PokeapiService) { }

  async ngOnInit() {
    this.pokemonData = await this.pokeapiService.getPokemonData();
    console.log(this.pokemonData);
  }

}
