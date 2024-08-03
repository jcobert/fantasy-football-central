'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/utils/style'

export type TextAreaInputProps = Partial<
  TextareaHTMLAttributes<HTMLTextAreaElement>
> & {
  label?: string
  helper?: string
  labelClassName?: string
  inputClassName?: string
}

const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaInputProps>(
  (
    {
      id,
      name,
      label = '',
      placeholder = '',
      className = '',
      labelClassName = '',
      inputClassName = '',
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
            labelClassName,
          ])}
        >
          {label}
        </label>

        <textarea
          className={cn([
            'w-full px-[0.875rem] py-2 border border-gray-300 hover:border-slate-400 transition rounded',
            inputClassName,
          ])}
          id={id || name}
          name={name}
          placeholder={placeholder}
          rows={3}
          {...props}
          ref={ref}
        />
      </div>
    )
  },
)

export default TextAreaInput
