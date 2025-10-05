export interface Device {
  id: string;
  name: string;
  type: "macOS" | "Windows" | "iOS" | "Android";
  model: string;
  user: string;
  status: "Active" | "Pending Setup" | "Offline" | "Needs Attention";
  compliance: "Compliant" | "Non-Compliant" | "Warning";
  lastCheckIn: string;
  location: string;
  serialNumber: string;
  osVersion: string;
  encryption: boolean;
  firewall: boolean;
  antivirus: boolean;
  lat: number;
  lng: number;
}

export interface Ticket {
  id: string;
  subject: string;
  user: string;
  priority: "Urgent" | "High" | "Normal" | "Low";
  status: "New" | "In Progress" | "Waiting" | "Resolved";
  assignedTo: string;
  createdDate: string;
  description: string;
}

export interface Activity {
  id: string;
  type: string;
  device: string;
  user: string;
  timestamp: string;
  description: string;
}

export const devices: Device[] = [
  {
    id: "DEV001",
    name: "MacBook-Sarah-Marketing",
    type: "macOS",
    model: "MacBook Pro 16\" M3",
    user: "Sarah Johnson",
    status: "Active",
    compliance: "Compliant",
    lastCheckIn: "2 mins ago",
    location: "New York, USA",
    serialNumber: "C02XK1GHJG5H",
    osVersion: "macOS 14.2",
    encryption: true,
    firewall: true,
    antivirus: true,
    lat: 40.7128,
    lng: -74.0060,
  },
  {
    id: "DEV002",
    name: "DESKTOP-Mike-Dev",
    type: "Windows",
    model: "Dell Latitude 5430",
    user: "Mike Chen",
    status: "Active",
    compliance: "Warning",
    lastCheckIn: "15 mins ago",
    location: "Singapore",
    serialNumber: "DLAT543012345",
    osVersion: "Windows 11 Pro",
    encryption: true,
    firewall: true,
    antivirus: false,
    lat: 1.3521,
    lng: 103.8198,
  },
  {
    id: "DEV003",
    name: "iPhone-Emma-Sales",
    type: "iOS",
    model: "iPhone 15 Pro",
    user: "Emma Wilson",
    status: "Active",
    compliance: "Compliant",
    lastCheckIn: "5 mins ago",
    location: "London, UK",
    serialNumber: "F2LY3HN8Q1MN",
    osVersion: "iOS 17.2",
    encryption: true,
    firewall: true,
    antivirus: true,
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: "DEV004",
    name: "MacBook-James-Design",
    type: "macOS",
    model: "MacBook Air M2",
    user: "James Rodriguez",
    status: "Offline",
    compliance: "Non-Compliant",
    lastCheckIn: "2 days ago",
    location: "Berlin, Germany",
    serialNumber: "C02ZK9WXMD6R",
    osVersion: "macOS 13.6",
    encryption: false,
    firewall: false,
    antivirus: false,
    lat: 52.5200,
    lng: 13.4050,
  },
  {
    id: "DEV005",
    name: "Pixel-Alex-Support",
    type: "Android",
    model: "Google Pixel 8",
    user: "Alex Kumar",
    status: "Active",
    compliance: "Compliant",
    lastCheckIn: "1 hour ago",
    location: "Sydney, Australia",
    serialNumber: "GPIX8234567",
    osVersion: "Android 14",
    encryption: true,
    firewall: true,
    antivirus: true,
    lat: -33.8688,
    lng: 151.2093,
  },
  {
    id: "DEV006",
    name: "DESKTOP-Lisa-Finance",
    type: "Windows",
    model: "Lenovo ThinkPad X1",
    user: "Lisa Park",
    status: "Active",
    compliance: "Compliant",
    lastCheckIn: "10 mins ago",
    location: "Toronto, Canada",
    serialNumber: "LNVTP1X789012",
    osVersion: "Windows 11 Pro",
    encryption: true,
    firewall: true,
    antivirus: true,
    lat: 43.6532,
    lng: -79.3832,
  },
  {
    id: "DEV007",
    name: "MacBook-Tom-Exec",
    type: "macOS",
    model: "MacBook Pro 14\" M3 Pro",
    user: "Tom Anderson",
    status: "Needs Attention",
    compliance: "Warning",
    lastCheckIn: "3 hours ago",
    location: "San Francisco, USA",
    serialNumber: "C02ZL5KLHV2Y",
    osVersion: "macOS 14.1",
    encryption: true,
    firewall: true,
    antivirus: false,
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: "DEV008",
    name: "iPhone-Sophie-HR",
    type: "iOS",
    model: "iPhone 14 Pro Max",
    user: "Sophie Dubois",
    status: "Active",
    compliance: "Compliant",
    lastCheckIn: "8 mins ago",
    location: "Paris, France",
    serialNumber: "F2MN4JQ9R2OP",
    osVersion: "iOS 17.1",
    encryption: true,
    firewall: true,
    antivirus: true,
    lat: 48.8566,
    lng: 2.3522,
  },
];

export const tickets: Ticket[] = [
  {
    id: "TKT001",
    subject: "Cannot access VPN on new device",
    user: "Sarah Johnson",
    priority: "High",
    status: "In Progress",
    assignedTo: "IT Support Team",
    createdDate: "2024-01-10 09:30",
    description: "User reports VPN connection fails repeatedly on newly issued MacBook Pro.",
  },
  {
    id: "TKT002",
    subject: "Request software installation - Adobe Suite",
    user: "James Rodriguez",
    priority: "Normal",
    status: "New",
    assignedTo: "Unassigned",
    createdDate: "2024-01-10 11:15",
    description: "User needs Adobe Creative Cloud suite for design work.",
  },
  {
    id: "TKT003",
    subject: "Device offline for 2+ days",
    user: "Mike Chen",
    priority: "Urgent",
    status: "In Progress",
    assignedTo: "Security Team",
    createdDate: "2024-01-09 14:20",
    description: "Device has not checked in for 2 days. User not responding to emails.",
  },
  {
    id: "TKT004",
    subject: "Password reset required",
    user: "Emma Wilson",
    priority: "Low",
    status: "Resolved",
    assignedTo: "IT Support Team",
    createdDate: "2024-01-08 10:00",
    description: "User locked out of account after too many failed attempts.",
  },
  {
    id: "TKT005",
    subject: "Compliance alert - encryption disabled",
    user: "James Rodriguez",
    priority: "Urgent",
    status: "New",
    assignedTo: "Security Team",
    createdDate: "2024-01-10 13:45",
    description: "Automated scan detected FileVault is disabled on user's device.",
  },
];

export const activities: Activity[] = [
  {
    id: "ACT001",
    type: "enrollment",
    device: "MacBook-Sarah-Marketing",
    user: "Sarah Johnson",
    timestamp: "2 hours ago",
    description: "Device successfully enrolled in MDM",
  },
  {
    id: "ACT002",
    type: "compliance",
    device: "DESKTOP-Mike-Dev",
    user: "Mike Chen",
    timestamp: "3 hours ago",
    description: "Compliance check completed - 1 warning found",
  },
  {
    id: "ACT003",
    type: "deployment",
    device: "iPhone-Emma-Sales",
    user: "Emma Wilson",
    timestamp: "5 hours ago",
    description: "Deployed Slack v4.35.0 successfully",
  },
  {
    id: "ACT004",
    type: "alert",
    device: "MacBook-James-Design",
    user: "James Rodriguez",
    timestamp: "1 day ago",
    description: "Device offline for 24+ hours",
  },
  {
    id: "ACT005",
    type: "update",
    device: "DESKTOP-Lisa-Finance",
    user: "Lisa Park",
    timestamp: "1 day ago",
    description: "OS update to Windows 11 22H2 completed",
  },
];

export const getDeviceStats = () => {
  const total = devices.length;
  const online = devices.filter(d => d.status === "Active").length;
  const compliant = devices.filter(d => d.compliance === "Compliant").length;
  const complianceRate = Math.round((compliant / total) * 100);
  
  return {
    total,
    online,
    offline: total - online,
    complianceRate,
    pendingDeployments: 3,
    openTickets: tickets.filter(t => t.status !== "Resolved").length,
  };
};

export const getOSDistribution = () => {
  const distribution = devices.reduce((acc, device) => {
    acc[device.type] = (acc[device.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(distribution).map(([name, value]) => ({
    name,
    value,
  }));
};

export const getComplianceStats = () => {
  const compliant = devices.filter(d => d.compliance === "Compliant").length;
  const nonCompliant = devices.filter(d => d.compliance === "Non-Compliant").length;
  const warning = devices.filter(d => d.compliance === "Warning").length;
  
  return [
    { name: "Compliant", value: compliant },
    { name: "Non-Compliant", value: nonCompliant },
    { name: "Warning", value: warning },
  ];
};
