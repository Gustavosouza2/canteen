'use client'

import { viewCustomers } from './view/viewCustomers'
import { useCustomers } from './model/useCustomers'

export default function Customers() {
  return viewCustomers(useCustomers())
}
