import { useQuery } from "@tanstack/react-query";

import { getUsers } from "../../app/(dashboard)/api/queries/get-users";
import { Customer } from "@/services/types/customer";
import useSupabase from "./use-supabase";

function useUsersQuery(page: number, pageSize: number) {
  const client = useSupabase();
  const queryKey = ["User", page, pageSize];

  const queryFn = async () => {
    return getUsers(client, page, pageSize).then((result) => {
      return {
        data: result.data as Customer[],
        count: result.count,
      };
    });
  };

  return useQuery({ queryKey, queryFn });
}

export default useUsersQuery;
