import { Component } from '@angular/core';
import { NgClass } from "@angular/common";
import {RouterModule} from "@angular/router";

/**
 * Component for displaying a header with a toggleable menu.
 * Provides navigation or menu functionality with a responsive design.
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  //styleUrls: ['./header.component.scss'],
  imports: [RouterModule, NgClass],
})
export class HeaderComponent {

  /** Indicates whether the menu is open or closed. */
  isMenuOpen = false;

  /**
   * Toggles the menu's open/closed state.
   */
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
