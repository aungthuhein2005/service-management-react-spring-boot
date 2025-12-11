import type { Metadata } from "next"
import { ServicesTable } from "../../components/ServicesTable"
import { CreateServiceButton } from "../../components/CreateServiceButton"

export const metadata: Metadata = {
  title: "Manage Services",
  description: "Manage your service offerings",
}

export default function ServiceManagement() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Manage Services</h1>
        <CreateServiceButton />
      </div>
      <ServicesTable />
    </div>
  )
}
