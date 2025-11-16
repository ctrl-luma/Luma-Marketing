import { cn } from '@/lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'gradient' | 'pattern'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({ 
  className, 
  variant = 'default', 
  size = 'lg',
  children,
  ...props 
}: SectionProps) {
  const baseStyles = 'relative overflow-hidden'
  
  const variants = {
    default: 'bg-gray-900',
    gradient: 'bg-gradient-to-br from-gray-900 via-gray-950 to-black',
    pattern: 'bg-gray-900',
  }
  
  const sizes = {
    sm: 'py-12 sm:py-16',
    md: 'py-16 sm:py-20',
    lg: 'py-16 sm:py-20 lg:py-24',
    xl: 'py-20 sm:py-24 lg:py-32',
  }
  
  return (
    <section
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {variant === 'pattern' && (
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
}