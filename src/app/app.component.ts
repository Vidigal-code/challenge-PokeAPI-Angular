import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <ion-app class="flex flex-col min-h-screen">
      <app-header class="flex-shrink-0"/>
      <main class="flex-grow overflow-auto">
        <router-outlet></router-outlet>
      </main>
      <app-footer class="flex-shrink-0"/>
    </ion-app>`
})
export class AppComponent {
}
