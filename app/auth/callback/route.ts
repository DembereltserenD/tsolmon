import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/database.types'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (authError) throw authError
      
      if (user) {
        // Check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single()
          
        if (profileError || !profile) {
          // Create profile if it doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              email: user.email!,
              role: 'user' // Default role
            })
            
          if (insertError) throw insertError
        }
      }
    } catch (error) {
      console.error('Auth callback error:', error)
      // Redirect to login with error
      return NextResponse.redirect(new URL('/login?error=callback_error', requestUrl))
    }
  }

  // Redirect to the home page after callback processing
  return NextResponse.redirect(new URL('/', requestUrl))
}
