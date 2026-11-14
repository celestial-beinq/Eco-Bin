import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSection } from '../../components/hero-section/hero-section';
import { QuickBookingComponent } from '../../components/quick-booking/quick-booking';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroSection, QuickBookingComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  stats = [
    { number: '10+', labelTop: 'Years of', labelBottom: 'Service' },
    { number: '5k+', labelTop: 'Pickups', labelBottom: 'Completed' },
    { number: '24/7', labelTop: 'Full Service', labelBottom: 'Support' },
    { number: '100%', labelTop: 'Responsible', labelBottom: 'Disposal' }
  ];

  propertyServices = [
    {
      featured: true,
      icon: 'residential',
      title: 'Residential Pickup',
      desc: 'Weekly garbage and recycling collection for homes. Flexible scheduling, convenient service, always on time.',
      link: '/services'
    },
    {
      featured: false,
      icon: 'commercial',
      title: 'Commercial Waste',
      desc: 'Scheduled collection for offices, retail, and restaurants. Custom frequency, dedicated service, reliable timing.',
      link: '/services'
    },
    {
      featured: false,
      icon: 'dumpster',
      title: 'Dumpster Rental',
      desc: '10 to 30-yard dumpsters for renovations and projects. Quick delivery, flexible terms, competitive pricing.',
      link: '/services'
    },
    {
      featured: false,
      icon: 'recycling',
      title: 'Recycling Services',
      desc: 'Comprehensive recycling programs for homes and businesses. We handle sorting and proper disposal.',
      link: '/services'
    },
    {
      featured: false,
      icon: 'construction',
      title: 'Construction Debris',
      desc: 'Specialized handling of construction waste and demolition materials. Licensed and certified disposal.',
      link: '/services'
    },
    {
      featured: false,
      icon: 'bulk',
      title: 'Bulk Item Removal',
      desc: 'One-time pickup for large furniture and appliances. Quick service, reasonable rates, hassle-free.',
      link: '/services'
    }
  ];

  haulingCards = [
    {
      image: '/images/service-residential.jpg',
      category: 'For Homes',
      title: 'Same-day Residential Hauling',
      checklist: [
        'Furniture, mattresses, appliances',
        'Garage, attic & basement cleanouts',
        'Estate & downsizing cleanouts',
        'Yard debris & shed contents'
      ],
      linkText: 'Residential services'
    },
    {
      image: '/images/service-commercial.jpg',
      category: 'For Businesses',
      title: 'Commercial Cleanouts',
      checklist: [
        'Office, retail & warehouse cleanouts',
        'E-waste & furniture removal',
        'After-hours & weekend service',
        'COI & Net-30 billing available'
      ],
      linkText: 'Residential services'
    },
    {
      image: '/images/service-construction.jpg',
      category: 'For Job Sites',
      title: 'Construction Hauling',
      checklist: [
        'Drywall, lumber, flooring & tile',
        'Post-renovation debris removal',
        'Roofing tear-off & site cleanups',
        'Recurring contractor accounts'
      ],
      linkText: 'Residential services'
    }
  ];
}
