'use client'

import { InputHTMLAttributes, forwardRef } from 'react'
import { FiBriefcase, FiGlobe, FiMail, FiPhone, FiUser } from 'react-icons/fi'

import { cn } from '@/utils/style'

type InputIcon = 'mail' | 'phone' | 'web' | 'person' | 'briefcase'

export type AdditionalInputProps = {
  label?: string
  helper?: string
  labelClassName?: string
  inputClassName?: string
  icon?: InputIcon
  error?: string
}

export type TextInputProps = Partial<InputHTMLAttributes<HTMLInputElement>> &
  AdditionalInputProps

const iconClassName =
  'absolute mt-[0.675rem] ml-[0.625rem] text-lg text-gray-500/85'

const iconMap: { [x in InputIcon]?: JSX.Element } = {
  mail: <FiMail className={iconClassName} />,
  phone: <FiPhone className={iconClassName} />,
  web: <FiGlobe className={iconClassName} />,
  person: <FiUser className={iconClassName} />,
  briefcase: <FiBriefcase className={iconClassName} />,
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = 'text',
      id,
      name,
      label = '',
      placeholder = '',
      className = '',
      labelClassName = '',
      inputClassName = '',
      icon,
      error,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn(['flex flex-col', className])}>
        <label
          htmlFor={id || name}
          className={cn([
            'text-sm text-gray-500',
            props?.required &&
              "after:content-['*'] after:ml-[0.125rem] after:text-red-400",
            error && 'text-red-500',
            labelClassName,
          ])}
        >
          {label}
          {icon ? iconMap[icon] : null}
        </label>

        <input
          className={cn([
            'w-full h-10 px-[0.875rem] py-2 border border-gray-300 hover:border-gray-400 transition rounded',
            !!icon && 'pl-9',
            error && 'border-red-500 hover:border-red-500',
            inputClassName,
          ])}
          type={type}
          id={id || name}
          name={name}
          placeholder={placeholder}
          {...props}
          ref={ref}
        />
        <span className='text-red-500 text-xs absolute mt-[3.75rem]'>
          {error}
        </span>
      </div>
    )
  },
)

export default TextInput
