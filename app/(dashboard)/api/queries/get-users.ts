import { SupabaseClientType } from '@/lib/supabase'

export function getUsers(client: SupabaseClientType) {
  return client.from('User').select('*')
}
