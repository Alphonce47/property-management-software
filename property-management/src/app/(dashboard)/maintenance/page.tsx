"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Wrench,
  Plus,
  Search,
  AlertTriangle,
  Clock,
  CheckCircle,
  User,
  Calendar,
  DollarSign,
  MoreHorizontal,
  Eye,
  Edit,
  X,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface MaintenanceRequest {
  id: string
  title: string
  description: string
  category: string
  priority: 'emergency' | 'urgent' | 'routine'
  status: 'new' | 'in_progress' | 'completed' | 'cancelled'
  tenant_name: string
  property_name: string
  unit_number: string
  assigned_to?: string
  cost?: number
  created_at: string
  completed_at?: string
  images?: string[]
}

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - replace with actual API call
    const mockRequests: MaintenanceRequest[] = [
      {
        id: '1',
        title: 'Leaking faucet in kitchen',
        description: 'The kitchen sink faucet is leaking and causing water damage to the cabinet below.',
        category: 'Plumbing',
        priority: 'urgent',
        status: 'in_progress',
        tenant_name: 'John Doe',
        property_name: 'Sunset Apartments',
        unit_number: 'A-101',
        assigned_to: 'Mike the Plumber',
        cost: 2500,
        created_at: '2024-01-10',
        images: ['image1.jpg', 'image2.jpg'],
      },
      {
        id: '2',
        title: 'AC not cooling',
        description: 'The air conditioning unit is not cooling properly in the living room.',
        category: 'HVAC',
        priority: 'urgent',
        status: 'new',
        tenant_name: 'Jane Smith',
        property_name: 'Garden Heights',
        unit_number: 'B-205',
        created_at: '2024-01-11',
      },
      {
        id: '3',
        title: 'Power outlet not working',
        description: 'Several power outlets in the bedroom are not working.',
        category: 'Electrical',
        priority: 'routine',
        status: 'completed',
        tenant_name: 'Michael Johnson',
        property_name: 'Sunset Apartments',
        unit_number: 'C-303',
        assigned_to: 'Electric Services Co',
        cost: 3500,
        created_at: '2024-01-05',
        completed_at: '2024-01-08',
      },
      {
        id: '4',
        title: 'Broken window lock',
        description: 'The window lock in the bedroom is broken and the window cannot be secured.',
        category: 'General',
        priority: 'emergency',
        status: 'new',
        tenant_name: 'Sarah Williams',
        property_name: 'Commercial Plaza',
        unit_number: 'D-402',
        created_at: '2024-01-12',
      },
      {
        id: '5',
        title: 'Garage door opener malfunction',
        description: 'The garage door opener is not responding to the remote control.',
        category: 'General',
        priority: 'routine',
        status: 'in_progress',
        tenant_name: 'David Brown',
        property_name: 'Garden Heights',
        unit_number: 'A-102',
        assigned_to: 'HandyMan Services',
        cost: 0,
        created_at: '2024-01-09',
      },
    ]
    
    setTimeout(() => {
      setRequests(mockRequests)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredRequests = requests.filter(request => {
    const matchesSearch = 
      request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.tenant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'in_progress': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'emergency': return 'bg-red-100 text-red-800'
      case 'urgent': return 'bg-orange-100 text-orange-800'
      case 'routine': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Clock className="h-4 w-4" />
      case 'in_progress': return <Wrench className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'cancelled': return <X className="h-4 w-4" />
      default: return null
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'emergency': return <AlertTriangle className="h-4 w-4" />
      case 'urgent': return <AlertTriangle className="h-4 w-4" />
      case 'routine': return <Clock className="h-4 w-4" />
      default: return null
    }
  }

  const kanbanColumns = [
    { id: 'new', title: 'New Requests', color: 'border-blue-200 bg-blue-50' },
    { id: 'in_progress', title: 'In Progress', color: 'border-yellow-200 bg-yellow-50' },
    { id: 'completed', title: 'Completed', color: 'border-green-200 bg-green-50' },
    { id: 'cancelled', title: 'Cancelled', color: 'border-gray-200 bg-gray-50' },
  ]

  const newRequests = requests.filter(r => r.status === 'new')
  const inProgressRequests = requests.filter(r => r.status === 'in_progress')
  const completedRequests = requests.filter(r => r.status === 'completed')
  const totalCost = requests.filter(r => r.cost && r.status === 'completed').reduce((sum, r) => sum + (r.cost || 0), 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading maintenance requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Maintenance</h1>
          <p className="text-gray-600">Manage maintenance requests and work orders</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Request
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{newRequests.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressRequests.length}</div>
            <p className="text-xs text-muted-foreground">Currently being worked on</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedRequests.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {totalCost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search maintenance requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex h-9 w-full sm:w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="flex h-9 w-full sm:w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">All Priority</option>
          <option value="emergency">Emergency</option>
          <option value="urgent">Urgent</option>
          <option value="routine">Routine</option>
        </select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            List
          </Button>
          <Button
            variant={viewMode === 'kanban' ? 'default' : 'outline'}
            onClick={() => setViewMode('kanban')}
          >
            Kanban
          </Button>
        </div>
      </div>

      {/* Requests Display */}
      {filteredRequests.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Wrench className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No maintenance requests found</h3>
            <p className="text-gray-600 mb-4">No requests match your current filters</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Request
            </Button>
          </CardContent>
        </Card>
      ) : viewMode === 'list' ? (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                      <Wrench className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{request.title}</h3>
                        <Badge className={getStatusColor(request.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(request.status)}
                            {request.status.replace('_', ' ')}
                          </span>
                        </Badge>
                        <Badge className={getPriorityColor(request.priority)}>
                          <span className="flex items-center gap-1">
                            {getPriorityIcon(request.priority)}
                            {request.priority}
                          </span>
                        </Badge>
                        <Badge variant="outline">{request.category}</Badge>
                      </div>
                      <p className="text-gray-600 mt-1 line-clamp-2">{request.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {request.tenant_name}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {request.property_name} - {request.unit_number}
                        </span>
                        <span>Created: {formatDate(request.created_at)}</span>
                        {request.completed_at && (
                          <span>Completed: {formatDate(request.completed_at)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      {request.assigned_to && (
                        <p className="text-sm text-gray-600">Assigned to</p>
                      )}
                      {request.assigned_to && (
                        <p className="font-medium text-sm">{request.assigned_to}</p>
                      )}
                      {request.cost && request.cost > 0 && (
                        <p className="font-semibold text-green-600">KES {request.cost.toLocaleString()}</p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {kanbanColumns.map((column) => (
            <div key={column.id} className={`border-2 rounded-lg p-4 ${column.color}`}>
              <h3 className="font-semibold mb-4">{column.title}</h3>
              <div className="space-y-3">
                {filteredRequests
                  .filter(request => request.status === column.id)
                  .map((request) => (
                    <Card key={request.id} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm line-clamp-2">{request.title}</h4>
                          <p className="text-xs text-gray-600 line-clamp-2">{request.description}</p>
                          <div className="flex items-center gap-2">
                            <Badge size="sm" className={getPriorityColor(request.priority)}>
                              {request.priority}
                            </Badge>
                            <Badge variant="outline" size="sm">
                              {request.category}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600">
                            <p>{request.tenant_name}</p>
                            <p>{request.property_name} - {request.unit_number}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}