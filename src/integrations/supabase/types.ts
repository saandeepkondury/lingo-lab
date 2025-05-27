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
      founder_narratives: {
        Row: {
          before_after_positioning: Json | null
          company: string
          created_at: string
          employee_count: string | null
          founded_year: string | null
          founder_name: string
          founder_title: string
          funding_raised: string | null
          headquarters: string | null
          id: string
          industry: string
          key_phrase: string
          lingo_evolution: string | null
          market_themes: string[] | null
          meta_description: string | null
          meta_title: string | null
          metrics: Json | null
          narrative_archetype: string | null
          published: boolean | null
          slug: string | null
          strategic_patterns: string[] | null
          tagline: string | null
          transformation_type: string | null
          updated_at: string
          valuation: string | null
          why_it_worked: string | null
        }
        Insert: {
          before_after_positioning?: Json | null
          company: string
          created_at?: string
          employee_count?: string | null
          founded_year?: string | null
          founder_name: string
          founder_title: string
          funding_raised?: string | null
          headquarters?: string | null
          id?: string
          industry: string
          key_phrase: string
          lingo_evolution?: string | null
          market_themes?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          metrics?: Json | null
          narrative_archetype?: string | null
          published?: boolean | null
          slug?: string | null
          strategic_patterns?: string[] | null
          tagline?: string | null
          transformation_type?: string | null
          updated_at?: string
          valuation?: string | null
          why_it_worked?: string | null
        }
        Update: {
          before_after_positioning?: Json | null
          company?: string
          created_at?: string
          employee_count?: string | null
          founded_year?: string | null
          founder_name?: string
          founder_title?: string
          funding_raised?: string | null
          headquarters?: string | null
          id?: string
          industry?: string
          key_phrase?: string
          lingo_evolution?: string | null
          market_themes?: string[] | null
          meta_description?: string | null
          meta_title?: string | null
          metrics?: Json | null
          narrative_archetype?: string | null
          published?: boolean | null
          slug?: string | null
          strategic_patterns?: string[] | null
          tagline?: string | null
          transformation_type?: string | null
          updated_at?: string
          valuation?: string | null
          why_it_worked?: string | null
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
      get_published_narratives: {
        Args: {
          industry_filter?: string
          transformation_type_filter?: string
          narrative_archetype_filter?: string
          market_themes_filter?: string[]
          strategic_patterns_filter?: string[]
        }
        Returns: {
          id: string
          company: string
          founder_name: string
          industry: string
          key_phrase: string
          transformation_type: string
          narrative_archetype: string
          market_themes: string[]
          strategic_patterns: string[]
          slug: string
          created_at: string
        }[]
      }
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
