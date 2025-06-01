'use client'

import { MenuView } from './view/MenuView'
import { useMenu } from './model/useMenu'

export default function Menu() {
  return MenuView(useMenu())
}
