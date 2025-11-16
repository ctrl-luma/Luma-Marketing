'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helper, required, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          className={cn(
            'w-full rounded-lg border px-4 py-3 text-gray-100 placeholder-gray-500 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/20',
            error
              ? 'border-red-500 bg-red-900/10 focus:border-red-500'
              : 'border-gray-700 bg-gray-900 focus:border-primary hover:border-gray-600',
            className
          )}
          required={required}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-red-500">{error}</p>
        )}
        {helper && !error && (
          <p className="mt-1 text-xs text-gray-500">{helper}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }