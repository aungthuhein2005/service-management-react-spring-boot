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

interface MobileAccess {
  accessId: number
  userId: number
  deviceInfo: string
  deviceType: string
  ipAddress: string
  lastAccess: string
  isActive: boolean
}

export function MobileAccessList() {
  const [accessData, setAccessData] = useState<MobileAccess[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMobileAccess = async () => {
      setLoading(true)
      setError(false)
      try {
        const response = await axios.get("/api/mobile-access")
        setAccessData(response.data || [])
      } catch (error: any) {
        console.error("Error fetching mobile access:", error)
        console.error("Error details:", error.response?.data || error.message)
        setError(true)
        // Set empty array on error to prevent rendering issues
        setAccessData([])
      } finally {
        setLoading(false)
      }
    }

    fetchMobileAccess()
  }, [])

  if (loading) return <div className="p-4">Loading mobile access data...</div>

  return (
    <>
      {error && (
        <CustomAlert 
          message="Error fetching mobile access data. Please ensure the backend server is running and has been restarted to include the new endpoints." 
          variant="error" 
        />
      )}
      {!error && accessData.length === 0 && !loading && (
        <div className="p-4 text-center text-gray-500">
          No mobile access records found.
        </div>
      )}
      {accessData.length > 0 && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Device Info</TableHead>
            <TableHead>Device Type</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Access</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accessData.map((access) => (
            <TableRow key={access.accessId}>
              <TableCell>{access.accessId}</TableCell>
              <TableCell>{access.userId}</TableCell>
              <TableCell>{access.deviceInfo}</TableCell>
              <TableCell>{access.deviceType || "Unknown"}</TableCell>
              <TableCell>{access.ipAddress || "N/A"}</TableCell>
              <TableCell>
                <Badge className={access.isActive ? "bg-green-500" : "bg-gray-500"}>
                  {access.isActive ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell>{new Date(access.lastAccess).toLocaleString()}</TableCell>
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
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Revoke Access</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      )}
    </>
  )
}

