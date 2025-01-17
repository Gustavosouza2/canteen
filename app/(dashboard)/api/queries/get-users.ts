import { SupabaseClientType } from "@/lib/supabase";

export async function getUsers(
  client: SupabaseClientType,
  pageSize: number,
  page: number
) {
  try {
    const { count } = await client
      .from("User")
      .select("*", { count: "exact", head: true });

    if (!count) {
      return { data: [], count: 0 };
    }

    const totalPages = Math.ceil(count / pageSize);
    const adjustedPage = Math.min(page, totalPages);
    const from = (adjustedPage - 1) * pageSize;
    const to = from + pageSize - 1;

    const { data, error } = await client
      .from("User")
      .select("*")
      .range(from, to)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching users:", error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error("Error in getUsers function:", error);
    throw error;
  }
}
