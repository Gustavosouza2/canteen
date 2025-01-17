import { getUsers } from "../../app/(dashboard)/api/queries/get-users";
import { Customer } from "@/services/types/customer";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "./use-supabase";

function useUsersQuery(page: number, pageSize: number) {
  const client = useSupabase();
  const queryKey = ["User", page, pageSize];

  const queryFn = async () => {
    const { data, count } = await getUsers(client, pageSize, page);

    return { data: data as Customer[], count: count || 0 };
  };

  return useQuery({
    staleTime: 1000 * 60,
    queryKey,
    retry: 2,
    queryFn,
  });
}

export default useUsersQuery;
