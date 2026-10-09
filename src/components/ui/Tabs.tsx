import React from 'react';
import { cn } from '../../utils/cn';

export function Tabs({
  tabs,
  active,
  onChange,
  className





}: {tabs: string[];active: string;onChange: (tab: string) => void;className?: string;}) {
  return (
    <div className={cn('border-b border-line', className)} role="tablist">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab === active;
          return (
            <button
              key={tab}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => onChange(tab)}
              className={cn(
                'relative -mb-px whitespace-nowrap border-b-2 px-4 py-2.5 text-sm font-medium transition-colors duration-150 ease-smooth',
                isActive ?
                'border-primary text-primary' :
                'border-transparent text-muted hover:text-ink'
              )}>
              
              {tab}
            </button>);

        })}
      </div>
    </div>);

}