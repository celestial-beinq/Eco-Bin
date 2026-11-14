import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export type UserRole = 'resident' | 'business';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  selectedRole = signal<UserRole>('resident');
  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  agreeTerms = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  errorMessage = signal<string>('');

  lgaOptions = [
    'Ikeja',
    'Eti-Osa (Victoria Island / Lekki)',
    'Lagos Island',
    'Surulere',
    'Alimosho',
    'Kosofe',
    'Yaba / Lagos Mainland',
    'Oshodi-Isolo',
    'Ikorodu',
    'Apapa',
    'Other Lagos LGA'
  ];

  formData = {
    fullName: '',
    email: '',
    phone: '',
    lga: 'Ikeja',
    address: '',
    // Business specific
    businessName: '',
    businessCategory: 'Corporate / Office',
    // Security
    password: '',
    confirmPassword: ''
  };

  passwordStrength = computed(() => {
    const pwd = this.formData.password;
    if (!pwd) return { score: 0, label: 'None', class: '' };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 1, label: 'Weak', class: 'strength-weak' };
    if (score <= 3) return { score: 2, label: 'Medium', class: 'strength-medium' };
    return { score: 3, label: 'Strong', class: 'strength-strong' };
  });

  selectRole(role: UserRole): void {
    this.selectedRole.set(role);
    this.errorMessage.set('');
  }

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update(v => !v);
  }

  onSubmit(): void {
    this.errorMessage.set('');

    const role = this.selectedRole();

    // Validations
    if (role === 'business' && !this.formData.businessName.trim()) {
      this.errorMessage.set('Please enter your business or company name.');
      return;
    }

    if (!this.formData.fullName.trim()) {
      this.errorMessage.set(role === 'business' ? 'Please enter the contact person’s full name.' : 'Please enter your full name.');
      return;
    }

    if (!this.formData.email.trim() || !this.formData.email.includes('@')) {
      this.errorMessage.set('Please enter a valid email address.');
      return;
    }

    if (!this.formData.phone.trim()) {
      this.errorMessage.set('Please provide a contact phone number.');
      return;
    }

    if (!this.formData.password || this.formData.password.length < 6) {
      this.errorMessage.set('Password must be at least 6 characters long.');
      return;
    }

    if (this.formData.password !== this.formData.confirmPassword) {
      this.errorMessage.set('Passwords do not match. Please verify and try again.');
      return;
    }

    if (!this.agreeTerms()) {
      this.errorMessage.set('You must accept the terms of service and LGA privacy guidelines to proceed.');
      return;
    }

    this.isSubmitting.set(true);

    // Simulate account creation
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
    }, 1400);
  }
}
