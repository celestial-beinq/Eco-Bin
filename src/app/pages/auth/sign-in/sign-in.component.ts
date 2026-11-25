import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  private router = inject(Router);

  showPassword = signal<boolean>(false);
  rememberMe = signal<boolean>(true);
  isSubmitting = signal<boolean>(false);
  submitSuccess = signal<boolean>(false);
  errorMessage = signal<string>('');

  formData = {
    identifier: '',
    password: ''
  };

  togglePasswordVisibility(): void {
    this.showPassword.update(v => !v);
  }

  onSubmit(): void {
    this.errorMessage.set('');
    if (!this.formData.identifier.trim()) {
      this.errorMessage.set('Please enter your email or phone number.');
      return;
    }
    if (!this.formData.password) {
      this.errorMessage.set('Please enter your password.');
      return;
    }

    this.isSubmitting.set(true);

    // Simulate login API call
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);

      // Show the success message briefly, then go to the admin dashboard
      setTimeout(() => this.router.navigate(['/admin']), 800);
    }, 1200);
  }
}
