import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Cleanbin | Professional Waste Management' },
  { path: 'sign-in', component: SignInComponent, title: 'Sign In | EcoBin LGA Waste Network' },
  { path: 'sign-up', component: SignUpComponent, title: 'Create Account | EcoBin LGA Waste Network' },
  { path: 'admin', component: AdminDashboardComponent, title: 'Dashboard | Northlight Workspace' },
  { path: 'dashboard', redirectTo: 'admin', pathMatch: 'full' },
  { path: 'login', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'register', redirectTo: 'sign-up', pathMatch: 'full' },
  { path: '**', redirectTo: '' }
];
