import { MessageCircle, UserCheck, AlertTriangle, CheckCircle2 } from "lucide-react"

export type Ticket = {
    id: number;               // ticket_id
    userId: number;           // user_id
    subject: string;          // subject
    description: string;      // description
    priority: "Low" | "Medium" | "High" | "Critical";  // priority ENUM
    status: "Open" | "In Progress" | "Resolved" | "Closed"; // status ENUM
    createdAt: string;        // created_at (ISO date string)
    updatedAt: string;        // updated_at (ISO date string)
    assignedTo?: number | null;  // assigned_to (nullable)
    slaDueDate?: string | null;  // sla_due_date (nullable)
  };

  export interface TimelineEvent {
    title: string
    description: string
    timestamp: string
  }
  // CREATE TABLE users ( user_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL, phone VARCHAR(20), role ENUM('admin', 'technician', 'customer') NOT NULL, password_hash VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP )
  export interface User {
    id: number
    name: string
    email: string
    phone: string | null
    role: "admin" | "technician" | "customer"
    createdAt: string
  }

  export const users: User[] = [
    {
      id: 101,
      name: "John Doe",
      email: "johndoe@gmail.com",
      phone: "123-456-7890",
      role: "technician",
      createdAt: "2023-06-01T09:00:00Z",
    },
    {
      id: 102,
      name: "Jane Smith",
      email: "janesmith@gmail.com",
      phone: "234-567-8901",
      role: "technician",
      createdAt: "2023-06-02T14:30:00Z",
    },
    {
      id: 103,
      name: "Alice Johnson",
      email: "alicejohnson@gmail.com",
      phone: "345-678-9012",
      role: "customer",
      createdAt: "2023-06-03T11:00:00Z",
    },
    {
      id: 104,
      name: "Bob Brown",
      email: "bobbrown@gmail.com",
      phone: "456-789-0123",
      role: "customer",
      createdAt: "2023-06-04T12:00:00Z",
    },
    {
      id: 105,
      name: "Charlie Davis",
      email: "charliedavis@gmail.com",
      phone: "567-890-1234",
      role: "customer",
      createdAt: "2023-06-05T13:00:00Z",
    },
    {
      id: 106,
      name: "Diana Evans",
      email: "dianaevans@gmail.com",
      phone: "678-901-2345",
      role: "customer",
      createdAt: "2023-06-06T14:00:00Z",
    },
    {
      id: 107,
      name: "Ethan Foster",
      email: "ethanfoster@gmail.com",
      phone: "789-012-3456",
      role: "customer",
      createdAt: "2023-06-07T15:00:00Z",
    },
    {
      id: 108,
      name: "Fiona Green",
      email: "fionagreen@gmail.com",
      phone: "890-123-4567",
      role: "customer",
      createdAt: "2023-06-08T16:00:00Z",
    },
    {
      id: 109,
      name: "George Harris",
      email: "georgeharris@gmail.com",
      phone: "901-234-5678",
      role: "customer",
      createdAt: "2023-06-09T17:00:00Z",
    },
    {
      id: 110,
      name: "Hannah White",
      email: "hannahwhite@gmail.com",
      phone: "012-345-6789",
      role: "customer",
      createdAt: "2023-06-10T18:00:00Z",
    },
    {
      id: 111,
      name: "Ian King",
      email: "ianking@gmail.com",
      phone: "123-456-7890",
      role: "customer",
      createdAt: "2023-06-11T19:00:00Z",
    },
    {
      id: 112,
      name: "Julia Lee",
      email: "julialee@gmail.com",
      phone: "234-567-8901",
      role: "customer",
      createdAt: "2023-06-12T20:00:00Z",
    }
  ]
  


  export const tickets: Ticket[] = [
    {
      id: 1,
      userId: 101,
      subject: "System Crash",
      description: "The system crashes when trying to log in.",
      priority: "High",
      status: "Open",
      createdAt: "2024-01-22T10:00:00Z",
      updatedAt: "2024-01-22T12:00:00Z",
      assignedTo: 201,
      slaDueDate: "2024-01-25T10:00:00Z",
    },
    {
      id: 2,
      userId: 102,
      subject: "Feature Request: Dark Mode",
      description: "Requesting a dark mode option for better UX.",
      priority: "Low",
      status: "In Progress",
      createdAt: "2024-01-21T15:30:00Z",
      updatedAt: "2024-01-22T08:45:00Z",
      assignedTo: null,
      slaDueDate: null,
    },
{
  id: 3,
  userId: 103,
  subject: "Login Issue",
  description: "Unable to login with correct credentials.",
  priority: "Medium",
  status: "Open",
  createdAt: "2024-01-20T09:00:00Z",
  updatedAt: "2024-01-20T09:30:00Z",
  assignedTo: 202,
  slaDueDate: "2024-01-23T09:00:00Z",
},
{
  id: 4,
  userId: 104,
  subject: "Data Sync Error",
  description: "Data not syncing between devices.",
  priority: "High",
  status: "Open",
  createdAt: "2024-01-19T14:00:00Z",
  updatedAt: "2024-01-19T14:45:00Z",
  assignedTo: 203,
  slaDueDate: "2024-01-22T14:00:00Z",
},
{
  id: 5,
  userId: 105,
  subject: "UI Bug",
  description: "Button not responsive on mobile.",
  priority: "Low",
  status: "In Progress",
  createdAt: "2024-01-18T11:00:00Z",
  updatedAt: "2024-01-18T12:00:00Z",
  assignedTo: null,
  slaDueDate: null,
},
{
  id: 6,
  userId: 106,
  subject: "Performance Issue",
  description: "Application is slow during peak hours.",
  priority: "Critical",
  status: "Open",
  createdAt: "2024-01-17T10:00:00Z",
  updatedAt: "2024-01-17T10:30:00Z",
  assignedTo: 204,
  slaDueDate: "2024-01-20T10:00:00Z",
},
{
  id: 7,
  userId: 107,
  subject: "Security Vulnerability",
  description: "Potential security vulnerability detected.",
  priority: "Critical",
  status: "Open",
  createdAt: "2024-01-16T09:00:00Z",
  updatedAt: "2024-01-16T09:45:00Z",
  assignedTo: 205,
  slaDueDate: "2024-01-19T09:00:00Z",
},
{
  id: 8,
  userId: 108,
  subject: "Feature Request: Multi-language Support",
  description: "Requesting support for multiple languages.",
  priority: "Medium",
  status: "Open",
  createdAt: "2024-01-15T08:00:00Z",
  updatedAt: "2024-01-15T08:30:00Z",
  assignedTo: null,
  slaDueDate: null,
},
{
  id: 9,
  userId: 109,
  subject: "Billing Issue",
  description: "Incorrect billing amount displayed.",
  priority: "High",
  status: "In Progress",
  createdAt: "2024-01-14T07:00:00Z",
  updatedAt: "2024-01-14T07:45:00Z",
  assignedTo: 206,
  slaDueDate: "2024-01-17T07:00:00Z",
},
{
  id: 10,
  userId: 110,
  subject: "Account Deletion Request",
  description: "Requesting account deletion.",
  priority: "Medium",
  status: "Open",
  createdAt: "2024-01-13T06:00:00Z",
  updatedAt: "2024-01-13T06:30:00Z",
  assignedTo: null,
  slaDueDate: null,
},
{
  id: 11,
  userId: 111,
  subject: "Email Notification Issue",
  description: "Not receiving email notifications.",
  priority: "Low",
  status: "Open",
  createdAt: "2024-01-12T05:00:00Z",
  updatedAt: "2024-01-12T05:30:00Z",
  assignedTo: 207,
  slaDueDate: "2024-01-15T05:00:00Z",
},
{
  id: 12,
  userId: 112,
  subject: "Password Reset Issue",
  description: "Unable to reset password.",
  priority: "High",
  status: "Open",
  createdAt: "2024-01-11T04:00:00Z",
  updatedAt: "2024-01-11T04:30:00Z",
  assignedTo: 208,
  slaDueDate: "2024-01-14T04:00:00Z",
}
  ];

  const ticketTimelines: { [key: number]: TimelineEvent[] } = {
    1: [
      {
        title: "Ticket Created",
        description: "Ticket was created by System Administrator",
        timestamp: "2023-06-01T09:00:00Z",
        
      },
      {
        title: "Assigned to Network Team",
        description: "Ticket was assigned to the Network Support Team",
        timestamp: "2023-06-01T09:15:00Z",
       
      },
      {
        title: "Comment Added",
        description: "Initial diagnosis suggests a possible router failure",
        timestamp: "2023-06-01T10:30:00Z",
       
      },
    ],
    2: [
      {
        title: "Ticket Created",
        description: "Ticket was created by HR Manager",
        timestamp: "2023-06-02T14:30:00Z",
       
      },
      {
        title: "Assigned to John Doe",
        description: "Ticket was assigned to John Doe from IT Support",
        timestamp: "2023-06-02T14:45:00Z",
      },
      {
        title: "Status Updated",
        description: "Status changed from 'Open' to 'Pending'",
        timestamp: "2023-06-02T15:30:00Z",
        
      },
    ],
    3: [
      {
        title: "Ticket Created",
        description: "Ticket was created by Office Manager",
        timestamp: "2023-06-03T11:15:00Z",
      
      },
      {
        title: "Assigned to Jane Smith",
        description: "Ticket was assigned to Jane Smith from Facilities",
        timestamp: "2023-06-03T11:30:00Z",
        
      },
      {
        title: "Status Updated",
        description: "Status changed from 'Open' to 'Resolved'",
        timestamp: "2023-06-03T12:00:00Z",
       
      },
    ],
    4: [
      {
        title: "Ticket Created",
        description: "Ticket was created by Software Developer",
        timestamp: "2023-06-04T16:45:00Z",
        
      },
    ],
    5: [
      {
        title: "Ticket Created",
        description: "Ticket was created by HR Manager",
        timestamp: "2023-06-05T10:00:00Z",
        
      },
    ],
  }

  
export function getTicketById(id: number): Ticket | undefined {
  return tickets.find((ticket) => ticket.id === id)
}

export function getTicketTimeline(id: number): TimelineEvent[] {
  return ticketTimelines[id] || []
}
