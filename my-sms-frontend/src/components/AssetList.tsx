"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
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

interface Asset {
  assetId: number
  name: string
  serialNumber: string
  category: string
  status: string
  location: string
  lastMaintenanceDate: string
  nextMaintenanceDate: string
}

export function AssetList() {
  const [assetData, setAssetData] = useState<Asset[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/assets")
        setAssetData(response.data)
      } catch (error) {
        console.error("Error fetching assets:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-500"
      case "IN_USE":
        return "bg-blue-500"
      case "UNDER_MAINTENANCE":
        return "bg-yellow-500"
      case "RETIRED":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      {error && <CustomAlert message="Error fetching assets" variant="error" />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Next Maintenance</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assetData.map((asset) => (
            <TableRow key={asset.assetId}>
              <TableCell>{asset.assetId}</TableCell>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.serialNumber}</TableCell>
              <TableCell>{asset.category}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
              </TableCell>
              <TableCell>{asset.location || "N/A"}</TableCell>
              <TableCell>
                {asset.nextMaintenanceDate ? new Date(asset.nextMaintenanceDate).toLocaleDateString() : "N/A"}
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
                      <Link to={`/assets/${asset.assetId}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={`/assets/${asset.assetId}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete asset "${asset.name}"?`)) {
                          try {
                            await axios.delete(`/api/assets/${asset.assetId}`);
                            window.location.reload();
                          } catch (error) {
                            console.error('Error deleting asset:', error);
                            alert('Failed to delete asset');
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

