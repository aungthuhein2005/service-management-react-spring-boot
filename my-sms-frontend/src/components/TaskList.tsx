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
import { Link } from "react-router-dom"
import CustomAlert from "./CustomAlert"

interface Task {
  taskId: number
  ticketId: number
  assignedTo: {
    userId: number
    username: string
    email: string
    role: string
  }
  description: string
  status: string
  dueDate: string
  approvalStatus: string
  createdAt: string
  updatedAt: string
}

export function TaskList() {
  const [taskData, setTaskData] = useState<Task[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true)
      setError(false)
      try {
        const response = await axios.get("/api/tasks")
        setTaskData(response.data || [])
      } catch (error: any) {
        console.error("Error fetching tasks:", error)
        console.error("Error details:", error.response?.data || error.message)
        setError(true)
        // Set empty array on error to prevent rendering issues
        setTaskData([])
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500"
      case "IN_PROGRESS":
        return "bg-blue-500"
      case "ESCALATED":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getApprovalColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500"
      case "REJECTED":
        return "bg-red-500"
      default:
        return "bg-yellow-500"
    }
  }

  if (loading) return <div className="p-4">Loading tasks...</div>

  return (
    <>
      {error && (
        <CustomAlert 
          message="Error fetching tasks. Please ensure the backend server is running and has been restarted to include the new endpoints." 
          variant="error" 
        />
      )}
      {!error && taskData.length === 0 && !loading && (
        <div className="p-4 text-center text-gray-500">
          No tasks found.
        </div>
      )}
      {taskData.length > 0 && (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Ticket ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Approval</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {taskData.map((task) => (
            <TableRow key={task.taskId}>
              <TableCell>{task.taskId}</TableCell>
              <TableCell>
                <Link to={`/tickets/${task.ticketId}`} className="text-blue-600 hover:underline">
                  {task.ticketId}
                </Link>
              </TableCell>
              <TableCell className="max-w-[300px] truncate">{task.description}</TableCell>
              <TableCell>{task.assignedTo?.username || "Unassigned"}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              </TableCell>
              <TableCell>
                <Badge className={getApprovalColor(task.approvalStatus)}>{task.approvalStatus}</Badge>
              </TableCell>
              <TableCell>
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
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
                      <Link to={`/tasks/${task.taskId}`}>View Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to={`/tasks/${task.taskId}/edit`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={async () => {
                        if (confirm(`Are you sure you want to delete task #${task.taskId}?`)) {
                          try {
                            await axios.delete(`/api/tasks/${task.taskId}`);
                            window.location.reload();
                          } catch (error) {
                            console.error('Error deleting task:', error);
                            alert('Failed to delete task');
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
      )}
    </>
  )
}

