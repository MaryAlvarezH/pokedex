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
    // console.log('pokemonList', pokemonList);

    for (const pokemon of pokemonList) {
      const pokemonDetails = await this.getPokemonDetails(pokemon.url);
      pokemonData.push(pokemonDetails);
    }
    console.log('service', pokemonData);
    return pokemonData;
  }

  getPokemonList(): Promise<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100`).toPromise();
  }

  getPokemonDetails(url): Promise<any> {
    return this.http.get(url).toPromise();
  }
}
