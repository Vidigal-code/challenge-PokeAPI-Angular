import {inject, Injectable} from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { PokeApiService } from './poke-api.service';

/**
 * Service to handle pagination and search logic for Pokémon lists.
 * Provides reusable methods for navigating pages and searching Pokémon by name or ID.
 */
@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  /** Starting index for pagination. */
  offset = 0;

  /** Number of items to display per page. */
  limit = 20;

  /** Total number of items available. */
  total = 0;

  /** Search term entered by the user. */
  searchTerm = '';

  /** Indicates if a search operation is in progress. */
  isLoading = false;

  /** Array of filtered items based on search term. */
  filteredItems: any[] = [];

  /** Subject for handling search input with debouncing. */
  private searchSubject = new Subject<string>();

  /** Injected PokeApiService for fetching Pokémon data. */
  private pokeApi = inject(PokeApiService);

  /**
   * Sets up debouncing for search input to avoid excessive API calls.
   */
  public setupSearchDebouncing() {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => {
        this.performSearch(searchTerm);
      });
  }

  /**
   * Handles search input changes with debouncing.
   * @param searchTerm The term to search for.
   */
  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm.trim();
    if (this.searchTerm) {
      this.isLoading = true;
      this.searchSubject.next(this.searchTerm);
    } else {
      this.filteredItems = [];
      this.isLoading = false;
    }
  }

  /**
   * Performs the actual search operation.
   * @param searchTerm The term to search for (name or ID).
   * @param allItems The full list of items to search within (used for favorites).
   */
  performSearch(searchTerm: string, allItems?: any[]) {
    const isNumeric = /^\d+$/.test(searchTerm);

    if (isNumeric) {
      const pokemonId = parseInt(searchTerm, 10);
      this.searchById(pokemonId, allItems);
    } else {
      this.searchByName(searchTerm.toLowerCase(), allItems);
    }
  }

  /**
   * Searches for a Pokémon by ID.
   * @param id The Pokémon ID to search for.
   * @param allItems The full list of items to search within (optional for favorites).
   */
  private searchById(id: number, allItems?: any[]) {
    if (allItems) {
      // Favorites search
      const match = allItems.find(p => p.id === id);
      this.filteredItems = match ? [match] : [];
      this.isLoading = false;
    } else {
      // Home page search
      this.pokeApi.getPokemonByNameOrId(id).subscribe({
        next: (pokemon) => {
          this.filteredItems = [{
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
          }];
          this.isLoading = false;
        },
        error: () => {
          this.filteredItems = [];
          this.isLoading = false;
        }
      });
    }
  }

  /**
   * Searches for Pokémon by name.
   * @param name The Pokémon name to search for.
   * @param allItems The full list of items to search within (optional for favorites).
   */
  private searchByName(name: string, allItems?: any[]) {
    if (allItems) {
      // Favorites search
      const matches = allItems.filter(p => p.name.toLowerCase().includes(name));
      this.filteredItems = matches;
      this.isLoading = false;
    } else {
      // Home page search
      this.pokeApi.getPokemonByNameOrId(name).subscribe({
        next: (pokemon) => {
          this.filteredItems = [{
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.front_default ||
              `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`
          }];
          this.isLoading = false;
        },
        error: () => {
          this.searchPartialName(name);
        }
      });
    }
  }

  /**
   * Searches for Pokémon with partial name matching.
   * @param partialName The partial name to search for.
   */
  private searchPartialName(partialName: string) {
    this.pokeApi.getPokemonList(0, 1000).subscribe({
      next: (res) => {
        const matches = res.results.filter((pokemon: any) =>
          pokemon.name.toLowerCase().includes(partialName)
        );
        this.filteredItems = matches.slice(0, 20).map((poke: any, idx: number) => {
          const urlParts = poke.url.split('/');
          const id = parseInt(urlParts[urlParts.length - 2], 10);
          return {
            ...poke,
            id: id,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
          };
        });
        this.isLoading = false;
      },
      error: () => {
        this.filteredItems = [];
        this.isLoading = false;
      }
    });
  }

  /**
   * Clears the search term and results.
   */
  clearSearch() {
    this.searchTerm = '';
    this.filteredItems = [];
    this.isLoading = false;
  }

  /**
   * Navigates to the next page if available.
   */
  nextPage() {
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
    }
  }

  /**
   * Navigates to the previous page if available.
   */
  prevPage() {
    if (this.offset > 0) {
      this.offset = Math.max(0, this.offset - this.limit);
    }
  }
}
