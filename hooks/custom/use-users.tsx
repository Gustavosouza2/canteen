import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../app/(dashboard)/api/queries/get-users'
import useSupabase from './use-supabase'
import { Customer } from '@/services/types/customer'

function useUsersQuery() {
  const client = useSupabase()
  const queryKey = ['User']

  const queryFn = async () => {
    return getUsers(client).then((result) => result.data as Customer[])
  }

  return useQuery({ queryKey, queryFn })
}

export default useUsersQuery
