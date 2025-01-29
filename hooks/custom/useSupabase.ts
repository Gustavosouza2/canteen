import { getSupabaseBrowserClient } from '../../lib/supabase'
import { useMemo } from 'react'

export const useSupabase = () => {
  const getBrowserClient = useMemo(() => getSupabaseBrowserClient(), [])

  return getBrowserClient
}
export default useSupabase
