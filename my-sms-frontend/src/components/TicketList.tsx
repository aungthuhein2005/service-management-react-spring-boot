"use client"

import { useEffect, useState } from "react"
import axios from "axios"
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
import { type Ticket } from "@/lib/data"
import { Link } from "react-router-dom"
import CustomAlert from "./CustomAlert"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { log } from "console"
import { getStatusColor } from "../utils/getStatusColor"

export function TicketList() {
  const [ticketData, setTicketData] = useState<Ticket[]>()
  const [error, setError] = useState({status: false, message: ""})
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [size, setSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `http://localhost:8484/api/tickets?page=${page-1}&size=${size}`
        )
        setTicketData(response.data.content) // ✅ Only store ticket list
        console.log(response.data);
        setTotalPages(response.data.totalPages) // ✅ Save total pages
      } catch (error) {
        console.error("Error fetching tickets:", error)
        setError({status: true, message: error.message})
      } finally {
        setLoading(false)
      }
    }

    fetchTickets()
  }, [page, size])

 

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
    setTicketData(
      ticketData.map((ticket) => (ticket.id === ticketId ? { ...ticket, assignedTo: technicianName } : ticket))
    )
  }

  return (
    <>
      {error.status && <div className="my-2"><CustomAlert message={error.message} variant="error" /></div>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ticketData && ticketData.map((ticket) => (
            <TableRow key={ticket.ticket_id}>
              <TableCell>{ticket.ticket_id}</TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                {getSLAStatus(ticket.createdAt, ticket.status)}
              </TableCell>
              <TableCell>{new Date(ticket.createdAt).toLocaleString()}</TableCell>
              <TableCell>{ticket.assignedTo != null ? <Link to={`users/detail/${ticket.assignedTo.id}`}>{ticket.assignedTo.name }</Link>: "Unassigned"}</TableCell>
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
                    <DropdownMenuItem>
                      <Link to={`/tickets/${ticket.ticket_id}`}>View Details</Link>
                    </DropdownMenuItem>
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

      {/* Pagination */}
      <Pagination>
        <PaginationContent>
            <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              if (page > 1) setPage(page - 1)
              }}
            />
            </PaginationItem>

          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
                <PaginationLink
                href="#"
                isActive={page === index + 1}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  setPage(index + 1)
                }}
                >
                {index + 1}
                </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

            <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.preventDefault()
              if (page < totalPages) setPage(page + 1)
              }}
            />
            </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
