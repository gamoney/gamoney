import { Icon } from '@iconify/react'
import React from 'react'
import tw from 'twin.macro'
import { useLocation } from 'wouter-preact'

const NavbarButtonWrapper = tw.button`w-full p-4 flex items-center justify-center`

type NavbarButtonProperties = React.ComponentProps<React.ReactHTML['button']> & {
  icon: string
}
const NavbarButton: React.FC<NavbarButtonProperties> = ({ icon, ...rest }) => (
  <NavbarButtonWrapper {...rest}>
    <Icon tw="w-8 h-8" icon={icon} />
  </NavbarButtonWrapper>
)

const NavbarWrapper = tw.nav`w-full fixed bottom-0 left-0 flex border-t bg-white`

export const Navbar = () => {
  const [, setLocation] = useLocation()

  return (
    <NavbarWrapper>
      <NavbarButton icon="uil:pen" onClick={() => setLocation('/record')} />
      <NavbarButton icon="uil:history" onClick={() => setLocation('/history')} />
      <NavbarButton icon="uil:list-ul" onClick={() => setLocation('/goal')} />
      <NavbarButton icon="uil:user" onClick={() => setLocation('/settings')} />
    </NavbarWrapper>
  )
}
