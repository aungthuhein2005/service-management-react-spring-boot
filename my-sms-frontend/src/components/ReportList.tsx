"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Download } from "lucide-react"
import CustomAlert from "./CustomAlert"

interface Report {
  reportId: number
  reportType: string
  generatedAt: string
  data: string
  title: string
  description: string
}

export function ReportList() {
  const [reportData, setReportData] = useState<Report[]>([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/api/reports")
        setReportData(response.data)
      } catch (error) {
        console.error("Error fetching reports:", error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchReports()
  }, [])

  const getReportTypeColor = (type: string) => {
    switch (type) {
      case "PERFORMANCE":
        return "bg-blue-500"
      case "REVENUE":
        return "bg-green-500"
      case "CUSTOMER_SATISFACTION":
        return "bg-purple-500"
      case "ASSET_UTILIZATION":
        return "bg-orange-500"
      case "TICKET_ANALYTICS":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <>
      {error && <CustomAlert message="Error fetching reports" variant="error" />}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Generated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reportData.map((report) => (
            <TableRow key={report.reportId}>
              <TableCell>{report.reportId}</TableCell>
              <TableCell className="font-medium">{report.title || "Untitled Report"}</TableCell>
              <TableCell>
                <Badge className={getReportTypeColor(report.reportType)}>{report.reportType}</Badge>
              </TableCell>
              <TableCell className="max-w-[300px] truncate">{report.description || "N/A"}</TableCell>
              <TableCell>{new Date(report.generatedAt).toLocaleString()}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Regenerate</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

