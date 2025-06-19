import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './pokemon-details.page.html',
  // styleUrls: ['']
})
export class PokemonDetailsPage implements OnInit {

  pokemon: any = null;
  species: any = null;
  loading = true;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private pokeApi = inject(PokeApiService);
  private favoritesService = inject(FavoritesService);

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
            error: (err) => {
              console.error('Error fetching species:', err);
              this.loading = false;
            }
          });
        },
        error: (err) => {
          console.error('Error fetching pokemon:', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

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

  isFavorite(): boolean {
    return this.favoritesService.isFavorite(this.pokemon?.id);
  }

  toggleFavorite() {
    if (this.pokemon) {
      if (this.isFavorite()) {
        this.favoritesService.removeFavorite(this.pokemon.id);
      } else {
        this.favoritesService.addFavorite(this.pokemon.id);
      }
    }
  }

  goBack() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
