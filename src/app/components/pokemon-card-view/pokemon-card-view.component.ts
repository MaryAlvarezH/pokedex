import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon-card-view',
  templateUrl: './pokemon-card-view.component.html',
  styleUrls: ['./pokemon-card-view.component.scss']
})
export class PokemonCardViewComponent implements OnInit {
  @Input() pokemonData: Array<object>;

  constructor() { }

  ngOnInit() {
    console.log('card', this.pokemonData);
  }

}
