import React from 'react'
import { ReportList } from '../../components/ReportList'
import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'

function ReportManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Reports & Analytics</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Generate Report
        </Button>
      </div>
      <ReportList />
    </div>
  )
}

export default ReportManagement

