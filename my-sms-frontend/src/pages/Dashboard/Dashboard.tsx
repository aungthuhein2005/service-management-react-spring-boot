import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { getStatusBadgeVariant } from "../../utils/getStatusColor";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import {
  Ticket,
  CheckSquare,
  Wrench,
  Boxes,
  Clock,
  FileText,
  Phone,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  DollarSign,
  Users,
  Activity
} from "lucide-react";
import axios from "axios";
import CustomAlert from "../../components/CustomAlert";

interface DashboardStats {
  tickets: {
    total: number;
    open: number;
    inProgress: number;
    resolved: number;
    closed: number;
  };
  tasks: {
    total: number;
    pending: number;
    inProgress: number;
    completed: number;
    escalated: number;
  };
  assets: {
    total: number;
    available: number;
    inUse: number;
    underMaintenance: number;
    retired: number;
  };
  inventory: {
    total: number;
    lowStock: number;
    inStock: number;
  };
  schedules: {
    total: number;
    scheduled: number;
    inProgress: number;
    completed: number;
    cancelled: number;
  };
  invoices: {
    total: number;
    pending: number;
    paid: number;
    failed: number;
    totalRevenue: number;
  };
  crm: {
    total: number;
    calls: number;
    emails: number;
    chats: number;
    meetings: number;
  };
}

interface RecentActivity {
  type: string;
  title: string;
  description: string;
  timestamp: string;
  link: string;
}

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");
    try {
      // Fetch all data in parallel
      const [
        ticketsRes,
        tasksRes,
        assetsRes,
        inventoryRes,
        schedulesRes,
        invoicesRes,
        crmRes,
      ] = await Promise.all([
        axios.get("/api/tickets"),
        axios.get("/api/tasks"),
        axios.get("/api/assets"),
        axios.get("/api/inventory"),
        axios.get("/api/schedules"),
        axios.get("/api/invoices"),
        axios.get("/api/crm"),
      ]);

      // Handle paginated response for tickets (Spring Data Page)
      const ticketsData = ticketsRes.data || {};
      const tickets = Array.isArray(ticketsData) 
        ? ticketsData 
        : (ticketsData.content || []);
      
      // Ensure all other responses are arrays
      const tasks = Array.isArray(tasksRes.data) ? tasksRes.data : [];
      const assets = Array.isArray(assetsRes.data) ? assetsRes.data : [];
      const inventory = Array.isArray(inventoryRes.data) ? inventoryRes.data : [];
      const schedules = Array.isArray(schedulesRes.data) ? schedulesRes.data : [];
      const invoices = Array.isArray(invoicesRes.data) ? invoicesRes.data : [];
      const crm = Array.isArray(crmRes.data) ? crmRes.data : [];

      // Calculate statistics
      const ticketStats = {
        total: tickets.length,
        open: tickets.filter((t: any) => t.status === "OPEN").length,
        inProgress: tickets.filter((t: any) => t.status === "IN_PROGRESS").length,
        resolved: tickets.filter((t: any) => t.status === "RESOLVED").length,
        closed: tickets.filter((t: any) => t.status === "CLOSED").length,
      };

      const taskStats = {
        total: tasks.length,
        pending: tasks.filter((t: any) => t.status === "PENDING").length,
        inProgress: tasks.filter((t: any) => t.status === "IN_PROGRESS").length,
        completed: tasks.filter((t: any) => t.status === "COMPLETED").length,
        escalated: tasks.filter((t: any) => t.status === "ESCALATED").length,
      };

      const assetStats = {
        total: assets.length,
        available: assets.filter((a: any) => a.status === "AVAILABLE").length,
        inUse: assets.filter((a: any) => a.status === "IN_USE").length,
        underMaintenance: assets.filter((a: any) => a.status === "UNDER_MAINTENANCE").length,
        retired: assets.filter((a: any) => a.status === "RETIRED").length,
      };

      const inventoryItems = Array.isArray(inventory) ? inventory : [];
      const lowStockItems = inventoryItems.filter(
        (item: any) => item.quantity <= item.restockThreshold
      );

      const inventoryStats = {
        total: inventoryItems.length,
        lowStock: lowStockItems.length,
        inStock: inventoryItems.length - lowStockItems.length,
      };

      const scheduleStats = {
        total: schedules.length,
        scheduled: schedules.filter((s: any) => s.status === "SCHEDULED").length,
        inProgress: schedules.filter((s: any) => s.status === "IN_PROGRESS").length,
        completed: schedules.filter((s: any) => s.status === "COMPLETED").length,
        cancelled: schedules.filter((s: any) => s.status === "CANCELLED").length,
      };

      const paidInvoices = invoices.filter((i: any) => i.paymentStatus === "PAID");
      const totalRevenue = paidInvoices.reduce(
        (sum: number, inv: any) => sum + (inv.totalAmount || 0),
        0
      );

      const invoiceStats = {
        total: invoices.length,
        pending: invoices.filter((i: any) => i.paymentStatus === "PENDING").length,
        paid: paidInvoices.length,
        failed: invoices.filter((i: any) => i.paymentStatus === "FAILED").length,
        totalRevenue: totalRevenue,
      };

      const crmStats = {
        total: crm.length,
        calls: crm.filter((c: any) => c.interactionType === "CALL").length,
        emails: crm.filter((c: any) => c.interactionType === "EMAIL").length,
        chats: crm.filter((c: any) => c.interactionType === "CHAT").length,
        meetings: crm.filter((c: any) => c.interactionType === "MEETING").length,
      };

      setStats({
        tickets: ticketStats,
        tasks: taskStats,
        assets: assetStats,
        inventory: inventoryStats,
        schedules: scheduleStats,
        invoices: invoiceStats,
        crm: crmStats,
      });

      // Build recent activities
      const activities: RecentActivity[] = [];
      
      // Recent tickets - ensure tickets is an array
      if (Array.isArray(tickets)) {
        tickets.slice(0, 3).forEach((ticket: any) => {
          activities.push({
            type: "ticket",
            title: `Ticket #${ticket.ticket_id || ticket.ticketId}: ${ticket.subject || 'No subject'}`,
            description: `Status: ${ticket.status || 'Unknown'}`,
            timestamp: ticket.createdAt || ticket.created || new Date().toISOString(),
            link: `/tickets/${ticket.ticket_id || ticket.ticketId}`,
          });
        });
      }

      // Recent tasks - ensure tasks is an array
      if (Array.isArray(tasks)) {
        tasks.slice(0, 2).forEach((task: any) => {
          activities.push({
            type: "task",
            title: `Task #${task.taskId}`,
            description: `Status: ${task.status || 'Unknown'}`,
            timestamp: task.createdAt || new Date().toISOString(),
            link: `/tasks/${task.taskId}`,
          });
        });
      }

      // Recent invoices - ensure invoices is an array
      if (Array.isArray(invoices)) {
        invoices.slice(0, 2).forEach((invoice: any) => {
          activities.push({
            type: "invoice",
            title: `Invoice ${invoice.invoiceNumber || invoice.invoiceId}`,
            description: `Amount: $${(invoice.totalAmount || 0).toFixed(2)}`,
            timestamp: invoice.createdAt || new Date().toISOString(),
            link: `/invoices/${invoice.invoiceId}`,
          });
        });
      }

      // Sort by timestamp and take most recent
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivities(activities.slice(0, 10));
    } catch (error: any) {
      console.error("Error fetching dashboard data:", error);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "ticket":
        return <Ticket className="h-4 w-4" />;
      case "task":
        return <CheckSquare className="h-4 w-4" />;
      case "invoice":
        return <FileText className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="container mx-auto py-10">
        <CustomAlert message={error} variant="error" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">No data available</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={fetchDashboardData} variant="outline">
          Refresh
        </Button>
      </div>

      {error && (
        <div className="my-4">
          <CustomAlert message={error} variant="error" />
        </div>
      )}

      {/* Key Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-stratum">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-body font-medium text-text-secondary">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-text-small" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">{stats.tickets.total}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="info" className="text-xs">
                  Open: {stats.tickets.open}
                </Badge>
                <Badge variant="warning" className="text-xs">
                  In Progress: {stats.tickets.inProgress}
                </Badge>
              </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.tasks.total}</div>
              <div className="flex gap-2 mt-2">
                <Badge variant="warning" className="text-xs">
                  Pending: {stats.tasks.pending}
                </Badge>
                <Badge variant="success" className="text-xs">
                  Completed: {stats.tasks.completed}
                </Badge>
              </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.invoices.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {stats.invoices.paid} paid invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inventory.lowStock}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Out of {stats.inventory.total} items
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Tickets Status */}
            <Card className="card-stratum">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-h2">
                  <Ticket className="h-5 w-5" />
                  Tickets Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span className="text-text-body">Open</span>
                    <span className="text-text-body font-medium">{stats.tickets.open}</span>
                  </div>
                  <div className="w-full bg-neutral-bg rounded-full h-2">
                    <div
                      className="bg-info h-2 rounded-full"
                      style={{
                        width: `${calculatePercentage(stats.tickets.open, stats.tickets.total)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span className="text-text-body">In Progress</span>
                    <span className="text-text-body font-medium">{stats.tickets.inProgress}</span>
                  </div>
                  <div className="w-full bg-neutral-bg rounded-full h-2">
                    <div
                      className="bg-warning h-2 rounded-full"
                      style={{
                        width: `${calculatePercentage(stats.tickets.inProgress, stats.tickets.total)}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-body mb-1">
                    <span className="text-text-body">Resolved</span>
                    <span className="text-text-body font-medium">{stats.tickets.resolved}</span>
                  </div>
                  <div className="w-full bg-neutral-bg rounded-full h-2">
                    <div
                      className="bg-success h-2 rounded-full"
                      style={{
                        width: `${calculatePercentage(stats.tickets.resolved, stats.tickets.total)}%`,
                      }}
                    ></div>
                  </div>
                </div>
            <Link to="/tickets">
              <Button variant="outline" className="w-full mt-2">
                View All Tickets <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Tasks Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckSquare className="h-5 w-5" />
              Tasks Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pending</span>
                <span>{stats.tasks.pending}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gray-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.tasks.pending, stats.tasks.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>In Progress</span>
                <span>{stats.tasks.inProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.tasks.inProgress, stats.tasks.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completed</span>
                <span>{stats.tasks.completed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.tasks.completed, stats.tasks.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <Link to="/tasks">
              <Button variant="outline" className="w-full mt-2">
                View All Tasks <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Assets Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5" />
              Assets Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Available</span>
                <span>{stats.assets.available}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.assets.available, stats.assets.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>In Use</span>
                <span>{stats.assets.inUse}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.assets.inUse, stats.assets.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Under Maintenance</span>
                <span>{stats.assets.underMaintenance}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.assets.underMaintenance, stats.assets.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <Link to="/assets">
              <Button variant="outline" className="w-full mt-2">
                View All Assets <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Schedules Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Schedules Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Scheduled</span>
                <span>{stats.schedules.scheduled}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.schedules.scheduled, stats.schedules.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>In Progress</span>
                <span>{stats.schedules.inProgress}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.schedules.inProgress, stats.schedules.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Completed</span>
                <span>{stats.schedules.completed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.schedules.completed, stats.schedules.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <Link to="/schedules">
              <Button variant="outline" className="w-full mt-2">
                View All Schedules <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Invoices Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Invoices Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Paid</span>
                <span>{stats.invoices.paid}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.invoices.paid, stats.invoices.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Pending</span>
                <span>{stats.invoices.pending}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.invoices.pending, stats.invoices.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Failed</span>
                <span>{stats.invoices.failed}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-red-600 h-2 rounded-full"
                  style={{
                    width: `${calculatePercentage(stats.invoices.failed, stats.invoices.total)}%`,
                  }}
                ></div>
              </div>
            </div>
            <Link to="/invoices">
              <Button variant="outline" className="w-full mt-2">
                View All Invoices <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* CRM Interactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              CRM Interactions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-blue-50 rounded">
                <div className="text-lg font-bold">{stats.crm.calls}</div>
                <div className="text-xs text-muted-foreground">Calls</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded">
                <div className="text-lg font-bold">{stats.crm.emails}</div>
                <div className="text-xs text-muted-foreground">Emails</div>
              </div>
              <div className="text-center p-2 bg-purple-50 rounded">
                <div className="text-lg font-bold">{stats.crm.chats}</div>
                <div className="text-xs text-muted-foreground">Chats</div>
              </div>
              <div className="text-center p-2 bg-orange-50 rounded">
                <div className="text-lg font-bold">{stats.crm.meetings}</div>
                <div className="text-xs text-muted-foreground">Meetings</div>
              </div>
            </div>
            <Link to="/crm">
              <Button variant="outline" className="w-full mt-2">
                View All CRM <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <Link
                        to={activity.link}
                        className="text-sm font-medium hover:underline"
                      >
                        {activity.title}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No recent activities</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/tickets/new">
                <Button variant="outline" className="w-full">
                  <Ticket className="mr-2 h-4 w-4" />
                  New Ticket
                </Button>
              </Link>
              <Link to="/tasks/new">
                <Button variant="outline" className="w-full">
                  <CheckSquare className="mr-2 h-4 w-4" />
                  New Task
                </Button>
              </Link>
              <Link to="/assets/new">
                <Button variant="outline" className="w-full">
                  <Wrench className="mr-2 h-4 w-4" />
                  Add Asset
                </Button>
              </Link>
              <Link to="/inventory/new">
                <Button variant="outline" className="w-full">
                  <Boxes className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </Link>
              <Link to="/schedules/new">
                <Button variant="outline" className="w-full">
                  <Clock className="mr-2 h-4 w-4" />
                  New Schedule
                </Button>
              </Link>
              <Link to="/invoices/new">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  New Invoice
                </Button>
              </Link>
              <Link to="/crm/new">
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Log Interaction
                </Button>
              </Link>
              <Link to="/reports">
                <Button variant="outline" className="w-full">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Reports
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

