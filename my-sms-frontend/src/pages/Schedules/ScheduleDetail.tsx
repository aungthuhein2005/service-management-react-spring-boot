import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Calendar, Clock, MapPin } from "lucide-react";
import axios from "axios";
import CustomAlert from "../../components/CustomAlert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

interface Schedule {
  scheduleId: number;
  taskId: number;
  technician: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  scheduledDate: string;
  status: string;
  geoLocation: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

function ScheduleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchSchedule();
  }, [id]);

  const fetchSchedule = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/schedules/${id}`);
      setSchedule(response.data);
      setStatus(response.data.status);
    } catch (error: any) {
      console.error("Error fetching schedule details:", error);
      setError("Failed to fetch schedule details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/schedules/${id}`);
      navigate("/schedules");
    } catch (error: any) {
      console.error("Error deleting schedule:", error);
      setError("Failed to delete schedule. Please try again.");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axios.patch(`/api/schedules/${id}/status`, newStatus, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus(newStatus);
      if (schedule) {
        setSchedule({ ...schedule, status: newStatus });
      }
    } catch (error: any) {
      console.error("Error updating schedule status:", error);
      setError("Failed to update schedule status. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500";
      case "IN_PROGRESS":
        return "bg-blue-500";
      case "CANCELLED":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading schedule details...</div>
      </div>
    );
  }

  if (error && !schedule) {
    return (
      <div className="container mx-auto py-10">
        <CustomAlert message={error} variant="error" />
        <Link to="/schedules">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Schedules
          </Button>
        </Link>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Schedule not found</div>
        <Link to="/schedules">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Schedules
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <Link to="/schedules">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Schedule #{schedule.scheduleId}</h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/schedules/${id}/edit`}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </Link>
          <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      {error && (
        <div className="my-4">
          <CustomAlert message={error} variant="error" />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <Badge className={getStatusColor(schedule.status)}>{schedule.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Scheduled Date:</span>
                <span>{new Date(schedule.scheduledDate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Technician:</span>
                <span>{schedule.technician?.name || "Unassigned"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Task ID:</span>
                <Link to={`/tasks/${schedule.taskId}`} className="text-blue-600 hover:underline">
                  #{schedule.taskId}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Geo Location:</span>
                <span>{schedule.geoLocation || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Notes:</span>
                <span className="text-right max-w-md">{schedule.notes || "No notes"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(schedule.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Last Updated:</span>
                <span>{new Date(schedule.updatedAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Schedule Created</p>
                    <p className="text-sm text-gray-500">
                      Schedule was created for {schedule.technician?.name || "technician"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(schedule.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
                {schedule.updatedAt !== schedule.createdAt && (
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Schedule Updated</p>
                      <p className="text-sm text-gray-500">Schedule details were last modified</p>
                      <p className="text-xs text-gray-400">
                        {new Date(schedule.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Update Status</label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete schedule #{schedule.scheduleId}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ScheduleDetail;

