import {
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Dialog,
} from '@/components/ui/dialog'

type ModalProps = {
  children: React.ReactNode
  onClose?: () => void
  description: string
  isOpen: boolean
  title: string
}

export const Modal = ({
  description,
  children,
  onClose,
  isOpen,
  title,
}: ModalProps) => {
  return (
    <Dialog modal onOpenChange={onClose} open={isOpen} defaultOpen={isOpen}>
      <DialogContent className="md:h-[600px] md:w-[30rem] h-full w-full flex flex-col bg-zinc-950 rounded p-10">
        <DialogHeader>
          <div className="flex flex-col mt-5 gap-2 justify-center items-center">
            <DialogTitle className="text-[1.475rem] font-mono font-bold">
              {title}
            </DialogTitle>
            <DialogDescription className="text-[#A1A1AA]">
              {description}
            </DialogDescription>
          </div>
          <DialogClose
            className="border-transparent focus:border-transparent focus:ring-0 focus-visible:ring-0"
            onClick={onClose}
          />
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
