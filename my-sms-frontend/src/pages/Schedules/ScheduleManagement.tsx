import React from 'react'
import { ScheduleList } from '../../components/ScheduleList'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function ScheduleManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Schedule Management</h1>
        <Link to="/schedules/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Schedule
          </Button>
        </Link>
      </div>
      <ScheduleList />
    </div>
  )
}

export default ScheduleManagement

