import { useUserContext } from "@/context/userContext";
import useUsersQuery from "@/hooks/custom/use-users";

export const useHome = () => {
  const { userData } = useUserContext();

  const { data: customers, isLoading } = useUsersQuery(0, 10);

  const totalAmount = customers?.data
    ?.map((customer) => customer?.amount)
    .reduce((acc: number, currAmount: number) => {
      return acc + currAmount;
    }, 0);

  const cardItems = [
    {
      info: `Bem vindo de volta ${userData?.email?.slice(0, 7) || "Admin"}!`,
    },
    {
      title: "Clientes",
      info: customers?.data?.length.toString(),
      description: "Total de clientes adicionados",
    },
    {
      title: "Valor total de vendas",
      info: `R$${totalAmount}`,
      description: "Numero total de vendas realizadas",
    },
  ];

  return {
    cardItems,
    isLoading,
  };
};
