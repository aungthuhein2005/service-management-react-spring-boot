import React from 'react'
import { InvoiceList } from '../../components/InvoiceList'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function InvoiceManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Invoice Management</h1>
        <Link to="/invoices/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Invoice
          </Button>
        </Link>
      </div>
      <InvoiceList />
    </div>
  )
}

export default InvoiceManagement

