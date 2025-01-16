import { SupabaseClientType } from "@/lib/supabase";

export function getUsers(
  client: SupabaseClientType,
  pageSize: number,
  page: number
) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  return client.from("User").select("*").range(from, to);
}
