import React from 'react'
import { MobileAccessList } from '../../components/MobileAccessList'

function MobileAccessManagement() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">Mobile Access Management</h1>
      <MobileAccessList />
    </div>
  )
}

export default MobileAccessManagement

