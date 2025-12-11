"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { EditServiceDialog } from "./EditServiceDialog"
import { DeleteServiceDialog } from "./DeleteServiceDialog"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { services } from "@/lib/services-data"
import type { Service } from "@/types"
import axios from "axios"

export function ServicesTable() {
  const [page, setPage] = useState(1)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [deletingService, setDeletingService] = useState<Service | null>(null)

  const itemsPerPage = 5
  const totalPages = Math.ceil(services.length / itemsPerPage)
  const paginatedServices = services.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  const fetchServices = async () => {
    try{
      const response = await axios.get("/api/services")
      console.log(response.data)
      // setServices(response.data) // Assuming you have a state to set the services
    }catch(error){
      console.error("Error fetching services:", error)
    }
    
    
  }

  useEffect(()=>{
    
  })

  return (
    <div className="space-y-4">
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Service Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Created At</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.id}</TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell className="hidden md:table-cell max-w-[300px] truncate">{service.description}</TableCell>
                <TableCell>
                  <Badge
                    variant={service.status === "Active" ? "default" : "secondary"}
                    className={
                      service.status === "Active" ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 hover:bg-gray-500"
                    }
                  >
                    {service.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(service.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setEditingService(service)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setDeletingService(service)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <div className="text-sm font-medium">
          Page {page} of {totalPages}
        </div>
        <Button variant="outline" size="sm" onClick={() => setPage(page + 1)} disabled={page === totalPages}>
          Next
        </Button>
      </div>

      {/* Edit Dialog */}
      <EditServiceDialog
        service={editingService}
        open={!!editingService}
        onOpenChange={(open) => !open && setEditingService(null)}
      />

      {/* Delete Dialog */}
      <DeleteServiceDialog
        service={deletingService}
        open={!!deletingService}
        onOpenChange={(open) => !open && setDeletingService(null)}
      />
    </div>
  )
}
