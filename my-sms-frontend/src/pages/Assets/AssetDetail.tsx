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
import { ArrowLeft, Edit, Trash2, Calendar, Wrench } from "lucide-react";
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

interface Asset {
  assetId: number;
  name: string;
  serialNumber: string;
  category: string;
  status: string;
  location: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  createdAt: string;
  updatedAt: string;
}

function AssetDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [asset, setAsset] = useState<Asset | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchAsset();
  }, [id]);

  const fetchAsset = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/assets/${id}`);
      setAsset(response.data);
      setStatus(response.data.status);
    } catch (error: any) {
      console.error("Error fetching asset details:", error);
      setError("Failed to fetch asset details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/assets/${id}`);
      navigate("/assets");
    } catch (error: any) {
      console.error("Error deleting asset:", error);
      setError("Failed to delete asset. Please try again.");
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    try {
      const updateData = { ...asset, status: newStatus };
      await axios.put(`/api/assets/${id}`, updateData);
      setStatus(newStatus);
      if (asset) {
        setAsset({ ...asset, status: newStatus });
      }
    } catch (error: any) {
      console.error("Error updating asset status:", error);
      setError("Failed to update asset status. Please try again.");
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "bg-green-500";
      case "IN_USE":
        return "bg-blue-500";
      case "UNDER_MAINTENANCE":
        return "bg-yellow-500";
      case "RETIRED":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading asset details...</div>
      </div>
    );
  }

  if (error && !asset) {
    return (
      <div className="container mx-auto py-10">
        <CustomAlert message={error} variant="error" />
        <Link to="/assets">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assets
          </Button>
        </Link>
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Asset not found</div>
        <Link to="/assets">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assets
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <Link to="/assets">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">{asset.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/assets/${id}/edit`}>
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
              <CardTitle>Asset Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Serial Number:</span>
                <span>{asset.serialNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Category:</span>
                <span>{asset.category || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <Badge className={getStatusColor(asset.status)}>{asset.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Location:</span>
                <span>{asset.location || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Last Maintenance:</span>
                <span>
                  {asset.lastMaintenanceDate
                    ? new Date(asset.lastMaintenanceDate).toLocaleString()
                    : "Never"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Next Maintenance:</span>
                <span>
                  {asset.nextMaintenanceDate
                    ? new Date(asset.nextMaintenanceDate).toLocaleString()
                    : "Not scheduled"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(asset.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Last Updated:</span>
                <span>{new Date(asset.updatedAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Wrench className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Asset Created</p>
                    <p className="text-sm text-gray-500">Asset was added to the system</p>
                    <p className="text-xs text-gray-400">
                      {new Date(asset.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
                {asset.lastMaintenanceDate && (
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Last Maintenance</p>
                      <p className="text-sm text-gray-500">Maintenance was performed</p>
                      <p className="text-xs text-gray-400">
                        {new Date(asset.lastMaintenanceDate).toLocaleString()}
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
                    <SelectItem value="AVAILABLE">Available</SelectItem>
                    <SelectItem value="IN_USE">In Use</SelectItem>
                    <SelectItem value="UNDER_MAINTENANCE">Under Maintenance</SelectItem>
                    <SelectItem value="RETIRED">Retired</SelectItem>
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
              This action cannot be undone. This will permanently delete asset "{asset.name}".
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

export default AssetDetail;

