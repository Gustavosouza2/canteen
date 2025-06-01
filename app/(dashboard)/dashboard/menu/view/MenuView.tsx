import { ButtonAddItemMenu } from '@/components/features/ButtonAddItemMenu'
import { useMobile } from '@/hooks/custom/useCustomMobile'

interface MenuItem {
  title: string
  description: string
}

export const MenuView = () => {
  const isMobile = useMobile()
  const menuItems: MenuItem[] = [
    {
      title: 'Item 1',
      description: 'Descrição do Item 1',
    },
    {
      title: 'Item 2',
      description: 'Descrição do Item 2',
    },
  ] // Temporário até implementar o useMenu

  return (
    <main className="p-4">
      <div className="bg-zinc-900 rounded-xl border-[#FFFA]/10 border p-6">
        <div
          className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}
        >
          {menuItems.map((item: MenuItem, index: number) => (
            <div key={index} className="w-full">
              {/* Aqui você pode adicionar seu componente de card do cardápio */}
              <div className="bg-zinc-800 rounded-lg p-4 h-full">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            </div>
          ))}
          <div className="w-full" onClick={(e) => e.stopPropagation()}>
            <ButtonAddItemMenu onClick={() => console.log('click')} />
          </div>
        </div>
      </div>
    </main>
  )
}
