import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PokeapiService } from 'src/app/services/pokeapi.service';
import { ConfigTableService } from 'src/app/services/config-table.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {

  public pokemonListSubscription: Subscription;
  public pokemonListData = []
  public pokemonCurrentList = [];
  public itemPerPageOptions = [5,10,15,30,50,100];
  public config = {};
 
  constructor(public pokeapiService: PokeapiService,
              public configTableService: ConfigTableService) { }

  ngOnInit() {
    this.pokemonListSubscription = this.pokeapiService.pokemonData$.subscribe((res:any)=> {
      this.pokemonListData = res;
    });

    this.pokemonListSubscription = this.pokeapiService.pokemonCurrentList$.subscribe((res:any)=> {
      this.pokemonCurrentList = res;
    });

    this.config = this.configTableService.config;
  }

  ngOnDestroy(){
    if(this.pokemonListSubscription !== undefined) {
      this.pokemonListSubscription.unsubscribe();
    }
  }

  public onFilterChanged(event) {
    if (event.length>0) {
      this.pokemonCurrentList = this.pokemonListData.filter((pokemon)=>
        pokemon['name'].includes(event.toLowerCase())
      );
    } else {
      this.pokemonCurrentList = this.pokemonListData
    }
    this.pokeapiService.pokemonCurrentList$.next(this.pokemonCurrentList);
    this.configTableService.config.totalItems = this.pokemonCurrentList.length
  }

  public onItemsPerPageChanged(event) {
    this.configTableService.config.itemsPerPage = event;
  }

}
