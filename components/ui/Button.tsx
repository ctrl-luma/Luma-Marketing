'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'white'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {

    const baseStyles = 'relative inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden active:scale-[0.98] hover:scale-[1.02]'

    const variants = {
      primary: 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 focus:ring-primary',
      secondary: 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/40 focus:ring-gray-400 border border-gray-600 hover:border-gray-500',
      ghost: 'text-gray-300 hover:text-white hover:bg-gray-800/50 focus:ring-gray-400',
      danger: 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/40 focus:ring-red-600',
      white: 'bg-white text-primary-600 font-semibold shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 hover:text-primary-700 focus:ring-white border-2 border-transparent hover:border-white/50',
    }

    const sizes = {
      sm: 'px-5 py-2 text-xs rounded-lg',
      md: 'px-6 py-2.5 text-sm rounded-lg',
      lg: 'px-8 py-3 text-base rounded-xl',
      xl: 'px-10 py-4 text-lg rounded-xl',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        <span className="relative z-10 flex items-center">
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              <span>Loading...</span>
            </>
          ) : (
            children
          )}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
