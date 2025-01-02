import { Chart } from '@/components/features/chart/Chart'
import { Card } from '@/components/features/card/Card'
import { useHome } from '../model/useHome'

export const HomeView = (props: ReturnType<typeof useHome>) => {
  const { cardItems, isLoading } = props

  return (
    <main className="flex flex-col gap-6 p-6 md:-ml-72 ml-9 md:mt-3 mx-14 items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data={cardItems} isLoading={isLoading} />
      </div>

      <div className="w-full">
        <Chart isLoading={isLoading} />
      </div>
    </main>
  )
}
