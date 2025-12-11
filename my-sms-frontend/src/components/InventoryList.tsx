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
import { MoreHorizontal, AlertTriangle } from "lucide-react"
import CustomAlert from "./CustomAlert"
import { Link } from "react-router-dom"

interface Inventory {
  itemId: number
  name: string
  category: string
  quantity: number
  restockThreshold: number
  barcode: string
  description: string
  unitPrice: number
}

export function InventoryList() {
  const [inventoryData, setInventoryData] = useState<Inventory[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchInventory = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/inventory")
        setInventoryData(response.data)
      } catch (error) {
        console.error("Error fetching inventory:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchInventory()
  }, [])

  const isLowStock = (quantity: number, threshold: number) => {
    return quantity < threshold
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      {error && <CustomAlert message="Error fetching inventory" variant="error" />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Threshold</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Barcode</TableHead>
            <TableHead>Unit Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventoryData.map((item) => (
            <TableRow key={item.itemId}>
              <TableCell>{item.itemId}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.restockThreshold}</TableCell>
              <TableCell>
                {isLowStock(item.quantity, item.restockThreshold) ? (
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    Low Stock
                  </Badge>
                ) : (
                  <Badge variant="default" className="bg-green-500">In Stock</Badge>
                )}
              </TableCell>
              <TableCell>{item.barcode || "N/A"}</TableCell>
              <TableCell>${item.unitPrice?.toFixed(2) || "0.00"}</TableCell>
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
                      <Link to={`/inventory/${item.itemId}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={`/inventory/${item.itemId}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
                          try {
                            await axios.delete(`/api/inventory/${item.itemId}`);
                            window.location.reload();
                          } catch (error) {
                            console.error('Error deleting inventory:', error);
                            alert('Failed to delete inventory item');
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

