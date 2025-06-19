import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PokeApiService {
  private baseUrl = 'https://pokeapi.co/api/v2';
  private http = inject(HttpClient);

  getPokemonList(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  getPokemonByNameOrId(nameOrId: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${nameOrId}`);
  }

  getPokemonSpecies(nameOrId: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon-species/${nameOrId}`);
  }
}
