'use client'

import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingMenu() {
  return (
    <main className="w-full h-full overflow-y-auto p-6">
      <div className="rounded-xl border-[#FFFA]/10 border p-6 md:p-10">
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  )
}
