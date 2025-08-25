// components/loading-spinner.tsx
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  ...props 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  }

  return (
    <div 
      className={cn(
        'flex items-center justify-center',
        className
      )}
      {...props}
    >
      <div 
        className={cn(
          sizeClasses[size],
          'animate-spin rounded-full border-2 border-primary border-t-transparent'
        )}
      />
    </div>
  )
}