import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';

/**
 * Component for displaying detailed information about a specific Pokémon.
 * Fetches and displays Pokémon data, species information, and allows toggling favorite status.
 */
@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './pokemon-details.page.html',
})
export class PokemonDetailsPage implements OnInit {
  /** The Pokémon data fetched from the PokeApiService. */
  pokemon: any = null;

  /** The Pokémon species data fetched from the PokeApiService. */
  species: any = null;

  /** Indicates whether the Pokémon data is being loaded. */
  loading = true;

  /** Injected services. */
  route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokeApi = inject(PokeApiService);
  private favoritesService = inject(FavoritesService);
  private toastController = inject(ToastController);

  /**
   * Lifecycle hook that initializes the component by fetching Pokémon and species data.
   */
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.pokeApi.getPokemonByNameOrId(id).subscribe({
        next: (pokemon) => {
          this.pokemon = pokemon;
          this.pokeApi.getPokemonSpecies(id).subscribe({
            next: (species) => {
              this.species = species;
              this.loading = false;
            },
            error: async () => {
              await this.showError('Erro ao carregar dados da espécie do Pokémon.');
              this.loading = false;
            }
          });
        },
        error: async () => {
          await this.showError('Erro ao carregar dados do Pokémon.');
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
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
   * Returns an array of additional Pokémon descriptions for display.
   */
  getAdditionalDescriptions(): { label: string; value: any }[] {
    if (!this.pokemon || !this.species) return [];
    return [
      { label: 'Height', value: this.pokemon.height },
      { label: 'Weight', value: this.pokemon.weight },
      { label: 'Base Experience', value: this.pokemon.base_experience },
      { label: 'Types', value: this.pokemon.types.map((t: any) => t.type.name).join(', ') },
      { label: 'Abilities', value: this.pokemon.abilities.map((a: any) => a.ability.name).join(', ') },
      { label: 'Habitat', value: this.species.habitat?.name || 'Unknown' },
      { label: 'Color', value: this.species.color?.name || 'Unknown' }
    ];
  }

  /**
   * Returns an array of Pokémon sprite image URLs.
   */
  getImages(): string[] {
    if (!this.pokemon) return [];
    const sprites = this.pokemon.sprites;
    return [
      sprites.front_default,
      sprites.back_default,
      sprites.front_shiny,
      sprites.back_shiny,
      sprites.front_female,
      sprites.back_female
    ].filter(Boolean);
  }

  /**
   * Checks if the current Pokémon is marked as a favorite.
   */
  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.pokemon?.id);
  }

  /**
   * Toggles the favorite status of the current Pokémon.
   */
  toggleFavorite() {
    if (this.pokemon) {
      if (this.isFavorite()) {
        this.favoritesService.removeFavorite(this.pokemon.id);
      } else {
        this.favoritesService.addFavorite(this.pokemon.id);
      }
    }
  }

  /**
   * Navigates back to the parent route.
   */
  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   * Navigates back to the parent route favorites.
   */
  goBackFavorites() {
    this.router.navigate(['/favorites']);
  }

  /** Reference to the global close function for use in the template. */
  protected readonly close = close;
}
