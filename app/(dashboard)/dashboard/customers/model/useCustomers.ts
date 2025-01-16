import useUsersQuery from "@/hooks/custom/use-users";
import { useState } from "react";

const PAGE_SIZE = 10;

export const useCustomers = () => {
  const [page, setPage] = useState<number>(1);
  const { data: customers, isLoading } = useUsersQuery(page, PAGE_SIZE);
  console.log(customers);
  const totalPages = customers
    ? Math.ceil(customers?.count ?? 0 / PAGE_SIZE)
    : 0;

  const columns = [
    { name: "name", label: "Nome:", size: "30" },
    { name: "email", label: "Email:", size: "30" },
    { name: "status", label: "Status:", size: "40" },
    { name: "amount", label: "Valor:", size: "20" },
  ];

  return {
    totalPages,
    isLoading,
    customers,
    setPage,
    columns,
    page,
  };
};
