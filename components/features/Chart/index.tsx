'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'
import { format, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from '@/components/ui/card'
import {
  ChartTooltipContent,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'

import { capitalizeFirstLetter } from '@/utils/capitalize'
import { Skeleton } from '@/components/ui/skeleton'

type ChartProps = {
  isLoading: boolean
}

const chartData = [
  { month: 'Agosto', desktop: 305 },
  { month: 'Setembro', desktop: 237 },
  { month: 'Outubro', desktop: 73 },
  { month: 'Novembro', desktop: 209 },
  { month: 'Dezembro', desktop: 214 },
  { month: 'Janeiro', desktop: 214 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
}

const currentMonth = format(new Date(), 'MMMM yyyy', { locale: ptBR })
const subMonth = subMonths(new Date(), 5)
const formattedMonth = format(subMonth, 'LLLL', { locale: ptBR })

export const Chart = ({ isLoading }: ChartProps) => {
  return (
    <>
      {isLoading ? (
        <Skeleton className="w-full h-72 rounded-xl" />
      ) : (
        <Card className="h-[300px] rounded-xl border border-[#FFFA]/10 bg-[#0E0E10]">
          <CardHeader className="pb-2">
            <CardTitle className="text-[#D1D1D2]">Situação Mensal</CardTitle>
            <CardDescription className="text-[#A1A1AA]">
              {capitalizeFirstLetter(formattedMonth)} -{' '}
              {capitalizeFirstLetter(currentMonth)}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="h-[180px] w-full">
              <ChartContainer config={chartConfig} className="h-full w-full">
                <BarChart
                  margin={{ top: 15, right: 15, bottom: 0, left: 0 }}
                  className="text-[#D1D1D2]"
                  data={chartData}
                  height={180}
                  width={500}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    tickFormatter={(value) => value.slice(0, 3)}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    dataKey="month"
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                    <LabelList
                      className="fill-#A1A1AA bg-transparent"
                      position="top"
                      offset={12}
                    />
                  </Bar>
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
