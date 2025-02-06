export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
      }
      announcements: {
        Row: {
          id: string
          title: string
          content: string
          created_at: string
          updated_at: string
          author_id: string
        }
      }
      files: {
        Row: {
          id: string
          name: string
          url: string
          created_at: string
          updated_at: string
          uploaded_by: string
        }
      }
    }
  }
}
