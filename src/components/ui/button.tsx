import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import type { ButtonHTMLAttributes } from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#9c536c] text-white shadow-sm hover:bg-[#82445a]",
        outline: "border border-[#e7cbd4] bg-white/70 text-[#754455] hover:bg-[#fff1f6]",
        ghost: "text-[#754455] hover:bg-[#fff1f6]",
        gold: "bg-[#c9a76a] text-white hover:bg-[#ad8e56]",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button"

  return (
    <Component
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  )
}
