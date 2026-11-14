import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Metro Civic Cleanliness Initiative',
      client: 'City Metropolitan District',
      result: '99.2% on-time route completion across 45,000 households',
      desc: 'Implemented smart ultrasonic bin level monitoring and CNG low-emission collection trucks across 8 urban zones.',
      impact: '18,500 Tons diverted annually'
    },
    {
      title: 'Green Commercial Hub Zero-Waste Transition',
      client: 'Westside Logistics & Industrial Park',
      result: '74% reduction in landfill disposal in year 1',
      desc: 'Streamlined commercial cardboard baling, clean pallet recycling, and organic food waste collection for 60+ tenants.',
      impact: 'Zero contamination violations'
    },
    {
      title: 'Hospitality & Resort Composting Route',
      client: 'Bayside Hospitality Group',
      result: 'Daily scheduled organic waste separation',
      desc: 'Turned 12 tons of weekly kitchen food scraps into high-grade certified agricultural compost for local organic vineyards.',
      impact: '620 Tons food waste diverted'
    }
  ];
}
