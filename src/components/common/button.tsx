import { ComponentPropsWithRef, forwardRef } from 'react'

import { cn } from '@/utils/style'

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  unstyled?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, className = '', type = 'button', unstyled = false, ...props },
    ref,
  ) => {
    return (
      <>
        <button
          className={cn([!unstyled && 'btn', 'flex items-center', className])}
          type={type}
          {...props}
          ref={ref}
        >
          {children}
        </button>
      </>
    )
  },
)

export default Button
