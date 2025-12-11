"use client"

import { useState } from "react"
import {Link, useLocation} from "react-router-dom"
import { cn } from "../lib/utils"
import { Button } from "../components/ui/button"
import { ScrollArea } from "../components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "../components/ui/sheet"
import { LayoutDashboard, Calendar, ClipboardList, Users, Package, BarChart, Settings, Menu, Ticket, CheckSquare, Wrench, Boxes, Clock, FileText, Phone, Smartphone } from "lucide-react"

const sidebarItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tickets", href: "/tickets", icon: Ticket },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Assets", href: "/assets", icon: Wrench },
  { name: "Inventory", href: "/inventory", icon: Boxes },
  { name: "Schedules", href: "/schedules", icon: Clock },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "CRM", href: "/crm", icon: Phone },
  { name: "Reports", href: "/reports", icon: BarChart },
  { name: "Mobile Access", href: "/mobile-access", icon: Smartphone },
  { name: "Manage Services", href: "/services", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation()
  const pathname = location.pathname
  const [open, setOpen] = useState(false)

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden">
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px] bg-dark-background border-dark-border">
          <MobileSidebar pathname={pathname} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
      <nav className={cn("hidden h-screen border-r bg-dark-background md:block", className)}>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-3 px-4 text-h2 font-semibold text-white">Service Management</h2>
            <div className="space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-3 text-body font-medium transition-colors",
                      isActive
                        ? "bg-dark-surface text-white border-l-4 border-primary"
                        : "text-dark-text hover:bg-dark-surface hover:text-white"
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

function MobileSidebar({
  pathname,
  setOpen,
}: {
  pathname: string
  setOpen: (open: boolean) => void
}) {
  return (
    <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
      <div className="flex flex-col space-y-2">
        <h2 className="mb-2 px-4 text-h2 font-semibold text-white">SMS</h2>
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-body font-medium transition-colors",
                isActive
                  ? "bg-dark-surface text-white border-l-4 border-primary"
                  : "text-dark-text hover:bg-dark-surface hover:text-white"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </div>
    </ScrollArea>
  )
}
