import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-quick-booking',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './quick-booking.component.html',
  styleUrls: ['./quick-booking.component.css']
})
export class QuickBookingComponent {
  fullName = signal('');
  serviceType = signal('');
  contactInfo = signal('');
  serviceDate = signal('');
  
  isSubmitting = signal(false);
  isSubmitted = signal(false);
  errorMessage = signal('');

  services = [
    'Residential Garbage Collection',
    'Commercial Dumpster Rental',
    'Bulk Waste & Furniture Removal',
    'Eco-Friendly Recycling',
    'Construction Debris Disposal',
    'Hazardous Household Waste'
  ];

  onSubmit() {
    this.errorMessage.set('');
    
    if (!this.fullName().trim()) {
      this.errorMessage.set('Please enter your name.');
      return;
    }
    if (!this.serviceType()) {
      this.errorMessage.set('Please select a service type.');
      return;
    }
    if (!this.contactInfo().trim()) {
      this.errorMessage.set('Please enter your phone or email.');
      return;
    }
    if (!this.serviceDate()) {
      this.errorMessage.set('Please select your preferred date.');
      return;
    }

    this.isSubmitting.set(true);
    
    // Simulate API submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      
      // Auto-reset message after 5s
      setTimeout(() => {
        this.isSubmitted.set(false);
        this.fullName.set('');
        this.serviceType.set('');
        this.contactInfo.set('');
        this.serviceDate.set('');
      }, 5000);
    }, 900);
  }
}
