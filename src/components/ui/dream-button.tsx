import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const dreamButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 transition-all duration-300",
        dreamy: "bg-gradient-dreamy text-foreground shadow-card hover:shadow-soft transition-all duration-300 hover:scale-105",
        journal: "bg-card text-card-foreground border border-border shadow-soft hover:bg-accent transition-all duration-300",
        gentle: "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300",
        outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300",
        ghost: "hover:bg-accent hover:text-accent-foreground transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface DreamButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof dreamButtonVariants> {
  asChild?: boolean
}

const DreamButton = React.forwardRef<HTMLButtonElement, DreamButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(dreamButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
DreamButton.displayName = "DreamButton"

export { DreamButton, dreamButtonVariants }