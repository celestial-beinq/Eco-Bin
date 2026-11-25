import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../components/icon/icon.component';

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

export type CustomerCategoryType = 'HOUSEHOLD' | 'BUSINESS' | 'OCCASIONAL' | 'GENERAL' | 'Commercial' | 'Residential' | 'Industrial' | 'Recycling Partner';

export interface CustomerAccount {
  id: string;
  accountNumber: string;
  name: string;
  category: CustomerCategoryType;
  subType?: string;
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
  availableServices?: string[];
  activeService?: string;
}

export interface CleaningStaffMember {
  id: string;
  staffCode: string;
  name: string;
  gender: 'Male' | 'Female';
  role: 'Cleaning Staff' | 'Supervisor' | 'Senior Specialist';
  isSupervisor: boolean;
  assignedLocation: string;
  assignedSupervisorName?: string;
  assignedTeamMembersCount?: number;
  phone: string;
  status: 'On Duty' | 'At Location' | 'Available' | 'On Leave';
  shiftsCompleted: number;
  rating: number;
  avatar?: string;
  initials: string;
  initialBg: string;
}

export interface DriverRecord {
  id: string;
  driverCode: string;
  name: string;
  phone: string;
  licenseNumber: string;
  assignedTruckId: string;
  assignedTruckPlate: string;
  truckType: string;
  assignedStaffTeam: string[];
  assignedSupervisor: string;
  assignedLocation: string;
  missionType: 'Household Cleaning' | 'Business Site Clearing' | 'Event Clean up' | 'Road side clean up' | 'Waste Collection';
  status: 'En Route to Location' | 'On Site with Staff' | 'Returning to Depot' | 'Available / Idle';
  tripsToday: number;
  initials: string;
  initialBg: string;
}

export interface OneOffCustomerRequest {
  id: string;
  requestCode: string;
  customerName: string;
  customerCategory: 'Household' | 'Business' | 'Occasional' | 'General';
  isNewCustomer: boolean;
  requestType: 'Once / New Customer' | 'On-Demand';
  serviceRequested: 
    | 'Weekly or Daily Cleaning'
    | 'Waste Disposal Request'
    | 'Site Clearing'
    | 'Event Clean up & Waste Disposal'
    | 'Road side clean up & Waste Disposal';
  specificNeeds: string;
  contactPhone: string;
  locationAddress: string;
  zoneLga: string;
  requestedDate: string;
  preferredTime: string;
  urgency: 'Urgent' | 'High' | 'Normal';
  status: 'Pending' | 'Staff & Driver Assigned' | 'Dispatched' | 'In Progress' | 'Completed';
  assignedDriver?: string;
  assignedSupervisor?: string;
  assignedStaffCrew?: string;
  assignedTruckPlate?: string;
  estimatedFee: string;
}

export interface CollectionScheduleRecord {
  id: string;
  scheduleCode: string;
  clientName: string;
  category: 'Household' | 'Business' | 'Events & Occasions' | 'Construction Site';
  serviceType: 'Cleaning' | 'Waste Disposal' | 'Site Clearing' | 'Event Clean up & Sanitation' | 'Combined Cleaning & Disposal';
  frequency: 'Every day' | 'Every 2 days' | 'Weekly' | 'Monthly';
  timeSlot: string;
  recurrenceDays: string;
  location: string;
  lga: string;
  assignedSupervisor: string;
  assignedDriver: string;
  assignedTruck: string;
  staffCount: number;
  nextRunDate: string;
  status: 'Active' | 'In Progress Today' | 'Upcoming' | 'Paused';
}

export interface WasteTruckFleetRecord {
  id: string;
  truckCode: string;
  plateNumber: string;
  vehicleModel: string;
  vehicleType: 'Compactor Truck' | 'Roll-off Skip Loader' | 'Mini Tipper Van' | 'Mechanical Road Sweeper' | 'Heavy Waste Hauler';
  capacityTons: string;
  currentFuel: number;
  assignedDriver: string;
  assignedDriverPhone: string;
  assignedSupervisor: string;
  assignedStaffTeam: string[];
  assignmentMission: 'Cleaning' | 'Waste Collection' | 'Site Clearing' | 'Event Clean up' | 'Road side clean up';
  assignedCustomerOrSite: string;
  customerCategory: 'Household' | 'Business' | 'Occasions' | 'General';
  destinationLocation: string;
  lga: string;
  status: 'Dispatched & On Route' | 'On Site Collecting' | 'Disposal at Landfill' | 'In Depot / Available' | 'In Maintenance';
  statusType: 'active' | 'busy' | 'available' | 'maintenance';
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
  imports: [CommonModule, RouterModule, FormsModule, IconComponent],
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
      category: 'BUSINESS',
      subType: 'Industrial, Company, Service',
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
      nextPickupDate: 'Tomorrow, 06:00 AM',
      availableServices: ['Daily Cleaning', 'Weekly Cleaning', 'Waste Disposal Request', 'Site Clearing'],
      activeService: 'Daily Cleaning'
    },
    {
      id: 'cst-2',
      accountNumber: 'ECB-CST-1012',
      name: 'Landmark Centre & Beach Village',
      category: 'OCCASIONAL',
      subType: 'Events & Parties',
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
      nextPickupDate: 'Today, 21:00',
      availableServices: ['Event Clean up & Waste Disposal'],
      activeService: 'Event Clean up & Waste Disposal'
    },
    {
      id: 'cst-3',
      accountNumber: 'ECB-CST-1013',
      name: '1004 Housing Estate Community',
      category: 'HOUSEHOLD',
      subType: 'Neighborhood & Apartments',
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
      nextPickupDate: 'Nov 16, 07:30 AM',
      availableServices: ['Weekly Cleaning', 'Daily Cleaning', 'Waste Disposal Request'],
      activeService: 'Weekly Cleaning'
    },
    {
      id: 'cst-4',
      accountNumber: 'ECB-CST-1014',
      name: 'Ikeja City Mall (Shoprite / Food Court)',
      category: 'BUSINESS',
      subType: 'Industrial, Company, Service',
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
      nextPickupDate: 'Tomorrow, 04:30 AM',
      availableServices: ['Daily Cleaning', 'Weekly Cleaning', 'Waste Disposal Request', 'Site Clearing'],
      activeService: 'Daily Cleaning'
    },
    {
      id: 'cst-5',
      accountNumber: 'ECB-CST-1015',
      name: 'Parkview Estate Residents Management',
      category: 'HOUSEHOLD',
      subType: 'Neighborhood & Apartments',
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
      nextPickupDate: 'Nov 15, 09:00 AM',
      availableServices: ['Weekly Cleaning', 'Daily Cleaning', 'Waste Disposal Request'],
      activeService: 'Weekly Cleaning'
    },
    {
      id: 'cst-6',
      accountNumber: 'ECB-CST-1016',
      name: 'Seven-Up Bottling Co. Industrial Facility',
      category: 'BUSINESS',
      subType: 'Industrial, Company, Service',
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
      nextPickupDate: 'Nov 17, 11:00 AM',
      availableServices: ['Site Clearing', 'Waste Disposal Request', 'Weekly Cleaning', 'Daily Cleaning'],
      activeService: 'Site Clearing'
    },
    {
      id: 'cst-7',
      accountNumber: 'ECB-CST-1017',
      name: 'Lekki-Epe Expressway Sanitation Corridor',
      category: 'GENERAL',
      subType: 'Road side clean up & Waste Disposal',
      contactPerson: 'Engr. David Okonkwo (Corridor Lead)',
      phone: '+234 806 332 2110',
      email: 'highways@ecobin.lagos.ng',
      address: 'Km 12 - 25 Lekki-Epe Expressway',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      servicePlan: 'Municipal Highway Sweep & Litter Intercept',
      pickupFrequency: 'Daily Mechanical Sweep',
      binAllocation: '10x Highway Compacting Skips',
      monthlyTonnage: '28.4 T / mo',
      esgTier: 'Platinum ESG',
      status: 'Active',
      initials: 'LK',
      initialBg: '#16a34a',
      lastPickupDate: 'Today, 04:30 AM',
      nextPickupDate: 'Tomorrow, 04:30 AM',
      availableServices: ['Road side clean up & Waste Disposal'],
      activeService: 'Road side clean up & Waste Disposal'
    },
    {
      id: 'cst-8',
      accountNumber: 'ECB-CST-1018',
      name: 'The Monarch Lagos Grand Wedding Pavilion',
      category: 'OCCASIONAL',
      subType: 'Events & Parties',
      contactPerson: 'Kareem Olatunji (Events Coordinator)',
      phone: '+234 813 555 4433',
      email: 'events@themonarchlagos.com',
      address: 'Lekki-Epe Expressway, Marwa, Lekki',
      lga: 'Eti-Osa (Victoria Island)',
      servicePlan: 'Event Clean up & Waste Disposal Stream',
      pickupFrequency: 'On-Demand Event Sweeps',
      binAllocation: '12x 660L Event Bins',
      monthlyTonnage: '16.2 T / mo',
      esgTier: 'Gold Partner',
      status: 'Pending Review',
      initials: 'MO',
      initialBg: '#4f46e5',
      lastPickupDate: 'Nov 13, 07:00 AM',
      nextPickupDate: 'Today, 22:00',
      availableServices: ['Event Clean up & Waste Disposal'],
      activeService: 'Event Clean up & Waste Disposal'
    },
    {
      id: 'cst-9',
      accountNumber: 'ECB-CST-1019',
      name: 'Victoria Garden City Residents Association',
      category: 'HOUSEHOLD',
      subType: 'Neighborhood & Apartments',
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
      nextPickupDate: 'Nov 16, 06:00 AM',
      availableServices: ['Daily Cleaning', 'Weekly Cleaning', 'Waste Disposal Request'],
      activeService: 'Daily Cleaning'
    },
    {
      id: 'cst-10',
      accountNumber: 'ECB-CST-1020',
      name: 'Falomo Roundabout & Marina Waterfront',
      category: 'GENERAL',
      subType: 'Road side clean up & Waste Disposal',
      contactPerson: 'Sulaimon Balogun (Public Sector Supervisor)',
      phone: '+234 811 444 7788',
      email: 'publicworks@lagosstate.gov.ng',
      address: 'Falomo Bridge Underpass & Marina Promenade',
      lga: 'Lagos Island / Eti-Osa',
      servicePlan: 'Public Space Cleanliness & Storm Drain Sweep',
      pickupFrequency: 'Daily (Morning Sweep)',
      binAllocation: '14x 240L Public Bins',
      monthlyTonnage: '19.5 T / mo',
      esgTier: 'Gold Partner',
      status: 'Active',
      initials: 'FL',
      initialBg: '#7c3aed',
      lastPickupDate: 'Today, 06:00 AM',
      nextPickupDate: 'Tomorrow, 06:00 AM',
      availableServices: ['Road side clean up & Waste Disposal'],
      activeService: 'Road side clean up & Waste Disposal'
    },
    {
      id: 'cst-11',
      accountNumber: 'ECB-CST-1021',
      name: 'Dangote Industrial Logistics Hub',
      category: 'BUSINESS',
      subType: 'Industrial, Company, Service',
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
      nextPickupDate: 'Nov 17, 10:00 AM',
      availableServices: ['Site Clearing', 'Waste Disposal Request', 'Weekly Cleaning'],
      activeService: 'Site Clearing'
    },
    {
      id: 'cst-12',
      accountNumber: 'ECB-CST-1022',
      name: 'Victoria Crest 4 Neighborhood Court',
      category: 'HOUSEHOLD',
      subType: 'Neighborhood & Apartments',
      contactPerson: 'Mrs. Cynthia Cole (Residents Rep)',
      phone: '+234 803 777 8899',
      email: 'court4@victoriacrest.ng',
      address: 'Orchid Road, Lekki',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      servicePlan: 'Residential Apartments Weekly Sweep',
      pickupFrequency: 'Weekly Curbside',
      binAllocation: '12x 660L Bins',
      monthlyTonnage: '11.8 T / mo',
      esgTier: 'Green Verified',
      status: 'Active',
      initials: 'VC',
      initialBg: '#dc2626',
      lastPickupDate: 'Today, 08:00 AM',
      nextPickupDate: 'Tomorrow, 08:00 AM',
      availableServices: ['Weekly Cleaning', 'Daily Cleaning', 'Waste Disposal Request'],
      activeService: 'Waste Disposal Request'
    }
  ]);

  // ==========================================
  // STAFF & DRIVERS DATASET
  // 1. Cleaning Staff (Male & Female, Supervisors follow staff to locations)
  // 2. Drivers (Drivers assigned with staffs to locations)
  // ==========================================
  staffSubTab = signal<'staff' | 'drivers'>('staff');
  staffGenderFilter = signal<string>('All');
  staffRoleFilter = signal<string>('All');
  staffLocationFilter = signal<string>('All');
  assignStaffModalOpen = signal<boolean>(false);
  selectedStaff = signal<CleaningStaffMember | null>(null);
  assignDriverModalOpen = signal<boolean>(false);
  selectedDriver = signal<DriverRecord | null>(null);

  cleaningStaff = signal<CleaningStaffMember[]>([
    {
      id: 'st-1',
      staffCode: 'STF-01',
      name: 'Sarah Oladipo',
      gender: 'Female',
      role: 'Supervisor',
      isSupervisor: true,
      assignedLocation: 'Victoria Island Central Zone',
      assignedTeamMembersCount: 5,
      phone: '+234 803 111 2233',
      status: 'At Location',
      shiftsCompleted: 88,
      rating: 4.9,
      initials: 'SO',
      initialBg: '#7c3aed'
    },
    {
      id: 'st-2',
      staffCode: 'STF-02',
      name: 'Chinedu Eze',
      gender: 'Male',
      role: 'Cleaning Staff',
      isSupervisor: false,
      assignedLocation: 'Victoria Island Central Zone',
      assignedSupervisorName: 'Sarah Oladipo',
      phone: '+234 802 222 3344',
      status: 'At Location',
      shiftsCompleted: 64,
      rating: 4.8,
      initials: 'CE',
      initialBg: '#2563eb'
    },
    {
      id: 'st-3',
      staffCode: 'STF-03',
      name: 'Amina Bello',
      gender: 'Female',
      role: 'Cleaning Staff',
      isSupervisor: false,
      assignedLocation: '1004 Housing Estate (Apartments)',
      assignedSupervisorName: 'Sarah Oladipo',
      phone: '+234 805 333 4455',
      status: 'On Duty',
      shiftsCompleted: 72,
      rating: 4.9,
      initials: 'AB',
      initialBg: '#db2777'
    },
    {
      id: 'st-4',
      staffCode: 'STF-04',
      name: 'Emmanuel Adebayo',
      gender: 'Male',
      role: 'Supervisor',
      isSupervisor: true,
      assignedLocation: 'Ikeja Industrial Hub & Sites',
      assignedTeamMembersCount: 6,
      phone: '+234 808 444 5566',
      status: 'At Location',
      shiftsCompleted: 110,
      rating: 4.95,
      initials: 'EA',
      initialBg: '#059669'
    },
    {
      id: 'st-5',
      staffCode: 'STF-05',
      name: 'Blessing Okafor',
      gender: 'Female',
      role: 'Cleaning Staff',
      isSupervisor: false,
      assignedLocation: 'Ikeja Industrial Hub & Sites',
      assignedSupervisorName: 'Emmanuel Adebayo',
      phone: '+234 812 555 6677',
      status: 'At Location',
      shiftsCompleted: 58,
      rating: 4.7,
      initials: 'BO',
      initialBg: '#0891b2'
    },
    {
      id: 'st-6',
      staffCode: 'STF-06',
      name: 'Tunde Bakare',
      gender: 'Male',
      role: 'Cleaning Staff',
      isSupervisor: false,
      assignedLocation: 'Ikeja Industrial Hub & Sites',
      assignedSupervisorName: 'Emmanuel Adebayo',
      phone: '+234 813 666 7788',
      status: 'On Duty',
      shiftsCompleted: 49,
      rating: 4.8,
      initials: 'TB',
      initialBg: '#d97706'
    },
    {
      id: 'st-7',
      staffCode: 'STF-07',
      name: 'Grace Danjuma',
      gender: 'Female',
      role: 'Supervisor',
      isSupervisor: true,
      assignedLocation: 'Lekki Coastal & Landmark Beach Events',
      assignedTeamMembersCount: 4,
      phone: '+234 816 777 8899',
      status: 'At Location',
      shiftsCompleted: 95,
      rating: 5.0,
      initials: 'GD',
      initialBg: '#7c3aed'
    },
    {
      id: 'st-8',
      staffCode: 'STF-08',
      name: 'Ibrahim Sani',
      gender: 'Male',
      role: 'Cleaning Staff',
      isSupervisor: false,
      assignedLocation: 'Lekki Coastal & Landmark Beach Events',
      assignedSupervisorName: 'Grace Danjuma',
      phone: '+234 817 888 9900',
      status: 'At Location',
      shiftsCompleted: 42,
      rating: 4.6,
      initials: 'IS',
      initialBg: '#2563eb'
    },
    {
      id: 'st-9',
      staffCode: 'STF-09',
      name: 'Ngozi Nwankwo',
      gender: 'Female',
      role: 'Cleaning Staff',
      isSupervisor: false,
      assignedLocation: 'Parkview Estate & Ikoyi Neighborhood',
      assignedSupervisorName: 'Sarah Oladipo',
      phone: '+234 809 999 0011',
      status: 'Available',
      shiftsCompleted: 61,
      rating: 4.85,
      initials: 'NN',
      initialBg: '#db2777'
    },
    {
      id: 'st-10',
      staffCode: 'STF-10',
      name: 'Kayode Alimi',
      gender: 'Male',
      role: 'Cleaning Staff',
      isSupervisor: false,
      assignedLocation: 'Lekki-Epe Expressway Roadside Corridor',
      assignedSupervisorName: 'Emmanuel Adebayo',
      phone: '+234 803 234 5678',
      status: 'On Duty',
      shiftsCompleted: 53,
      rating: 4.75,
      initials: 'KA',
      initialBg: '#15803d'
    }
  ]);

  drivers = signal<DriverRecord[]>([
    {
      id: 'drv-1',
      driverCode: 'DRV-01',
      name: 'Babatunde Fashola (Lead Driver)',
      phone: '+234 803 987 1122',
      licenseNumber: 'LAG-DRV-98214',
      assignedTruckId: 'TRK-01',
      assignedTruckPlate: 'LKK-401-VI',
      truckType: 'Compactor Truck (12.5 T)',
      assignedStaffTeam: ['Chinedu Eze (Male)', 'Amina Bello (Female)'],
      assignedSupervisor: 'Sarah Oladipo',
      assignedLocation: '1004 Estate & Adetokunbo Ademola, Victoria Island',
      missionType: 'Household Cleaning',
      status: 'On Site with Staff',
      tripsToday: 2,
      initials: 'BF',
      initialBg: '#059669'
    },
    {
      id: 'drv-2',
      driverCode: 'DRV-02',
      name: 'Alhaji Musa Danjuma',
      phone: '+234 818 654 3321',
      licenseNumber: 'IKJ-DRV-77312',
      assignedTruckId: 'TRK-02',
      assignedTruckPlate: 'IKJ-892-LG',
      truckType: 'Heavy Roll-Off Skip (18.0 T)',
      assignedStaffTeam: ['Blessing Okafor (Female)', 'Tunde Bakare (Male)'],
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedLocation: 'Seven-Up Industrial Facility & Site Clearing, Ikeja',
      missionType: 'Business Site Clearing',
      status: 'On Site with Staff',
      tripsToday: 3,
      initials: 'MD',
      initialBg: '#b91c1c'
    },
    {
      id: 'drv-3',
      driverCode: 'DRV-03',
      name: 'Sunday Okafor',
      phone: '+234 812 777 6655',
      licenseNumber: 'LKK-DRV-55109',
      assignedTruckId: 'TRK-03',
      assignedTruckPlate: 'ETI-330-LK',
      truckType: 'Special Events Mini-Carrier (8.0 T)',
      assignedStaffTeam: ['Ibrahim Sani (Male)'],
      assignedSupervisor: 'Grace Danjuma',
      assignedLocation: 'Landmark Beach Festival & Event Grounds',
      missionType: 'Event Clean up',
      status: 'En Route to Location',
      tripsToday: 1,
      initials: 'SO',
      initialBg: '#2563eb'
    },
    {
      id: 'drv-4',
      driverCode: 'DRV-04',
      name: 'Kazeem Olatunji',
      phone: '+234 809 332 1100',
      licenseNumber: 'YAB-DRV-44201',
      assignedTruckId: 'TRK-04',
      assignedTruckPlate: 'YAB-552-MN',
      truckType: 'Mechanical Road Sweeper & Compactor',
      assignedStaffTeam: ['Kayode Alimi (Male)', 'Ngozi Nwankwo (Female)'],
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedLocation: 'Lekki-Epe Expressway & Ozumba Mbadiwe Way',
      missionType: 'Road side clean up',
      status: 'On Site with Staff',
      tripsToday: 2,
      initials: 'KO',
      initialBg: '#d97706'
    },
    {
      id: 'drv-5',
      driverCode: 'DRV-05',
      name: 'Samuel Adekunle',
      phone: '+234 802 444 8899',
      licenseNumber: 'SRL-DRV-11890',
      assignedTruckId: 'TRK-05',
      assignedTruckPlate: 'SRL-119-CO',
      truckType: 'Curbside Tipper Truck (6.5 T)',
      assignedStaffTeam: [],
      assignedSupervisor: 'Standby / Unassigned',
      assignedLocation: 'EcoBin Central Depot - Ikeja',
      missionType: 'Waste Collection',
      status: 'Available / Idle',
      tripsToday: 0,
      initials: 'SA',
      initialBg: '#64748b'
    }
  ]);

  // ==========================================
  // REQUEST PAGE DATASET
  // Shows all requests from all customers, businesses, occasions.
  // Note: Request comes as once, new customers
  // ==========================================
  requestCategoryFilter = signal<string>('All');
  requestStatusFilter = signal<string>('All');
  newOneOffRequestModalOpen = signal<boolean>(false);
  assignRequestModalOpen = signal<boolean>(false);
  selectedOneOffRequest = signal<OneOffCustomerRequest | null>(null);

  newOneOffRequestForm = {
    customerName: '',
    customerCategory: 'Household' as 'Household' | 'Business' | 'Occasional' | 'General',
    serviceRequested: 'Weekly or Daily Cleaning' as OneOffCustomerRequest['serviceRequested'],
    specificNeeds: '',
    contactPhone: '',
    locationAddress: '',
    zoneLga: 'Eti-Osa (Victoria Island / Lekki)',
    urgency: 'Normal' as 'Urgent' | 'High' | 'Normal',
    estimatedFee: '₦75,000'
  };

  oneOffRequests = signal<OneOffCustomerRequest[]>([
    {
      id: 'req-once-1',
      requestCode: 'REQ-ONCE-2041',
      customerName: 'Victoria Crest 4 Neighborhood Court',
      customerCategory: 'Household',
      isNewCustomer: true,
      requestType: 'Once / New Customer',
      serviceRequested: 'Weekly or Daily Cleaning',
      specificNeeds: 'Move-in compound sanitization and daily apartment cleaning trial',
      contactPhone: '+234 803 991 8822',
      locationAddress: 'Orchid Road, Lekki',
      zoneLga: 'Eti-Osa (Victoria Island / Lekki)',
      requestedDate: 'Today, Nov 17',
      preferredTime: '08:00 AM',
      urgency: 'High',
      status: 'Pending',
      estimatedFee: '₦75,000'
    },
    {
      id: 'req-once-2',
      requestCode: 'REQ-ONCE-2042',
      customerName: 'Dangote Refinery Subcontractor Yard',
      customerCategory: 'Business',
      isNewCustomer: true,
      requestType: 'Once / New Customer',
      serviceRequested: 'Site Clearing',
      specificNeeds: 'Heavy construction debris, scrap steel & bulk ground clearing',
      contactPhone: '+234 818 770 1200',
      locationAddress: 'Lekki Free Trade Zone Gate 3',
      zoneLga: 'Eti-Osa (Victoria Island / Lekki)',
      requestedDate: 'Tomorrow, Nov 18',
      preferredTime: '07:30 AM',
      urgency: 'Urgent',
      status: 'Staff & Driver Assigned',
      assignedDriver: 'Alhaji Musa Danjuma',
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedStaffCrew: 'Blessing Okafor & Tunde Bakare',
      assignedTruckPlate: 'IKJ-892-LG',
      estimatedFee: '₦650,000'
    },
    {
      id: 'req-once-3',
      requestCode: 'REQ-ONCE-2043',
      customerName: 'The Monarch Lagos Wedding Marquee',
      customerCategory: 'Occasional',
      isNewCustomer: true,
      requestType: 'Once / New Customer',
      serviceRequested: 'Event Clean up & Waste Disposal',
      specificNeeds: 'Overnight party cleanup for 1,200 guests, banquet food waste and packaging',
      contactPhone: '+234 802 555 9911',
      locationAddress: 'Lekki-Epe Expressway, Marwa',
      zoneLga: 'Eti-Osa (Victoria Island / Lekki)',
      requestedDate: 'Tonight, Nov 17',
      preferredTime: '23:00',
      urgency: 'Urgent',
      status: 'Dispatched',
      assignedDriver: 'Sunday Okafor',
      assignedSupervisor: 'Grace Danjuma',
      assignedStaffCrew: 'Ibrahim Sani & Grace Crew',
      assignedTruckPlate: 'ETI-330-LK',
      estimatedFee: '₦280,000'
    },
    {
      id: 'req-once-4',
      requestCode: 'REQ-ONCE-2044',
      customerName: 'Falomo Bridge Underpass Municipal Sanitation',
      customerCategory: 'General',
      isNewCustomer: true,
      requestType: 'Once / New Customer',
      serviceRequested: 'Road side clean up & Waste Disposal',
      specificNeeds: 'Public roadway clearance, illegal dump sweep and storm drain clearing',
      contactPhone: '+234 805 119 4433',
      locationAddress: 'Falomo Roundabout / Ikoyi Bridge',
      zoneLga: 'Eti-Osa (Victoria Island / Lekki)',
      requestedDate: 'Today, Nov 17',
      preferredTime: '06:00 AM',
      urgency: 'High',
      status: 'In Progress',
      assignedDriver: 'Kazeem Olatunji',
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedStaffCrew: 'Kayode Alimi & Ngozi Nwankwo',
      assignedTruckPlate: 'YAB-552-MN',
      estimatedFee: '₦180,000'
    },
    {
      id: 'req-once-5',
      requestCode: 'REQ-ONCE-2045',
      customerName: 'Silverbird Galleria Media Towers',
      customerCategory: 'Business',
      isNewCustomer: true,
      requestType: 'Once / New Customer',
      serviceRequested: 'Waste Disposal Request',
      specificNeeds: 'Post-renovation packaging and electronic cardboard waste collection',
      contactPhone: '+234 812 444 0099',
      locationAddress: '133 Ahmadu Bello Way, Victoria Island',
      zoneLga: 'Eti-Osa (Victoria Island)',
      requestedDate: 'Nov 19',
      preferredTime: '10:00 AM',
      urgency: 'Normal',
      status: 'Pending',
      estimatedFee: '₦120,000'
    },
    {
      id: 'req-once-6',
      requestCode: 'REQ-ONCE-2046',
      customerName: 'Bourdillon Luxury Court Apartments',
      customerCategory: 'Household',
      isNewCustomer: true,
      requestType: 'Once / New Customer',
      serviceRequested: 'Waste Disposal Request',
      specificNeeds: 'Bulk residential green waste, tree trimmings and compound clearing',
      contactPhone: '+234 809 881 2233',
      locationAddress: '24 Bourdillon Road, Ikoyi',
      zoneLga: 'Eti-Osa (Victoria Island / Lekki)',
      requestedDate: 'Nov 18',
      preferredTime: '14:00',
      urgency: 'Normal',
      status: 'Pending',
      estimatedFee: '₦95,000'
    }
  ]);

  // ==========================================
  // COLLECTION SCHEDULE DATASET
  // Shows all schedules of cleaning, waste disposal.
  // Household, business, events, construction site for Every day, 2 days, weekly, monthly
  // ==========================================
  scheduleFrequencyFilter = signal<string>('All');
  scheduleCategoryFilter = signal<string>('All');
  newScheduleModalOpen = signal<boolean>(false);

  newScheduleForm = {
    clientName: '',
    category: 'Household' as CollectionScheduleRecord['category'],
    serviceType: 'Cleaning' as CollectionScheduleRecord['serviceType'],
    frequency: 'Every day' as CollectionScheduleRecord['frequency'],
    timeSlot: '07:00 AM',
    recurrenceDays: 'Daily',
    location: '',
    lga: 'Eti-Osa (Victoria Island / Lekki)',
    assignedSupervisor: 'Sarah Oladipo',
    assignedDriver: 'Babatunde Fashola',
    assignedTruck: 'LKK-401-VI',
    staffCount: 4
  };

  schedules = signal<CollectionScheduleRecord[]>([
    {
      id: 'sch-1',
      scheduleCode: 'SCH-ED-101',
      clientName: 'Eko Hotels & Suites Commercial Facility',
      category: 'Business',
      serviceType: 'Cleaning',
      frequency: 'Every day',
      timeSlot: '06:00 AM & 18:00 (Twice Daily)',
      recurrenceDays: 'Daily (Mon - Sun)',
      location: 'Plot 1415 Adetokunbo Ademola St, VI',
      lga: 'Eti-Osa (Victoria Island)',
      assignedSupervisor: 'Sarah Oladipo',
      assignedDriver: 'Babatunde Fashola',
      assignedTruck: 'LKK-401-VI',
      staffCount: 4,
      nextRunDate: 'Today, 18:00',
      status: 'In Progress Today'
    },
    {
      id: 'sch-2',
      scheduleCode: 'SCH-ED-102',
      clientName: 'Victoria Garden City (VGC) Duplex Court',
      category: 'Household',
      serviceType: 'Waste Disposal',
      frequency: 'Every day',
      timeSlot: '07:00 AM',
      recurrenceDays: 'Daily (Mon - Sun)',
      location: 'Km 22 Lekki-Epe Expressway, VGC',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      assignedSupervisor: 'Sarah Oladipo',
      assignedDriver: 'Babatunde Fashola',
      assignedTruck: 'LKK-401-VI',
      staffCount: 3,
      nextRunDate: 'Tomorrow, 07:00 AM',
      status: 'Active'
    },
    {
      id: 'sch-3',
      scheduleCode: 'SCH-2D-201',
      clientName: '1004 Housing Estate Community (Apartments)',
      category: 'Household',
      serviceType: 'Cleaning',
      frequency: 'Every 2 days',
      timeSlot: '08:00 AM',
      recurrenceDays: 'Every 2 Days (Mon, Wed, Fri, Sun)',
      location: 'High-Rise Blocks A-E, Victoria Island',
      lga: 'Eti-Osa (Victoria Island)',
      assignedSupervisor: 'Sarah Oladipo',
      assignedDriver: 'Babatunde Fashola',
      assignedTruck: 'LKK-401-VI',
      staffCount: 5,
      nextRunDate: 'Tomorrow, 08:00 AM',
      status: 'Active'
    },
    {
      id: 'sch-4',
      scheduleCode: 'SCH-2D-202',
      clientName: 'Ikeja City Mall & Retail Court',
      category: 'Business',
      serviceType: 'Waste Disposal',
      frequency: 'Every 2 days',
      timeSlot: 'Night Shift 22:30',
      recurrenceDays: 'Every 2 Days (Tue, Thu, Sat)',
      location: 'Obafemi Awolowo Way, Alausa',
      lga: 'Ikeja',
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedDriver: 'Alhaji Musa Danjuma',
      assignedTruck: 'IKJ-892-LG',
      staffCount: 4,
      nextRunDate: 'Tonight, 22:30',
      status: 'Upcoming'
    },
    {
      id: 'sch-5',
      scheduleCode: 'SCH-WK-301',
      clientName: 'Parkview Estate Residents Management',
      category: 'Household',
      serviceType: 'Cleaning',
      frequency: 'Weekly',
      timeSlot: 'Saturday 08:00 AM',
      recurrenceDays: 'Every Saturday',
      location: 'Parkview Avenue, Ikoyi',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      assignedSupervisor: 'Sarah Oladipo',
      assignedDriver: 'Babatunde Fashola',
      assignedTruck: 'LKK-401-VI',
      staffCount: 6,
      nextRunDate: 'Saturday, Nov 22',
      status: 'Active'
    },
    {
      id: 'sch-6',
      scheduleCode: 'SCH-WK-302',
      clientName: 'Dangote Lekki Construction Site Zone B',
      category: 'Construction Site',
      serviceType: 'Site Clearing',
      frequency: 'Weekly',
      timeSlot: 'Wednesday 10:00 AM',
      recurrenceDays: 'Every Wednesday',
      location: 'Lekki Free Trade Zone',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedDriver: 'Alhaji Musa Danjuma',
      assignedTruck: 'IKJ-892-LG',
      staffCount: 8,
      nextRunDate: 'Wednesday, Nov 19',
      status: 'Active'
    },
    {
      id: 'sch-7',
      scheduleCode: 'SCH-MO-401',
      clientName: 'Seven-Up Bottling Co. Industrial Facility',
      category: 'Business',
      serviceType: 'Site Clearing',
      frequency: 'Monthly',
      timeSlot: '1st & 15th of month, 11:00 AM',
      recurrenceDays: 'Bi-Monthly (1st & 15th)',
      location: 'Mobolaji Johnson Ave, Oregun Industrial',
      lga: 'Ikeja',
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedDriver: 'Alhaji Musa Danjuma',
      assignedTruck: 'IKJ-892-LG',
      staffCount: 6,
      nextRunDate: 'Dec 01, 11:00 AM',
      status: 'Active'
    },
    {
      id: 'sch-8',
      scheduleCode: 'SCH-WK-303',
      clientName: 'Landmark Centre Beach & Event Pavilion',
      category: 'Events & Occasions',
      serviceType: 'Event Clean up & Sanitation',
      frequency: 'Weekly',
      timeSlot: 'Sunday 04:00 AM (Post-Event)',
      recurrenceDays: 'Every Sunday Morning',
      location: 'Water Corporation Drive, VI',
      lga: 'Eti-Osa (Victoria Island)',
      assignedSupervisor: 'Grace Danjuma',
      assignedDriver: 'Sunday Okafor',
      assignedTruck: 'ETI-330-LK',
      staffCount: 5,
      nextRunDate: 'Sunday, Nov 23',
      status: 'Active'
    }
  ]);

  // ==========================================
  // FLEET MANAGEMENT DATASET
  // Shows waste trucks and who they are assigned to for cleaning or waste collection
  // from all customers, businesses, occasions.
  // ==========================================
  fleetMissionFilter = signal<string>('All');
  fleetStatusFilter = signal<string>('All');
  assignFleetModalOpen = signal<boolean>(false);
  selectedFleetTruck = signal<WasteTruckFleetRecord | null>(null);

  fleetTrucks = signal<WasteTruckFleetRecord[]>([
    {
      id: 'flt-1',
      truckCode: 'TRK-CMP-01',
      plateNumber: 'LKK-401-VI',
      vehicleModel: 'Mercedes-Benz Actros 2632 Compactor',
      vehicleType: 'Compactor Truck',
      capacityTons: '12.5 Tons',
      currentFuel: 82,
      assignedDriver: 'Babatunde Fashola',
      assignedDriverPhone: '+234 803 987 1122',
      assignedSupervisor: 'Sarah Oladipo',
      assignedStaffTeam: ['Chinedu Eze (Male)', 'Amina Bello (Female)'],
      assignmentMission: 'Cleaning',
      assignedCustomerOrSite: '1004 Housing Estate (Neighborhood & Apartments)',
      customerCategory: 'Household',
      destinationLocation: 'Adetokunbo Ademola St / 1004 Estate, VI',
      lga: 'Eti-Osa (Victoria Island)',
      status: 'On Site Collecting',
      statusType: 'busy'
    },
    {
      id: 'flt-2',
      truckCode: 'TRK-ROL-02',
      plateNumber: 'IKJ-892-LG',
      vehicleModel: 'MAN TGS 33.360 6x4 Heavy Roll-off',
      vehicleType: 'Roll-off Skip Loader',
      capacityTons: '18.0 Tons',
      currentFuel: 68,
      assignedDriver: 'Alhaji Musa Danjuma',
      assignedDriverPhone: '+234 818 654 3321',
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedStaffTeam: ['Blessing Okafor (Female)', 'Tunde Bakare (Male)'],
      assignmentMission: 'Site Clearing',
      assignedCustomerOrSite: 'Seven-Up Industrial Facility & Manufacturing Yard',
      customerCategory: 'Business',
      destinationLocation: 'Mobolaji Johnson Ave, Oregun Industrial Estate',
      lga: 'Ikeja',
      status: 'On Site Collecting',
      statusType: 'busy'
    },
    {
      id: 'flt-3',
      truckCode: 'TRK-EVT-03',
      plateNumber: 'ETI-330-LK',
      vehicleModel: 'Isuzu Forward FTR 850 Rapid Hauler',
      vehicleType: 'Mini Tipper Van',
      capacityTons: '8.0 Tons',
      currentFuel: 90,
      assignedDriver: 'Sunday Okafor',
      assignedDriverPhone: '+234 812 777 6655',
      assignedSupervisor: 'Grace Danjuma',
      assignedStaffTeam: ['Ibrahim Sani (Male)'],
      assignmentMission: 'Event Clean up',
      assignedCustomerOrSite: 'Landmark Beach Festival & Concert Pavilion',
      customerCategory: 'Occasions',
      destinationLocation: 'Water Corporation Drive, Victoria Island',
      lga: 'Eti-Osa (Victoria Island)',
      status: 'Dispatched & On Route',
      statusType: 'active'
    },
    {
      id: 'flt-4',
      truckCode: 'TRK-SWP-04',
      plateNumber: 'YAB-552-MN',
      vehicleModel: 'Bucher CityCat V20 Dual Sweeper',
      vehicleType: 'Mechanical Road Sweeper',
      capacityTons: '5.5 Tons',
      currentFuel: 74,
      assignedDriver: 'Kazeem Olatunji',
      assignedDriverPhone: '+234 809 332 1100',
      assignedSupervisor: 'Emmanuel Adebayo',
      assignedStaffTeam: ['Kayode Alimi (Male)', 'Ngozi Nwankwo (Female)'],
      assignmentMission: 'Road side clean up',
      assignedCustomerOrSite: 'Lekki-Epe Expressway & Public Highway Corridor',
      customerCategory: 'General',
      destinationLocation: 'Lekki Toll Plaza to Chevron Roundabout',
      lga: 'Eti-Osa (Victoria Island / Lekki)',
      status: 'On Site Collecting',
      statusType: 'busy'
    },
    {
      id: 'flt-5',
      truckCode: 'TRK-WST-05',
      plateNumber: 'SRL-119-CO',
      vehicleModel: 'Scania P360 Heavy Multi-loader',
      vehicleType: 'Heavy Waste Hauler',
      capacityTons: '15.0 Tons',
      currentFuel: 95,
      assignedDriver: 'Samuel Adekunle',
      assignedDriverPhone: '+234 802 444 8899',
      assignedSupervisor: 'Standby / Unassigned',
      assignedStaffTeam: [],
      assignmentMission: 'Waste Collection',
      assignedCustomerOrSite: 'Central Waste Depository Hub',
      customerCategory: 'Business',
      destinationLocation: 'Ikeja Central Logistics Depot',
      lga: 'Ikeja',
      status: 'In Depot / Available',
      statusType: 'available'
    }
  ]);

  // Request Service Modal state (triggered from Customer Page)
  requestServiceModalOpen = signal<boolean>(false);
  selectedCustomerForService = signal<CustomerAccount | null>(null);
  serviceRequestForm = {
    customerId: '',
    customerName: '',
    category: 'HOUSEHOLD' as CustomerCategoryType,
    serviceType: 'Weekly Cleaning',
    cleaningFrequency: 'Weekly' as 'Weekly' | 'Daily',
    preferredDate: '',
    notes: ''
  };

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
  // Computed filtered list for Customers (Support 4 Dashboard Categories)
  filteredCustomers = computed(() => {
    let list = this.customers();
    const query = this.customerSearchQuery().toLowerCase().trim();
    const category = this.customerCategoryFilter();
    const status = this.customerStatusFilter();

    if (category !== 'All') {
      if (category === 'HOUSEHOLD' || category === 'Household') {
        list = list.filter(c => c.category === 'HOUSEHOLD' || c.category === 'Residential');
      } else if (category === 'BUSINESS' || category === 'Business') {
        list = list.filter(c => c.category === 'BUSINESS' || c.category === 'Commercial' || c.category === 'Industrial');
      } else if (category === 'OCCASIONAL' || category === 'Occasional') {
        list = list.filter(c => c.category === 'OCCASIONAL');
      } else if (category === 'GENERAL' || category === 'General') {
        list = list.filter(c => c.category === 'GENERAL' || c.category === 'Recycling Partner');
      } else {
        list = list.filter(c => c.category === category);
      }
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
        c.servicePlan.toLowerCase().includes(query) ||
        (c.subType && c.subType.toLowerCase().includes(query))
      );
    }

    return list;
  });

  // Category counts for Customer Page
  householdCount = computed(() => this.customers().filter(c => c.category === 'HOUSEHOLD' || c.category === 'Residential').length);
  businessCount = computed(() => this.customers().filter(c => c.category === 'BUSINESS' || c.category === 'Commercial' || c.category === 'Industrial').length);
  occasionalCount = computed(() => this.customers().filter(c => c.category === 'OCCASIONAL').length);
  generalCount = computed(() => this.customers().filter(c => c.category === 'GENERAL' || c.category === 'Recycling Partner').length);

  // Customer segment cards (Customer page): drive the 4 filter cards from one list
  customerSegments = computed(() => {
    const segments = [
      {
        key: 'HOUSEHOLD',
        name: 'Household',
        subtitle: 'Neighborhood & Apartments',
        tone: 'household',
        count: this.householdCount(),
        services: ['Weekly / daily cleaning', 'Waste disposal'],
        fleet: 'Curbside & Multi-Tenant'
      },
      {
        key: 'BUSINESS',
        name: 'Business',
        subtitle: 'Industrial, Company, Service',
        tone: 'business',
        count: this.businessCount(),
        services: ['Weekly / daily cleaning', 'Waste disposal', 'Site clearing'],
        fleet: 'Heavy Roll-off & Balers'
      },
      {
        key: 'OCCASIONAL',
        name: 'Occasional',
        subtitle: 'Events & Parties',
        tone: 'occasional',
        count: this.occasionalCount(),
        services: ['Event clean-up & disposal'],
        fleet: 'Overnight & On-Demand'
      },
      {
        key: 'GENERAL',
        name: 'General',
        subtitle: 'Roadside & Public Spaces',
        tone: 'general',
        count: this.generalCount(),
        services: ['Roadside clean-up & disposal'],
        fleet: 'Highway & Public Sweeps'
      }
    ];
    const total = segments.reduce((sum, s) => sum + s.count, 0);
    return segments.map(s => ({ ...s, share: total ? Math.round((s.count / total) * 100) : 0 }));
  });

  toggleCustomerSegment(key: string): void {
    this.setCustomerCategoryFilter(this.customerCategoryFilter() === key ? 'All' : key);
  }

  // ==========================================
  // STAFF & DRIVERS COMPUTED
  // ==========================================
  filteredCleaningStaff = computed(() => {
    let list = this.cleaningStaff();
    const gender = this.staffGenderFilter();
    const role = this.staffRoleFilter();
    const location = this.staffLocationFilter();
    const query = this.searchQuery().toLowerCase().trim();

    if (gender !== 'All') {
      list = list.filter(s => s.gender === gender);
    }

    if (role === 'Supervisor') {
      list = list.filter(s => s.isSupervisor);
    } else if (role === 'Cleaning Staff') {
      list = list.filter(s => !s.isSupervisor);
    }

    if (location !== 'All') {
      list = list.filter(s => s.assignedLocation.toLowerCase().includes(location.toLowerCase()));
    }

    if (query) {
      list = list.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.staffCode.toLowerCase().includes(query) ||
        s.assignedLocation.toLowerCase().includes(query) ||
        (s.assignedSupervisorName && s.assignedSupervisorName.toLowerCase().includes(query))
      );
    }

    return list;
  });

  filteredDrivers = computed(() => {
    let list = this.drivers();
    const query = this.searchQuery().toLowerCase().trim();

    if (query) {
      list = list.filter(d =>
        d.name.toLowerCase().includes(query) ||
        d.driverCode.toLowerCase().includes(query) ||
        d.licenseNumber.toLowerCase().includes(query) ||
        d.assignedTruckPlate.toLowerCase().includes(query) ||
        d.assignedLocation.toLowerCase().includes(query) ||
        d.assignedSupervisor.toLowerCase().includes(query) ||
        d.assignedStaffTeam.some(st => st.toLowerCase().includes(query))
      );
    }

    return list;
  });

  maleStaffCount = computed(() => this.cleaningStaff().filter(s => s.gender === 'Male').length);
  femaleStaffCount = computed(() => this.cleaningStaff().filter(s => s.gender === 'Female').length);
  supervisorsCount = computed(() => this.cleaningStaff().filter(s => s.isSupervisor).length);
  staffAtLocationsCount = computed(() => this.cleaningStaff().filter(s => s.status === 'At Location' || s.status === 'On Duty').length);
  activeDriversCount = computed(() => this.drivers().filter(d => d.status.includes('On Site') || d.status.includes('En Route')).length);

  // ==========================================
  // REQUEST PAGE COMPUTED (One-Off / New Customer)
  // ==========================================
  filteredOneOffRequests = computed(() => {
    let list = this.oneOffRequests();
    const category = this.requestCategoryFilter();
    const status = this.requestStatusFilter();
    const query = this.tableSearchQuery().toLowerCase().trim();

    if (category !== 'All') {
      list = list.filter(r => r.customerCategory.toLowerCase() === category.toLowerCase());
    }

    if (status !== 'All') {
      list = list.filter(r => r.status === status);
    }

    if (query) {
      list = list.filter(r =>
        r.requestCode.toLowerCase().includes(query) ||
        r.customerName.toLowerCase().includes(query) ||
        r.serviceRequested.toLowerCase().includes(query) ||
        r.locationAddress.toLowerCase().includes(query) ||
        r.zoneLga.toLowerCase().includes(query) ||
        r.specificNeeds.toLowerCase().includes(query) ||
        (r.assignedDriver && r.assignedDriver.toLowerCase().includes(query))
      );
    }

    return list;
  });

  pendingOneOffRequestsCount = computed(() => this.oneOffRequests().filter(r => r.status === 'Pending').length);

  // ==========================================
  // COLLECTION SCHEDULE COMPUTED
  // ==========================================
  filteredSchedules = computed(() => {
    let list = this.schedules();
    const freq = this.scheduleFrequencyFilter();
    const cat = this.scheduleCategoryFilter();
    const query = this.tableSearchQuery().toLowerCase().trim();

    if (freq !== 'All') {
      list = list.filter(s => s.frequency === freq);
    }

    if (cat !== 'All') {
      list = list.filter(s => s.category.toLowerCase().includes(cat.toLowerCase()));
    }

    if (query) {
      list = list.filter(s =>
        s.scheduleCode.toLowerCase().includes(query) ||
        s.clientName.toLowerCase().includes(query) ||
        s.serviceType.toLowerCase().includes(query) ||
        s.location.toLowerCase().includes(query) ||
        s.assignedDriver.toLowerCase().includes(query) ||
        s.assignedSupervisor.toLowerCase().includes(query)
      );
    }

    return list;
  });

  dailySchedulesCount = computed(() => this.schedules().filter(s => s.frequency === 'Every day').length);
  twoDaySchedulesCount = computed(() => this.schedules().filter(s => s.frequency === 'Every 2 days').length);
  weeklySchedulesCount = computed(() => this.schedules().filter(s => s.frequency === 'Weekly').length);
  monthlySchedulesCount = computed(() => this.schedules().filter(s => s.frequency === 'Monthly').length);

  // ==========================================
  // FLEET MANAGEMENT COMPUTED
  // ==========================================
  filteredFleetTrucks = computed(() => {
    let list = this.fleetTrucks();
    const mission = this.fleetMissionFilter();
    const status = this.fleetStatusFilter();
    const query = this.searchQuery().toLowerCase().trim();

    if (mission !== 'All') {
      list = list.filter(t => t.customerCategory.toLowerCase() === mission.toLowerCase() || t.assignmentMission.toLowerCase().includes(mission.toLowerCase()));
    }

    if (status !== 'All') {
      if (status === 'Dispatched') {
        list = list.filter(t => t.statusType === 'busy' || t.statusType === 'active');
      } else if (status === 'Available') {
        list = list.filter(t => t.statusType === 'available');
      } else if (status === 'Maintenance') {
        list = list.filter(t => t.statusType === 'maintenance');
      }
    }

    if (query) {
      list = list.filter(t =>
        t.truckCode.toLowerCase().includes(query) ||
        t.plateNumber.toLowerCase().includes(query) ||
        t.vehicleModel.toLowerCase().includes(query) ||
        t.assignedDriver.toLowerCase().includes(query) ||
        t.assignedSupervisor.toLowerCase().includes(query) ||
        t.assignedCustomerOrSite.toLowerCase().includes(query) ||
        t.destinationLocation.toLowerCase().includes(query)
      );
    }

    return list;
  });

  dispatchedTrucksCount = computed(() => this.fleetTrucks().filter(t => t.statusType === 'busy' || t.statusType === 'active').length);
  availableTrucksCount = computed(() => this.fleetTrucks().filter(t => t.statusType === 'available').length);

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

  // ==========================================
  // CUSTOMER PAGE SERVICE REQUEST HANDLERS
  // ==========================================
  openRequestServiceModal(customer?: CustomerAccount, presetService?: string): void {
    if (customer) {
      this.selectedCustomerForService.set(customer);
      this.serviceRequestForm.customerId = customer.id;
      this.serviceRequestForm.customerName = customer.name;
      this.serviceRequestForm.category = customer.category;
      this.serviceRequestForm.serviceType = (presetService || customer.activeService || 'Weekly Cleaning') as any;
      this.serviceRequestForm.cleaningFrequency = presetService === 'Daily Cleaning' ? 'Daily' : 'Weekly';
    } else {
      this.selectedCustomerForService.set(null);
      this.serviceRequestForm.customerId = '';
      this.serviceRequestForm.customerName = '';
      this.serviceRequestForm.category = 'HOUSEHOLD';
      this.serviceRequestForm.serviceType = 'Weekly Cleaning';
      this.serviceRequestForm.cleaningFrequency = 'Weekly';
    }
    this.serviceRequestForm.preferredDate = 'Today, Immediate';
    this.serviceRequestForm.notes = '';
    this.requestServiceModalOpen.set(true);
  }

  closeRequestServiceModal(): void {
    this.requestServiceModalOpen.set(false);
    this.selectedCustomerForService.set(null);
  }

  submitCustomerServiceRequest(): void {
    if (!this.serviceRequestForm.customerName.trim()) {
      this.triggerToast('Please provide customer name.');
      return;
    }

    const newReq: OneOffCustomerRequest = {
      id: `req-once-${Date.now()}`,
      requestCode: `REQ-ONCE-${Math.floor(2000 + Math.random() * 8000)}`,
      customerName: this.serviceRequestForm.customerName,
      customerCategory: (this.serviceRequestForm.category === 'HOUSEHOLD' || this.serviceRequestForm.category === 'Residential' ? 'Household' :
        this.serviceRequestForm.category === 'BUSINESS' || this.serviceRequestForm.category === 'Commercial' || this.serviceRequestForm.category === 'Industrial' ? 'Business' :
        this.serviceRequestForm.category === 'OCCASIONAL' ? 'Occasional' : 'General'),
      isNewCustomer: false,
      requestType: 'On-Demand',
      serviceRequested: (this.serviceRequestForm.serviceType as any) || 'Weekly or Daily Cleaning',
      specificNeeds: this.serviceRequestForm.notes || `${this.serviceRequestForm.serviceType} booked from Customer console`,
      contactPhone: '+234 800 123 4567',
      locationAddress: 'Lagos Zone',
      zoneLga: 'Eti-Osa (Victoria Island / Lekki)',
      requestedDate: this.serviceRequestForm.preferredDate || 'Scheduled next cycle',
      preferredTime: 'Morning Shift',
      urgency: 'Normal',
      status: 'Pending',
      estimatedFee: '₦65,000'
    };

    this.oneOffRequests.update(prev => [newReq, ...prev]);
    this.triggerToast(`Request "${newReq.serviceRequested}" submitted for ${newReq.customerName}.`);
    this.closeRequestServiceModal();
  }

  // ==========================================
  // STAFF & DRIVERS HANDLERS
  // ==========================================
  setStaffSubTab(tab: 'staff' | 'drivers'): void {
    this.staffSubTab.set(tab);
  }

  setStaffGenderFilter(gender: string): void {
    this.staffGenderFilter.set(gender);
  }

  setStaffRoleFilter(role: string): void {
    this.staffRoleFilter.set(role);
  }

  setStaffLocationFilter(location: string): void {
    this.staffLocationFilter.set(location);
  }

  openAssignStaffModal(staff: CleaningStaffMember): void {
    this.selectedStaff.set(staff);
    this.assignStaffModalOpen.set(true);
  }

  closeAssignStaffModal(): void {
    this.assignStaffModalOpen.set(false);
    this.selectedStaff.set(null);
  }

  saveStaffAssignment(newLocation: string, supervisor?: string): void {
    const current = this.selectedStaff();
    if (!current) return;

    this.cleaningStaff.update(prev =>
      prev.map(s => s.id === current.id ? {
        ...s,
        assignedLocation: newLocation,
        assignedSupervisorName: supervisor || s.assignedSupervisorName,
        status: 'At Location'
      } : s)
    );

    this.triggerToast(`${current.name} reassigned to ${newLocation}. Supervisor notified.`);
    this.closeAssignStaffModal();
  }

  openAssignDriverModal(driver: DriverRecord): void {
    this.selectedDriver.set(driver);
    this.assignDriverModalOpen.set(true);
  }

  closeAssignDriverModal(): void {
    this.assignDriverModalOpen.set(false);
    this.selectedDriver.set(null);
  }

  saveDriverAssignment(location: string, supervisor: string): void {
    const current = this.selectedDriver();
    if (!current) return;

    this.drivers.update(prev =>
      prev.map(d => d.id === current.id ? {
        ...d,
        assignedLocation: location,
        assignedSupervisor: supervisor,
        status: 'On Site with Staff'
      } : d)
    );

    this.triggerToast(`Driver ${current.name} dispatched with cleaning crew to ${location}.`);
    this.closeAssignDriverModal();
  }

  // ==========================================
  // REQUEST (ONE-OFF / NEW CUSTOMERS) HANDLERS
  // ==========================================
  setRequestCategoryFilter(category: string): void {
    this.requestCategoryFilter.set(category);
  }

  setRequestStatusFilter(status: string): void {
    this.requestStatusFilter.set(status);
  }

  openNewOneOffRequestModal(): void {
    this.newOneOffRequestModalOpen.set(true);
  }

  closeNewOneOffRequestModal(): void {
    this.newOneOffRequestModalOpen.set(false);
  }

  submitOneOffRequest(): void {
    if (!this.newOneOffRequestForm.customerName.trim()) {
      this.triggerToast('Please enter customer name.');
      return;
    }

    const newReq: OneOffCustomerRequest = {
      id: `req-once-${Date.now()}`,
      requestCode: `REQ-ONCE-${Math.floor(2000 + Math.random() * 8000)}`,
      customerName: this.newOneOffRequestForm.customerName.trim(),
      customerCategory: this.newOneOffRequestForm.customerCategory,
      isNewCustomer: true,
      requestType: 'Once / New Customer',
      serviceRequested: this.newOneOffRequestForm.serviceRequested,
      specificNeeds: this.newOneOffRequestForm.specificNeeds || 'One-time on-demand service requested',
      contactPhone: this.newOneOffRequestForm.contactPhone || '+234 800 000 0000',
      locationAddress: this.newOneOffRequestForm.locationAddress || 'Lagos Address',
      zoneLga: this.newOneOffRequestForm.zoneLga,
      requestedDate: 'Today',
      preferredTime: 'Immediate',
      urgency: this.newOneOffRequestForm.urgency,
      status: 'Pending',
      estimatedFee: this.newOneOffRequestForm.estimatedFee
    };

    this.oneOffRequests.update(prev => [newReq, ...prev]);
    this.triggerToast(`New customer request ${newReq.requestCode} created successfully.`);
    this.closeNewOneOffRequestModal();

    // Reset form
    this.newOneOffRequestForm.customerName = '';
    this.newOneOffRequestForm.specificNeeds = '';
    this.newOneOffRequestForm.locationAddress = '';
    this.newOneOffRequestForm.contactPhone = '';
  }

  openAssignRequestModal(req: OneOffCustomerRequest): void {
    this.selectedOneOffRequest.set(req);
    this.assignRequestModalOpen.set(true);
  }

  closeAssignRequestModal(): void {
    this.assignRequestModalOpen.set(false);
    this.selectedOneOffRequest.set(null);
  }

  assignRequestPersonnel(driver: string, supervisor: string, truckPlate: string): void {
    const current = this.selectedOneOffRequest();
    if (!current) return;

    this.oneOffRequests.update(prev =>
      prev.map(r => r.id === current.id ? {
        ...r,
        assignedDriver: driver,
        assignedSupervisor: supervisor,
        assignedTruckPlate: truckPlate,
        assignedStaffCrew: 'LGA Field Crew',
        status: 'Staff & Driver Assigned'
      } : r)
    );

    this.triggerToast(`Staff & Driver assigned to ${current.requestCode}.`);
    this.closeAssignRequestModal();
  }

  dispatchOneOffRequest(req: OneOffCustomerRequest): void {
    this.oneOffRequests.update(prev =>
      prev.map(r => r.id === req.id ? { ...r, status: 'Dispatched' } : r)
    );
    this.triggerToast(`Dispatched crew and driver for ${req.requestCode} (${req.customerName}).`);
  }

  completeOneOffRequest(req: OneOffCustomerRequest): void {
    this.oneOffRequests.update(prev =>
      prev.map(r => r.id === req.id ? { ...r, status: 'Completed' } : r)
    );
    this.triggerToast(`Request ${req.requestCode} marked as completed!`);
  }

  // ==========================================
  // COLLECTION SCHEDULE HANDLERS
  // ==========================================
  setScheduleFrequencyFilter(freq: string): void {
    this.scheduleFrequencyFilter.set(freq);
  }

  setScheduleCategoryFilter(cat: string): void {
    this.scheduleCategoryFilter.set(cat);
  }

  openNewScheduleModal(): void {
    this.newScheduleModalOpen.set(true);
  }

  closeNewScheduleModal(): void {
    this.newScheduleModalOpen.set(false);
  }

  submitNewSchedule(): void {
    if (!this.newScheduleForm.clientName.trim()) {
      this.triggerToast('Please provide client name for schedule.');
      return;
    }

    const codePrefix = this.newScheduleForm.frequency === 'Every day' ? 'SCH-ED' :
      this.newScheduleForm.frequency === 'Every 2 days' ? 'SCH-2D' :
      this.newScheduleForm.frequency === 'Weekly' ? 'SCH-WK' : 'SCH-MO';

    const newSch: CollectionScheduleRecord = {
      id: `sch-${Date.now()}`,
      scheduleCode: `${codePrefix}-${Math.floor(100 + Math.random() * 900)}`,
      clientName: this.newScheduleForm.clientName.trim(),
      category: this.newScheduleForm.category,
      serviceType: this.newScheduleForm.serviceType,
      frequency: this.newScheduleForm.frequency,
      timeSlot: this.newScheduleForm.timeSlot,
      recurrenceDays: this.newScheduleForm.recurrenceDays,
      location: this.newScheduleForm.location || 'Lagos Address',
      lga: this.newScheduleForm.lga,
      assignedSupervisor: this.newScheduleForm.assignedSupervisor,
      assignedDriver: this.newScheduleForm.assignedDriver,
      assignedTruck: this.newScheduleForm.assignedTruck,
      staffCount: this.newScheduleForm.staffCount,
      nextRunDate: 'Tomorrow, Scheduled Cycle',
      status: 'Active'
    };

    this.schedules.update(prev => [newSch, ...prev]);
    this.triggerToast(`Recurring schedule "${newSch.scheduleCode}" registered successfully.`);
    this.closeNewScheduleModal();

    this.newScheduleForm.clientName = '';
    this.newScheduleForm.location = '';
  }

  toggleScheduleStatus(sch: CollectionScheduleRecord): void {
    const nextStatus = sch.status === 'Paused' ? 'Active' : 'Paused';
    this.schedules.update(prev =>
      prev.map(s => s.id === sch.id ? { ...s, status: nextStatus } : s)
    );
    this.triggerToast(`Schedule ${sch.scheduleCode} is now ${nextStatus}.`);
  }

  triggerAdHocRun(sch: CollectionScheduleRecord): void {
    this.triggerToast(`Ad-hoc sweep dispatched for ${sch.clientName} (${sch.scheduleCode}).`);
  }

  // ==========================================
  // FLEET MANAGEMENT HANDLERS
  // ==========================================
  setFleetMissionFilter(filter: string): void {
    this.fleetMissionFilter.set(filter);
  }

  setFleetStatusFilter(status: string): void {
    this.fleetStatusFilter.set(status);
  }

  openAssignFleetModal(truck: WasteTruckFleetRecord): void {
    this.selectedFleetTruck.set(truck);
    this.assignFleetModalOpen.set(true);
  }

  closeAssignFleetModal(): void {
    this.assignFleetModalOpen.set(false);
    this.selectedFleetTruck.set(null);
  }

  saveFleetAssignment(driver: string, supervisor: string, mission: any, customer: string, location: string): void {
    const current = this.selectedFleetTruck();
    if (!current) return;

    this.fleetTrucks.update(prev =>
      prev.map(t => t.id === current.id ? {
        ...t,
        assignedDriver: driver,
        assignedSupervisor: supervisor,
        assignmentMission: mission,
        assignedCustomerOrSite: customer,
        destinationLocation: location,
        status: 'Dispatched & On Route',
        statusType: 'active'
      } : t)
    );

    this.triggerToast(`Truck ${current.plateNumber} assigned to ${driver} for ${mission} at ${customer}.`);
    this.closeAssignFleetModal();
  }

  recallFleetTruck(truck: WasteTruckFleetRecord): void {
    this.fleetTrucks.update(prev =>
      prev.map(t => t.id === truck.id ? {
        ...t,
        status: 'In Depot / Available',
        statusType: 'available',
        destinationLocation: 'Central Depot - Ikeja'
      } : t)
    );
    this.triggerToast(`Truck ${truck.plateNumber} recalled to central depot.`);
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
