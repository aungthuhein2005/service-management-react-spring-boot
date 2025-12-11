import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import TicketMangement from "./pages/Ticket/TicketMangement"
import CreateTicket from "./pages/Ticket/TicketCreate"
import TicketDetail from "./pages/Ticket/TicketDetail"
import ServiceManagement from "./pages/Services/ServiceManagement"
import TaskManagement from "./pages/Tasks/TaskManagement"
import CreateTask from "./pages/Tasks/TaskCreate"
import TaskDetail from "./pages/Tasks/TaskDetail"
import TaskEdit from "./pages/Tasks/TaskEdit"
import AssetManagement from "./pages/Assets/AssetManagement"
import CreateAsset from "./pages/Assets/AssetCreate"
import AssetDetail from "./pages/Assets/AssetDetail"
import AssetEdit from "./pages/Assets/AssetEdit"
import InventoryManagement from "./pages/Inventory/InventoryManagement"
import CreateInventory from "./pages/Inventory/InventoryCreate"
import InventoryDetail from "./pages/Inventory/InventoryDetail"
import InventoryEdit from "./pages/Inventory/InventoryEdit"
import ScheduleManagement from "./pages/Schedules/ScheduleManagement"
import CreateSchedule from "./pages/Schedules/ScheduleCreate"
import ScheduleDetail from "./pages/Schedules/ScheduleDetail"
import ScheduleEdit from "./pages/Schedules/ScheduleEdit"
import InvoiceManagement from "./pages/Invoices/InvoiceManagement"
import CreateInvoice from "./pages/Invoices/InvoiceCreate"
import InvoiceDetail from "./pages/Invoices/InvoiceDetail"
import InvoiceEdit from "./pages/Invoices/InvoiceEdit"
import CRMManagement from "./pages/CRM/CRMManagement"
import CreateCRM from "./pages/CRM/CRMCreate"
import CRMDetail from "./pages/CRM/CRMDetail"
import CRMEdit from "./pages/CRM/CRMEdit"
import ReportManagement from "./pages/Reports/ReportManagement"
import MobileAccessManagement from "./pages/MobileAccess/MobileAccessManagement"
import Dashboard from "./pages/Dashboard/Dashboard"
import Settings from "./pages/Settings/Settings"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tickets" >
            <Route index element={<TicketMangement />} />
            <Route path="new" element={<CreateTicket />} />
            <Route path=":id" element={< TicketDetail/>} />
          </Route>
          <Route path="tasks" >
            <Route index element={<TaskManagement />} />
            <Route path="new" element={<CreateTask />} />
            <Route path=":id" element={<TaskDetail />} />
            <Route path=":id/edit" element={<TaskEdit />} />
          </Route>
          <Route path="assets" >
            <Route index element={<AssetManagement />} />
            <Route path="new" element={<CreateAsset />} />
            <Route path=":id" element={<AssetDetail />} />
            <Route path=":id/edit" element={<AssetEdit />} />
          </Route>
          <Route path="inventory" >
            <Route index element={<InventoryManagement />} />
            <Route path="new" element={<CreateInventory />} />
            <Route path=":id" element={<InventoryDetail />} />
            <Route path=":id/edit" element={<InventoryEdit />} />
          </Route>
          <Route path="schedules" >
            <Route index element={<ScheduleManagement />} />
            <Route path="new" element={<CreateSchedule />} />
            <Route path=":id" element={<ScheduleDetail />} />
            <Route path=":id/edit" element={<ScheduleEdit />} />
          </Route>
          <Route path="invoices" >
            <Route index element={<InvoiceManagement />} />
            <Route path="new" element={<CreateInvoice />} />
            <Route path=":id" element={<InvoiceDetail />} />
            <Route path=":id/edit" element={<InvoiceEdit />} />
          </Route>
          <Route path="crm" >
            <Route index element={<CRMManagement />} />
            <Route path="new" element={<CreateCRM />} />
            <Route path=":id" element={<CRMDetail />} />
            <Route path=":id/edit" element={<CRMEdit />} />
          </Route>
          <Route path="reports" >
            <Route index element={<ReportManagement />} />
          </Route>
          <Route path="mobile-access" >
            <Route index element={<MobileAccessManagement />} />
          </Route>
          <Route path="services" >
            <Route index element={<ServiceManagement/>} />
          </Route>
          <Route path="settings" >
            <Route index element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App