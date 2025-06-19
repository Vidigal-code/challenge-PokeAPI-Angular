import { Injectable } from '@angular/core';

@Injectable()
export class FavoritesService {
  private readonly storageKey = 'favoritePokemons';

  getFavorites(): number[] {
    const favs = localStorage.getItem(this.storageKey);
    return favs ? JSON.parse(favs) : [];
  }

  isFavorite(pokemonId: number): boolean {
    return this.getFavorites().includes(pokemonId);
  }

  addFavorite(pokemonId: number): void {
    const favs = this.getFavorites();
    if (!favs.includes(pokemonId)) {
      favs.push(pokemonId);
      localStorage.setItem(this.storageKey, JSON.stringify(favs));
    }
  }

  removeFavorite(pokemonId: number): void {
    let favs = this.getFavorites();
    favs = favs.filter(id => id !== pokemonId);
    localStorage.setItem(this.storageKey, JSON.stringify(favs));
  }
}
