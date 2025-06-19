import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PokeApiService } from '../services/poke-api.service';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './home.page.html',
  providers: [PokeApiService],
  //styleUrls: ['']
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  total = 0;

  private pokeApi = inject(PokeApiService);
  private router = inject(Router);
  private favoritesService = inject(FavoritesService);

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokeApi.getPokemonList(this.offset, this.limit).subscribe(res => {
      this.total = res.count;
      this.pokemons = res.results.map((poke: any, idx: number) => ({
        ...poke,
        id: this.offset + idx + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.offset + idx + 1}.png`
      }));
    });
  }

  nextPage() {
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
      this.loadPokemons();
    }
  }

  prevPage() {
    if (this.offset - this.limit >= 0) {
      this.offset -= this.limit;
      this.loadPokemons();
    }
  }

  goToDetails(pokemon: any) {
    this.router.navigate(['/details', pokemon.id]);
  }

  isFavorite(id: number): boolean {
    return this.favoritesService.isFavorite(id);
  }

  toggleFavorite(pokemon: any) {
    if (this.isFavorite(pokemon.id)) {
      this.favoritesService.removeFavorite(pokemon.id);
    } else {
      this.favoritesService.addFavorite(pokemon.id);
    }
  }
}
