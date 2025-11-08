import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'landlord' | 'tenant' | 'maintenance' | 'community_manager'
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role: 'admin' | 'landlord' | 'tenant' | 'maintenance' | 'community_manager'
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'landlord' | 'tenant' | 'maintenance' | 'community_manager'
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          updated_at?: string
        }
      }
      properties: {
        Row: {
          id: string
          owner_id: string
          name: string
          address: string
          city: string
          country: string
          property_type: 'apartment' | 'house' | 'commercial' | 'mixed'
          year_built: number | null
          total_units: number
          description: string | null
          images: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          address: string
          city: string
          country: string
          property_type: 'apartment' | 'house' | 'commercial' | 'mixed'
          year_built?: number | null
          total_units: number
          description?: string | null
          images?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          address?: string
          city?: string
          country?: string
          property_type?: 'apartment' | 'house' | 'commercial' | 'mixed'
          year_built?: number | null
          total_units?: number
          description?: string | null
          images?: string[]
          updated_at?: string
        }
      }
      units: {
        Row: {
          id: string
          property_id: string
          unit_number: string
          unit_type: string
          size_sqft: number | null
          rent_amount: number
          status: 'vacant' | 'occupied' | 'maintenance'
          amenities: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          unit_number: string
          unit_type: string
          size_sqft?: number | null
          rent_amount: number
          status: 'vacant' | 'occupied' | 'maintenance'
          amenities?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          unit_number?: string
          unit_type?: string
          size_sqft?: number | null
          rent_amount?: number
          status?: 'vacant' | 'occupied' | 'maintenance'
          amenities?: string[]
          updated_at?: string
        }
      }
      leases: {
        Row: {
          id: string
          unit_id: string
          tenant_id: string
          start_date: string
          end_date: string
          rent_amount: number
          deposit_amount: number
          status: 'active' | 'expired' | 'terminated'
          lease_document_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          unit_id: string
          tenant_id: string
          start_date: string
          end_date: string
          rent_amount: number
          deposit_amount: number
          status: 'active' | 'expired' | 'terminated'
          lease_document_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          unit_id?: string
          tenant_id?: string
          start_date?: string
          end_date?: string
          rent_amount?: number
          deposit_amount?: number
          status?: 'active' | 'expired' | 'terminated'
          lease_document_url?: string | null
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          lease_id: string
          amount: number
          payment_date: string | null
          due_date: string
          payment_method: 'mpesa' | 'bank_transfer' | 'cash' | 'card'
          transaction_id: string | null
          status: 'pending' | 'completed' | 'failed' | 'overdue'
          invoice_url: string | null
          receipt_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lease_id: string
          amount: number
          payment_date?: string | null
          due_date: string
          payment_method: 'mpesa' | 'bank_transfer' | 'cash' | 'card'
          transaction_id?: string | null
          status: 'pending' | 'completed' | 'failed' | 'overdue'
          invoice_url?: string | null
          receipt_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lease_id?: string
          amount?: number
          payment_date?: string | null
          due_date?: string
          payment_method?: 'mpesa' | 'bank_transfer' | 'cash' | 'card'
          transaction_id?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'overdue'
          invoice_url?: string | null
          receipt_url?: string | null
        }
      }
      maintenance_requests: {
        Row: {
          id: string
          unit_id: string
          tenant_id: string
          assigned_to: string | null
          category: string
          title: string
          description: string
          priority: 'emergency' | 'urgent' | 'routine'
          status: 'new' | 'in_progress' | 'completed' | 'cancelled'
          images: string[]
          cost: number | null
          completed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          unit_id: string
          tenant_id: string
          assigned_to?: string | null
          category: string
          title: string
          description: string
          priority: 'emergency' | 'urgent' | 'routine'
          status: 'new' | 'in_progress' | 'completed' | 'cancelled'
          images?: string[]
          cost?: number | null
          completed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          unit_id?: string
          tenant_id?: string
          assigned_to?: string | null
          category?: string
          title?: string
          description?: string
          priority?: 'emergency' | 'urgent' | 'routine'
          status?: 'new' | 'in_progress' | 'completed' | 'cancelled'
          images?: string[]
          cost?: number | null
          completed_at?: string | null
          updated_at?: string
        }
      }
    }
  }
}