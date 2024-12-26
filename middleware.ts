import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies?.get('token')

  if (!token && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect('/login')
  }

  const res = NextResponse.next()

  const supabase = createMiddlewareClient({ req, res })

  await supabase.auth.getSession()
  return res
}
