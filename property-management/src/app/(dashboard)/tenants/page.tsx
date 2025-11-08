"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MoreHorizontal,
  Edit,
  Eye,
  DollarSign,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Tenant {
  id: string
  full_name: string
  email: string
  phone: string
  unit_number: string
  property_name: string
  lease_start: string
  lease_end: string
  monthly_rent: number
  status: 'active' | 'overdue' | 'expiring'
  balance: number
  avatar_url?: string
}

export default function TenantsPage() {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    // Mock data for now - replace with actual API call
    const mockTenants: Tenant[] = [
      {
        id: '1',
        full_name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+254 712 345 678',
        unit_number: 'A-101',
        property_name: 'Sunset Apartments',
        lease_start: '2024-01-01',
        lease_end: '2024-12-31',
        monthly_rent: 50000,
        status: 'active',
        balance: 0,
      },
      {
        id: '2',
        full_name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+254 723 456 789',
        unit_number: 'B-205',
        property_name: 'Garden Heights',
        lease_start: '2024-02-01',
        lease_end: '2025-01-31',
        monthly_rent: 60000,
        status: 'active',
        balance: 0,
      },
      {
        id: '3',
        full_name: 'Michael Johnson',
        email: 'michael.j@email.com',
        phone: '+254 734 567 890',
        unit_number: 'C-303',
        property_name: 'Sunset Apartments',
        lease_start: '2024-03-01',
        lease_end: '2025-02-28',
        monthly_rent: 45000,
        status: 'overdue',
        balance: 45000,
      },
      {
        id: '4',
        full_name: 'Sarah Williams',
        email: 'sarah.w@email.com',
        phone: '+254 745 678 901',
        unit_number: 'D-402',
        property_name: 'Commercial Plaza',
        lease_start: '2024-01-15',
        lease_end: '2024-12-14',
        monthly_rent: 80000,
        status: 'expiring',
        balance: 0,
      },
    ]
    
    setTimeout(() => {
      setTenants(mockTenants)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredTenants = tenants.filter(tenant => {
    const matchesSearch = 
      tenant.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      case 'expiring': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active'
      case 'overdue': return 'Overdue'
      case 'expiring': return 'Expiring Soon'
      default: return 'Unknown'
    }
  }

  const isLeaseExpiring = (endDate: string) => {
    const end = new Date(endDate)
    const today = new Date()
    const daysUntilExpiry = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 90
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tenants...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tenants</h1>
          <p className="text-gray-600">Manage your tenant relationships</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Tenant
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tenants.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tenants.filter(t => t.status === 'active').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tenants.filter(t => t.status === 'overdue').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Leases</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tenants.filter(t => isLeaseExpiring(t.lease_end)).length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex h-9 w-full sm:w-48 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="overdue">Overdue</option>
          <option value="expiring">Expiring Soon</option>
        </select>
      </div>

      {/* Tenants List */}
      {filteredTenants.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Users className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tenants found</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first tenant</p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Tenant
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                      {tenant.full_name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{tenant.full_name}</h3>
                        <Badge className={getStatusColor(tenant.status)}>
                          {getStatusText(tenant.status)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Mail className="h-4 w-4 mr-1" />
                          {tenant.email}
                        </span>
                        <span className="flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          {tenant.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm">
                        <span className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          {tenant.property_name} - {tenant.unit_number}
                        </span>
                        <span className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(tenant.lease_start)} - {formatDate(tenant.lease_end)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Monthly Rent</p>
                      <p className="font-semibold">{formatCurrency(tenant.monthly_rent)}</p>
                    </div>
                    {tenant.balance > 0 && (
                      <div className="text-right">
                        <p className="text-sm text-red-600">Balance</p>
                        <p className="font-semibold text-red-600">{formatCurrency(tenant.balance)}</p>
                      </div>
                    )}
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
      )}
    </div>
  )
}