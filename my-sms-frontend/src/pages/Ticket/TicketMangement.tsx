import React from 'react'
import { TicketList } from '../../components/TicketList'
import { CreateTicketButton } from '../components/Ticket/CreateTicketButton'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

function TicketMangement() {
  return (
    <div className="container mx-auto py-10">
    <h1 className="text-4xl font-bold mb-5">Ticket Management</h1>
    <div className="mb-4">
      <Link to="/tickets/new">
        <Button>Create New Ticket</Button>
      </Link>
    </div>
    <TicketList />
  </div>
  )
}

export default TicketMangement
