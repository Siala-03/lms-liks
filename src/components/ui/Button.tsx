import React from 'react';
import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ComponentType<{className?: string;}>;
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-white hover:bg-primary-dark border border-transparent',
  secondary: 'bg-white text-ink border border-line hover:bg-surface-secondary',
  ghost: 'bg-transparent text-primary border border-transparent hover:bg-primary-light',
  danger: 'bg-white text-error border border-error/40 hover:bg-error/5',
  success: 'bg-success text-white border border-transparent hover:brightness-95'
};

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-[13px] gap-1.5',
  md: 'h-10 px-4 text-sm gap-2',
  lg: 'h-11 px-5 text-[15px] gap-2'
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors duration-150 ease-smooth disabled:cursor-not-allowed disabled:opacity-50',
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...rest}>
      
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>);

}