import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules, withHashLocation } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { PokeApiService } from './app/services/poke-api.service';
import { FavoritesService } from './app/services/favorites.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withHashLocation(),
      withPreloading(PreloadAllModules)
    ),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(),
    PokeApiService,
    FavoritesService,
  ],
});

