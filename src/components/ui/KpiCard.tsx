import React from 'react';
import { TrendingDownIcon, TrendingUpIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function KpiCard({
  icon: Icon,
  value,
  label,
  trend,
  trendLabel,
  emphasis = false







}: {icon: React.ComponentType<{className?: string;}>;value: string;label: string;trend?: number;trendLabel?: string;emphasis?: boolean;}) {
  const up = (trend ?? 0) >= 0;
  const TrendIcon = up ? TrendingUpIcon : TrendingDownIcon;

  return (
    <div
      className={cn(
        'rounded-xl border bg-white p-5',
        emphasis ? 'border-primary/30 ring-1 ring-primary/10' : 'border-line'
      )}>
      
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light">
          <Icon className="h-[18px] w-[18px] text-primary" />
        </span>
        {trend !== undefined ?
        <span
          className={cn(
            'inline-flex items-center gap-1 text-[13px] font-medium',
            up ? 'text-success' : 'text-error'
          )}>
          
            <TrendIcon className="h-3.5 w-3.5" />
            {up ? '+' : ''}
            {trend}%
          </span> :
        null}
      </div>
      <p className={cn('mt-4 font-semibold tracking-[-0.02em] text-ink', emphasis ? 'text-4xl' : 'text-3xl')}>
        {value}
      </p>
      <p className="mt-1 text-[13px] text-muted">{label}</p>
      {trendLabel ? <p className="mt-2.5 text-xs text-muted">{trendLabel}</p> : null}
    </div>);

}