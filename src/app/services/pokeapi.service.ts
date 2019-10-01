import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  public pokemonData$: Subject<Array<object>> = new Subject;
  public pokemonCurrentList$: Subject<Array<object>> = new Subject;

  constructor(private http: HttpClient ) {
  }

  public async getPokemonData() {
    const pokemonData: Array<object> = [];
    const {results} = await this.getPokemonList();
    const pokemonList = results;

    for (const pokemon of pokemonList) {
      const pokemonDetails = await this.getPokemonDetails(pokemon.url);
      pokemonData.push(pokemonDetails);
    }
    
    this.pokemonData$.next(pokemonData);
    this.pokemonCurrentList$.next(pokemonData);
  }

  getPokemonList(): Promise<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=18`).toPromise();
  }

  getPokemonDetails(url): Promise<any> {
    return this.http.get(url).toPromise();
  }
}
