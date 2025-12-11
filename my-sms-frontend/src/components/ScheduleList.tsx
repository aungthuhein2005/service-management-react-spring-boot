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

interface Schedule {
  scheduleId: number
  taskId: number
  technician: {
    userId: number
    username: string
    email: string
    role: string
  }
  scheduledDate: string
  status: string
  geoLocation: string
  notes: string
}

export function ScheduleList() {
  const [scheduleData, setScheduleData] = useState<Schedule[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/schedules")
        setScheduleData(response.data)
      } catch (error) {
        console.error("Error fetching schedules:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchSchedules()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500"
      case "SCHEDULED":
        return "bg-blue-500"
      case "CANCELLED":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      {error && <CustomAlert message="Error fetching schedules" variant="error" />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Task ID</TableHead>
            <TableHead>Technician</TableHead>
            <TableHead>Scheduled Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map((schedule) => (
            <TableRow key={schedule.scheduleId}>
              <TableCell>{schedule.scheduleId}</TableCell>
              <TableCell>{schedule.taskId}</TableCell>
              <TableCell>{schedule.technician?.username || "Unassigned"}</TableCell>
              <TableCell>{new Date(schedule.scheduledDate).toLocaleString()}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
              </TableCell>
              <TableCell>{schedule.geoLocation || "N/A"}</TableCell>
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
                      <Link to={`/schedules/${schedule.scheduleId}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={`/schedules/${schedule.scheduleId}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete schedule #${schedule.scheduleId}?`)) {
                          try {
                            await axios.delete(`/api/schedules/${schedule.scheduleId}`);
                            window.location.reload();
                          } catch (error) {
                            console.error('Error deleting schedule:', error);
                            alert('Failed to delete schedule');
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

