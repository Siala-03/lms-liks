import React from 'react';
import { cn } from '../../utils/cn';

export function ProgressBar({
  value,
  label,
  showValue = false,
  size = 'md',
  className






}: {value: number;label?: string;showValue?: boolean;size?: 'sm' | 'md' | 'lg';className?: string;}) {
  const clamped = Math.max(0, Math.min(100, value));
  const height = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  return (
    <div className={className}>
      {label || showValue ?
      <div className="mb-1.5 flex items-center justify-between text-[13px]">
          {label ? <span className="text-muted">{label}</span> : <span />}
          {showValue ? <span className="font-medium text-ink">{clamped}%</span> : null}
        </div> :
      null}
      <div
        className={cn('w-full overflow-hidden rounded-full bg-surface-secondary', height)}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ?? 'Progress'}>
        
        <div
          className={cn('rounded-full bg-primary transition-[width] duration-300 ease-smooth', height)}
          style={{ width: `${clamped}%` }} />
        
      </div>
    </div>);

}