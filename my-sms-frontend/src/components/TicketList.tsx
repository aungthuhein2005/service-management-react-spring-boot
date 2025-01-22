"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, AlertCircle } from "lucide-react"
import { type Ticket, tickets } from "@/lib/data"
import { Link } from "react-router-dom"

export function TicketList() {
  const [ticketData, setTicketData] = useState<Ticket[]>(tickets)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Resolved":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSLAStatus = (created: string, status: string) => {
    if (status === "Resolved") return null
    const createdDate = new Date(created)
    const now = new Date()
    const diff = now.getTime() - createdDate.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    if (hours < 24) return null
    return (
      <Badge variant="destructive" className="ml-2">
        <AlertCircle className="w-3 h-3 mr-1" />
        SLA Breach
      </Badge>
    )
  }

  const assignTechnician = (ticketId: number, technicianName: string) => {
    // setTicketData(
    //   ticketData.map((ticket) => (ticket.id === ticketId ? { ...ticket, assignedTo: technicianName } : ticket)),
    // )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Assigned To</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ticketData.map((ticket) => (
          <TableRow key={ticket.id}>
            <TableCell>{ticket.id}</TableCell>
            <TableCell>{ticket.subject}</TableCell>
            <TableCell>
              <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
              {getSLAStatus(ticket.createdAt, ticket.status)}
            </TableCell>
            <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
            <TableCell>{ticket.assignedTo || "Unassigned"}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  
                  <DropdownMenuItem><Link to={`/tickets/${ticket.id}`}>View Details</Link></DropdownMenuItem>
                  
                  <DropdownMenuItem>View History</DropdownMenuItem>
                  <DropdownMenuItem>Update</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

