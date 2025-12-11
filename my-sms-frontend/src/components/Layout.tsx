import React from 'react'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar: Hidden on small screens and shown on larger screens */}
      <Sidebar className="h-full fixed top-0 left-0 w-64 lg:block hidden z-40" /> 

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <Header />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet /> {/* This will render the current page */}
        </main>
      </div>

      {/* Sidebar for small screens: Toggled via a mobile menu */}
      <div className="lg:hidden fixed top-0 left-0 w-64">
      </div>
    </div>
  )
}

export default Layout
