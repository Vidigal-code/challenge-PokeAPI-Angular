import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';
import { PaginationService } from '../services/pagination.service';

/**
 * Component for displaying and managing a user's favorite Pokémon.
 * Displays a paginated list of favorite Pokémon with options to view details, remove favorites, and clear all favorites.
 */
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './favorites.page.html',
})
export class FavoritesPage implements OnInit {
  /** Array of Pokémon currently displayed on the page. */
  favorites: any[] = [];

  /** Array of all favorite Pokémon retrieved from the FavoritesService. */
  allFavorites: any[] = [];

  /** Indicates whether the favorite Pokémon are being loaded. */
  loading = true;

  /** Injected services. */
  private pokeApi = inject(PokeApiService);
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);
  public paginationService = inject(PaginationService);
  private toastController = inject(ToastController);

  /**
   * Returns the appropriate array of Pokémon Favorites to display based on search state.
   */
  get displayedPokemonsFavorites(): any[] {
    return this.paginationService.searchTerm ? this.paginationService.filteredItems : this.favorites;
  }

  get searchTerm(): string {
    return this.paginationService.searchTerm;
  }

  set searchTerm(value: string) {
    this.paginationService.searchTerm = value;
  }

  get isLoading(): boolean {
    return this.paginationService.isLoading;
  }

  /**
   * Lifecycle hook that initializes the component by loading favorite Pokémon.
   */
  ngOnInit() {
    this.loadAllFavorites();
    this.paginationService.setupSearchDebouncing();
  }

  /**
   * Loads all favorite Pokémon from the FavoritesService and fetches their details.
   */
  loadAllFavorites() {
    this.loading = true;
    const favIds = this.favoritesService.getFavorites();

    if (favIds.length === 0) {
      this.allFavorites = [];
      this.paginationService.total = 0;
      this.updateCurrentPage();
      this.loading = false;
      return;
    }

    this.allFavorites = [];
    let loaded = 0;

    favIds.forEach(id => {
      this.pokeApi.getPokemonByNameOrId(id).subscribe({
        next: (data) => {
          this.allFavorites.push({
            id: data.id,
            name: data.name,
            image: data.sprites.front_default
          });
          loaded++;

          if (loaded === favIds.length) {
            this.allFavorites.sort((a, b) => a.id - b.id);
            this.paginationService.total = this.allFavorites.length;
            this.updateCurrentPage();
            this.loading = false;
          }
        },
        error: async () => {
          await this.showError('Erro ao carregar Pokémon favorito. Tente novamente.');
          loaded++;
          if (loaded === favIds.length) {
            this.allFavorites.sort((a, b) => a.id - b.id);
            this.paginationService.total = this.allFavorites.length;
            this.updateCurrentPage();
            this.loading = false;
          }
        }
      });
    });
  }

  /**
   * Displays an error message using Ionic Toast.
   * @param message The error message to display.
   */
  private async showError(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    await toast.present();
  }

  /**
   * Handles search input changes.
   */
  onSearchChange() {
    this.paginationService.onSearchChange(this.searchTerm);
    this.paginationService.performSearch(this.searchTerm, this.allFavorites);
  }

  /**
   * Clears the search term and results.
   */
  clearSearch() {
    this.paginationService.clearSearch();
  }

  /**
   * Updates the favorites array with the current page of Pokémon.
   */
  updateCurrentPage() {
    const startIndex = this.paginationService.offset;
    const endIndex = Math.min(this.paginationService.offset + this.paginationService.limit, this.paginationService.total);
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
    this.paginationService.total = this.allFavorites.length;

    if (this.paginationService.offset >= this.paginationService.total && this.paginationService.offset > 0) {
      this.paginationService.offset = Math.max(0, this.paginationService.offset - this.paginationService.limit);
    }

    this.updateCurrentPage();
  }

  /**
   * Clears all favorite Pokémon and resets pagination.
   */
  clearFavorites(): void {
    this.favoritesService.clearFavorites();
    this.allFavorites = [];
    this.paginationService.total = 0;
    this.paginationService.offset = 0;
    this.updateCurrentPage();
  }

  /**
   * Navigates to the next page of favorite Pokémon if available.
   */
  nextPage() {
    this.paginationService.nextPage();
    this.updateCurrentPage();
  }

  /**
   * Navigates to the previous page of favorite Pokémon if available.
   */
  prevPage() {
    this.paginationService.prevPage();
    this.updateCurrentPage();
  }

  /** Reference to the Math object for use in the template. */
  protected readonly Math = Math;
}
