import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  values = [
    { title: 'Eco-First Philosophy', desc: 'Over 80% diversion rate targeting zero waste going to landfills through automated optical sorting and municipal composting.' },
    { title: 'Local Dedicated Fleet', desc: 'Our neighborhood routes are operated by community members who know your streets and schedule down to the minute.' },
    { title: 'Transparent Pricing', desc: 'No hidden environmental surcharges or surprise disposal fees. Everything is clearly quoted upfront with flexible terms.' },
    { title: 'Safety & Compliance', desc: 'Fully licensed, insured, and adhering strictly to federal EPA and state environmental quality directives.' }
  ];
}
