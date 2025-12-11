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
import { ArrowLeft, Edit, Trash2, Phone, Mail, MessageSquare, Users, Calendar } from "lucide-react";
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

interface CRM {
  crmId: number;
  userId: number;
  interactionType: string;
  interactionDetails: string;
  recordedAt: string;
  subject: string;
  outcome: string;
  createdAt: string;
  updatedAt: string;
}

function CRMDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [crm, setCrm] = useState<CRM | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchCRM();
  }, [id]);

  const fetchCRM = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`/api/crm/${id}`);
      setCrm(response.data);
    } catch (error: any) {
      console.error("Error fetching CRM details:", error);
      setError("Failed to fetch CRM interaction details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/crm/${id}`);
      navigate("/crm");
    } catch (error: any) {
      console.error("Error deleting CRM interaction:", error);
      setError("Failed to delete CRM interaction. Please try again.");
    }
  };

  const getInteractionIcon = (type: string) => {
    switch (type) {
      case "CALL":
        return <Phone className="h-5 w-5" />;
      case "EMAIL":
        return <Mail className="h-5 w-5" />;
      case "CHAT":
        return <MessageSquare className="h-5 w-5" />;
      case "MEETING":
        return <Users className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getInteractionColor = (type: string) => {
    switch (type) {
      case "CALL":
        return "bg-blue-500";
      case "EMAIL":
        return "bg-green-500";
      case "CHAT":
        return "bg-purple-500";
      case "MEETING":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading CRM interaction details...</div>
      </div>
    );
  }

  if (error && !crm) {
    return (
      <div className="container mx-auto py-10">
        <CustomAlert message={error} variant="error" />
        <Link to="/crm">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to CRM
          </Button>
        </Link>
      </div>
    );
  }

  if (!crm) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">CRM interaction not found</div>
        <Link to="/crm">
          <Button className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to CRM
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-4">
          <Link to="/crm">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">CRM Interaction #{crm.crmId}</h1>
        </div>
        <div className="flex gap-2">
          <Link to={`/crm/${id}/edit`}>
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
              <CardTitle>Interaction Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="font-semibold">Interaction Type:</span>
                <Badge className={getInteractionColor(crm.interactionType)}>
                  <span className="flex items-center gap-1">
                    {getInteractionIcon(crm.interactionType)}
                    {crm.interactionType}
                  </span>
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Customer ID:</span>
                <span>{crm.userId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Subject:</span>
                <span>{crm.subject || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Outcome:</span>
                <span>{crm.outcome || "N/A"}</span>
              </div>
              <div>
                <span className="font-semibold">Details:</span>
                <p className="mt-2 p-3 bg-gray-50 rounded">{crm.interactionDetails || "No details provided"}</p>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Recorded At:</span>
                <span>{new Date(crm.recordedAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(crm.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Last Updated:</span>
                <span>{new Date(crm.updatedAt).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {getInteractionIcon(crm.interactionType)}
                  </div>
                  <div>
                    <p className="font-medium">Interaction Recorded</p>
                    <p className="text-sm text-gray-500">
                      {crm.interactionType} interaction was logged
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(crm.recordedAt).toLocaleString()}
                    </p>
                  </div>
                </li>
                {crm.updatedAt !== crm.createdAt && (
                  <li className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Interaction Updated</p>
                      <p className="text-sm text-gray-500">Interaction details were last modified</p>
                      <p className="text-xs text-gray-400">
                        {new Date(crm.updatedAt).toLocaleString()}
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
              This action cannot be undone. This will permanently delete CRM interaction #{crm.crmId}.
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

export default CRMDetail;

