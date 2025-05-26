export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          created_at: string
          description: string | null
          founded_year: number | null
          funding_amount: string | null
          id: string
          industry: string | null
          logo_url: string | null
          name: string
          primary_narrative_id: string | null
          slug: string
          stage: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          founded_year?: number | null
          funding_amount?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name: string
          primary_narrative_id?: string | null
          slug: string
          stage?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          founded_year?: number | null
          funding_amount?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          name?: string
          primary_narrative_id?: string | null
          slug?: string
          stage?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_primary_narrative_id_fkey"
            columns: ["primary_narrative_id"]
            isOneToOne: false
            referencedRelation: "narratives"
            referencedColumns: ["id"]
          },
        ]
      }
      email_signups: {
        Row: {
          created_at: string | null
          email: string
          id: string
          ip_address: unknown | null
          source: string
          user_agent: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          ip_address?: unknown | null
          source: string
          user_agent?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          ip_address?: unknown | null
          source?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      founder_submissions: {
        Row: {
          analysis_results: Json | null
          analyzed: boolean | null
          company_name: string
          company_website: string | null
          created_at: string
          current_positioning: string
          founder_email: string
          founder_name: string
          id: string
          industry: string | null
          stage: string | null
          updated_at: string
        }
        Insert: {
          analysis_results?: Json | null
          analyzed?: boolean | null
          company_name: string
          company_website?: string | null
          created_at?: string
          current_positioning: string
          founder_email: string
          founder_name: string
          id?: string
          industry?: string | null
          stage?: string | null
          updated_at?: string
        }
        Update: {
          analysis_results?: Json | null
          analyzed?: boolean | null
          company_name?: string
          company_website?: string | null
          created_at?: string
          current_positioning?: string
          founder_email?: string
          founder_name?: string
          id?: string
          industry?: string | null
          stage?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      market_signals: {
        Row: {
          calculated_at: string
          created_at: string
          id: string
          metadata: Json | null
          narrative_id: string
          score: number
          signal_type: string
          timeframe: string
        }
        Insert: {
          calculated_at?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          narrative_id: string
          score: number
          signal_type: string
          timeframe: string
        }
        Update: {
          calculated_at?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          narrative_id?: string
          score?: number
          signal_type?: string
          timeframe?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_signals_narrative_id_fkey"
            columns: ["narrative_id"]
            isOneToOne: false
            referencedRelation: "narratives"
            referencedColumns: ["id"]
          },
        ]
      }
      narrative_analytics: {
        Row: {
          adoption_velocity: number | null
          calculated_at: string
          competitive_density: number | null
          created_at: string
          id: string
          narrative_id: string
          originality_score: number | null
          trend_direction: string | null
          vc_resonance_score: number | null
        }
        Insert: {
          adoption_velocity?: number | null
          calculated_at?: string
          competitive_density?: number | null
          created_at?: string
          id?: string
          narrative_id: string
          originality_score?: number | null
          trend_direction?: string | null
          vc_resonance_score?: number | null
        }
        Update: {
          adoption_velocity?: number | null
          calculated_at?: string
          competitive_density?: number | null
          created_at?: string
          id?: string
          narrative_id?: string
          originality_score?: number | null
          trend_direction?: string | null
          vc_resonance_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "narrative_analytics_narrative_id_fkey"
            columns: ["narrative_id"]
            isOneToOne: false
            referencedRelation: "narratives"
            referencedColumns: ["id"]
          },
        ]
      }
      narrative_cluster_memberships: {
        Row: {
          cluster_id: string
          created_at: string
          id: string
          narrative_id: string
          similarity_score: number | null
        }
        Insert: {
          cluster_id: string
          created_at?: string
          id?: string
          narrative_id: string
          similarity_score?: number | null
        }
        Update: {
          cluster_id?: string
          created_at?: string
          id?: string
          narrative_id?: string
          similarity_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "narrative_cluster_memberships_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "narrative_clusters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "narrative_cluster_memberships_narrative_id_fkey"
            columns: ["narrative_id"]
            isOneToOne: false
            referencedRelation: "narratives"
            referencedColumns: ["id"]
          },
        ]
      }
      narrative_clusters: {
        Row: {
          color_code: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          color_code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          color_code?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      narrative_mentions: {
        Row: {
          company_id: string | null
          content_snippet: string | null
          created_at: string
          detected_at: string
          id: string
          narrative_id: string
          sentiment_score: number | null
          source_type: string
          source_url: string | null
        }
        Insert: {
          company_id?: string | null
          content_snippet?: string | null
          created_at?: string
          detected_at?: string
          id?: string
          narrative_id: string
          sentiment_score?: number | null
          source_type: string
          source_url?: string | null
        }
        Update: {
          company_id?: string | null
          content_snippet?: string | null
          created_at?: string
          detected_at?: string
          id?: string
          narrative_id?: string
          sentiment_score?: number | null
          source_type?: string
          source_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "narrative_mentions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "narrative_mentions_narrative_id_fkey"
            columns: ["narrative_id"]
            isOneToOne: false
            referencedRelation: "narratives"
            referencedColumns: ["id"]
          },
        ]
      }
      narratives: {
        Row: {
          category: string | null
          created_at: string
          definition: string | null
          first_detected_at: string
          id: string
          industry: string | null
          term: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          definition?: string | null
          first_detected_at?: string
          id?: string
          industry?: string | null
          term: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          definition?: string | null
          first_detected_at?: string
          id?: string
          industry?: string | null
          term?: string
          updated_at?: string
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          billing_frequency: string | null
          created_at: string
          email: string
          id: string
          plan_type: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscribed: boolean
          subscription_end: string | null
          subscription_tier: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          billing_frequency?: string | null
          created_at?: string
          email: string
          id?: string
          plan_type?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          billing_frequency?: string | null
          created_at?: string
          email?: string
          id?: string
          plan_type?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscribed?: boolean
          subscription_end?: string | null
          subscription_tier?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
