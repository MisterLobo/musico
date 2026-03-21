export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      customers: {
        Row: {
          contact_phone: string | null
          created_at: string
          id: string
          name: string | null
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          contact_phone?: string | null
          created_at?: string
          id?: string
          name?: string | null
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          contact_phone?: string | null
          created_at?: string
          id?: string
          name?: string | null
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          country: string | null
          created_at: string
          currency: string | null
          id: string
          name: string | null
          social_fb: string | null
          social_ig: string | null
          social_x: string | null
          social_yt: string | null
          tenant_id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          name?: string | null
          social_fb?: string | null
          social_ig?: string | null
          social_x?: string | null
          social_yt?: string | null
          tenant_id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          name?: string | null
          social_fb?: string | null
          social_ig?: string | null
          social_x?: string | null
          social_yt?: string | null
          tenant_id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          amount_due: number | null
          created_at: string
          fee_amount: number | null
          group_size: number | null
          id: string
          room_id: string | null
          session_duration: number | null
          status: string | null
          subtotal: number | null
          tenant_id: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          amount_due?: number | null
          created_at?: string
          fee_amount?: number | null
          group_size?: number | null
          id?: string
          room_id?: string | null
          session_duration?: number | null
          status?: string | null
          subtotal?: number | null
          tenant_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_due?: number | null
          created_at?: string
          fee_amount?: number | null
          group_size?: number | null
          id?: string
          room_id?: string | null
          session_duration?: number | null
          status?: string | null
          subtotal?: number | null
          tenant_id?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reservations_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "studio_rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reservations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_brands: {
        Row: {
          address: string | null
          created_at: string
          description: string | null
          id: string
          lat_lng: Json | null
          latlng: unknown
          name: string | null
          profile_id: string
          rules: string | null
          status: string | null
          tenant_id: string
          updated_at: string | null
          weekly_availability: Json | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          description?: string | null
          id?: string
          lat_lng?: Json | null
          latlng?: unknown
          name?: string | null
          profile_id: string
          rules?: string | null
          status?: string | null
          tenant_id: string
          updated_at?: string | null
          weekly_availability?: Json | null
        }
        Update: {
          address?: string | null
          created_at?: string
          description?: string | null
          id?: string
          lat_lng?: Json | null
          latlng?: unknown
          name?: string | null
          profile_id?: string
          rules?: string | null
          status?: string | null
          tenant_id?: string
          updated_at?: string | null
          weekly_availability?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "studio_brands_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "studio_brands_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      studio_rooms: {
        Row: {
          base_price: number | null
          created_at: string
          description: string | null
          id: string
          name: string | null
          slug: string | null
          status: string | null
          studio_id: string
          tenant_id: string
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          slug?: string | null
          status?: string | null
          studio_id: string
          tenant_id: string
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          slug?: string | null
          status?: string | null
          studio_id?: string
          tenant_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "studio_rooms_studio_id_fkey"
            columns: ["studio_id"]
            isOneToOne: false
            referencedRelation: "studio_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "studio_rooms_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          active_studio: string | null
          country: string | null
          created_at: string
          currency: string | null
          id: string
          online_status: boolean | null
          owner_id: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          active_studio?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          online_status?: boolean | null
          owner_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          active_studio?: string | null
          country?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          online_status?: boolean | null
          owner_id?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tenants_active_studio_fkey"
            columns: ["active_studio"]
            isOneToOne: false
            referencedRelation: "studio_brands"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_due: number | null
          coupon_code: string | null
          created_at: string
          fee_amount: number | null
          id: string
          invoice_reference: string | null
          reservation_id: string | null
          status: string | null
          subtotal: number | null
          tenant_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount_due?: number | null
          coupon_code?: string | null
          created_at?: string
          fee_amount?: number | null
          id?: string
          invoice_reference?: string | null
          reservation_id?: string | null
          status?: string | null
          subtotal?: number | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount_due?: number | null
          coupon_code?: string | null
          created_at?: string
          fee_amount?: number | null
          id?: string
          invoice_reference?: string | null
          reservation_id?: string | null
          status?: string | null
          subtotal?: number | null
          tenant_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_reservation_id_fkey"
            columns: ["reservation_id"]
            isOneToOne: false
            referencedRelation: "reservations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const

