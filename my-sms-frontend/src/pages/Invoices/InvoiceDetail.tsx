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
import { ArrowLeft, Edit, Trash2, FileText, DollarSign, Calendar } from "lucide-react";
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

interface Invoice {
  invoiceId: number;
  userId: number;
  ticketId: number;
  invoiceNumber: string;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  dueDate: string;
  paidAt: string;
}

function InvoiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    fetchInvoice();
  }, [id]);

  const fetchInvoice = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/invoices/${id}`);
      setInvoice(response.data);
      setPaymentStatus(response.data.paymentStatus);
    } catch (error: any) {
      console.error("Error fetching invoice details:", error);
      setError("Failed to fetch invoice details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/invoices/${id}`);
      navigate("/invoices");
    } catch (error: any) {
      console.error("Error deleting invoice:", error);
      setError("Failed to delete invoice. Please try again.");
    }
  };

  const handlePaymentStatusChange = async (newStatus: string) => {
    try {
      const updateData = { ...invoice, paymentStatus: newStatus };
      await axios.put(`/api/invoices/${id}`, updateData);
      setPaymentStatus(newStatus);
      if (invoice) {
        setInvoice({ ...invoice, paymentStatus: newStatus });
      }
    } catch (error: any) {
      console.error("Error updating payment status:", error);
      setError("Failed to update payment status. Please try again.");
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-green-500";
      case "PENDING":
        return "bg-yellow-500";
      case "FAILED":
        return "bg-red-500";
      case "CANCELLED":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading invoice details...</div>
      </div>
    );
  }

  if (error && !invoice) {
    return (
      <div className="container mx-auto py-10">
        <CustomAlert message={error} variant="error" />
        <Link to="/invoices">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Invoice not found</div>
        <Link to="/invoices">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Invoices
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <Link to="/invoices">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Invoice {invoice.invoiceNumber}</h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/invoices/${id}/edit`}>
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
              <CardTitle>Invoice Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Invoice Number:</span>
                <span className="font-mono">{invoice.invoiceNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${invoice.totalAmount?.toFixed(2) || "0.00"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Payment Status:</span>
                <Badge className={getPaymentStatusColor(invoice.paymentStatus)}>
                  {invoice.paymentStatus}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Payment Method:</span>
                <span>{invoice.paymentMethod || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Customer ID:</span>
                <span>{invoice.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Ticket ID:</span>
                {invoice.ticketId ? (
                  <Link to={`/tickets/${invoice.ticketId}`} className="text-blue-600 hover:underline">
                    #{invoice.ticketId}
                  </Link>
                ) : (
                  <span>N/A</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Due Date:</span>
                <span>
                  {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "Not set"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Paid At:</span>
                <span>
                  {invoice.paidAt ? new Date(invoice.paidAt).toLocaleString() : "Not paid"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(invoice.createdAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Invoice Created</p>
                    <p className="text-sm text-gray-500">Invoice was generated</p>
                    <p className="text-xs text-gray-400">
                      {new Date(invoice.createdAt).toLocaleString()}
                    </p>
                  </div>
                </li>
                {invoice.paidAt && (
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-200 flex items-center justify-center">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Received</p>
                      <p className="text-sm text-gray-500">Invoice was paid</p>
                      <p className="text-xs text-gray-400">
                        {new Date(invoice.paidAt).toLocaleString()}
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
                <label className="text-sm font-medium">Update Payment Status</label>
                <Select value={paymentStatus} onValueChange={handlePaymentStatusChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
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
              This action cannot be undone. This will permanently delete invoice {invoice.invoiceNumber}.
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

export default InvoiceDetail;

