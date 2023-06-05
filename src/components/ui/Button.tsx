import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react'

export const buttonVariants = cva(
  "active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-color focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-[#1A7F64] text-white hover:bg-[#10A37F]",
        ghost: "bg-transparent text-white hover:bg-white hover:bg-opacity-10 active:scale-100",
        ghostBorder: "bg-transparent text-white hover:bg-white hover:bg-opacity-10 border border-slate-400 border-opacity-70 hover:border-opacity-50",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2",
        lg: "h-11 px-8",
        full : "w-full h-11 px-8"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  
}

const Button: FC<ButtonProps> = ({className, children, variant, size, ...props}) => {
  return (
    <button {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {children}
    </button>
  )
};

export default Button;
