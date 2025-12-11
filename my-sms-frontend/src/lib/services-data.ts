export interface Service {
    id: number
    name: string
    description: string
    status: "Active" | "Inactive"
    createdAt: string
  }
  
  export const services: Service[] = [
    {
      id: 1,
      name: "Network Maintenance",
      description: "Regular maintenance and monitoring of network infrastructure to ensure optimal performance.",
      status: "Active",
      createdAt: "2023-01-15T09:00:00Z",
    },
    {
      id: 2,
      name: "Software Installation",
      description: "Installation and configuration of software applications on client systems.",
      status: "Active",
      createdAt: "2023-02-20T14:30:00Z",
    },
    {
      id: 3,
      name: "Hardware Repair",
      description: "Diagnosis and repair of hardware issues for computers, printers, and other office equipment.",
      status: "Active",
      createdAt: "2023-03-10T11:15:00Z",
    },
    {
      id: 4,
      name: "Cloud Migration",
      description: "Services to help businesses migrate their data and applications to cloud platforms.",
      status: "Inactive",
      createdAt: "2023-04-05T16:45:00Z",
    },
    {
      id: 5,
      name: "Security Audit",
      description: "Comprehensive assessment of IT security measures and identification of vulnerabilities.",
      status: "Active",
      createdAt: "2023-05-12T10:00:00Z",
    },
    {
      id: 6,
      name: "Data Backup",
      description: "Regular backup of critical business data to prevent loss in case of system failures.",
      status: "Active",
      createdAt: "2023-06-18T13:20:00Z",
    },
    {
      id: 7,
      name: "VPN Setup",
      description: "Configuration of Virtual Private Networks for secure remote access to company resources.",
      status: "Inactive",
      createdAt: "2023-07-22T15:10:00Z",
    },
    {
      id: 8,
      name: "Email Configuration",
      description: "Setup and configuration of email services for business communication.",
      status: "Active",
      createdAt: "2023-08-30T09:45:00Z",
    },
  ]
  