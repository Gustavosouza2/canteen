import {
  Card as CardShadcn,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CardProps {
  description?: string
  title?: string
  info?: string
}

interface CardMapProps {
  data: Array<CardProps>
}
export const Card = ({ data }: CardMapProps) => {
  return data.map((item, i) => (
    <CardShadcn
      className="w-full rounded-xl border  border-[#DA4453] bg-transparent"
      key={i}
    >
      <CardHeader>
        <CardTitle className="text-[#D1D1D2] font-mono text-md whitespace-normal tracking-wide">
          {item.title}
        </CardTitle>
        <p className="text-[#D1D1D2] text-2xl font-bold whitespace-normal">
          {item.info}
        </p>
        <CardDescription className="font-sans text-sm text-[#A1A1AA] whitespace-normal">
          {item.description}
        </CardDescription>
      </CardHeader>
    </CardShadcn>
  ))
}
