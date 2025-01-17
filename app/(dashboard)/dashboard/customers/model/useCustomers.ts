import useUsersQuery from "@/hooks/custom/use-users";
import { useEffect, useState } from "react";

const PAGE_SIZE = 10;

export const useCustomers = () => {
  const [page, setPage] = useState<number>(1);
  const { data: customers, isLoading } = useUsersQuery(page, PAGE_SIZE);

  const totalPages = customers?.count
    ? Math.max(1, Math.ceil(customers.count / PAGE_SIZE))
    : 1;

  useEffect(() => {
    if (customers?.count && customers.count <= PAGE_SIZE && page !== 1) {
      setPage(1);
    }
  }, [customers?.count, page]);

  const columns = [
    { name: "name", label: "Nome:", size: "30" },
    { name: "email", label: "Email:", size: "30" },
    { name: "status", label: "Status:", size: "40" },
    { name: "amount", label: "Valor:", size: "20" },
  ];

  return {
    totalPages,
    isLoading,
    customers: customers?.data || [],
    setPage,
    columns,
    page,
  };
};
