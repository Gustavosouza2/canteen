import { getSupabaseBrowserClient } from '../../lib/supabase'
import { useMemo } from 'react'

export const useSupabase = () => {
  return useMemo(getSupabaseBrowserClient, [])
}
export default useSupabase
