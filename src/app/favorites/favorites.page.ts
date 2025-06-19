import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './favorites.page.html',
  //styleUrls: ['']
})
export class FavoritesPage implements OnInit {

  favorites: any[] = [];
  loading = true;

  private pokeApi = inject(PokeApiService);
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const favs = this.favoritesService.getFavorites();
    this.favorites = [];
    if (favs.length === 0) {
      this.loading = false;
      return;
    }
    let loaded = 0;
    favs.forEach(id => {
      this.pokeApi.getPokemonByNameOrId(id).subscribe(data => {
        this.favorites.push({
          id: data.id,
          name: data.name,
          image: data.sprites.front_default
        });
        loaded++;
        if (loaded === favs.length) {
          this.loading = false;
        }
      });
    });
  }

  goToDetails(pokemon: any) {
    this.router.navigate(['/details', pokemon.id]);
  }

  removeFavorite(id: number) {
    this.favoritesService.removeFavorite(id);
    this.loadFavorites();
  }
}
