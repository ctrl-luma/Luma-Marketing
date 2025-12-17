import { cn } from '@/lib/utils'

export interface GradientBackgroundProps {
  variant?: 'primary' | 'secondary' | 'hero' | 'subtle'
  className?: string
  children?: React.ReactNode
}

export function GradientBackground({
  variant = 'primary',
  className,
  children
}: GradientBackgroundProps) {
  const gradients = {
    primary: 'bg-gradient-to-br from-primary-900/90 via-primary-950 to-gray-950',
    secondary: 'bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950',
    hero: 'bg-gradient-to-br from-gray-900 via-gray-950 to-black',
    subtle: 'bg-gradient-to-br from-primary-950/50 via-gray-950 to-black',
  }
  
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className={cn('absolute inset-0', gradients[variant])} />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      {/* Static gradient orbs */}
      <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-600/20 blur-3xl" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}