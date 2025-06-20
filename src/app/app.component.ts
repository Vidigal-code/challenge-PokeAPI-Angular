import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

/**
 * Root component of the Angular/Ionic application
 * Provides the main application layout with a sticky header and footer,
 * and a flexible main content area that contains the router outlet
 */
@Component({
  /** Custom element selector for the root component */
  selector: 'app-root',
  /** Indicates this is a standalone component that doesn't need to be declared in a module */
  standalone: true,
  /** Required imports for this standalone component including Ionic, routing, and custom components */
  imports: [IonicModule, RouterOutlet, HeaderComponent, FooterComponent],
  /**
   * Inline template defining the application layout:
   * - Uses Ionic's ion-app as the root container with flexbox layout
   * - Header component that doesn't shrink (flex-shrink-0)
   * - Main content area that grows to fill available space (flex-grow) with scrollable overflow
   * - Footer component that doesn't shrink (flex-shrink-0)
   * - Router outlet renders the current route's component inside the main content area
   */
  template: `
    <ion-app class="flex flex-col min-h-screen overflow-auto">
      <app-header class="flex-shrink-0" />
      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>
      <app-footer class="flex-shrink-0" />
    </ion-app>
  `
})
export class AppComponent {
}
