import { useState } from 'react'

import { CreateCustomerForm } from './steps/CreateCustomerForm'
import { CreateMessage } from './steps/CreateMessage'
import { Modal } from '@/components/features/Modal'

type CreateCustomerModalProps = {
  onClose: () => void
  isOpen: boolean
}

export type StepKey = 0 | 1

type Steps = {
  [K in StepKey]: JSX.Element
}

export const CreateCustomerModal = ({
  onClose,
  isOpen,
}: CreateCustomerModalProps) => {
  const [currentStep, setCurrentStep] = useState<StepKey>(0)

  const steps: Steps = {
    0: <CreateCustomerForm setCurrentStep={setCurrentStep} />,
    1: <CreateMessage />,
  }

  return (
    <Modal
      description="adicione um cliente para ser possível realizar a cobrança"
      title="Registre um novo cliente"
      onClose={onClose}
      isOpen={isOpen}
    >
      {steps[currentStep]}
    </Modal>
  )
}
