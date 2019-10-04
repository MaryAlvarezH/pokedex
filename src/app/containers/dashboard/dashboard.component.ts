import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokeapiService } from '../../services/pokeapi.service';
import { UserCollectionService } from '../../services/user-collection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public pokemonCurrentList: Array<object> = []; // Lista activa/visible que esta en funcion de los filtros
  public pokemonSelectedList: Array<object> = []; // Lista derivaba de la data original filtrando solo los items seleccionados
  public userCurrentCollection: any[]; // Lista que almacena items.id seleccionados por el usuario (para facilitar el guardado de la data
  public pokemonListSubscription: Subscription;
  public userCollectionSubscription: Subscription;
  
  constructor(private pokeapiService: PokeapiService,
              private userCollectionService: UserCollectionService) {
  }

  ngOnInit() {
    this.getpokemonListData();
    this.pokemonListSubscription = this.pokeapiService.pokemonCurrentList$.subscribe(resp => {
      this.pokemonCurrentList = resp;
    });
    this.userCollectionSubscription = this.userCollectionService.currentCollection$.subscribe(resp => {
      this.userCurrentCollection = resp;
    });
  }

  async getpokemonListData() {
    await this.pokeapiService.getPokemonData();
  }

  onSaveCollection() {
    this.pokemonSelectedList = this.pokemonCurrentList.filter((pokemon => pokemon['selected'] == true));
  }

  onCancelSelection() {
    for (const pokemon of this.pokemonCurrentList) {
          pokemon['selected'] = false;
    }
    this.pokeapiService.pokemonCurrentList$.next(this.pokemonCurrentList);
    // this.userCurrentCollection = [];
    this.userCollectionService.currentCollection$.next([]);
  }

  ngOnDestroy() {
    if (this.pokemonListSubscription) {
      this.pokemonListSubscription.unsubscribe();
    }
    if (this.userCollectionSubscription) {
      this.userCollectionSubscription.unsubscribe();
    }
  }
}
