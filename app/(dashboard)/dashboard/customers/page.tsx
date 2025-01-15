"use client";

import { customersView } from "./view/CustomersView";
import { useCustomers } from "./model/useCustomers";

export default function Customers() {
  return customersView(useCustomers());
}
