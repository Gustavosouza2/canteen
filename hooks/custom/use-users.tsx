import { useQuery } from '@tanstack/react-query'
import { getUsers } from '../../app/(dashboard)/api/queries/get-users'
import useSupabase from './use-supabase'

export const useUsersQuery = () => {
  const client = useSupabase()
  const queryKey = ['User']
  const queryFn = async () => {
    return getUsers(client).then((result) => result.data?.map((user) => user))
  }
  return useQuery({ queryKey, queryFn })
}
