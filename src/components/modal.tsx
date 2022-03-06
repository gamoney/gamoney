import React from 'react'
import tw from 'twin.macro'
import { IconButton } from './button'
import { Box } from './'

const ModalBackdrop =
  tw.div`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50`

const ModalWrapper = tw.form`m-4`

type ModalPromptProperties = {
  label: string,
  onClose: React.MouseEventHandler<never>,
  onSubmit: React.MouseEventHandler<never>,
  active?: boolean
}

export const ModalPrompt: React.FC<ModalPromptProperties> = ({ children, label, onClose, onSubmit, active }) => (
  <>
    {
      active && (
        <ModalBackdrop onClick={onClose}>
          <ModalWrapper as="form" onClick={(event) => event.stopPropagation()}>
            <Box tw="p-8 flex flex-col items-center space-y-8 bg-white">
              <span tw="text-2xl text-center">{label}</span>
              {children}
              <div tw="w-full flex items-center justify-around text-white">
                <IconButton icon="uil:times" tw="w-16 h-16 bg-primary" onClick={onClose} />
                <IconButton icon="uil:check" tw="w-16 h-16 bg-primary" onClick={onSubmit} />
              </div>
            </Box>
          </ModalWrapper>
        </ModalBackdrop>
      )
    }
  </>
)

type ModalConfirmProperties = {
  label: string,
  onClose: React.MouseEventHandler<never>,
  onSubmit: React.MouseEventHandler<never>,
  active?: boolean
}

export const ModalConfirm: React.FC<ModalConfirmProperties> = ({ children, label, onClose, onSubmit, active }) => (
  <>
    {
      active && (
        <ModalBackdrop onClick={onClose}>
          <ModalWrapper as="form" onClick={(event) => event.stopPropagation()}>
            <Box tw="p-8 flex flex-col items-center space-y-8 bg-white">
              <span tw="text-2xl">{label}</span>
              {children}
              <div tw="w-full flex items-center justify-around text-white">
                <IconButton icon="uil:times" tw="w-16 h-16 bg-primary" onClick={onClose} />
                <IconButton icon="uil:check" tw="w-16 h-16 bg-primary" onClick={onSubmit} />
              </div>
            </Box>
          </ModalWrapper>
        </ModalBackdrop>
      )
    }
  </>
)
