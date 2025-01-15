import { DataTable } from "@/components/features/table";
import { useCustomers } from "../model/useCustomers";
import { Button } from "@/components/ui/button";

export const customersView = (props: ReturnType<typeof useCustomers>) => {
  const { customers, isLoading, columns } = props;

  return (
    <div className="flex flex-col w-full md:mr-96 mx-12">
      <div className="flex flex-row justify-between">
        <h1 className="text-gray-300 font-mono font-medium tracking-wide ml-5 mt-1">
          Clientes:
        </h1>

        <div>
          <Button variant="secondary" className="rounded-xl">
            Novo Cliente
          </Button>
        </div>
      </div>

      <DataTable
        data={customers as any}
        isLoading={isLoading}
        columns={columns}
        title="Clientes"
      />
    </div>
  );
};
