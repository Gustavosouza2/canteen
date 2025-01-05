import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
// import type { Database } from './database.types'
import type { Customer } from '@/services/types/customer'

export type SupabaseClientType = SupabaseClient<Customer>
let client: SupabaseClientType | undefined

export function getSupabaseBrowserClient() {
  if (client) {
    return client
  }

  client = createBrowserClient<Customer>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  return client
}
