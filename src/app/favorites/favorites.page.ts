import {Component, OnInit, inject} from '@angular/core';
import {Router} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {CommonModule} from '@angular/common';
import {PokeApiService} from '../services/poke-api.service';
import {FavoritesService} from '../services/favorites.service';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {FormsModule} from "@angular/forms";

/**
 * Component for displaying and managing a user's favorite Pokémon.
 * Displays a paginated list of favorite Pokémon with options to view details, remove favorites, and clear all favorites.
 */
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './favorites.page.html',
  //styleUrls: ['']
})
export class FavoritesPage implements OnInit {

  /** Array of Pokémon currently displayed on the page (paginated subset of allFavorites). */
  favorites: any[] = [];

  /** Array of filtered Pokémon based on search term. */
  filteredPokemons: any[] = [];

  /** Array of all favorite Pokémon retrieved from the FavoritesService. */
  allFavorites: any[] = [];

  /** Indicates whether the favorite Pokémon are being loaded. */
  loading = true;

  /** Starting index for pagination. */
  offset = 0;

  /** Number of Pokémon to display per page. */
  limit = 20;

  /** Total number of favorite Pokémon. */
  total = 0;

  /** Search term entered by the user. */
  searchTerm = '';

  /** Indicates if a search operation is in progress. */
  isLoading = false;

  /** Subject for handling search input with debouncing. */
  private searchSubject = new Subject<string>();

  /** Injected PokeApiService for fetching Pokémon data. */
  private pokeApi = inject(PokeApiService);

  /** Injected FavoritesService for managing favorite Pokémon. */
  private favoritesService = inject(FavoritesService);

  /** Injected Router for navigation. */
  private router = inject(Router);

  /**
   * Lifecycle hook that initializes the component by loading favorite Pokémon.
   */
  ngOnInit() {
    this.loadAllFavorites();
    this.setupSearchDebouncing();
  }

  /**
   * Loads all favorite Pokémon from the FavoritesService and fetches their details.
   * Updates the allFavorites array, sorts by ID, and paginates the results.
   */
  loadAllFavorites() {
    this.loading = true;
    const favIds = this.favoritesService.getFavorites();

    if (favIds.length === 0) {
      this.allFavorites = [];
      this.total = 0;
      this.updateCurrentPage();
      this.loading = false;
      return;
    }

    this.allFavorites = [];
    let loaded = 0;

    favIds.forEach(id => {
      this.pokeApi.getPokemonByNameOrId(id).subscribe(data => {
        this.allFavorites.push({
          id: data.id,
          name: data.name,
          image: data.sprites.front_default
        });
        loaded++;

        if (loaded === favIds.length) {
          this.allFavorites.sort((a, b) => a.id - b.id);
          this.total = this.allFavorites.length;
          this.updateCurrentPage();
          this.loading = false;
        }
      });
    });
  }

  /**
   * Sets up debouncing for search input to avoid excessive API calls.
   */
  private setupSearchDebouncing() {
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
   * Returns the appropriate array of Pokémon Favorites to display based on search state.
   */
  get displayedPokemonsFavorites(): any[] {
    return this.searchTerm ? this.filteredPokemons : this.favorites;
  }

  /**
   * Handles search input changes with debouncing.
   */
  onSearchChange() {
    if (this.searchTerm.trim()) {
      this.isLoading = true;
      this.searchSubject.next(this.searchTerm.trim());
    } else {
      this.filteredPokemons = [];
      this.isLoading = false;
    }
  }


  /**
   * Performs the actual search operation.
   * @param searchTerm The term to search for (name or ID).
   */
  private performSearch(searchTerm: string) {
    const isNumeric = /^\d+$/.test(searchTerm);

    if (isNumeric) {
      const pokemonId = parseInt(searchTerm, 10);
      this.searchById(pokemonId);
    } else {
      this.searchByName(searchTerm.toLowerCase());
    }
  }

  /**
   * Searches for a Pokémon by ID.
   * @param id The Pokémon ID to search for.
   */
  private searchById(id: number) {
    const match = this.allFavorites.find(p => p.id === id);
    this.filteredPokemons = match ? [match] : [];
    this.isLoading = false;
  }


  /**
   * Searches for Pokémon by name.
   * @param name The Pokémon name to search for.
   */
  private searchByName(name: string) {
    const match = this.allFavorites.find(p => p.name.toLowerCase() === name);
    if (match) {
      this.filteredPokemons = [match];
    } else {
      this.searchPartialName(name);
    }
    this.isLoading = false;
  }


  /**
   * Searches for Pokémon with partial name matching by loading more Pokémon data.
   * @param partialName The partial name to search for.
   */
  private searchPartialName(partialName: string) {
    const matches = this.allFavorites.filter(p =>
      p.name.toLowerCase().includes(partialName)
    );
    this.filteredPokemons = matches;
    this.isLoading = false;
  }


  /**
   * Clears the search term and results.
   */
  clearSearch() {
    this.searchTerm = '';
    this.filteredPokemons = [];
    this.isLoading = false;
  }


  /**
   * Updates the favorites array with the current page of Pokémon based on offset and limit.
   */
  updateCurrentPage() {
    const startIndex = this.offset;
    const endIndex = Math.min(this.offset + this.limit, this.total);
    this.favorites = this.allFavorites.slice(startIndex, endIndex);
  }

  /**
   * Navigates to the details page for a specific Pokémon.
   * @param pokemon The Pokémon object containing the ID to navigate to.
   */
  goToDetails(pokemon: any) {
    this.router.navigate(['/details', pokemon.id]);
  }

  /**
   * Removes a Pokémon from the favorites list and updates pagination.
   * @param id The ID of the Pokémon to remove.
   */
  removeFavorite(id: number) {
    this.favoritesService.removeFavorite(id);

    this.allFavorites = this.allFavorites.filter(pokemon => pokemon.id !== id);
    this.total = this.allFavorites.length;

    if (this.offset >= this.total && this.offset > 0) {
      this.offset = Math.max(0, this.offset - this.limit);
    }

    this.updateCurrentPage();
  }

  /**
   * Clears all favorite Pokémon and resets pagination.
   */
  clearFavorites(): void {
    this.favoritesService.clearFavorites();
    this.allFavorites = [];
    this.total = 0;
    this.offset = 0;
    this.updateCurrentPage();
    this.searchTerm = '';
    this.filteredPokemons = [];
    this.isLoading = false;
  }

  /**
   * Navigates to the next page of favorite Pokémon if available.
   */
  nextPage() {
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
      this.updateCurrentPage();
    }
  }

  /**
   * Navigates to the previous page of favorite Pokémon if available.
   */
  prevPage() {
    if (this.offset > 0) {
      this.offset = Math.max(0, this.offset - this.limit);
      this.updateCurrentPage();
    }
  }

  /** Reference to the Math object for use in the template. */
  protected readonly Math = Math;
}
