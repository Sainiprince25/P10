export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      services: {
        Row: {
          id: string
          name: string
          slug: string
          short_description: string
          full_description: string
          icon: string
          category: 'general' | 'residential' | 'commercial'
          active: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          short_description: string
          full_description: string
          icon?: string
          category?: 'general' | 'residential' | 'commercial'
          active?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          short_description?: string
          full_description?: string
          icon?: string
          category?: 'general' | 'residential' | 'commercial'
          active?: boolean
          order_index?: number
          updated_at?: string
        }
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          active: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          active?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          active?: boolean
          order_index?: number
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          type: 'residential' | 'commercial'
          location: string
          review: string
          rating: number
          is_demo: boolean
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          type: 'residential' | 'commercial'
          location: string
          review: string
          rating?: number
          is_demo?: boolean
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          type?: 'residential' | 'commercial'
          location?: string
          review?: string
          rating?: number
          is_demo?: boolean
          active?: boolean
          updated_at?: string
        }
      }
      hero_messages: {
        Row: {
          id: string
          text: string
          active: boolean
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          text: string
          active?: boolean
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          text?: string
          active?: boolean
          order_index?: number
          updated_at?: string
        }
      }
      business_info: {
        Row: {
          id: string
          name: string
          phone: string
          whatsapp: string
          email: string
          address: string
          description: string
          service_areas: string[]
          business_hours: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          whatsapp: string
          email: string
          address: string
          description: string
          service_areas: string[]
          business_hours: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          whatsapp?: string
          email?: string
          address?: string
          description?: string
          service_areas?: string[]
          business_hours?: string
          updated_at?: string
        }
      }
      enquiries: {
        Row: {
          id: string
          full_name: string
          mobile: string
          email: string | null
          service: string
          property_type: string
          location: string
          preferred_date: string
          preferred_time: string
          details: string | null
          status: 'new' | 'contacted' | 'quoted' | 'booked' | 'completed'
          admin_notes: string | null
          submitted_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          full_name: string
          mobile: string
          email?: string | null
          service: string
          property_type: string
          location: string
          preferred_date: string
          preferred_time: string
          details?: string | null
          status?: 'new' | 'contacted' | 'quoted' | 'booked' | 'completed'
          admin_notes?: string | null
          submitted_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          mobile?: string
          email?: string | null
          service?: string
          property_type?: string
          location?: string
          preferred_date?: string
          preferred_time?: string
          details?: string | null
          status?: 'new' | 'contacted' | 'quoted' | 'booked' | 'completed'
          admin_notes?: string | null
          submitted_at?: string
          updated_at?: string
        }
      }
      enquiry_status_history: {
        Row: {
          id: string
          enquiry_id: string
          status: string
          note: string | null
          changed_at: string
        }
        Insert: {
          id?: string
          enquiry_id: string
          status: string
          note?: string | null
          changed_at?: string
        }
        Update: {
          id?: string
          enquiry_id?: string
          status?: string
          note?: string | null
          changed_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
