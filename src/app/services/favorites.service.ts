import { Injectable, inject } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import {environment} from "../../environments/environment";

/**
 * Service for managing favorite Pokémon, stored in localStorage.
 * Sends notifications via WebHook for events related to changes in favorites.
 */
@Injectable()
export class FavoritesService {
  /** Key used to store favorite Pokémon IDs in localStorage. */
  private readonly storageKey = 'favoritePokemons';

  /** URL for sending WebHook notifications. */
  //private readonly webhookUrl = environment.webhookUrl;

  /** Injected HttpClient for making HTTP requests. */
  //private http = inject(HttpClient);

  /**
   * Retrieves the list of favorite Pokémon IDs.
   * @returns An array of favorite Pokémon IDs.
   */
  getFavorites(): number[] {
    const favs = localStorage.getItem(this.storageKey);
    return favs ? JSON.parse(favs) : [];
  }

  /**
   * Checks if a Pokémon is a favorite.
   * @param pokemonId The ID of the Pokémon to check.
   * @returns True if the Pokémon is a favorite, false otherwise.
   */
  isFavorite(pokemonId: number): boolean {
    return this.getFavorites().includes(pokemonId);
  }

  /**
   * Adds a Pokémon to the list of favorites and sends a WebHook notification.
   * @param pokemonId The ID of the Pokémon to add.
   */
  addFavorite(pokemonId: number): void {
    const favs = this.getFavorites();
    if (!favs.includes(pokemonId)) {
      favs.push(pokemonId);
      localStorage.setItem(this.storageKey, JSON.stringify(favs));

      // Send WebHook

      /*this.http.post(this.webhookUrl, {
        event: 'pokemon_added',
        pokemonId,
        timestamp: new Date().toISOString()
      }).subscribe({
        error: (err) => console.error('Error sending WebHook:', err.message)
      });*/


    }
  }

  /**
   * Removes a Pokémon from the list of favorites and sends a WebHook notification.
   * @param pokemonId The ID of the Pokémon to remove.
   */
  removeFavorite(pokemonId: number): void {
    let favs = this.getFavorites();
    favs = favs.filter(id => id !== pokemonId);
    localStorage.setItem(this.storageKey, JSON.stringify(favs));


    /*this.http.post(this.webhookUrl, {
      event: 'pokemon_removed',
      pokemonId,
      timestamp: new Date().toISOString()
    }).subscribe({
      error: (err) => console.error('Error sending WebHook:', err.message)
    });*/



  }

  /**
   * Clears all favorite Pokémon and sends a WebHook notification.
   */
  clearFavorites(): void {
    localStorage.removeItem(this.storageKey);

   /* this.http.post(this.webhookUrl, {
      event: 'favorites_cleared',
      timestamp: new Date().toISOString()
    }).subscribe({
      error: (err) => console.error('Error sending WebHook:', err)
    });*/


  }
}
