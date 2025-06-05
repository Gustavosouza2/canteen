'use client'

import type React from 'react'
import { Plus } from 'lucide-react'

type ButtonAddItemMenuProps = {
  onClick: (e: React.MouseEvent) => void
  className?: string
}

export const ButtonAddItemMenu = ({
  onClick,
  className,
}: ButtonAddItemMenuProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClick(e)
  }

  return (
    <button
      onClick={handleClick}
      className={`
        group relative flex items-center justify-center
        hover:border-primary/20 hover:bg-primary/10
        rounded-[10px] bg-primary/5
        transition-all duration-300
        border-[#FFFA]/10 border
        w-full h-64 min-h-[16rem]
        cursor-pointer
        ${className}
      `}
      aria-label="Adicionar novo item ao menu"
    >
      <div className="flex flex-col items-center gap-3 text-primary/70 group-hover:text-primary/90 transition-colors">
        <Plus size={48} strokeWidth={1.5} />
      </div>
    </button>
  )
}
