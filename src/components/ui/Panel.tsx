import React from 'react';
import { cn } from '../../utils/cn';

export function Panel({
  className,
  children



}: {className?: string;children: React.ReactNode;}) {
  return (
    <section className={cn('rounded-xl border border-line bg-white', className)}>{children}</section>);

}

export function PanelHeader({
  title,
  subtitle,
  action,
  className





}: {title: string;subtitle?: string;action?: React.ReactNode;className?: string;}) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 border-b border-line px-5 py-4',
        className
      )}>
      
      <div>
        <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-[13px] text-muted">{subtitle}</p> : null}
      </div>
      {action}
    </div>);

}

export function PageHeader({
  title,
  subtitle,
  actions




}: {title: string;subtitle?: string;actions?: React.ReactNode;}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-[-0.01em] text-ink">{title}</h1>
        {subtitle ? <p className="mt-1 max-w-2xl text-sm text-muted">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </header>);

}

export function EmptyState({
  icon: Icon,
  title,
  message,
  action





}: {icon: React.ComponentType<{className?: string;}>;title: string;message: string;action?: React.ReactNode;}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-surface-secondary">
        <Icon className="h-5 w-5 text-muted" />
      </span>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-[13px] text-muted">{message}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>);

}