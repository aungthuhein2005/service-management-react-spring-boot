import React from 'react'
import { InventoryList } from '../../components/InventoryList'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function InventoryManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Inventory Management</h1>
        <Link to="/inventory/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Item
          </Button>
        </Link>
      </div>
      <InventoryList />
    </div>
  )
}

export default InventoryManagement

