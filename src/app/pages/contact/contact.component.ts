import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name = signal('');
  email = signal('');
  phone = signal('');
  service = signal('Residential Waste Collection');
  address = signal('');
  date = signal('');
  notes = signal('');

  isSubmitting = signal(false);
  isSubmitted = signal(false);

  onSubmit() {
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
    }, 1000);
  }
}
