import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import TicketMangement from "./pages/Ticket/TicketMangement"
import CreateTicket from "./pages/Ticket/TicketCreate"
import TicketDetail from "./pages/Ticket/TicketDetail"

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
            <Route path=":id" element={< TicketDetail/>} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App