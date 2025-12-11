import React from 'react'
import { CRMList } from '../../components/CRMList'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function CRMManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">CRM Management</h1>
        <Link to="/crm/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Log Interaction
          </Button>
        </Link>
      </div>
      <CRMList />
    </div>
  )
}

export default CRMManagement

