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
  vehicleType: string;
  truckId: string;
  saved: boolean;
  dispatched: boolean;
  statusText: string;
  statusType: 'available' | 'busy' | 'maintenance';
  avatar?: string;
  initials?: string;
  initialBg?: string;
}

export interface ManifestRecord {
  id: string;
  zone: string;
  wasteType: string;
  tonnage: string;
  assignedCrew: string;
  truckNumber: string;
  status: 'In Progress' | 'Dispatched' | 'Completed' | 'Pending';
  time: string;
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

export interface CustomerAccount {
  id: string;
  accountNumber: string;
  name: string;
  category: 'Commercial' | 'Residential' | 'Industrial' | 'Recycling Partner';
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  lga: string;
  servicePlan: string;
  pickupFrequency: string;
  binAllocation: string;
  monthlyTonnage: string;
  esgTier: 'Platinum ESG' | 'Gold Partner' | 'Green Verified' | 'Silver Eco';
  status: 'Active' | 'Scheduled' | 'Pending Review' | 'Suspended';
  avatar?: string;
  initials: string;
  initialBg: string;
  lastPickupDate: string;
  nextPickupDate: string;
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
  mobileSidebarOpen = signal<boolean>(false);
  activeSidebarItem = signal<string>('Active Routes');
  routesTreeExpanded = signal<boolean>(true);

  // View format toggle: 'table' or 'grid' (defaults to 'table')
  viewMode = signal<'table' | 'grid'>('table');

  // Main & Sub Tabs
  activeMainTab = signal<'ROUTE DETAILS' | 'WASTE STREAMS' | 'SLA & COMPLIANCE'>('ROUTE DETAILS');
  activeSubTab = signal<'CREWS' | 'MANIFESTS' | 'CUSTOMERS' | 'WEIGHBRIDGE' | 'COMPACTORS' | 'BINS' | 'CERTIFICATES' | 'ESG AUDIT'>('CREWS');

  // Customer Management Signals
  customerSearchQuery = signal<string>('');
  customerCategoryFilter = signal<string>('All');
  customerStatusFilter = signal<string>('All');
  newCustomerModalOpen = signal<boolean>(false);
  customerDetailsModalOpen = signal<boolean>(false);
  selectedCustomer = signal<CustomerAccount | null>(null);

  newCustomerForm = {
    name: '',
    category: 'Commercial' as 'Commercial' | 'Residential' | 'Industrial' | 'Recycling Partner',
    contactPerson: '',
    phone: '',
    email: '',
    lga: 'Eti-Osa (Victoria Island / Lekki)',
    address: '',
    servicePlan: 'Commercial Waste & Recovery',
    pickupFrequency: 'Daily (Morning)',
    binAllocation: '4x 1,100L Heavy-duty Bins',
    monthlyTonnage: '12.0 T / mo',
    esgTier: 'Gold Partner' as 'Platinum ESG' | 'Gold Partner' | 'Green Verified' | 'Silver Eco'
  };

  customers = signal<CustomerAccount[]>([
    {
      id: 'cst-1',
      accountNumber: 'ECB-CST-1011',
      name: 'Eko Hotels & Suites',
      category: 'Commercial',
      contactPerson: 'Femi Adeleke (Facilities Director)',
      phone: '+234 803 456 7890',
      email: 'facilities@ekohotels.com',
      address: 'Plot 1415 Adetokunbo Ademola St',
      lga: 'Eti-Osa (Victoria Island)',
      servicePlan: 'Commercial Waste & Food Scraps',
      pickupFrequency: 'Daily (Morning & Evening)',
      binAllocation: '6x 1,100L Heavy-duty Bins',
      monthlyTonnage: '18.4 T / mo',
      esgTier: 'Platinum ESG',
      status: 'Active',
      initials: 'EH',
      initialBg: '#059669',
      lastPickupDate: 'Today, 06:30 AM',
      nextPickupDate: 'Tomorrow, 06:00 AM'
    },
    {
      id: 'cst-2',
      accountNumber: 'ECB-CST-1012',
      name: 'Landmark Centre & Beach Village',
      category: 'Commercial',
      contactPerson: 'Chioma Nwosu (Operations Manager)',
      phone: '+234 812 345 6789',
      email: 'operations@landmarklagos.com',
      address: 'Water Corporation Drive, Victoria Island',
      lga: 'Eti-Osa (Victoria Island)',
      servicePlan: 'Event & Hospitality Waste Recovery',
      pickupFrequency: 'Daily & On-Demand Events',
      binAllocation: '8x 1,100L Bins + 2x Compactors',
      monthlyTonnage: '24.2 T / mo',
      esgTier: 'Platinum ESG',
      status: 'Scheduled',
      initials: 'LM',
      initialBg: '#2563eb',
      lastPickupDate: 'Yesterday, 18:00',
      nextPickupDate: 'Today, 21:00'
    },
    {
      id: 'cst-3',
      accountNumber: 'ECB-CST-1013',
      name: '1004 Housing Estate Community',
      category: 'Residential',
      contactPerson: 'Engr. Rasheed Bakare (Residents Association)',
      phone: '+234 802 987 6543',
      email: 'association@1004estate.ng',
      address: 'Victoria Island High-Rise Blocks A-E',
      lga: 'Eti-Osa (Victoria Island)',
      servicePlan: 'Multi-Tenant Residential Stream',
      pickupFrequency: '3x / Week (Mon, Wed, Sat)',
      binAllocation: '24x 660L Curbside Bins',
      monthlyTonnage: '31.5 T / mo',
      esgTier: 'Gold Partner',
      status: 'Active',
      initials: '10',
      initialBg: '#15803d',
      lastPickupDate: 'Nov 13, 08:00 AM',
      nextPickupDate: 'Nov 16, 07:30 AM'
    },
    {
      id: 'cst-4',
      accountNumber: 'ECB-CST-1014',
      name: 'Ikeja City Mall (Shoprite / Food Court)',
      category: 'Commercial',
      contactPerson: 'Tunde Olawale (Site Admin)',
      phone: '+234 805 112 2334',
      email: 'admin@ikejacitymall.com',
      address: 'Obafemi Awolowo Way, Alausa, Ikeja',
      lga: 'Ikeja',
      servicePlan: 'Retail Packaging & Mixed Recyclables',
      pickupFrequency: 'Daily (Night Shift)',
      binAllocation: '4x 1,100L + Cardboard Baler',
      monthlyTonnage: '22.8 T / mo',
      esgTier: 'Platinum ESG',
      status: 'Active',
      initials: 'IC',
      initialBg: '#d97706',
      lastPickupDate: 'Today, 05:00 AM',
      nextPickupDate: 'Tomorrow, 04:30 AM'
    },
    {
      id: 'cst-5',
      accountNumber: 'ECB-CST-1015',
      name: 'Parkview Estate Residents Management',
      category: 'Residential',
      contactPerson: 'Mrs. Funke Solanke (Estate Secretary)',
      phone: '+234 809 887 7665',
      email: 'office@parkview-ikoyi.org',
      address: 'Parkview Avenue, Ikoyi',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      servicePlan: 'Eco-Sorted Curbside & Organic Compost',
      pickupFrequency: '2x / Week (Tue, Fri)',
      binAllocation: '18x 240L Smart Color Bins',
      monthlyTonnage: '12.6 T / mo',
      esgTier: 'Green Verified',
      status: 'Active',
      initials: 'PV',
      initialBg: '#0d9488',
      lastPickupDate: 'Nov 12, 10:00 AM',
      nextPickupDate: 'Nov 15, 09:00 AM'
    },
    {
      id: 'cst-6',
      accountNumber: 'ECB-CST-1016',
      name: 'Seven-Up Bottling Co. Industrial Facility',
      category: 'Industrial',
      contactPerson: 'Alhaji Musa Danjuma (Safety Manager)',
      phone: '+234 818 776 5544',
      email: 'safety@7uplagos.com',
      address: 'Mobolaji Johnson Ave, Oregun Industrial Estate',
      lga: 'Ikeja',
      servicePlan: 'Industrial PET & Glass Recovery',
      pickupFrequency: 'Weekly Bulk Dumpster Haul',
      binAllocation: '3x 15-Ton Roll-off Skips',
      monthlyTonnage: '48.0 T / mo',
      esgTier: 'Platinum ESG',
      status: 'Active',
      initials: '7U',
      initialBg: '#b91c1c',
      lastPickupDate: 'Nov 10, 14:00',
      nextPickupDate: 'Nov 17, 11:00 AM'
    },
    {
      id: 'cst-7',
      accountNumber: 'ECB-CST-1017',
      name: 'Lekki Conservation Centre Visitor Complex',
      category: 'Recycling Partner',
      contactPerson: 'David Okonkwo (Park Warden)',
      phone: '+234 806 332 2110',
      email: 'greenteam@lekkiconservation.org',
      address: 'Km 19 Lekki-Epe Expressway',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      servicePlan: 'Zero-Plastic Education & Composting',
      pickupFrequency: 'Bi-weekly Green Stream',
      binAllocation: '10x Solar Smart Compacting Bins',
      monthlyTonnage: '6.4 T / mo',
      esgTier: 'Platinum ESG',
      status: 'Active',
      initials: 'LC',
      initialBg: '#16a34a',
      lastPickupDate: 'Nov 11, 09:15 AM',
      nextPickupDate: 'Nov 18, 09:15 AM'
    },
    {
      id: 'cst-8',
      accountNumber: 'ECB-CST-1018',
      name: 'Radisson Blu Anchorage Hotel',
      category: 'Commercial',
      contactPerson: 'Kareem Olatunji (Procurement Lead)',
      phone: '+234 813 555 4433',
      email: 'procurement@radissonblu-vi.com',
      address: '1A Ozumba Mbadiwe Ave, Victoria Island',
      lga: 'Eti-Osa (Victoria Island)',
      servicePlan: 'Commercial Glass & Organic Waste',
      pickupFrequency: 'Daily Routine',
      binAllocation: '5x 1,100L Waste Enclosures',
      monthlyTonnage: '16.2 T / mo',
      esgTier: 'Gold Partner',
      status: 'Pending Review',
      initials: 'RB',
      initialBg: '#4f46e5',
      lastPickupDate: 'Nov 13, 07:00 AM',
      nextPickupDate: 'Today, 22:00'
    }
  ]);

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

  // Hauler Crew Cards for EcoBin Fleet
  crews = signal<HaulerCrewCard[]>([
    {
      id: 'cr-1',
      name: 'Al-Ameen Haulage Logistics',
      crewLead: 'S. Balogun',
      verified: true,
      rating: 4.8,
      tripsCount: 34,
      depotLocation: 'Ikeja Industrial Hub, Lagos',
      distance: '2.4 KM AWAY',
      capacity: '12.5 Tons',
      capacityLabel: 'Compactor Truck',
      vehicleType: 'Compactor #08',
      truckId: 'IKJ-892-LG',
      saved: false,
      dispatched: false,
      statusText: 'Available for Immediate Dispatch',
      statusType: 'available',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'cr-2',
      name: 'EcoFleet Express Units',
      crewLead: 'T. Adeleke',
      initials: 'EF',
      initialBg: '#15803d',
      rating: 4.9,
      tripsCount: 52,
      depotLocation: 'Lekki Phase 1 Coastal Hub',
      distance: '4.1 KM AWAY',
      capacity: '8.0 Tons',
      capacityLabel: 'Dump Truck',
      vehicleType: 'Tipper #04',
      truckId: 'LKK-401-VI',
      saved: false,
      dispatched: true,
      statusText: 'On Duty - En Route to Zone 4',
      statusType: 'busy'
    },
    {
      id: 'cr-3',
      name: 'Lagos Recyclers Cooperative',
      crewLead: 'K. Momoh',
      isNew: true,
      badgeLabel: 'Verified LGA Partner',
      depotLocation: 'Surulere Concourse Depot',
      distance: '1.8 KM AWAY',
      capacity: '15.0 Tons',
      capacityLabel: 'Multi-stream Carrier',
      vehicleType: 'Carrier #12',
      truckId: 'SRL-119-CO',
      saved: true,
      dispatched: false,
      statusText: 'Available for Immediate Dispatch',
      statusType: 'available',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'cr-4',
      name: 'CleanPath Municipal Drivers',
      crewLead: 'E. Okafor',
      rating: 4.7,
      tripsCount: 28,
      depotLocation: 'Yaba Tech Corridor Hub',
      distance: '3.5 KM AWAY',
      capacity: '10.0 Tons',
      capacityLabel: 'Compactor Truck',
      vehicleType: 'Compactor #15',
      truckId: 'YAB-552-MN',
      saved: false,
      dispatched: false,
      statusText: 'Available for Immediate Dispatch',
      statusType: 'available',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'cr-5',
      name: 'BioWaste Haulers Limited',
      crewLead: 'A. Sowore',
      isNew: true,
      badgeLabel: 'Organic Recovery Certified',
      depotLocation: 'Oregun Material Recovery Yard',
      distance: '5.2 KM AWAY',
      capacity: '6.5 Tons',
      capacityLabel: 'Organic Bio Truck',
      vehicleType: 'BioCarrier #02',
      truckId: 'ORG-771-BG',
      saved: false,
      dispatched: false,
      statusText: 'Maintenance - Ready at 2:00 PM',
      statusType: 'maintenance',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80'
    },
    {
      id: 'cr-6',
      name: 'Apex Heavy Waste Fleet',
      crewLead: 'J. Danjuma',
      initials: 'AW',
      initialBg: '#0f2918',
      verified: true,
      rating: 4.6,
      tripsCount: 19,
      depotLocation: 'Victoria Island West Depot',
      distance: '1.2 KM AWAY',
      capacity: '14.0 Tons',
      capacityLabel: 'Roll-Off Dumpster Truck',
      vehicleType: 'RollOff #09',
      truckId: 'VIS-902-AP',
      saved: false,
      dispatched: false,
      statusText: 'Available for Immediate Dispatch',
      statusType: 'available'
    }
  ]);

  // Manifests for table view
  manifests = signal<ManifestRecord[]>([
    { id: 'MNF-801', zone: 'VI Central - Adeola Odeku', wasteType: 'Cardboard & Paper', tonnage: '4.2 T', assignedCrew: 'Al-Ameen Haulage', truckNumber: 'IKJ-892-LG', status: 'In Progress', time: '08:30 AM' },
    { id: 'MNF-802', zone: 'VI North - Saka Tinubu', wasteType: 'PET & Rigid Plastics', tonnage: '2.8 T', assignedCrew: 'EcoFleet Express', truckNumber: 'LKK-401-VI', status: 'Dispatched', time: '09:15 AM' },
    { id: 'MNF-803', zone: 'Lekki Coastal Gateway', wasteType: 'Mixed Commercial', tonnage: '6.5 T', assignedCrew: 'CleanPath Municipal', truckNumber: 'YAB-552-MN', status: 'Completed', time: '07:45 AM' },
    { id: 'MNF-804', zone: 'Victoria Island Hotel Hub', wasteType: 'Organic Produce', tonnage: '3.1 T', assignedCrew: 'BioWaste Haulers', truckNumber: 'ORG-771-BG', status: 'Pending', time: '10:00 AM' },
    { id: 'MNF-805', zone: 'Eti-Osa Recycling Yard', wasteType: 'Scrap Metals', tonnage: '8.4 T', assignedCrew: 'Apex Heavy Fleet', truckNumber: 'VIS-902-AP', status: 'Completed', time: '06:30 AM' }
  ]);

  // Computed filtered list for Crews
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
        c.capacity.toLowerCase().includes(query) ||
        c.vehicleType.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Computed filtered list for Customers
  filteredCustomers = computed(() => {
    let list = this.customers();
    const query = this.customerSearchQuery().toLowerCase().trim();
    const category = this.customerCategoryFilter();
    const status = this.customerStatusFilter();

    if (category !== 'All') {
      list = list.filter(c => c.category === category);
    }

    if (status !== 'All') {
      list = list.filter(c => c.status === status);
    }

    if (query) {
      list = list.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.accountNumber.toLowerCase().includes(query) ||
        c.contactPerson.toLowerCase().includes(query) ||
        c.address.toLowerCase().includes(query) ||
        c.lga.toLowerCase().includes(query) ||
        c.phone.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query) ||
        c.servicePlan.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Action methods
  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  toggleMobileSidebar(): void {
    this.mobileSidebarOpen.update(v => !v);
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen.set(false);
  }

  setSidebarItem(item: string): void {
    this.activeSidebarItem.set(item);
    if (item === 'Customers') {
      this.activeSubTab.set('CUSTOMERS');
    } else if (this.activeSubTab() === 'CUSTOMERS') {
      this.activeSubTab.set('CREWS');
    }
    this.closeMobileSidebar();
  }

  toggleRoutesTree(): void {
    this.routesTreeExpanded.update(v => !v);
  }

  setViewMode(mode: 'table' | 'grid'): void {
    this.viewMode.set(mode);
  }

  setMainTab(tab: 'ROUTE DETAILS' | 'WASTE STREAMS' | 'SLA & COMPLIANCE'): void {
    this.activeMainTab.set(tab);
  }

  setSubTab(tab: 'CREWS' | 'MANIFESTS' | 'CUSTOMERS' | 'WEIGHBRIDGE' | 'COMPACTORS' | 'BINS' | 'CERTIFICATES' | 'ESG AUDIT'): void {
    this.activeSubTab.set(tab);
    if (tab === 'CUSTOMERS') {
      this.activeSidebarItem.set('Customers');
    } else if (this.activeSidebarItem() === 'Customers') {
      this.activeSidebarItem.set('Active Routes');
    }
  }

  // Customer Management Handlers
  setCustomerCategoryFilter(category: string): void {
    this.customerCategoryFilter.set(category);
  }

  setCustomerStatusFilter(status: string): void {
    this.customerStatusFilter.set(status);
  }

  openNewCustomerModal(): void {
    this.newCustomerModalOpen.set(true);
  }

  closeNewCustomerModal(): void {
    this.newCustomerModalOpen.set(false);
  }

  submitNewCustomer(): void {
    if (!this.newCustomerForm.name.trim()) {
      this.triggerToast('Please provide a customer or organization name.');
      return;
    }

    const initials = this.newCustomerForm.name
      .split(' ')
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase() || '')
      .join('');

    const newCustomer: CustomerAccount = {
      id: `cst-${Date.now()}`,
      accountNumber: `ECB-CST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: this.newCustomerForm.name.trim(),
      category: this.newCustomerForm.category,
      contactPerson: this.newCustomerForm.contactPerson || 'General Admin',
      phone: this.newCustomerForm.phone || '+234 800 000 0000',
      email: this.newCustomerForm.email || 'contact@client.ng',
      address: this.newCustomerForm.address || 'Lagos, Nigeria',
      lga: this.newCustomerForm.lga,
      servicePlan: this.newCustomerForm.servicePlan,
      pickupFrequency: this.newCustomerForm.pickupFrequency,
      binAllocation: this.newCustomerForm.binAllocation,
      monthlyTonnage: this.newCustomerForm.monthlyTonnage,
      esgTier: this.newCustomerForm.esgTier,
      status: 'Active',
      initials: initials || 'EC',
      initialBg: '#16a34a',
      lastPickupDate: 'Just registered',
      nextPickupDate: 'Scheduled next cycle'
    };

    this.customers.update(prev => [newCustomer, ...prev]);
    this.triggerToast(`Customer "${newCustomer.name}" registered successfully.`);
    this.closeNewCustomerModal();

    // Reset form
    this.newCustomerForm.name = '';
    this.newCustomerForm.contactPerson = '';
    this.newCustomerForm.phone = '';
    this.newCustomerForm.email = '';
    this.newCustomerForm.address = '';
  }

  viewCustomerDetails(customer: CustomerAccount): void {
    this.selectedCustomer.set(customer);
    this.customerDetailsModalOpen.set(true);
  }

  closeCustomerDetailsModal(): void {
    this.customerDetailsModalOpen.set(false);
    this.selectedCustomer.set(null);
  }

  scheduleExtraPickup(customer: CustomerAccount): void {
    this.triggerToast(`On-demand pickup dispatched for ${customer.name}. Hauler notified.`);
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
