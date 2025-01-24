import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import TicketMangement from "./pages/Ticket/TicketMangement"
import CreateTicket from "./pages/Ticket/TicketCreate"
import TicketDetail from "./pages/Ticket/TicketDetail"
import UserManagement from "./pages/User/UserManagement"
import UserCreate from "./pages/User/UserCreate"
import UserDetail from "./pages/User/UserDetail"

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="tickets" >
            <Route index element={<TicketMangement />} />
            <Route path="new" element={<CreateTicket />} />
            <Route path="update/:ticketId" element={<CreateTicket />} />
            <Route path=":id" element={< TicketDetail/>} />
          </Route>
          <Route path="users" >
            <Route index element={<UserManagement />} />
            <Route path="new" element={<UserCreate />} />
            <Route path="update/:userId" element={<UserCreate />} />
            <Route path=":id" element={< UserDetail/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App