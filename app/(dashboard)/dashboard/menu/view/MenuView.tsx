import { useState } from 'react'

import { ButtonAddItemMenu } from '@/components/features/ButtonAddItemMenu'
import { type CardMenuData } from '@/types/card-menu-items'
import { CardMenu } from '@/components/features/CardMenu'

export const MenuView = () => {
  const [menuItems, setMenuItems] = useState<CardMenuData[]>([
    {
      id: '1',
      title: 'Hambúrguer Artesanal',
      description:
        'Hambúrguer com carne 180g, queijo cheddar, alface, tomate e molho especial',
      image:
        'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400',
      price: 25.9,
      quantity: 15,
      category: 'Hambúrgueres',
      isAvailable: true,
    },
    {
      id: '2',
      title: 'Pizza Margherita',
      description:
        'Pizza tradicional com molho de tomate, mussarela e manjericão fresco',
      image:
        'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400',
      price: 32.5,
      quantity: 0,
      category: 'Pizzas',
      isAvailable: true,
      hasPromotion: true,
    },
    {
      id: '3',
      title: 'Sushi Combo Premium',
      description: 'Combinado com 20 peças variadas de sushi e sashimi frescos',
      image:
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400',
      price: 45.0,
      quantity: 8,
      category: 'Japonesa',
      isAvailable: true,
      isNew: true,
    },
  ])

  const handleEdit = (item: CardMenuData) => {
    console.log('Editar item:', item.title)
    // Implementar modal de edição
  }

  const handleDelete = (itemId: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== itemId))
    console.log('Item deletado:', itemId)
  }

  const handleDuplicate = (item: CardMenuData) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      title: `${item.title} (Cópia)`,
    }
    setMenuItems((prev) => [...prev, newItem])
    console.log('Item duplicado:', newItem.title)
  }

  const handleToggleAvailability = (itemId: string, isAvailable: boolean) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isAvailable } : item,
      ),
    )
  }

  const handleUpdateQuantity = (itemId: string, newQuantity: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item,
      ),
    )
  }

  const handleUpdatePrice = (itemId: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, price: newPrice } : item,
      ),
    )
  }

  return (
    <main className="w-full h-full overflow-y-auto  p-6 scrollbar-hide">
      <div className="rounded-xl border-[#FFFA]/10 border p-6 md:p-10">
        <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <CardMenu
              key={index}
              item={item}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onDuplicate={handleDuplicate}
              onUpdatePrice={handleUpdatePrice}
              onUpdateQuantity={handleUpdateQuantity}
              onToggleAvailability={handleToggleAvailability}
            />
          ))}
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <ButtonAddItemMenu onClick={() => console.log('click')} />
          </div>
        </div>
      </div>
    </main>
  )
}
