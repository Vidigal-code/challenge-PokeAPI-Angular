import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

/**
 * Service for interacting with the PokeAPI (https://pokeapi.co/)
 * Provides methods to fetch Pokemon data including lists, individual Pokemon details, and species information
 */
@Injectable()
export class PokeApiService {
  /** Base URL for the PokeAPI v2 */
  private baseUrl = environment.apiUrl;

  /** HTTP client for making API requests */
  private http = inject(HttpClient);

  /**
   * Retrieves a paginated list of Pokemon from the PokeAPI
   * @param offset - The starting index for pagination (default: 0)
   * @param limit - The maximum number of Pokemon to return (default: 20)
   * @returns Observable containing the Pokemon list response with results and pagination info
   */
  getPokemonList(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon?offset=${offset}&limit=${limit}`);
  }

  /**
   * Retrieves detailed information about a specific Pokemon by name or ID
   * @param nameOrId - The Pokemon name (string) or ID (number) to fetch
   * @returns Observable containing the Pokemon's detailed information including stats, types, abilities, etc.
   */
  getPokemonByNameOrId(nameOrId: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${nameOrId}`);
  }

  /**
   * Retrieves species information for a specific Pokemon by name or ID
   * @param nameOrId - The Pokemon name (string) or ID (number) to fetch species data for
   * @returns Observable containing the Pokemon species information including evolution chain, habitat, etc.
   */
  getPokemonSpecies(nameOrId: string | number): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon-species/${nameOrId}`);
  }
}
