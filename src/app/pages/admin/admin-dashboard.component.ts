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

export interface TransactionRecord {
  id: string;
  reference: string;
  customerName: string;
  accountNumber: string;
  serviceType: string;
  amount: number;
  formattedAmount: string;
  date: string;
  time: string;
  paymentMethod: 'Bank Transfer' | 'Corporate Invoicing' | 'Card' | 'Direct Debit';
  status: 'Completed' | 'Pending' | 'Processing';
  invoiceId: string;
}

export interface CollectionRequestRecord {
  id: string;
  requestCode: string;
  customerName: string;
  accountNumber: string;
  location: string;
  lga: string;
  wasteType: string;
  volume: string;
  priority: 'Urgent' | 'High' | 'Normal' | 'Scheduled';
  scheduledDate: string;
  status: 'Pending' | 'Dispatched' | 'In Progress' | 'Completed';
  assignedCrew?: string;
  truckId?: string;
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
  activeSidebarItem = signal<string>('Dashboard Overview');
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
    },
    {
      id: 'cst-9',
      accountNumber: 'ECB-CST-1019',
      name: 'Victoria Garden City Residents Association',
      category: 'Residential',
      contactPerson: 'Chief Olatunbosun (Estate Admin)',
      phone: '+234 802 111 2233',
      email: 'admin@vgc-lagos.org',
      address: 'Km 22 Lekki-Epe Expressway, VGC',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      servicePlan: 'Gated Estate Comprehensive Curbside',
      pickupFrequency: '3x / Week (Mon, Wed, Fri)',
      binAllocation: '35x 660L Curbside Bins',
      monthlyTonnage: '42.0 T / mo',
      esgTier: 'Platinum ESG',
      status: 'Active',
      initials: 'VG',
      initialBg: '#047857',
      lastPickupDate: 'Nov 14, 06:00 AM',
      nextPickupDate: 'Nov 16, 06:00 AM'
    },
    {
      id: 'cst-10',
      accountNumber: 'ECB-CST-1020',
      name: 'Maryland Mall Commercial Hub',
      category: 'Commercial',
      contactPerson: 'Bimpe Adebayo (Facilities Lead)',
      phone: '+234 811 444 7788',
      email: 'facilities@marylandmall.ng',
      address: '350 Ikorodu Road, Anthony Village',
      lga: 'Ikeja',
      servicePlan: 'Retail Packaging & Food Court Waste',
      pickupFrequency: 'Daily (Night Shift)',
      binAllocation: '6x 1,100L Heavy-duty Bins',
      monthlyTonnage: '19.5 T / mo',
      esgTier: 'Gold Partner',
      status: 'Active',
      initials: 'MM',
      initialBg: '#7c3aed',
      lastPickupDate: 'Today, 04:00 AM',
      nextPickupDate: 'Tomorrow, 04:00 AM'
    },
    {
      id: 'cst-11',
      accountNumber: 'ECB-CST-1021',
      name: 'Dangote Industrial Logistics Hub',
      category: 'Industrial',
      contactPerson: 'Engr. Haruna Bello (Site Safety)',
      phone: '+234 815 666 9900',
      email: 'safety.lekki@dangotegroup.com',
      address: 'Lekki Free Trade Zone, Ibeju-Lekki',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      servicePlan: 'Heavy Industrial Scrap & Corrugated',
      pickupFrequency: 'Weekly Bulk Roll-off Haul',
      binAllocation: '5x 20-Ton Industrial Skips',
      monthlyTonnage: '64.0 T / mo',
      esgTier: 'Platinum ESG',
      status: 'Active',
      initials: 'DG',
      initialBg: '#1e3a8a',
      lastPickupDate: 'Nov 10, 15:30',
      nextPickupDate: 'Nov 17, 10:00 AM'
    },
    {
      id: 'cst-12',
      accountNumber: 'ECB-CST-1022',
      name: 'Federal Medical Centre Ebute Metta',
      category: 'Commercial',
      contactPerson: 'Dr. (Mrs) Kemi Davies (Waste Safety)',
      phone: '+234 803 777 8899',
      email: 'safety@fmc-eb.gov.ng',
      address: 'Railway Compound, Ebute Metta',
      lga: 'Surulere / Mainland',
      servicePlan: 'Regulated Medical & Bio-Waste Stream',
      pickupFrequency: 'Daily Specialized Transfer',
      binAllocation: '8x Biohazard Lockable Enclosures',
      monthlyTonnage: '14.5 T / mo',
      esgTier: 'Green Verified',
      status: 'Active',
      initials: 'FM',
      initialBg: '#dc2626',
      lastPickupDate: 'Today, 08:00 AM',
      nextPickupDate: 'Tomorrow, 08:00 AM'
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

  // Table Tabs & Pagination State
  activeTableTab = signal<'transactions' | 'customers' | 'requests' | 'crews'>('transactions');
  currentPage = signal<number>(1);
  pageSize = signal<number>(5);
  tableSearchQuery = signal<string>('');
  tableStatusFilter = signal<string>('All');

  // Transactions Dataset (Recent Waste Operations Billing & Payments)
  transactions = signal<TransactionRecord[]>([
    {
      id: 'txn-1',
      reference: 'TXN-8841',
      customerName: 'Eko Hotels & Suites',
      accountNumber: 'ECB-CST-1011',
      serviceType: 'Commercial Food Scraps & Recovery',
      amount: 480000,
      formattedAmount: '₦480,000',
      date: 'Nov 14, 2026',
      time: '09:30 AM',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      invoiceId: 'INV-2026-0841'
    },
    {
      id: 'txn-2',
      reference: 'TXN-8840',
      customerName: 'Landmark Centre & Beach Village',
      accountNumber: 'ECB-CST-1012',
      serviceType: 'Event Waste Roll-Off Compactor Haul',
      amount: 650000,
      formattedAmount: '₦650,000',
      date: 'Nov 14, 2026',
      time: '08:15 AM',
      paymentMethod: 'Corporate Invoicing',
      status: 'Completed',
      invoiceId: 'INV-2026-0840'
    },
    {
      id: 'txn-3',
      reference: 'TXN-8839',
      customerName: '1004 Housing Estate Community',
      accountNumber: 'ECB-CST-1013',
      serviceType: 'Monthly Residential Curbside Pickup',
      amount: 820000,
      formattedAmount: '₦820,000',
      date: 'Nov 13, 2026',
      time: '16:45',
      paymentMethod: 'Direct Debit',
      status: 'Completed',
      invoiceId: 'INV-2026-0839'
    },
    {
      id: 'txn-4',
      reference: 'TXN-8838',
      customerName: 'Ikeja City Mall',
      accountNumber: 'ECB-CST-1014',
      serviceType: 'Retail Packaging & Baler Stream',
      amount: 540000,
      formattedAmount: '₦540,000',
      date: 'Nov 13, 2026',
      time: '14:20',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      invoiceId: 'INV-2026-0838'
    },
    {
      id: 'txn-5',
      reference: 'TXN-8837',
      customerName: 'Seven-Up Bottling Co.',
      accountNumber: 'ECB-CST-1016',
      serviceType: 'Bulk PET & Industrial Glass Haul',
      amount: 1250000,
      formattedAmount: '₦1,250,000',
      date: 'Nov 13, 2026',
      time: '11:00 AM',
      paymentMethod: 'Corporate Invoicing',
      status: 'Pending',
      invoiceId: 'INV-2026-0837'
    },
    {
      id: 'txn-6',
      reference: 'TXN-8836',
      customerName: 'Parkview Estate Residents',
      accountNumber: 'ECB-CST-1015',
      serviceType: 'Eco-Sorted Curbside Organic Fee',
      amount: 380000,
      formattedAmount: '₦380,000',
      date: 'Nov 12, 2026',
      time: '10:15 AM',
      paymentMethod: 'Card',
      status: 'Completed',
      invoiceId: 'INV-2026-0836'
    },
    {
      id: 'txn-7',
      reference: 'TXN-8835',
      customerName: 'Lekki Conservation Centre',
      accountNumber: 'ECB-CST-1017',
      serviceType: 'Solar Smart Bin Recycling Subsidy',
      amount: 175000,
      formattedAmount: '₦175,000',
      date: 'Nov 12, 2026',
      time: '09:00 AM',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      invoiceId: 'INV-2026-0835'
    },
    {
      id: 'txn-8',
      reference: 'TXN-8834',
      customerName: 'Radisson Blu Anchorage Hotel',
      accountNumber: 'ECB-CST-1018',
      serviceType: 'Hazardous & Kitchen Waste Evacuation',
      amount: 420000,
      formattedAmount: '₦420,000',
      date: 'Nov 11, 2026',
      time: '15:30',
      paymentMethod: 'Corporate Invoicing',
      status: 'Processing',
      invoiceId: 'INV-2026-0834'
    },
    {
      id: 'txn-9',
      reference: 'TXN-8833',
      customerName: 'Victoria Garden City Residents',
      accountNumber: 'ECB-CST-1019',
      serviceType: 'Comprehensive Curbside Waste Levy',
      amount: 960000,
      formattedAmount: '₦960,000',
      date: 'Nov 11, 2026',
      time: '13:00',
      paymentMethod: 'Direct Debit',
      status: 'Completed',
      invoiceId: 'INV-2026-0833'
    },
    {
      id: 'txn-10',
      reference: 'TXN-8832',
      customerName: 'Maryland Mall Commercial Hub',
      accountNumber: 'ECB-CST-1020',
      serviceType: 'Food Court Organic Waste Evacuation',
      amount: 290000,
      formattedAmount: '₦290,000',
      date: 'Nov 10, 2026',
      time: '17:15',
      paymentMethod: 'Card',
      status: 'Completed',
      invoiceId: 'INV-2026-0832'
    },
    {
      id: 'txn-11',
      reference: 'TXN-8831',
      customerName: 'Dangote Industrial Logistics Hub',
      accountNumber: 'ECB-CST-1021',
      serviceType: 'Industrial Heavy Scrap Metal Haul',
      amount: 1850000,
      formattedAmount: '₦1,850,000',
      date: 'Nov 10, 2026',
      time: '11:45 AM',
      paymentMethod: 'Corporate Invoicing',
      status: 'Completed',
      invoiceId: 'INV-2026-0831'
    },
    {
      id: 'txn-12',
      reference: 'TXN-8830',
      customerName: 'Federal Medical Centre Ebute Metta',
      accountNumber: 'ECB-CST-1022',
      serviceType: 'Regulated Medical Bio-Waste Incineration',
      amount: 750000,
      formattedAmount: '₦750,000',
      date: 'Nov 09, 2026',
      time: '14:10',
      paymentMethod: 'Corporate Invoicing',
      status: 'Pending',
      invoiceId: 'INV-2026-0830'
    },
    {
      id: 'txn-13',
      reference: 'TXN-8829',
      customerName: 'Palms Shopping Mall Lekki',
      accountNumber: 'ECB-CST-1023',
      serviceType: 'Tenant Mixed Waste Compactor Evacuation',
      amount: 620000,
      formattedAmount: '₦620,000',
      date: 'Nov 09, 2026',
      time: '08:45 AM',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      invoiceId: 'INV-2026-0829'
    },
    {
      id: 'txn-14',
      reference: 'TXN-8828',
      customerName: 'Nestle Distribution Warehouse',
      accountNumber: 'ECB-CST-1024',
      serviceType: 'Corrugated Paperboard Baler Transfer',
      amount: 510000,
      formattedAmount: '₦510,000',
      date: 'Nov 08, 2026',
      time: '16:00',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      invoiceId: 'INV-2026-0828'
    },
    {
      id: 'txn-15',
      reference: 'TXN-8827',
      customerName: 'Genesis Deluxe Cinemas',
      accountNumber: 'ECB-CST-1025',
      serviceType: 'Concession Packaging & Plastics Clear-out',
      amount: 195000,
      formattedAmount: '₦195,000',
      date: 'Nov 08, 2026',
      time: '10:30 AM',
      paymentMethod: 'Card',
      status: 'Completed',
      invoiceId: 'INV-2026-0827'
    }
  ]);

  // Collection Requests Dataset
  collectionRequests = signal<CollectionRequestRecord[]>([
    {
      id: 'req-1',
      requestCode: 'REQ-3041',
      customerName: 'Eko Hotels & Suites',
      accountNumber: 'ECB-CST-1011',
      location: 'Plot 1415 Adetokunbo Ademola St',
      lga: 'Eti-Osa (Victoria Island)',
      wasteType: 'Cardboard & Paper Baler',
      volume: '4.5 Tons',
      priority: 'Urgent',
      scheduledDate: 'Today, 02:00 PM',
      status: 'In Progress',
      assignedCrew: 'Al-Ameen Haulage',
      truckId: 'IKJ-892-LG'
    },
    {
      id: 'req-2',
      requestCode: 'REQ-3042',
      customerName: 'Landmark Centre & Beach Village',
      accountNumber: 'ECB-CST-1012',
      location: 'Water Corporation Drive',
      lga: 'Eti-Osa (Victoria Island)',
      wasteType: 'Event Mixed Waste Roll-Off',
      volume: '8.0 Tons',
      priority: 'High',
      scheduledDate: 'Today, 04:30 PM',
      status: 'Dispatched',
      assignedCrew: 'EcoFleet Express',
      truckId: 'LKK-401-VI'
    },
    {
      id: 'req-3',
      requestCode: 'REQ-3043',
      customerName: '1004 Housing Estate Community',
      accountNumber: 'ECB-CST-1013',
      location: 'VI High-Rise Blocks A-E',
      lga: 'Eti-Osa (Victoria Island)',
      wasteType: 'Curbside Residential Bins',
      volume: '12.0 Tons',
      priority: 'Scheduled',
      scheduledDate: 'Tomorrow, 06:30 AM',
      status: 'Pending',
      assignedCrew: 'Unassigned'
    },
    {
      id: 'req-4',
      requestCode: 'REQ-3044',
      customerName: 'Ikeja City Mall',
      accountNumber: 'ECB-CST-1014',
      location: 'Obafemi Awolowo Way, Alausa',
      lga: 'Ikeja',
      wasteType: 'Retail Corrugated Packaging',
      volume: '6.2 Tons',
      priority: 'High',
      scheduledDate: 'Today, 07:00 PM',
      status: 'Dispatched',
      assignedCrew: 'CleanPath Municipal',
      truckId: 'YAB-552-MN'
    },
    {
      id: 'req-5',
      requestCode: 'REQ-3045',
      customerName: 'Seven-Up Bottling Co.',
      accountNumber: 'ECB-CST-1016',
      location: 'Mobolaji Johnson Ave, Oregun',
      lga: 'Ikeja',
      wasteType: 'Industrial PET Scrap Bottles',
      volume: '15.0 Tons',
      priority: 'Urgent',
      scheduledDate: 'Tomorrow, 09:00 AM',
      status: 'Pending',
      assignedCrew: 'Unassigned'
    },
    {
      id: 'req-6',
      requestCode: 'REQ-3046',
      customerName: 'Radisson Blu Anchorage Hotel',
      accountNumber: 'ECB-CST-1018',
      location: '1A Ozumba Mbadiwe Ave',
      lga: 'Eti-Osa (Victoria Island)',
      wasteType: 'Kitchen Organic Compost',
      volume: '3.2 Tons',
      priority: 'Normal',
      scheduledDate: 'Today, 01:15 PM',
      status: 'In Progress',
      assignedCrew: 'BioWaste Haulers',
      truckId: 'ORG-771-BG'
    },
    {
      id: 'req-7',
      requestCode: 'REQ-3047',
      customerName: 'Parkview Estate Residents',
      accountNumber: 'ECB-CST-1015',
      location: 'Parkview Avenue, Ikoyi',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      wasteType: 'Garden Trimmings & Curbside',
      volume: '5.0 Tons',
      priority: 'Scheduled',
      scheduledDate: 'Nov 16, 08:00 AM',
      status: 'Pending',
      assignedCrew: 'Unassigned'
    },
    {
      id: 'req-8',
      requestCode: 'REQ-3048',
      customerName: 'Lekki Conservation Centre',
      accountNumber: 'ECB-CST-1017',
      location: 'Km 19 Lekki-Epe Expressway',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      wasteType: 'Educational Eco-Recyclables',
      volume: '2.1 Tons',
      priority: 'Normal',
      scheduledDate: 'Nov 16, 11:00 AM',
      status: 'Pending',
      assignedCrew: 'Unassigned'
    },
    {
      id: 'req-9',
      requestCode: 'REQ-3049',
      customerName: 'Maryland Mall Commercial Hub',
      accountNumber: 'ECB-CST-1020',
      location: '350 Ikorodu Road, Anthony',
      lga: 'Ikeja',
      wasteType: 'Food Court Organic Scraps',
      volume: '4.0 Tons',
      priority: 'High',
      scheduledDate: 'Today, 11:30 PM',
      status: 'Dispatched',
      assignedCrew: 'Apex Heavy Fleet',
      truckId: 'VIS-902-AP'
    },
    {
      id: 'req-10',
      requestCode: 'REQ-3050',
      customerName: 'Victoria Garden City Residents',
      accountNumber: 'ECB-CST-1019',
      location: 'Km 22 Lekki-Epe Expressway',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      wasteType: 'Sorted Curbside Plastics & Glass',
      volume: '7.8 Tons',
      priority: 'Scheduled',
      scheduledDate: 'Nov 17, 07:00 AM',
      status: 'Pending',
      assignedCrew: 'Unassigned'
    },
    {
      id: 'req-11',
      requestCode: 'REQ-3051',
      customerName: 'Federal Medical Centre Ebute Metta',
      accountNumber: 'ECB-CST-1022',
      location: 'Railway Compound, Ebute Metta',
      lga: 'Surulere / Mainland',
      wasteType: 'Sealed Medical Biohazard Bins',
      volume: '1.8 Tons',
      priority: 'Urgent',
      scheduledDate: 'Today, 03:00 PM',
      status: 'Dispatched',
      assignedCrew: 'Lagos Recyclers',
      truckId: 'SRL-119-CO'
    },
    {
      id: 'req-12',
      requestCode: 'REQ-3052',
      customerName: 'Dangote Industrial Logistics Hub',
      accountNumber: 'ECB-CST-1021',
      location: 'Lekki Free Trade Zone',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      wasteType: 'Heavy Industrial Pallets & Metal',
      volume: '18.0 Tons',
      priority: 'High',
      scheduledDate: 'Nov 18, 10:00 AM',
      status: 'Pending',
      assignedCrew: 'Unassigned'
    },
    {
      id: 'req-13',
      requestCode: 'REQ-3053',
      customerName: 'Palms Shopping Mall Lekki',
      accountNumber: 'ECB-CST-1023',
      location: '1 Bisway St, Maroko, Lekki',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      wasteType: 'Mixed Commercial Compactor Waste',
      volume: '9.5 Tons',
      priority: 'Normal',
      scheduledDate: 'Nov 15, 05:00 AM',
      status: 'Completed',
      assignedCrew: 'Al-Ameen Haulage',
      truckId: 'IKJ-892-LG'
    },
    {
      id: 'req-14',
      requestCode: 'REQ-3054',
      customerName: 'Genesis Deluxe Cinemas',
      accountNumber: 'ECB-CST-1025',
      location: 'The Palms, Lekki Expressway',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      wasteType: 'Popcorn Boxes & Soft Drink Cans',
      volume: '2.4 Tons',
      priority: 'Normal',
      scheduledDate: 'Nov 14, 08:00 AM',
      status: 'Completed',
      assignedCrew: 'CleanPath Municipal',
      truckId: 'YAB-552-MN'
    }
  ]);

  // Dashboard Overview Metrics
  overviewStats = signal({
    registeredCustomers: '2,450',
    collectionRequests: '1,470',
    pendingRequests: '186',
    activeVehicles: '24',
    totalRevenue: '₦24,850,000',
    startDate: 'Nov 12, 2026',
    targetDate: 'Nov 19, 2026',
    zoneLocation: 'Victoria Island, Lekki & Ikeja Central',
    manifestId: 'ECB-76431',
    operationsLead: 'Engr. Babatunde Alabi'
  });

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

  // Computed filtered list for Transactions
  filteredTransactions = computed(() => {
    let list = this.transactions();
    const query = this.tableSearchQuery().toLowerCase().trim();
    const status = this.tableStatusFilter();

    if (status !== 'All') {
      list = list.filter(t => t.status === status);
    }

    if (query) {
      list = list.filter(t =>
        t.reference.toLowerCase().includes(query) ||
        t.customerName.toLowerCase().includes(query) ||
        t.accountNumber.toLowerCase().includes(query) ||
        t.serviceType.toLowerCase().includes(query) ||
        t.paymentMethod.toLowerCase().includes(query) ||
        t.formattedAmount.toLowerCase().includes(query)
      );
    }

    return list;
  });

  // Computed filtered list for Collection Requests
  filteredRequests = computed(() => {
    let list = this.collectionRequests();
    const query = this.tableSearchQuery().toLowerCase().trim();
    const status = this.tableStatusFilter();

    if (status !== 'All') {
      list = list.filter(r => r.status === status);
    }

    if (query) {
      list = list.filter(r =>
        r.requestCode.toLowerCase().includes(query) ||
        r.customerName.toLowerCase().includes(query) ||
        r.wasteType.toLowerCase().includes(query) ||
        r.location.toLowerCase().includes(query) ||
        r.lga.toLowerCase().includes(query) ||
        (r.assignedCrew && r.assignedCrew.toLowerCase().includes(query))
      );
    }

    return list;
  });

  // Active items total count
  currentTotal = computed(() => {
    const tab = this.activeTableTab();
    if (tab === 'transactions') return this.filteredTransactions().length;
    if (tab === 'customers') return this.filteredCustomers().length;
    if (tab === 'requests') return this.filteredRequests().length;
    return this.filteredCrews().length;
  });

  // Total pages
  totalPages = computed(() => {
    return Math.max(1, Math.ceil(this.currentTotal() / this.pageSize()));
  });

  // Start & End index for pagination display
  startIndex = computed(() => {
    if (this.currentTotal() === 0) return 0;
    return (this.currentPage() - 1) * this.pageSize() + 1;
  });

  endIndex = computed(() => {
    return Math.min(this.currentPage() * this.pageSize(), this.currentTotal());
  });

  // Slices for paginated tables
  paginatedTransactions = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredTransactions().slice(start, start + this.pageSize());
  });

  paginatedCustomers = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredCustomers().slice(start, start + this.pageSize());
  });

  paginatedRequests = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredRequests().slice(start, start + this.pageSize());
  });

  paginatedCrews = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredCrews().slice(start, start + this.pageSize());
  });

  pagesList = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  // Table Tabs & Pagination Handlers
  setTableTab(tab: 'transactions' | 'customers' | 'requests' | 'crews'): void {
    this.activeTableTab.set(tab);
    this.currentPage.set(1);
    this.tableSearchQuery.set('');
    this.tableStatusFilter.set('All');
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update(p => p + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.update(p => p - 1);
    }
  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  setTableStatusFilter(status: string): void {
    this.tableStatusFilter.set(status);
    this.currentPage.set(1);
  }

  downloadReceipt(txn: TransactionRecord): void {
    this.triggerToast(`Generating official receipt for ${txn.reference} (${txn.customerName})... Download ready.`);
  }

  dispatchRequest(req: CollectionRequestRecord): void {
    this.collectionRequests.update(prev =>
      prev.map(r => r.id === req.id ? { ...r, status: 'Dispatched', assignedCrew: 'EcoFleet Express (LKK-401-VI)' } : r)
    );
    this.triggerToast(`Crew dispatched for ${req.requestCode} (${req.customerName}).`);
  }

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
    if (item === 'Dashboard Overview') {
      this.activeSubTab.set('CREWS');
    } else if (item === 'Customers') {
      this.activeSubTab.set('CUSTOMERS');
    } else if (item === 'Fleet Management') {
      this.activeSubTab.set('CREWS');
    } else if (item === 'Collection Requests') {
      this.activeSubTab.set('MANIFESTS');
    } else if (item === 'Collection Schedule') {
      this.activeSubTab.set('WEIGHBRIDGE');
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
    } else if (tab === 'CREWS') {
      this.activeSidebarItem.set('Fleet Management');
    } else if (tab === 'MANIFESTS') {
      this.activeSidebarItem.set('Collection Requests');
    } else if (tab === 'WEIGHBRIDGE') {
      this.activeSidebarItem.set('Collection Schedule');
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
