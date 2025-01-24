import React from 'react'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import UserList from '../../components/UserList'

function UserManagement() {
  return (
    <div>
      <div className="container mx-auto py-10">
    <h1 className="text-4xl font-bold mb-5">User Management</h1>
    <div className="mb-4">
      <Link to="/users/new">
        <Button>Create New User</Button>
      </Link>
    </div>
    <UserList/>
  </div>
    </div>
  )
}

export default UserManagement
