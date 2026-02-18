"use client"

import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:border-ring cursor-pointer focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-full border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground disabled:bg-surface-foreground/12 disabled:text-surface-foreground/38 hover:bg-primary/90 shadow-xs",
        destructive:
          "bg-error text-error-foreground hover:bg-error/90 focus-visible:ring-error disabled:bg-surface-foreground/12 disabled:text-surface-foreground/38 shadow-xs",
        destructiveContainer:
          "bg-error-container text-error-container-foreground hover:bg-error-container/90 focus-visible:ring-error-container disabled:bg-surface-foreground/12 disabled:text-surface-foreground/38 shadow-xs",
        outline:
          "disabled:border-foreground/12 text-primary disabled:text-foreground/38 hover:bg-primary/8 border border-border bg-inherit shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:bg-surface-foreground/12 disabled:text-surface-foreground/38 shadow-xs",
        tonal:
          "bg-secondary-container text-secondary-container-foreground disabled:bg-surface-foreground/12 disabled:text-surface-foreground/38 hover:bg-secondary-container/80 border-none",
        surfaceVariant:
          "bg-surface-variant text-surface-variant-foreground disabled:bg-surface-foreground/12 disabled:text-surface-foreground/38 hover:bg-surface-variant/80 border-none",
        ghost:
          "text-foregound disabled:text-foreground/38 aria-disabled:text-foreground/38 hover:bg-primary/8",
        link: "text-primary disabled:text-foreground/38 underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-1.5 px-4 py-2 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-11 gap-1.5 px-5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
        icon: "size-9",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
