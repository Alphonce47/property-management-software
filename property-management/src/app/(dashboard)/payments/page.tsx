"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  CreditCard,
  Plus,
  Search,
  Download,
  Filter,
  Smartphone,
  BanknoteIcon,
  CreditCardIcon,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  DollarSign,
  AlertCircle,
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

interface Payment {
  id: string
  tenant_name: string
  property_name: string
  unit_number: string
  amount: number
  due_date: string
  payment_date?: string
  payment_method: 'mpesa' | 'bank_transfer' | 'cash' | 'card'
  status: 'completed' | 'pending' | 'failed' | 'overdue'
  transaction_id?: string
  invoice_url?: string
  receipt_url?: string
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [methodFilter, setMethodFilter] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock data for now - replace with actual API call
    const mockPayments: Payment[] = [
      {
        id: '1',
        tenant_name: 'John Doe',
        property_name: 'Sunset Apartments',
        unit_number: 'A-101',
        amount: 50000,
        due_date: '2024-01-01',
        payment_date: '2024-01-01',
        payment_method: 'mpesa',
        status: 'completed',
        transaction_id: 'MPESA123456',
      },
      {
        id: '2',
        tenant_name: 'Jane Smith',
        property_name: 'Garden Heights',
        unit_number: 'B-205',
        amount: 60000,
        due_date: '2024-01-01',
        payment_date: '2024-01-02',
        payment_method: 'bank_transfer',
        status: 'completed',
        transaction_id: 'BANK789012',
      },
      {
        id: '3',
        tenant_name: 'Michael Johnson',
        property_name: 'Sunset Apartments',
        unit_number: 'C-303',
        amount: 45000,
        due_date: '2024-01-01',
        payment_method: 'mpesa',
        status: 'overdue',
      },
      {
        id: '4',
        tenant_name: 'Sarah Williams',
        property_name: 'Commercial Plaza',
        unit_number: 'D-402',
        amount: 80000,
        due_date: '2024-01-01',
        payment_method: 'card',
        status: 'pending',
      },
      {
        id: '5',
        tenant_name: 'David Brown',
        property_name: 'Garden Heights',
        unit_number: 'A-102',
        amount: 55000,
        due_date: '2024-01-01',
        payment_method: 'mpesa',
        status: 'failed',
      },
    ]
    
    setTimeout(() => {
      setPayments(mockPayments)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.tenant_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.property_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.unit_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (payment.transaction_id && payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter
    const matchesMethod = methodFilter === 'all' || payment.payment_method === methodFilter
    
    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'overdue': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'pending': return <Clock className="h-4 w-4" />
      case 'failed': return <XCircle className="h-4 w-4" />
      case 'overdue': return <AlertCircle className="h-4 w-4" />
      default: return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed'
      case 'pending': return 'Pending'
      case 'failed': return 'Failed'
      case 'overdue': return 'Overdue'
      default: return 'Unknown'
    }
  }

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'mpesa': return <Smartphone className="h-4 w-4" />
      case 'bank_transfer': return <BanknoteIcon className="h-4 w-4" />
      case 'cash': return <DollarSign className="h-4 w-4" />
      case 'card': return <CreditCardIcon className="h-4 w-4" />
      default: return null
    }
  }

  const getMethodText = (method: string) => {
    switch (method) {
      case 'mpesa': return 'M-PESA'
      case 'bank_transfer': return 'Bank Transfer'
      case 'cash': return 'Cash'
      case 'card': return 'Card'
      default: return 'Unknown'
    }
  }

  const completedPayments = payments.filter(p => p.status === 'completed')
  const pendingPayments = payments.filter(p => p.status === 'pending')
  const overduePayments = payments.filter(p => p.status === 'overdue')
  const totalRevenue = completedPayments.reduce((sum, p) => sum + p.amount, 0)
  const outstandingAmount = pendingPayments.reduce((sum, p) => sum + p.amount, 0) + 
                           overduePayments.reduce((sum, p) => sum + p.amount, 0)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
          <p className="text-gray-600">Manage rent payments and transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Send Invoices
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPayments.length}</div>
            <p className="text-xs text-muted-foreground">Payments received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Outstanding</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(outstandingAmount)}</div>
            <p className="text-xs text-muted-foreground">Pending + Overdue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overduePayments.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search payments..."
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
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="overdue">Overdue</option>
        </select>
        <select
          value={methodFilter}
          onChange={(e) => setMethodFilter(e.target.value)}
          className="flex h-9 w-full sm:w-40 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="all">All Methods</option>
          <option value="mpesa">M-PESA</option>
          <option value="bank_transfer">Bank Transfer</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
        </select>
      </div>

      {/* Payments List */}
      {filteredPayments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CreditCard className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No payments found</h3>
            <p className="text-gray-600">No payments match your current filters</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                      {getMethodIcon(payment.payment_method)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{payment.tenant_name}</h3>
                        <Badge className={getStatusColor(payment.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(payment.status)}
                            {getStatusText(payment.status)}
                          </span>
                        </Badge>
                        <Badge variant="outline">
                          <span className="flex items-center gap-1">
                            {getMethodIcon(payment.payment_method)}
                            {getMethodText(payment.payment_method)}
                          </span>
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>{payment.property_name} - {payment.unit_number}</span>
                        <span>Due: {formatDate(payment.due_date)}</span>
                        {payment.payment_date && (
                          <span>Paid: {formatDate(payment.payment_date)}</span>
                        )}
                        {payment.transaction_id && (
                          <span>ID: {payment.transaction_id}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className={`text-xl font-bold ${
                        payment.status === 'completed' ? 'text-green-600' : 
                        payment.status === 'overdue' || payment.status === 'failed' ? 'text-red-600' : 
                        'text-gray-900'
                      }`}>
                        {formatCurrency(payment.amount)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {payment.status === 'completed' && payment.receipt_url && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Receipt
                        </Button>
                      )}
                      {payment.status === 'pending' && (
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      )}
                      <Button variant="ghost" size="icon">
                        <Filter className="h-4 w-4" />
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