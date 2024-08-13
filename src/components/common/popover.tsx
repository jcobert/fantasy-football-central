'use client'

import * as Radix from '@radix-ui/react-popover'
import { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
  trigger?: ReactNode
  triggerProps?: Radix.PopoverTriggerProps
  contentProps?: Radix.PopoverContentProps
} & Radix.PopoverProps

const Popover: FC<Props> = ({
  children,
  trigger,
  triggerProps,
  contentProps,
  ...rootProps
}) => {
  return (
    <Radix.Root {...rootProps}>
      <Radix.Trigger {...triggerProps}>{trigger}</Radix.Trigger>
      <Radix.Content sideOffset={5} {...contentProps}>
        {children}
        <Radix.Arrow className='fill-gray-300' />
      </Radix.Content>
    </Radix.Root>
  )
}

export default Popover
