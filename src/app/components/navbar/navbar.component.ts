import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMobileMenuOpen = signal(false);
  activeDropdown = signal<string | null>(null);
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 40);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
    this.activeDropdown.set(null);
  }

  toggleDropdown(menu: string, event: Event) {
    event.stopPropagation();
    this.activeDropdown.update(current => current === menu ? null : menu);
  }

  closeDropdown() {
    this.activeDropdown.set(null);
  }
}
