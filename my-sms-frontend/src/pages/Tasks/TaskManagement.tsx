import React from 'react'
import { TaskList } from '../../components/TaskList'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function TaskManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Task Management</h1>
        <Link to="/tasks/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Task
          </Button>
        </Link>
      </div>
      <TaskList />
    </div>
  )
}

export default TaskManagement

