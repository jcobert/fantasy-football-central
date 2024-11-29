'use client'

import { FC, ReactNode, useEffect, useState } from 'react'
import Select, {
  ActionMeta,
  GroupBase,
  Props,
  StylesConfig,
} from 'react-select'

import { cn } from '@/utils/style'

export const selectStyles: StylesConfig<any, boolean, GroupBase<any>> = {
  control: (base) => ({
    ...base,
    borderWidth: '1px',
    borderColor: 'rgb(209, 213, 219)',
    '&:hover': {
      borderColor: 'rgb(148, 163, 184)',
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: 'rgb(156, 163, 175)',
  }),
}

export type SelectInputProps = Omit<Props, 'onChange'> & {
  label?: ReactNode
  helper?: string
  className?: string
  labelClassName?: string
  onChange?: (
    opt: SelectOption<any, any>,
    actionMeta: ActionMeta<unknown>,
  ) => void
}

const SelectInput: FC<SelectInputProps> = ({
  label = '',
  helper = '',
  className,
  labelClassName,
  id,
  name,
  onChange,
  classNames,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <label htmlFor={id || name} className={cn(className)}>
      <span
        className={cn(
          'text-sm text-gray-500 dark:text-gray-200',
          {
            "after:content-['*'] after:ml-[0.125rem] after:text-red-400":
              props?.required,
          },
          labelClassName,
        )}
      >
        {label}
      </span>
      <Select
        inputId={id || name}
        name={name}
        menuShouldBlockScroll
        menuShouldScrollIntoView
        // captureMenuScroll
        classNames={{
          control: () =>
            'hover:border-gray-400 !transition px-1 py-[1px] border border-gray-300 rounded dark:bg-zinc-600',
          placeholder: () => 'text-base text-zinc-400 dark:text-zinc-300',
          menu: () => 'dark:bg-zinc-800',
          option: (props) =>
            cn({
              'dark:bg-zinc-700': props.isFocused && !props.isSelected,
            }),
          input: () => cn('dark:text-zinc-100'),
          singleValue: () => cn('dark:text-zinc-100'),
          ...classNames,
        }}
        styles={{
          ...selectStyles,
          multiValue: (base) => ({
            ...base,
            backgroundColor: 'rgb(240, 240, 240)',
            borderWidth: '1px',
            borderRadius: '50px',
            padding: '0 4px',
            maxHeight: '28px',
          }),
          multiValueRemove: (base) => ({
            ...base,
            color: 'rgb(150, 150, 150)',
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              backgroundColor: 'unset',
              color: 'rgb(100, 100, 100)',
            },
          }),
          clearIndicator: (base) => ({
            ...base,
            color: '#828797',
            '&:hover': { color: '#454957' },
          }),
        }}
        onChange={onChange as Props['onChange']}
        menuPortalTarget={isMounted ? document.body : undefined}
        {...props}
      />
      <span className='text-xs text-gray-600'>{helper}</span>
    </label>
  )
}

export default SelectInput

export type SelectOption<
  T extends ReactNode | any = string,
  U extends ReactNode = ReactNode,
> = {
  value: T
  label: U
}
