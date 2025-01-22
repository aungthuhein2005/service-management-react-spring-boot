import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Label } from '@radix-ui/react-label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import { getTicketTimeline } from '../../lib/data'

function TicketDetail() {
    const timeline = getTicketTimeline(1)
    let ticket = {
        id: 1,
        subject: "Subject",
        status: "Open",
        created: "2022-01-01",
        assignedTo: "John Doe",
        description: "lorem ipsum"
    }

    const [comment, setComment] = useState("")
  const [newStatus, setNewStatus] = useState(ticket.status)

  const handleAddComment = () => {
    // Here you would typically send the comment to your backend
    console.log("Adding comment:", comment)
    setComment("")
  }

  const handleStatusChange = (value: string) => {
    // Here you would typically update the ticket status in your backend
    console.log("Changing status to:", value)
    setNewStatus(value as "Open" | "Pending" | "Resolved")
  }
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Ticket #{ticket.id}</h1>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
                <CardTitle>{ticket.subject}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
            <Badge
              variant={ticket.status === "Open" ? "default" : ticket.status === "Pending" ? "secondary" : "success"}
            >
              {ticket.status}
            </Badge>
                </div>
                <div className="flex justify-between">
            <span className="font-semibold">Created:</span>
            <span>{new Date(ticket.created).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Assigned To:</span>
            <span>{ticket.assignedTo || "Unassigned"}</span>
          </div>
          <div>
            <p className="mt-2">{ticket.description}</p>
          </div>
                </div>
            </CardContent>
          </Card>
          <Card className='mt-6'>
      <CardHeader>
        <CardTitle>Ticket Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {timeline.map((event, index) => (
            <li key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {event.icon}
              </div>
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-gray-500">{event.description}</p>
                <p className="text-xs text-gray-400">{new Date(event.timestamp).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
        
        </div>
        <div>
        <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="status">Update Status</Label>
          <Select value={newStatus} onValueChange={handleStatusChange}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select new status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="comment">Add Comment</Label>
          <Textarea
            id="comment"
            placeholder="Type your comment here."
            // value={comment}
            // onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button  className="w-full">
          Add Comment
        </Button>
      </CardContent>
    </Card>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
