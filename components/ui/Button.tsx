'use client'

import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { motion, HTMLMotionProps } from 'framer-motion'

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'white'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  isLoading?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, onDragStart, onDragEnd, onDrag, onDragEnter, onDragLeave, onDragOver, onDrop, ...props }, ref) => {

    const baseStyles = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden'

    const variants = {
      primary: 'bg-gradient-to-r from-primary-500 via-primary-600 to-primary-700 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 focus:ring-primary before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-400 before:via-primary-500 before:to-primary-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
      secondary: 'bg-gradient-to-r from-gray-800 to-gray-700 text-gray-100 shadow-md shadow-black/20 hover:shadow-lg hover:shadow-black/40 focus:ring-gray-400 border border-gray-600 hover:border-gray-500 before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-700 before:to-gray-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
      ghost: 'text-gray-300 hover:text-white focus:ring-gray-400 before:absolute before:inset-0 before:bg-gradient-to-r before:from-gray-800/50 before:to-gray-700/50 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
      danger: 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white shadow-lg shadow-red-600/20 hover:shadow-xl hover:shadow-red-600/40 focus:ring-red-600 before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-400 before:via-red-500 before:to-red-600 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
      white: 'bg-white text-primary-600 font-semibold shadow-lg shadow-white/20 hover:shadow-xl hover:shadow-white/30 hover:text-primary-700 focus:ring-white border-2 border-transparent hover:border-white/50',
    }

    const sizes = {
      sm: 'px-5 py-2 text-xs rounded-lg',
      md: 'px-6 py-2.5 text-sm rounded-lg',
      lg: 'px-8 py-3 text-base rounded-xl',
      xl: 'px-10 py-4 text-lg rounded-xl',
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.1 }}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Button content */}
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
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }