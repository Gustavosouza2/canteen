import { useEffect, useState } from 'react'

import { EditCustomerForm } from './steps/EditCustomerForm'
import { Modal } from '@/components/features/Modal'
import { EditMessage } from './steps/EditMessage'

type EditCustomerModalProps = {
  onClose: () => void
  isOpen: boolean
  id?: number
}

export type StepKey = 0 | 1

type Steps = {
  [K in StepKey]: JSX.Element
}

export const EditCustomerModal = ({
  onClose,
  isOpen,
}: EditCustomerModalProps) => {
  const [currentStep, setCurrentStep] = useState<StepKey>(0)

  useEffect(() => {
    if (!isOpen) setCurrentStep(0)
  }, [isOpen, setCurrentStep])

  const steps: Steps = {
    0: <EditCustomerForm setCurrentStep={setCurrentStep} />,
    1: <EditMessage onClose={onClose} />,
  }

  return (
    <Modal
      description={
        currentStep === 0
          ? 'altere o status ou o valor total do pedido'
          : 'informações editadas, volte para a lista de clientes'
      }
      title={
        currentStep === 0
          ? 'Alterar valor total e status'
          : 'Informações editadas com sucesso'
      }
      onClose={onClose}
      isOpen={isOpen}
    >
      {steps[currentStep]}
    </Modal>
  )
}
