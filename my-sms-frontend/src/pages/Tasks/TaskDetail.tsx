import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, Calendar, FileText } from "lucide-react";
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

interface Task {
  taskId: number;
  ticketId: number;
  assignedTo: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  description: string;
  status: string;
  dueDate: string;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
}

function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [task, setTask] = useState<Task | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/tasks/${id}`);
      setTask(response.data);
      setStatus(response.data.status);
    } catch (error: any) {
      console.error("Error fetching task details:", error);
      setError("Failed to fetch task details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      navigate("/tasks");
    } catch (error: any) {
      console.error("Error deleting task:", error);
      setError("Failed to delete task. Please try again.");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      await axios.patch(`/api/tasks/${id}/status`, newStatus, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus(newStatus);
      if (task) {
        setTask({ ...task, status: newStatus });
      }
    } catch (error: any) {
      console.error("Error updating task status:", error);
      setError("Failed to update task status. Please try again.");
    }
  };

  const handleApprovalChange = async (newApproval: string) => {
    try {
      await axios.patch(`/api/tasks/${id}/approval`, newApproval, {
        headers: { "Content-Type": "application/json" },
      });
      if (task) {
        setTask({ ...task, approvalStatus: newApproval });
      }
    } catch (error: any) {
      console.error("Error updating approval status:", error);
      setError("Failed to update approval status. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-500";
      case "IN_PROGRESS":
        return "bg-blue-500";
      case "ESCALATED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getApprovalColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading task details...</div>
      </div>
    );
  }

  if (error && !task) {
    return (
      <div className="container mx-auto py-10">
        <CustomAlert message={error} variant="error" />
        <Link to="/tasks">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Button>
        </Link>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Task not found</div>
        <Link to="/tasks">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tasks
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <Link to="/tasks">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Task #{task.taskId}</h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/tasks/${id}/edit`}>
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
              <CardTitle>Task Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Description:</span>
                <span className="text-right max-w-md">{task.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Approval Status:</span>
                <Badge className={getApprovalColor(task.approvalStatus)}>
                  {task.approvalStatus}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Assigned To:</span>
                <span>{task.assignedTo?.name || "Unassigned"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Ticket ID:</span>
                <Link to={`/tickets/${task.ticketId}`} className="text-blue-600 hover:underline">
                  #{task.ticketId}
                </Link>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Due Date:</span>
                <span>
                  {task.dueDate ? new Date(task.dueDate).toLocaleString() : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(task.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Last Updated:</span>
                <span>{new Date(task.updatedAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Task Created</p>
                    <p className="text-sm text-gray-500">
                      Task was created and assigned to {task.assignedTo?.name || "Unassigned"}
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(task.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
                {task.updatedAt !== task.createdAt && (
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Task Updated</p>
                      <p className="text-sm text-gray-500">Task details were last modified</p>
                      <p className="text-xs text-gray-400">
                        {new Date(task.updatedAt).toLocaleString()}
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
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="ESCALATED">Escalated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Update Approval</label>
                <Select value={task.approvalStatus} onValueChange={handleApprovalChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="APPROVED">Approved</SelectItem>
                    <SelectItem value="REJECTED">Rejected</SelectItem>
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
              This action cannot be undone. This will permanently delete task #{task.taskId}.
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

export default TaskDetail;

