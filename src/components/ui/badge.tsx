import * as React from 'react'
import { cn } from '@/lib/utils'

// Define the allowed variants
const badgeVariants = {
  default: 'bg-blue-500 text-white', // Default blue badge
  outline: 'border border-blue-500 text-blue-500 bg-transparent', // Outline style
  destructive: 'bg-red-500 text-white', // Red badge for destructive actions
}

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants // Restrict variant values
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium',
        badgeVariants[variant], // Apply selected variant styles
        className
      )}
      {...props}
    />
  )
)

Badge.displayName = 'Badge'

export { Badge }
