import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { PokemonDetailsPage } from './pokemon-details/pokemon-details.page';
import { FavoritesPage } from './favorites/favorites.page';

/**
 * Application routing configuration for the Pokemon app
 * Defines all available routes and their corresponding components
 * Uses Angular Router to handle navigation between different pages
 */
export const routes: Routes = [
  /**
   * Default/root route - displays the home page
   * Matches empty path ('') and renders HomePage component
   */
  { path: '', component: HomePage },

  /**
   * Pokemon details route with dynamic parameter
   * Matches 'details/:id' where :id is the Pokemon ID or name
   * Renders PokemonDetailsPage component to show detailed Pokemon information
   */
  { path: 'details/:id', component: PokemonDetailsPage },

  /**
   * Favorites page route
   * Matches 'favorites' path and renders FavoritesPage component
   * Displays user's favorite Pokemon list
   */
  { path: 'favorites', component: FavoritesPage },

  /**
   * Wildcard route for handling unmatched URLs
   * Catches all undefined routes (**) and redirects to home page
   * Uses 'full' pathMatch to ensure complete URL matching
   * Must be the last route in the configuration
   */
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
