'use client'

import { HomeView } from './view/HomeView'
import { useHome } from './model/useHome'

export default function Home() {
  return HomeView(useHome())
}
