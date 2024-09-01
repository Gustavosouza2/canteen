/* eslint-disable  @typescript-eslint/no-explicit-any */

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import * as Types from './type'

export function DataTable<T extends Array<any>>({
  footer,
  columns,
  data,
}: Types.DataTableProps<T>) {
  return (
    <Table>
      {data && data?.length >= 1 && (
        <>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead className={`w-${column.size}`} key={`th-${index}`}>
                  {column.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map(({ onClickRow, ...data }, dataIndex) => (
              <TableRow key={`tr-${dataIndex}`}>
                {columns.map((column, columnIndex) => (
                  <TableCell
                    className={`w-${column.size}`}
                    key={`tr-${columnIndex}`}
                    onClick={onClickRow}
                  >
                    {data[column.name] ? data[column.name] : '-'}
                  </TableCell>
                ))}
                <TableCell className="font-medium">{data.invoice}</TableCell>
                <TableCell>{data.paymentStatus}</TableCell>
                <TableCell>{data.paymentMethod}</TableCell>
                <TableCell className="text-right">{data.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {!!footer && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          )}
        </>
      )}
    </Table>
  )
}
