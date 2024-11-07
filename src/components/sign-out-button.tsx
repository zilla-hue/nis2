'use client'
import React from 'react'
import { Button } from './ui/button'
// import { logOut } from '@/pages/authenticate/auth.action'

type Props = {
  variant?: "default" |"destructive"|"ghost"|"link"|"outline"|"secondary",
  className?: string,
  size?: "default"|"lg"|"sm"|"icon"
    children: React.ReactNode
}

const SignOutButton = ({ variant = "default", size = "default", className, children }: Props) => {
    return (
      <Button variant={variant} size={size} className={className} onClick={() => {  }}>{children}</Button>
    )
}

export default SignOutButton