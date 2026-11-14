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

  howItWorksSteps = [
    {
      step: '01',
      icon: 'report',
      title: 'Register',
      desc: 'Residents and businesses register to access organised waste management services within their communities.'
    },
    {
      step: '02',
      icon: 'collection',
      title: 'Request a Collection',
      desc: 'Submit a collection request, share your location and select the service you need.'
    },
    {
      step: '03',
      icon: 'recovery',
      title: 'Collection and Recovery',
      desc: 'Your request is assigned to an appropriate collection operator. Waste is collected and directed to suitable disposal or recycling channels.'
    },
    {
      step: '04',
      icon: 'impact',
      title: 'Track Your Collection',
      desc: 'Monitor collection progress, view service updates and stay informed about your waste management activities.'
    }
  ];

  reviews = [
    {
      quote: 'Booked a couch removal at 9am — they were here by noon, took it down two flights of stairs, and left no scuff marks. Flat $149.',
      author: 'Sarah M.',
      role: 'Homeowner, Riverside',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=face'
    },
    {
      quote: 'We rebuilt our dining room and they hauled out every booth, table, and old fryer the same night. Quiet, fast, professional.',
      author: 'Daniel R.',
      role: 'Restaurant Owner',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face'
    }
  ];

  faqs = [
    {
      question: 'What types of junk do you remove?',
      answer: 'We remove almost all non-hazardous residential and commercial items, including furniture, appliances, electronics, yard debris, construction waste, and estate cleanout materials.',
      open: false
    },
    {
      question: 'How does the pickup process work?',
      answer: 'Simply request a pickup online or by phone. We provide an upfront quote, confirm your preferred time slot, and our licensed crew arrives to handle all loading, hauling, and eco-disposal.',
      open: false
    },
    {
      question: 'Do I need to move items outside?',
      answer: 'No! Our full-service crew will retrieve items from inside your home, garage, attic, basement, or backyard so you never have to do any heavy lifting.',
      open: false
    },
    {
      question: 'How is pricing calculated?',
      answer: 'Pricing is primarily based on the volume of space your items take up in our collection trucks or dumpster rentals, with all labor, tax, and responsible disposal fees included.',
      open: false
    },
    {
      question: 'Do you offer same-day pickup?',
      answer: 'Yes! We offer same-day and next-day pickup options across our service areas for residential and commercial urgent cleanouts.',
      open: false
    }
  ];

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
