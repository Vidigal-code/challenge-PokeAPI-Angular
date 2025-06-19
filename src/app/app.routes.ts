import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { PokemonDetailsPage } from './pokemon-details/pokemon-details.page';
import { FavoritesPage } from './favorites/favorites.page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'details/:id', component: PokemonDetailsPage },
  { path: 'favorites', component: FavoritesPage },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
