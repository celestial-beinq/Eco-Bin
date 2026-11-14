import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

export interface HaulerCrewCard {
  id: string;
  name: string;
  crewLead?: string;
  verified?: boolean;
  rating?: number;
  tripsCount?: number;
  isNew?: boolean;
  badgeLabel?: string;
  depotLocation: string;
  distance: string;
  capacity: string;
  capacityLabel: string;
  saved: boolean;
  dispatched: boolean;
  statusText: string;
  statusType: 'available' | 'busy' | 'maintenance';
  avatar?: string;
  initials?: string;
  initialBg?: string;
}

export interface OperationHeaderInfo {
  title: string;
  category: string;
  status: string;
  fleetDispatched: string;
  dispatchedCount: string;
  estimatedTonnage: string;
  overflowAlerts: number;
  recoveryHubs: number;
  slaCompliance: string;
  startDate: string;
  targetDate: string;
  zoneLocation: string;
  manifestId: string;
  operationsLead: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  // Sidebar state
  sidebarOpen = signal<boolean>(true);
  activeSidebarItem = signal<string>('Active Routes');
  routesTreeExpanded = signal<boolean>(true);

  // Main & Sub Tabs
  activeMainTab = signal<'ROUTE DETAILS' | 'WASTE STREAMS' | 'SLA & COMPLIANCE'>('ROUTE DETAILS');
  activeSubTab = signal<'CREWS' | 'MANIFESTS' | 'WEIGHBRIDGE' | 'COMPACTORS' | 'BINS' | 'CERTIFICATES' | 'ESG AUDIT'>('CREWS');

  // Search & Filters
  searchQuery = signal<string>('');
  availableOnly = signal<boolean>(false);
  filterModalOpen = signal<boolean>(false);
  newRouteModalOpen = signal<boolean>(false);
  teamModalOpen = signal<boolean>(false);
  notificationsOpen = signal<boolean>(false);
  toastMessage = signal<string | null>(null);

  // Operation Details
  operationInfo = signal<OperationHeaderInfo>({
    title: 'Zone 4 Commercial Waste & Material Recovery - Victoria Island Central',
    category: 'Commercial Waste & Recovery',
    status: 'Active Route',
    fleetDispatched: 'Trucks 8 of 10 Dispatched',
    dispatchedCount: '8/10',
    estimatedTonnage: '42.5 T',
    overflowAlerts: 0,
    recoveryHubs: 4,
    slaCompliance: '98.4%',
    startDate: 'Nov 12, 2026',
    targetDate: 'Nov 19, 2026',
    zoneLocation: 'Adetokunbo Ademola St, Victoria Island, Lagos',
    manifestId: 'ECB-76431',
    operationsLead: 'Engr. Babatunde Alabi'
  });

  // Hauler Crew Cards for EcoBin Fleet & Operator Management
  crews = signal<HaulerCrewCard[]>([
    {
      id: 'cr-1',
      name: 'Al-Ameen Haulage Logistics',
      crewLead: 'Lead: S. Balogun',
      verified: true,
      rating: 4.8,
      tripsCount: 34,
      depotLocation: 'Ikeja Industrial Hub, Lagos',
      distance: '2.4 KM AWAY',
      capacity: '12.5 Tons',
      capacityLabel: 'COMPACTOR TRUCK CAPACITY',
      saved: false,
      dispatched: false,
      statusText: 'Available for Immediate Dispatch',
      statusType: 'available',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80'
    },
    {
      id: 'cr-2',
      name: 'EcoFleet Express Units',
      crewLead: 'Lead: T. Adeleke',
      initials: 'EF',
      initialBg: '#15803d',
      rating: 4.9,
      tripsCount: 52,
      depotLocation: 'Lekki Phase 1 Coastal Hub',
      distance: '4.1 KM AWAY',
      capacity: '8.0 Tons',
      capacityLabel: 'DUMP TRUCK CAPACITY',
      saved: false,
      dispatched: true,
      statusText: 'On Duty - En Route to Zone 4',
      statusType: 'busy'
    },
    {
      id: 'cr-3',
      name: 'Lagos Recyclers Cooperative',
      crewLead: 'Lead: K. Momoh',
      isNew: true,
      badgeLabel: 'Verified LGA Partner',
      depotLocation: 'Surulere Concourse Depot',
      distance: '1.8 KM AWAY',
      capacity: '15.0 Tons',
      capacityLabel: 'MULTI-STREAM CARRIER',
      saved: true,
      dispatched: false,
      statusText: 'Available for Immediate Dispatch',
      statusType: 'available',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80'
    },
    {
      id: 'cr-4',
      name: 'CleanPath Municipal Drivers',
      crewLead: 'Lead: E. Okafor',
      rating: 4.7,
      tripsCount: 28,
      depotLocation: 'Yaba Tech Corridor Hub',
      distance: '3.5 KM AWAY',
      capacity: '10.0 Tons',
      capacityLabel: 'COMPACTOR TRUCK CAPACITY',
      saved: false,
      dispatched: false,
      statusText: 'Available for Immediate Dispatch',
      statusType: 'available',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=140&q=80'
    },
    {
      id: 'cr-5',
      name: 'BioWaste Haulers Limited',
      crewLead: 'Lead: A. Sowore',
      isNew: true,
      badgeLabel: 'Organic Recovery Certified',
      depotLocation: 'Oregun Material Recovery Yard',
      distance: '5.2 KM AWAY',
      capacity: '6.5 Tons',
      capacityLabel: 'ORGANIC BIO TRUCK',
      saved: false,
      dispatched: false,
      statusText: 'Maintenance - Ready at 2:00 PM',
      statusType: 'maintenance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=140&q=80'
    },
    {
      id: 'cr-6',
      name: 'Apex Heavy Waste Fleet',
      crewLead: 'Lead: J. Danjuma',
      initials: 'AW',
      initialBg: '#0f2918',
      verified: true,
      rating: 4.6,
      tripsCount: 19,
      depotLocation: 'Victoria Island West Depot',
      distance: '1.2 KM AWAY',
      capacity: '14.0 Tons',
      capacityLabel: 'ROLL-OFF DUMPSTER TRUCK',
      saved: false,
      dispatched: false,
      statusText: 'Available for Immediate Dispatch',
      statusType: 'available'
    }
  ]);

  // Computed filtered list
  filteredCrews = computed(() => {
    let list = this.crews();
    const query = this.searchQuery().toLowerCase().trim();
    const availableOnly = this.availableOnly();

    if (availableOnly) {
      list = list.filter(c => c.statusType === 'available');
    }

    if (query) {
      list = list.filter(c => 
        c.name.toLowerCase().includes(query) ||
        (c.crewLead && c.crewLead.toLowerCase().includes(query)) ||
        c.depotLocation.toLowerCase().includes(query) ||
        c.capacity.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Action methods
  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  setSidebarItem(item: string): void {
    this.activeSidebarItem.set(item);
  }

  toggleRoutesTree(): void {
    this.routesTreeExpanded.update(v => !v);
  }

  setMainTab(tab: 'ROUTE DETAILS' | 'WASTE STREAMS' | 'SLA & COMPLIANCE'): void {
    this.activeMainTab.set(tab);
  }

  setSubTab(tab: 'CREWS' | 'MANIFESTS' | 'WEIGHBRIDGE' | 'COMPACTORS' | 'BINS' | 'CERTIFICATES' | 'ESG AUDIT'): void {
    this.activeSubTab.set(tab);
  }

  toggleAvailableOnly(): void {
    this.availableOnly.update(v => !v);
  }

  toggleSave(card: HaulerCrewCard): void {
    this.crews.update(prev => 
      prev.map(c => c.id === card.id ? { ...c, saved: !c.saved } : c)
    );
    this.triggerToast(card.saved ? `Removed ${card.name} from saved fleet` : `Saved ${card.name} to priority fleet roster`);
  }

  toggleDispatch(card: HaulerCrewCard): void {
    this.crews.update(prev => 
      prev.map(c => c.id === card.id ? { ...c, dispatched: !c.dispatched } : c)
    );
    this.triggerToast(card.dispatched ? `Recalled dispatch for ${card.name}` : `Route manifest dispatched to ${card.name}`);
  }

  triggerToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3500);
  }

  openNewRouteModal(): void {
    this.newRouteModalOpen.set(true);
  }

  closeNewRouteModal(): void {
    this.newRouteModalOpen.set(false);
  }

  openTeamModal(): void {
    this.teamModalOpen.set(true);
  }

  closeTeamModal(): void {
    this.teamModalOpen.set(false);
  }

  toggleNotifications(): void {
    this.notificationsOpen.update(v => !v);
  }

  openFilterModal(): void {
    this.filterModalOpen.set(true);
  }

  closeFilterModal(): void {
    this.filterModalOpen.set(false);
  }
}
