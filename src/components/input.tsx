import React, { ChangeEventHandler } from 'react'
import tw from 'twin.macro'
import { Box } from './'

type TextInputAs = 'input' | 'textarea'

type TextInputProperties<T extends TextInputAs> = React.ComponentProps<React.ReactHTML[T]> & {
  children?: never,
  as?: T,
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const TextInput =
  <T extends TextInputAs>({ as, ...rest }: TextInputProperties<T>) => {
    const baseStyle = tw`w-full p-4 text-2xl border-2 border-primary rounded-4xl`

    return (
      <Box tw="w-full rounded-4xl">
        {
          as === 'input'
            ? <input type="number" css={[baseStyle]} {...rest} />
            : <textarea css={[baseStyle, tw`h-32`]} {...rest} />
        }
      </Box>
    )
  }
