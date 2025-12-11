import React from 'react'
import { AssetList } from '../../components/AssetList'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'

function AssetManagement() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-4xl font-bold">Asset Management</h1>
        <Link to="/assets/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Asset
          </Button>
        </Link>
      </div>
      <AssetList />
    </div>
  )
}

export default AssetManagement

