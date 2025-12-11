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
import { MoreHorizontal } from "lucide-react"
import CustomAlert from "./CustomAlert"
import { Link } from "react-router-dom"

interface Invoice {
  invoiceId: number
  userId: number
  ticketId: number
  totalAmount: number
  paymentStatus: string
  paymentMethod: string
  invoiceNumber: string
  createdAt: string
  dueDate: string
  paidAt: string
}

export function InvoiceList() {
  const [invoiceData, setInvoiceData] = useState<Invoice[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/invoices")
        setInvoiceData(response.data)
      } catch (error) {
        console.error("Error fetching invoices:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500"
      case "PENDING":
        return "bg-yellow-500"
      case "FAILED":
        return "bg-red-500"
      case "CANCELLED":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      {error && <CustomAlert message="Error fetching invoices" variant="error" />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Status</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceData.map((invoice) => (
            <TableRow key={invoice.invoiceId}>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.userId}</TableCell>
              <TableCell>{invoice.ticketId || "N/A"}</TableCell>
              <TableCell>${invoice.totalAmount?.toFixed(2) || "0.00"}</TableCell>
              <TableCell>
                <Badge className={getPaymentStatusColor(invoice.paymentStatus)}>
                  {invoice.paymentStatus}
                </Badge>
              </TableCell>
              <TableCell>{invoice.paymentMethod || "N/A"}</TableCell>
              <TableCell>
                {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "N/A"}
              </TableCell>
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
                      <Link to={`/invoices/${invoice.invoiceId}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={`/invoices/${invoice.invoiceId}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete invoice ${invoice.invoiceNumber}?`)) {
                          try {
                            await axios.delete(`/api/invoices/${invoice.invoiceId}`);
                            window.location.reload();
                          } catch (error) {
                            console.error('Error deleting invoice:', error);
                            alert('Failed to delete invoice');
                          }
                        }
                      }}
                      className="text-red-600"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

