import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full font-medium transition-colors duration-200',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary-dark hover:bg-primary/20',
        secondary: 'bg-secondary/10 text-secondary-dark hover:bg-secondary/20',
        accent: 'bg-accent/10 text-accent-dark hover:bg-accent/20',
        success: 'bg-green-100 text-green-800 hover:bg-green-200',
        warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
        danger: 'bg-red-100 text-red-800 hover:bg-red-200',
        info: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
        neutral: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
      },
      size: {
        xs: 'text-xs px-2 py-0.5',
        sm: 'text-sm px-2.5 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
