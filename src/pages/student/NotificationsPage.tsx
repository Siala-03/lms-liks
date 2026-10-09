import React, { useState } from 'react';
import {
  BellIcon,
  CalendarClockIcon,
  CheckCheckIcon,
  MegaphoneIcon,
  MessageSquareIcon,
  TableIcon } from
'lucide-react';
import { EmptyState, PageHeader, Panel } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../components/ui/Toast';
import { useDataStore } from '../../data/store';
import { cn } from '../../utils/cn';
import type { Notification } from '../../types';

const ICONS: Record<Notification['type'], React.ComponentType<{className?: string;}>> = {
  deadline: CalendarClockIcon,
  grade: TableIcon,
  announcement: MegaphoneIcon,
  discussion: MessageSquareIcon
};

const FILTERS = ['All', 'Unread', 'Deadlines', 'Grades'] as const;

export function NotificationsPage() {
  const { notify } = useToast();
  const { notifications: items, setNotifications: setItems } = useDataStore();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All');

  const visible = items.filter((n) => {
    if (filter === 'Unread') return n.unread;
    if (filter === 'Deadlines') return n.type === 'deadline';
    if (filter === 'Grades') return n.type === 'grade';
    return true;
  });

  const markAll = () => {
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })));
    notify({ tone: 'info', title: 'All notifications marked as read' });
  };

  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle={`${items.filter((n) => n.unread).length} unread across your courses`}
        actions={
        <Button variant="secondary" icon={CheckCheckIcon} onClick={markAll}>
            Mark all read
          </Button>
        } />
      

      <div className="mb-5 flex flex-wrap gap-1.5">
        {FILTERS.map((f) =>
        <button
          key={f}
          type="button"
          onClick={() => setFilter(f)}
          aria-pressed={filter === f}
          className={cn(
            'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-150 ease-smooth',
            filter === f ?
            'border-primary bg-primary-light text-primary-dark' :
            'border-line bg-white text-muted hover:bg-surface-secondary'
          )}>
          
            {f}
          </button>
        )}
      </div>

      <Panel>
        {visible.length === 0 ?
        <EmptyState
          icon={BellIcon}
          title="Nothing here"
          message="You are all caught up. New alerts will appear as soon as they arrive." /> :


        <ul className="divide-y divide-line">
            {visible.map((n) => {
            const Icon = ICONS[n.type];
            return (
              <li
                key={n.id}
                className={cn(
                  'flex gap-4 px-5 py-4 transition-colors duration-150 ease-smooth',
                  n.unread && 'bg-primary-light/40'
                )}>
                
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                    <Icon className="h-[18px] w-[18px] text-primary" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-sm font-semibold text-ink">{n.title}</p>
                      <span className="text-xs text-muted">{n.timestamp}</span>
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted">{n.message}</p>
                  </div>
                  {n.unread ?
                <button
                  type="button"
                  onClick={() =>
                  setItems((prev) =>
                  prev.map((x) => x.id === n.id ? { ...x, unread: false } : x)
                  )
                  }
                  className="shrink-0 self-start text-xs font-medium text-primary hover:underline">
                  
                      Mark read
                    </button> :
                null}
                </li>);

          })}
          </ul>
        }
      </Panel>
    </>);

}