'use client'

import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { gsap } from 'gsap'
import {
  MdVisibilityOff,
  MdContentCopy,
  MdDelete,
  MdEdit,
} from 'react-icons/md'

import { TooltipProvider } from '@/components/ui/tooltip'
import { CardMenuData } from '@/types/card-menu-items'

import { FooterCardMenu } from './FooterCardMenu'
import { HeaderCardMenu } from './HeaderCardMenu'
import { MainCardMenu } from './MainCardMenu'
import { TextCardMenu } from './TextCardMenu'

type CardMenuProps = {
  fadeOut?: number
  item: CardMenuData
  className?: string
  onDelete?: (itemId: string) => void
  onEdit?: (item: CardMenuData) => void
  onDuplicate?: (item: CardMenuData) => void
  onUpdatePrice?: (itemId: string, newPrice: number) => void
  onUpdateQuantity?: (itemId: string, newQuantity: number) => void
  onToggleAvailability?: (itemId: string, isAvailable: boolean) => void
}

export const CardMenu = ({
  item,
  onEdit,
  onDelete,
  className,
  onDuplicate,
  onUpdatePrice,
  fadeOut = 0.6,
  onUpdateQuantity,
  onToggleAvailability,
}: CardMenuProps) => {
  const fadeRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const [isEditingPrice, setIsEditingPrice] = useState(false)
  const [tempPrice, setTempPrice] = useState(item.price.toString())

  const handleMove = (e: PointerEvent) => {
    if (!rootRef.current || !fadeRef.current) return

    const r = rootRef.current.getBoundingClientRect()
    gsap.quickSetter(fadeRef.current, '--x', 'px')(e.clientX - r.left)
    gsap.quickSetter(fadeRef.current, '--y', 'px')(e.clientY - r.top)
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true })
  }

  const handleLeave = () => {
    if (!fadeRef.current) return

    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    })
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(0, item.quantity + delta)
    onUpdateQuantity?.(item.id, newQuantity)
  }

  const handlePriceSubmit = () => {
    const newPrice = Number.parseFloat(tempPrice)
    if (!isNaN(newPrice) && newPrice > 0) {
      onUpdatePrice?.(item.id, newPrice)
    } else {
      setTempPrice(item.price.toString())
    }
    setIsEditingPrice(false)
  }

  const handlePriceKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePriceSubmit()
    } else if (e.key === 'Escape') {
      setTempPrice(item.price.toString())
      setIsEditingPrice(false)
    }
  }

  const contextMenuItems = [
    {
      label: 'Editar',
      icon: () => <MdEdit className="h-4 w-4 fill-current" />,
      onClick: () => onEdit?.(item),
    },
    {
      label: 'Duplicar',
      icon: () => <MdContentCopy className="h-4 w-4 fill-current" />,
      onClick: () => onDuplicate?.(item),
    },
    {
      label: 'Deletar',
      icon: () => <MdDelete className="h-4 w-4 fill-current" />,
      onClick: () => onDelete?.(item.id),
    },
  ]

  const getStatusColor = () => {
    if (!item.isAvailable) return 'bg-transparent border-red-500/40'
    return 'bg-transparent border-green-500/40'
  }

  return (
    <TooltipProvider>
      <div
        ref={rootRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`relative w-full h-full flex flex-wrap justify-center items-start gap-3 ${className}`}
      >
        <article
          className={`group p-4 relative flex flex-col w-full rounded-xl overflow-hidden border-2 bg-card transition-all duration-300 ${getStatusColor()} ${
            !item.isAvailable ? 'opacity-75' : ''
          }`}
        >
          {/* Hover Effect */}
          <div
            ref={fadeRef}
            className="absolute 
            inset-0 pointer-events-none 
            transition-opacity duration-500 
            z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1), transparent 70%)',
            }}
          />

          {/* Header Content */}
          <HeaderCardMenu item={item} items={contextMenuItems} />

          {/* Image Content */}
          <div className="relative z-10 mb-4">
            <img
              loading="lazy"
              alt={item.title}
              src={item.image || '/placeholder.svg'}
              className="w-full h-48 object-cover rounded-[10px]"
            />
            {!item.isAvailable && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <MdVisibilityOff className="text-white text-3xl" />
              </div>
            )}
          </div>

          {/* Text Content */}
          <TextCardMenu item={item} />

          {/* Main Content */}
          <MainCardMenu
            item={item}
            tempPrice={tempPrice}
            setTempPrice={setTempPrice}
            isEditingPrice={isEditingPrice}
            setIsEditingPrice={setIsEditingPrice}
            handlePriceSubmit={handlePriceSubmit}
            handlePriceKeyDown={handlePriceKeyDown}
            handleQuantityChange={handleQuantityChange}
          />

          {/* Footer Content */}
          <FooterCardMenu
            item={item}
            onToggleAvailability={onToggleAvailability}
          />
        </article>
      </div>
    </TooltipProvider>
  )
}
