/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  TableHeader,
  TableFooter,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Table,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import * as Types from "./type";
import { PaginationTeste } from "../pagination/Pagination";

const badgePropsColor: Record<string, JSX.Element> = {
  done: (
    <Badge className="bg-zinc-800 rounded-xl text-green-500 font-mono font-medium hover:bg-zinc-900">
      Pago
    </Badge>
  ),
  pending: (
    <Badge className="bg-zinc-800 text-orange-500  font-mono font-medium rounded-xl hover:bg-zinc-900">
      Depois
    </Badge>
  ),
};

const parsedDataTable = (data: any, column: Types.TableColumn<any>) => {
  if (column.name === "amount")
    return Number(data[column.name]).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });

  if (column.name === "status") return badgePropsColor[data[column.name]];

  return data[column.name];
};

export function DataTable<T extends Array<any>>({
  data,
  footer,
  columns,
  isLoading,
  totalPages,
  currentPage,
  onPageChange,
}: Types.DataTableProps<T>) {
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-96 rounded-xl" />
      ) : (
        <div className="w-full border border-[#FFFA]/10 rounded-xl">
          <div className="rounded-xl p-5 w-full">
            <Table className="w-full">
              {data && data?.length >= 1 && (
                <>
                  <TableHeader>
                    <TableRow className="border-b border-[#FFFA]/20 hover:bg-transparent">
                      {columns.map((column, index) => (
                        <TableHead
                          className={`w-${column.size} text-gray-400 font-medium place-items-center`}
                          key={`th-${index}`}
                        >
                          {column.label}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map(({ onClickRow, ...data }, dataIndex) => (
                      <TableRow
                        key={`tr-${dataIndex}`}
                        className="border-b  border-[#FFFA]/10 hover:bg-[#FFFA]/5 transition-colors"
                      >
                        {columns.map((column, columnIndex) => (
                          <TableCell
                            className={`w-${column.size}`}
                            key={`tr-${columnIndex}`}
                            onClick={onClickRow}
                          >
                            {parsedDataTable(data, column)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>

                  {!!footer && (
                    <TableFooter>
                      <TableRow className="border-t  border-[#FFFA]/20">
                        <TableCell colSpan={3} className="text-gray-400">
                          Total
                        </TableCell>
                        <TableCell className="text-right text-gray-200">
                          $2,500.00
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  )}
                </>
              )}
            </Table>
            <PaginationTeste
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      )}
    </>
  );
}
