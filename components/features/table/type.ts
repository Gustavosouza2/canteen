/* eslint-disable  @typescript-eslint/no-explicit-any */

import { IconType } from "react-icons";

export interface TableColumn<T extends string> {
  label?: string;
  size?: string;
  name: T;
}

export interface DataTableProps<T extends Array<any>> {
  onPageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
  isLoading?: boolean;
  title?: string;
  data: T;
  footer?: {
    message: string;
    icon?: IconType;
    onClick?: () => void;
  };
  columns: Readonly<TableColumn<any>[]>;
}
