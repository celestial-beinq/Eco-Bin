import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {
  selectedCategory = signal<'all' | 'residential' | 'commercial' | 'recycling'>('all');

  servicesList = [
    {
      category: 'residential',
      id: 'residential',
      title: 'Residential Curbside Waste',
      price: 'Starting at $29/mo',
      desc: 'Weekly trash and yard waste service with complimentary rolling carts, dependable routes, and holiday pickup updates.',
      features: ['64 or 96-gallon wheeled cart', 'Weekly scheduled collection', 'Yard waste & branches included', 'Mobile app schedule alerts']
    },
    {
      category: 'commercial',
      id: 'commercial',
      title: 'Commercial Front-Load Dumpsters',
      price: 'Starting at $89/mo',
      desc: 'Tailored container sizes (2 to 8 yards) with scheduled 1x to 6x weekly service for restaurants, offices, retail, and hospitality.',
      features: ['2, 4, 6 & 8 yd steel dumpsters', 'Lid locks & bear-proof options', 'Custom pickup schedule', 'On-call extra empties']
    },
    {
      category: 'commercial',
      id: 'construction',
      title: 'Roll-Off Construction Dumpsters',
      price: 'Flat rate per haul',
      desc: 'Heavy-duty 10, 20, 30, and 40-yard roll-off bins delivered on-site for renovation projects, roofing, and construction contractors.',
      features: ['Same-day or next-day delivery', '7 to 14 day rental periods', 'Weight allowances included', 'LEED recycling documentation']
    },
    {
      category: 'recycling',
      id: 'recycling',
      title: 'Certified Eco-Recycling',
      price: 'Free with collection',
      desc: 'State-of-the-art optical single-stream sorting for corrugated cardboard, aluminum, mixed paper, and rigid plastics.',
      features: ['Single-stream convenience', 'Zero landfill diversion reporting', 'Electronic e-waste dropoff days', 'Battery & bulb safe disposal']
    },
    {
      category: 'residential',
      id: 'bulk',
      title: 'Bulk Furniture & Appliance Pickup',
      price: 'By item estimate',
      desc: 'Scheduled on-demand curbside pickup for old mattresses, couches, refrigerators, appliances, and large household items.',
      features: ['Two-man lifting crew', 'Freon recovery certified', 'Responsible recycling donation', 'Online photo instant quote']
    }
  ];

  setCategory(cat: 'all' | 'residential' | 'commercial' | 'recycling') {
    this.selectedCategory.set(cat);
  }

  get filteredServices() {
    const cat = this.selectedCategory();
    if (cat === 'all') return this.servicesList;
    return this.servicesList.filter(s => s.category === cat);
  }
}
