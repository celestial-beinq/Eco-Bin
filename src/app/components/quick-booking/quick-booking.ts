import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-booking.html',
  styleUrl: './quick-booking.css',
})
export class QuickBookingComponent {
  name: string = '';
  serviceType: string = '';
  contact: string = '';
  serviceDate: string = '';

  onSubmit() {
    alert(`Thank you ${this.name || 'valued customer'}! Your pickup request has been received for ${this.serviceType || 'waste service'}. We will reach out via ${this.contact || 'your contact'} shortly.`);
  }
}
