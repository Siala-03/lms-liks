import React from 'react';
import { cn } from '../../utils/cn';

type Tone = 'blue' | 'grey' | 'success' | 'warning' | 'error';

const TONES: Record<Tone, string> = {
  blue: 'bg-primary-light text-primary-dark',
  grey: 'bg-surface-secondary text-muted border border-line',
  success: 'bg-success/10 text-[#1E7E34]',
  warning: 'bg-warning/20 text-[#8A6100]',
  error: 'bg-error/10 text-[#C5221F]'
};

export function Badge({
  tone = 'blue',
  children,
  className




}: {tone?: Tone;children: React.ReactNode;className?: string;}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        TONES[tone],
        className
      )}>
      
      {children}
    </span>);

}

export function statusTone(status: string): Tone {
  switch (status) {
    case 'graded':
    case 'approved':
    case 'completed':
    case 'active':
    case 'present':
    case 'Active':
    case 'Completed':
      return 'success';
    case 'pending':
    case 'in-progress':
    case 'late':
    case 'on-hold':
    case 'On hold':
      return 'warning';
    case 'rejected':
    case 'absent':
    case 'Fail':
      return 'error';
    case 'archived':
    case 'not-started':
    case 'locked':
      return 'grey';
    default:
      return 'blue';
  }
}