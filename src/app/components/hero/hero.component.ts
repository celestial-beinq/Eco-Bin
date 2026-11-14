import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuickBookingComponent } from '../quick-booking/quick-booking.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, QuickBookingComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  isVideoModalOpen = signal(false);

  openVideoModal() {
    this.isVideoModalOpen.set(true);
  }

  closeVideoModal() {
    this.isVideoModalOpen.set(false);
  }
}
