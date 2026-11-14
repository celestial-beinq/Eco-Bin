import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Cleanbin | Professional Waste Management' },
  { path: 'about', component: AboutComponent, title: 'About Us | Cleanbin' },
  { path: 'services', component: ServicesComponent, title: 'Services & Dumpster Rental | Cleanbin' },
  { path: 'projects', component: ProjectsComponent, title: 'Sustainability Projects | Cleanbin' },
  { path: 'contact', component: ContactComponent, title: 'Schedule Pickup & Contact | Cleanbin' },
  { path: '**', redirectTo: '' }
];
