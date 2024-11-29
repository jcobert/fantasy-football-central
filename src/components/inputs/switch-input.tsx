import * as Switch from '@radix-ui/react-switch'
import { FC } from 'react'

import { cn } from '@/utils/style'

import { AdditionalInputProps } from '@/components/inputs/text-input'

export type SwitchInputProps = Pick<
  AdditionalInputProps,
  'label' | 'labelClassName'
> &
  Switch.SwitchProps

const SwitchInput: FC<SwitchInputProps> = ({
  label,
  labelClassName,
  ...props
}) => {
  return (
    <div className='flex items-center gap-2 flex-none'>
      <label
        htmlFor={props?.id}
        className={cn(['text-sm text-gray-500', labelClassName])}
      >
        {label}
      </label>
      <Switch.Root
        // className='relative h-[25px] w-[42px] cursor-default rounded-full bg-blackA6 shadow-[0_2px_10px] shadow-blackA4 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-black'
        className='relative h-[25px] w-[42px] bg-brand-light/40 rounded-full shadow-[0_2px_10px]__ shadow-sm outline-none focus:shadow-[0_0_0_2px] focus:shadow-brand-dark data-[state=checked]:bg-brand'
        {...props}
      >
        <Switch.Thumb
          // className='block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]'
          className='block size-[21px] translate-x-0.5 rounded-full bg-white shadow-[0_1px_4px] shadow-black/40 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[19px]'
        />
      </Switch.Root>
    </div>
  )
}

export default SwitchInput
