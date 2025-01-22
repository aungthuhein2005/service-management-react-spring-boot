import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar: Hidden on small screens and shown on larger screens */}
      <Sidebar className="h-full fixed top-0 left-0 w-64 lg:block hidden" /> 

      <div className="flex-1 p-4 lg:ml-64 overflow-y-auto">
        <Outlet /> {/* This will render the current page */}
      </div>

      {/* Sidebar for small screens: Toggled via a mobile menu */}
      <div className="lg:hidden fixed top-0 left-0 w-64">
      </div>
    </div>
  )
}

export default Layout
