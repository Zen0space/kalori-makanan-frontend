import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  'rounded-xl transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-white border border-gray-200',
        bordered: 'bg-white border-2 border-gray-300',
        elevated: 'bg-white shadow-lg shadow-gray-200/50',
        ghost: 'bg-gray-50 border border-gray-100',
        gradient: 'bg-gradient-to-br from-gray-50 to-white border border-gray-200',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      hover: {
        none: '',
        lift: 'hover:shadow-lg hover:border-gray-300 hover:-translate-y-1',
        glow: 'hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20',
        border: 'hover:border-gray-400',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: 'none',
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, hover, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, hover }), className)}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

// Card Header component
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pb-4 border-b border-gray-100', className)}
        {...props}
      />
    )
  }
)

CardHeader.displayName = 'CardHeader'

// Card Title component
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn('text-xl font-semibold text-gray-900', className)}
        {...props}
      />
    )
  }
)

CardTitle.displayName = 'CardTitle'

// Card Description component
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn('text-sm text-gray-600 mt-1', className)}
        {...props}
      />
    )
  }
)

CardDescription.displayName = 'CardDescription'

// Card Content component
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pt-4', className)}
        {...props}
      />
    )
  }
)

CardContent.displayName = 'CardContent'

// Card Footer component
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('pt-4 mt-4 border-t border-gray-100', className)}
        {...props}
      />
    )
  }
)

CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
}
