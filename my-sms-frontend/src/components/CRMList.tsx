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
import { MoreHorizontal, Phone, Mail, MessageSquare, Users } from "lucide-react"
import CustomAlert from "./CustomAlert"
import { Link } from "react-router-dom"

interface CRM {
  crmId: number
  userId: number
  interactionType: string
  interactionDetails: string
  recordedAt: string
  subject: string
  outcome: string
}

export function CRMList() {
  const [crmData, setCrmData] = useState<CRM[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchCRM = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/crm")
        setCrmData(response.data)
      } catch (error) {
        console.error("Error fetching CRM interactions:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchCRM()
  }, [])

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "CALL":
        return <Phone className="w-4 h-4" />
      case "EMAIL":
        return <Mail className="w-4 h-4" />
      case "CHAT":
        return <MessageSquare className="w-4 h-4" />
      case "MEETING":
        return <Users className="w-4 h-4" />
      default:
        return null
    }
  }

  const getInteractionColor = (type: string) => {
    switch (type) {
      case "CALL":
        return "bg-blue-500"
      case "EMAIL":
        return "bg-green-500"
      case "CHAT":
        return "bg-purple-500"
      case "MEETING":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      {error && <CustomAlert message="Error fetching CRM interactions" variant="error" />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Outcome</TableHead>
            <TableHead>Recorded At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {crmData.map((crm) => (
            <TableRow key={crm.crmId}>
              <TableCell>{crm.crmId}</TableCell>
              <TableCell>{crm.userId}</TableCell>
              <TableCell>
                <Badge className={getInteractionColor(crm.interactionType)}>
                  <span className="flex items-center gap-1">
                    {getInteractionIcon(crm.interactionType)}
                    {crm.interactionType}
                  </span>
                </Badge>
              </TableCell>
              <TableCell>{crm.subject || "N/A"}</TableCell>
              <TableCell className="max-w-[300px] truncate">{crm.interactionDetails}</TableCell>
              <TableCell>{crm.outcome || "N/A"}</TableCell>
              <TableCell>{new Date(crm.recordedAt).toLocaleString()}</TableCell>
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
                      <Link to={`/crm/${crm.crmId}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={`/crm/${crm.crmId}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete CRM interaction #${crm.crmId}?`)) {
                          try {
                            await axios.delete(`/api/crm/${crm.crmId}`);
                            window.location.reload();
                          } catch (error) {
                            console.error('Error deleting CRM interaction:', error);
                            alert('Failed to delete CRM interaction');
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

