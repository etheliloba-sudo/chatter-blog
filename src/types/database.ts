export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bookmarks_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "bookmarks_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      comments: {
        Row: {
          author_id: string;
          body: string;
          created_at: string;
          depth: number | null;
          id: string;
          parent_id: string | null;
          post_id: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          body: string;
          created_at?: string;
          depth?: number | null;
          id?: string;
          parent_id?: string | null;
          post_id: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          body?: string;
          created_at?: string;
          depth?: number | null;
          id?: string;
          parent_id?: string | null;
          post_id?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_parent_id_fkey";
            columns: ["parent_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      daily_post_stats: {
        Row: {
          bookmarks: number;
          comments: number;
          created_at: string;
          date: string;
          id: string;
          likes: number;
          post_id: string;
          unique_readers: number;
          updated_at: string;
          views: number;
        };
        Insert: {
          bookmarks?: number;
          comments?: number;
          created_at?: string;
          date: string;
          id?: string;
          likes?: number;
          post_id: string;
          unique_readers?: number;
          updated_at?: string;
          views?: number;
        };
        Update: {
          bookmarks?: number;
          comments?: number;
          created_at?: string;
          date?: string;
          id?: string;
          likes?: number;
          post_id?: string;
          unique_readers?: number;
          updated_at?: string;
          views?: number;
        };
        Relationships: [
          {
            foreignKeyName: "daily_post_stats_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      follows: {
        Row: {
          created_at: string;
          follower_id: string;
          following_id: string;
        };
        Insert: {
          created_at?: string;
          follower_id: string;
          following_id: string;
        };
        Update: {
          created_at?: string;
          follower_id?: string;
          following_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey";
            columns: ["follower_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "follows_following_id_fkey";
            columns: ["following_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      likes: {
        Row: {
          created_at: string;
          post_id: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          post_id: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          post_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "likes_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      notifications: {
        Row: {
          comment_id: string | null;
          created_at: string;
          id: string;
          is_read: boolean | null;
          post_id: string | null;
          read_at: string | null;
          recipient_id: string;
          sender_id: string;
          type: Database["public"]["Enums"]["notification_type"];
        };
        Insert: {
          comment_id?: string | null;
          created_at?: string;
          id?: string;
          is_read?: boolean | null;
          post_id?: string | null;
          read_at?: string | null;
          recipient_id: string;
          sender_id: string;
          type: Database["public"]["Enums"]["notification_type"];
        };
        Update: {
          comment_id?: string | null;
          created_at?: string;
          id?: string;
          is_read?: boolean | null;
          post_id?: string | null;
          read_at?: string | null;
          recipient_id?: string;
          sender_id?: string;
          type?: Database["public"]["Enums"]["notification_type"];
        };
        Relationships: [
          {
            foreignKeyName: "notifications_comment_id_fkey";
            columns: ["comment_id"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_recipient_id_fkey";
            columns: ["recipient_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_sender_id_fkey";
            columns: ["sender_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      post_drafts: {
        Row: {
          author_id: string;
          body_markdown: string | null;
          created_at: string | null;
          id: string;
          post_id: string | null;
          title: string | null;
          updated_at: string | null;
        };
        Insert: {
          author_id: string;
          body_markdown?: string | null;
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Update: {
          author_id?: string;
          body_markdown?: string | null;
          created_at?: string | null;
          id?: string;
          post_id?: string | null;
          title?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_drafts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_drafts_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
        ];
      };
      post_tags: {
        Row: {
          post_id: string;
          tag_id: string;
        };
        Insert: {
          post_id: string;
          tag_id: string;
        };
        Update: {
          post_id?: string;
          tag_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "post_tags_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_tags_tag_id_fkey";
            columns: ["tag_id"];
            isOneToOne: false;
            referencedRelation: "tags";
            referencedColumns: ["id"];
          },
        ];
      };
      post_views: {
        Row: {
          anonymous_id: string | null;
          created_at: string;
          id: string;
          ip_hash: string | null;
          post_id: string;
          user_agent: string | null;
          viewer_id: string | null;
        };
        Insert: {
          anonymous_id?: string | null;
          created_at?: string;
          id?: string;
          ip_hash?: string | null;
          post_id: string;
          user_agent?: string | null;
          viewer_id?: string | null;
        };
        Update: {
          anonymous_id?: string | null;
          created_at?: string;
          id?: string;
          ip_hash?: string | null;
          post_id?: string;
          user_agent?: string | null;
          viewer_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "post_views_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "post_views_viewer_id_fkey";
            columns: ["viewer_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      posts: {
        Row: {
          archived_at: string | null;
          author_id: string;
          bookmark_count: number | null;
          comment_count: number | null;
          content: string;
          cover_image_url: string | null;
          created_at: string;
          excerpt: string | null;
          id: string;
          like_count: number | null;
          published_at: string | null;
          reading_time_minutes: number;
          search_vector: unknown;
          slug: string;
          status: Database["public"]["Enums"]["post_status"];
          title: string;
          unique_view_count: number | null;
          updated_at: string;
          view_count: number | null;
        };
        Insert: {
          archived_at?: string | null;
          author_id: string;
          bookmark_count?: number | null;
          comment_count?: number | null;
          content: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          like_count?: number | null;
          published_at?: string | null;
          reading_time_minutes?: number;
          search_vector?: unknown;
          slug: string;
          status?: Database["public"]["Enums"]["post_status"];
          title: string;
          unique_view_count?: number | null;
          updated_at?: string;
          view_count?: number | null;
        };
        Update: {
          archived_at?: string | null;
          author_id?: string;
          bookmark_count?: number | null;
          comment_count?: number | null;
          content?: string;
          cover_image_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          id?: string;
          like_count?: number | null;
          published_at?: string | null;
          reading_time_minutes?: number;
          search_vector?: unknown;
          slug?: string;
          status?: Database["public"]["Enums"]["post_status"];
          title?: string;
          unique_view_count?: number | null;
          updated_at?: string;
          view_count?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
          display_name: string | null;
          email: string;
          follower_count: number | null;
          following_count: number | null;
          full_name: string | null;
          github_url: string | null;
          id: string;
          linkedin_url: string | null;
          post_count: number | null;
          twitter_url: string | null;
          updated_at: string;
          username: string;
          website_url: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          email: string;
          follower_count?: number | null;
          following_count?: number | null;
          full_name?: string | null;
          github_url?: string | null;
          id: string;
          linkedin_url?: string | null;
          post_count?: number | null;
          twitter_url?: string | null;
          updated_at?: string;
          username: string;
          website_url?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
          display_name?: string | null;
          email?: string;
          follower_count?: number | null;
          following_count?: number | null;
          full_name?: string | null;
          github_url?: string | null;
          id?: string;
          linkedin_url?: string | null;
          post_count?: number | null;
          twitter_url?: string | null;
          updated_at?: string;
          username?: string;
          website_url?: string | null;
        };
        Relationships: [];
      };
      tags: {
        Row: {
          created_at: string;
          description: string | null;
          id: string;
          name: string;
          post_count: number | null;
          slug: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name: string;
          post_count?: number | null;
          slug: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          id?: string;
          name?: string;
          post_count?: number | null;
          slug?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      seed_uuid: { Args: { seed_text: string }; Returns: string };
      show_limit: { Args: never; Returns: number };
      show_trgm: { Args: { "": string }; Returns: string[] };
    };
    Enums: {
      notification_type: "like" | "comment" | "follow" | "reply";
      post_status: "draft" | "published" | "archived";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      notification_type: ["like", "comment", "follow", "reply"],
      post_status: ["draft", "published", "archived"],
    },
  },
} as const;

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Post = Database["public"]["Tables"]["posts"]["Row"];
export type Comment = Database["public"]["Tables"]["comments"]["Row"];
export type Tag = Database["public"]["Tables"]["tags"]["Row"];
export type Like = Database["public"]["Tables"]["likes"]["Row"];
export type Bookmark = Database["public"]["Tables"]["bookmarks"]["Row"];
export type Follow = Database["public"]["Tables"]["follows"]["Row"];
export type Notification = Database["public"]["Tables"]["notifications"]["Row"];
export type PostView = Database["public"]["Tables"]["post_views"]["Row"];
export type PostDraft = Database["public"]["Tables"]["post_drafts"]["Row"];
export type PostTag = Database["public"]["Tables"]["post_tags"]["Row"];
export type DailyPostStat =
  Database["public"]["Tables"]["daily_post_stats"]["Row"];

export type InsertPost = Database["public"]["Tables"]["posts"]["Insert"];
export type InsertComment = Database["public"]["Tables"]["comments"]["Insert"];
export type InsertProfile = Database["public"]["Tables"]["profiles"]["Insert"];
export type InsertTag = Database["public"]["Tables"]["tags"]["Insert"];
export type InsertLike = Database["public"]["Tables"]["likes"]["Insert"];
export type InsertBookmark =
  Database["public"]["Tables"]["bookmarks"]["Insert"];
export type InsertFollow = Database["public"]["Tables"]["follows"]["Insert"];
export type InsertNotification =
  Database["public"]["Tables"]["notifications"]["Insert"];
export type InsertPostDraft =
  Database["public"]["Tables"]["post_drafts"]["Insert"];

export type UpdatePost = Database["public"]["Tables"]["posts"]["Update"];
export type UpdateComment = Database["public"]["Tables"]["comments"]["Update"];
export type UpdateProfile = Database["public"]["Tables"]["profiles"]["Update"];
export type UpdateTag = Database["public"]["Tables"]["tags"]["Update"];
export type UpdatePostDraft =
  Database["public"]["Tables"]["post_drafts"]["Update"];

export type PostStatus = Database["public"]["Enums"]["post_status"]; // 'draft' | 'published' | 'archived'
export type NotificationType = Database["public"]["Enums"]["notification_type"]; // 'like' | 'comment' | 'follow' | 'reply'
