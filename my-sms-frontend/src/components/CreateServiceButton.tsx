"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { EditServiceDialog } from "./EditServiceDialog"

export function CreateServiceButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="mr-2 h-4 w-4" />
        Create New Service
      </Button>
      <EditServiceDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
