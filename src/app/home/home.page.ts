import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';
import { PaginationService } from '../services/pagination.service';

/**
 * Component for displaying a paginated list of Pokémon with search functionality.
 * Allows users to navigate through Pokémon, search by name or ID, view details, and toggle favorite status.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './home.page.html',
  providers: [PokeApiService],
})
export class HomePage implements OnInit {
  /** Array of Pokémon displayed on the current page. */
  pokemons: any[] = [];

  /** Injected services. */
  private pokeApi = inject(PokeApiService);
  private router = inject(Router);
  private favoritesService = inject(FavoritesService);
  protected paginationService = inject(PaginationService);
  private toastController = inject(ToastController);

  /**
   * Returns the appropriate array of Pokémon to display based on search state.
   */
  get displayedPokemons(): any[] {
    return this.paginationService.searchTerm ? this.paginationService.filteredItems : this.pokemons;
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
   * Lifecycle hook that initializes the component by loading the initial set of Pokémon.
   */
  ngOnInit() {
    this.loadPokemons();
    this.paginationService.setupSearchDebouncing();
  }

  /**
   * Loads Pokémon data for the current page using the PokeApiService.
   */
  loadPokemons() {
    this.pokeApi.getPokemonList(this.paginationService.offset, this.paginationService.limit).subscribe({
      next: (res) => {
        this.paginationService.total = res.count;
        this.pokemons = res.results.map((poke: any, idx: number) => ({
          ...poke,
          id: this.paginationService.offset + idx + 1,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.paginationService.offset + idx + 1}.png`
        }));
      },
      error: async () => {
        await this.showError('Não foi possível carregar a lista de Pokémons. Tente novamente.');
      }
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
  }

  /**
   * Clears the search term and results.
   */
  clearSearch() {
    this.paginationService.clearSearch();
  }

  /**
   * Navigates to the next page of Pokémon if available.
   */
  nextPage() {
    this.paginationService.nextPage();
    this.loadPokemons();
  }

  /**
   * Navigates to the previous page of Pokémon if available.
   */
  prevPage() {
    this.paginationService.prevPage();
    this.loadPokemons();
  }

  /**
   * Navigates to the details page for a specific Pokémon.
   * @param pokemon The Pokémon object containing the ID to navigate to.
   */
  goToDetails(pokemon: any) {
    this.router.navigate(['/details', pokemon.id]);
  }

  /**
   * Checks if a Pokémon is marked as a favorite.
   * @param id The ID of the Pokémon to check.
   * @returns True if the Pokémon is a favorite, false otherwise.
   */
  isFavorite(id: number): boolean {
    return this.favoritesService.isFavorite(id);
  }

  /**
   * Toggles the favorite status of a Pokémon.
   * @param pokemon The Pokémon object to toggle.
   */
  toggleFavorite(pokemon: any) {
    if (this.isFavorite(pokemon.id)) {
      this.favoritesService.removeFavorite(pokemon.id);
    } else {
      this.favoritesService.addFavorite(pokemon.id);
    }
  }

  /** Reference to the Math object for use in the template. */
  protected readonly Math = Math;
}
