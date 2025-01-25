export const getStatusColor = (status: string) => {
    switch (status) {
      case "OPEN":
        return "bg-green-500"
      case "IN_PROGRESS":
        return "bg-yellow-500"
      case "RESOLVED":
        return "bg-blue-500"
      case "CLOSED":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }