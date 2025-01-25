import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { getTicketTimeline } from "../../lib/data";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { CalendarClock, Handshake } from "lucide-react";
import CustomAlert from "../../components/CustomAlert";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Comments from "../../components/Comments";
import { get } from "http";
import { getStatusColor } from "../../utils/getStatusColor";

function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const timeline = getTicketTimeline(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [ticket, setTicket] = useState<{
    subject: string;
    status: string;
    created: string;
    assignedTo?: Object;
    description: string;
  } | null>(null);
  const [commentList, setCommentList] = useState<
    { userId: number; comment: string; createdAt: string }[]
  >([]);

  useEffect(() => {
    // Fetch ticket details
    axios
      .get(`http://localhost:8484/api/tickets/${id}`)
      .then((response) => {
        console.log(response.data);
        setTicket(response.data);
        setCommentList(response.data.comments);
        setNewStatus(response.data.status);
      })
      .catch((error) => {
        console.error("Error fetching ticket details:", error);
        setError("Failed to fetch ticket details. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const [comment, setComment] = useState("");
  const [newStatus, setNewStatus] = useState("Open");
  const handleAddComment = () => {
    if (!comment.trim()) return; // Prevent empty comments
  
    axios
      .post(`http://localhost:8484/api/tickets/${id}/comments`, null, {
        params: {
          userId: 1,
          comment: comment,
        },
      })
      .then((response) => {
        console.log(response.data);
  
        // Ensure the new comment is correctly formatted
        const newComment = {
          userId: 1, // Assuming current user is ID 1
          comment: comment,
          createdAt: new Date().toISOString(), // Or response.data.createdAt if provided
        };
  
        setCommentList((prevComments) => [...prevComments, response.data]); // Append new comment
        setComment(""); // Clear input after posting
      })
      .catch((error) => {
        console.error("Error adding comment:", error);
        setError("Failed to add comment. Please try again.");
      });
  };
  

  const handleStatusChange = (value: string) => {
    // Update the ticket status in the backend (not implemented)
    axios.patch(`http://localhost:8484/api/tickets/${id}/status`, 
    value,{
      headers: {
        'Content-Type': 'application/json', // Set content type to plain text
      }}
    )
    .then((response) => {
      console.log(response.data);
      setNewStatus(value);
      if (ticket) {
        ticket.status = value;
      }
    })
    .catch((error) => {
      console.log(error);
      
      console.error("Error updating ticket status:", error);
      setError("Failed to update ticket status. Please try again.");
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Ticket #{id}</h1>
      {error && (
        <div className="my-4">
          <CustomAlert type="error" message={error} variant={"destructive"} />
        </div>
      )}
      {loading || ticket == null ? (
        "Loading..."
      ) : (
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
                      className={getStatusColor(ticket.status)}
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
                    <span>
                      {ticket.assignedTo != null ? (
                        <Link to={`users/detail/${ticket.assignedTo.id}`}>
                          {ticket.assignedTo.name}
                        </Link>
                      ) : (
                        "Unassigned"
                      )}
                    </span>
                  </div>
                  <div>
                    <p className="mt-2">{ticket.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Ticket Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <CalendarClock />
                    </div>
                    <div>
                      <p className="font-medium">Ticket Created</p>
                      <p className="text-sm text-gray-500">
                        Ticket was created by System Administrator
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(ticket.created).toLocaleString()}
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Handshake />
                    </div>
                    <div>
                      <p className="font-medium">Assigned To</p>
                      <p className="text-sm text-gray-500">
                        Ticket was assigned to{" "}
                        <span className="font-bold">
                          {ticket.assignedTo.name}
                        </span>
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Comments commentList={commentList} />
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
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="IN_PROGRESS">In progress</SelectItem>
                      <SelectItem value="RESOLVED">Resolved</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Add Comment</Label>
                  <Textarea
                    id="comment"
                    placeholder="Type your comment here."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <Button className="w-full" onClick={handleAddComment}>
                  Add Comment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketDetail;
