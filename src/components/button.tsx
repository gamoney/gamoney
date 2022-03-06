import { CSSInterpolation } from '@emotion/serialize'
import { Icon } from '@iconify/react'
import React from 'react'
import tw from 'twin.macro'
import { Box } from './'

const ButtonBase = tw(Box)`px-8 py-3 bg-white text-3xl`

type ButtonProperties<T extends AnyComponent> =
  React.PropsWithChildren<PropertiesOf<T> & { as?: AnyComponent, css?: CSSInterpolation }>

export const TextButton =
  <T extends AnyComponent = 'button'>({ children, as = 'button', ...rest }: ButtonProperties<T>) => (
    <ButtonBase as={as} {...rest}>
      {children}
    </ButtonBase>
  )

type IconButtonProperties<T extends AnyComponent> = ButtonProperties<T> & {
  children?: never,
  icon: string
}

export const IconButton =
  <T extends AnyComponent = 'button'>({ icon, as = 'button', css, ...rest }: IconButtonProperties<T>) => (
    <ButtonBase
      as={as}
      css={[tw`flex items-center justify-center flex-grow-0 flex-shrink-0 px-0 py-0 rounded-full`, css]}
      {...rest}
    >
      <Icon icon={icon} />
    </ButtonBase>
  )
