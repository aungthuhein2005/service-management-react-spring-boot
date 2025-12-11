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
import { ArrowLeft, Edit, Trash2, Package } from "lucide-react";
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

interface Inventory {
  itemId: number;
  name: string;
  category: string;
  quantity: number;
  restockThreshold: number;
  barcode: string;
  description: string;
  unitPrice: number;
  createdAt: string;
  updatedAt: string;
}

function InventoryDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inventory, setInventory] = useState<Inventory | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchInventory();
  }, [id]);

  const fetchInventory = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/inventory/${id}`);
      setInventory(response.data);
    } catch (error: any) {
      console.error("Error fetching inventory details:", error);
      setError("Failed to fetch inventory details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/inventory/${id}`);
      navigate("/inventory");
    } catch (error: any) {
      console.error("Error deleting inventory:", error);
      setError("Failed to delete inventory item. Please try again.");
    }
  };

  const isLowStock = inventory ? inventory.quantity <= inventory.restockThreshold : false;

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading inventory details...</div>
      </div>
    );
  }

  if (error && !inventory) {
    return (
      <div className="container mx-auto py-10">
        <CustomAlert message={error} variant="error" />
        <Link to="/inventory">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inventory
          </Button>
        </Link>
      </div>
    );
  }

  if (!inventory) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Inventory item not found</div>
        <Link to="/inventory">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inventory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <Link to="/inventory">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">{inventory.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/inventory/${id}/edit`}>
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
              <CardTitle>Item Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Category:</span>
                <span>{inventory.category || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Quantity:</span>
                <Badge className={isLowStock ? "bg-red-500" : "bg-green-500"}>
                  {inventory.quantity}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Restock Threshold:</span>
                <span>{inventory.restockThreshold}</span>
              </div>
              {isLowStock && (
                <div className="p-3 bg-yellow-100 border border-yellow-400 rounded">
                  <p className="text-yellow-800 font-semibold">Low Stock Alert</p>
                  <p className="text-sm text-yellow-700">
                    Quantity is at or below restock threshold. Please reorder soon.
                  </p>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-semibold">Barcode:</span>
                <span>{inventory.barcode || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Unit Price:</span>
                <span>${inventory.unitPrice?.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Value:</span>
                <span className="font-bold">
                  ${((inventory.quantity || 0) * (inventory.unitPrice || 0)).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Description:</span>
                <span className="text-right max-w-md">{inventory.description || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(inventory.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Last Updated:</span>
                <span>{new Date(inventory.updatedAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Item History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Item Added</p>
                    <p className="text-sm text-gray-500">Item was added to inventory</p>
                    <p className="text-xs text-gray-400">
                      {new Date(inventory.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
                {inventory.updatedAt !== inventory.createdAt && (
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Item Updated</p>
                      <p className="text-sm text-gray-500">Item details were last modified</p>
                      <p className="text-xs text-gray-400">
                        {new Date(inventory.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete inventory item "{inventory.name}".
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

export default InventoryDetail;

