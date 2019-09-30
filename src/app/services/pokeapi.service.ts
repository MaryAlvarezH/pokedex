import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

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
    return pokemonData;
  }

  getPokemonList(): Promise<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=18`).toPromise();
  }

  getPokemonDetails(url): Promise<any> {
    return this.http.get(url).toPromise();
  }
}
