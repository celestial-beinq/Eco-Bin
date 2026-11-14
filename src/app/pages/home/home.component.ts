import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, HeroComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  services = [
    {
      icon: 'truck',
      title: 'Residential Collection',
      desc: 'Dependable weekly or bi-weekly curbside trash and yard waste pickup with durable roll-out carts provided.',
      tag: 'Weekly Route'
    },
    {
      icon: 'archive',
      title: 'Commercial Dumpsters',
      desc: 'Flexible dumpster sizes ranging from 2 to 8 cubic yards, customized for restaurants, retail, and offices.',
      tag: 'Custom Schedule'
    },
    {
      icon: 'refresh-cw',
      title: 'Eco-Sorting & Recycling',
      desc: 'Single-stream recycling programs keeping valuable paper, plastics, and metals away from regional landfills.',
      tag: 'Zero-Waste'
    },
    {
      icon: 'tool',
      title: 'Roll-Off Construction Bins',
      desc: 'Heavy-duty 10 to 40 yard roll-off containers for renovation debris, roofing materials, and demolition.',
      tag: 'On-Demand'
    }
  ];

  stats = [
    { number: '98%', label: 'On-Time Scheduled Pickups' },
    { number: '24/7', label: 'Local Dispatch Support' },
    { number: '45k+', label: 'Tons Recycled Annually' },
    { number: '12+', label: 'Years Serving Communities' }
  ];
}
