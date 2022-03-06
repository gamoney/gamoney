import React from 'react'
import tw, { GlobalStyles } from 'twin.macro'
import { Navbar } from './'

type LayoutProperties = React.ComponentProps<React.ReactHTML['div']> & {
  hasNavbar?: boolean
}

export const Layout: React.FC<LayoutProperties> = ({ children, hasNavbar, ...rest }) => (
  <div tw="w-full h-screen flex flex-col items-center justify-between" {...rest}>
    {children}
    {hasNavbar && <div tw="w-full pb-16" />}
    {hasNavbar && <Navbar />}
    <GlobalStyles />
  </div>
)
