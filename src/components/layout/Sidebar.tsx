import React from 'react';
import { NavLink } from 'react-router-dom';
import { PanelLeftCloseIcon, PanelLeftOpenIcon } from 'lucide-react';
import { NAV } from './navConfig';
import { cn } from '../../utils/cn';
import type { Role } from '../../types';

export function Sidebar({
  role,
  collapsed,
  onToggle,
  mobileOpen,
  onNavigate






}: {role: Role;collapsed: boolean;onToggle: () => void;mobileOpen: boolean;onNavigate: () => void;}) {
  const groups = NAV[role];

  return (
    <>
      {mobileOpen ?
      <div
        className="fixed inset-0 z-30 bg-ink/40 lg:hidden"
        onClick={onNavigate}
        aria-hidden="true" /> :

      null}
      <aside
        className={cn(
          'fixed left-0 top-14 z-40 flex h-[calc(100vh-3.5rem)] flex-col border-r border-line bg-white transition-[width,transform] duration-200 ease-smooth',
          collapsed ? 'w-[68px]' : 'w-60',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        aria-label="Section navigation">
        
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {groups.map((group) =>
          <div key={group.heading} className="mb-5 last:mb-0">
              {!collapsed ?
            <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {group.heading}
                </p> :

            <div className="mx-3 mb-2 border-t border-line first:border-0" />
            }
              <ul className="space-y-0.5">
                {group.links.map(({ label, to, icon: Icon, end }) =>
              <li key={to}>
                    <NavLink
                  to={to}
                  end={end}
                  onClick={onNavigate}
                  title={collapsed ? label : undefined}
                  className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150 ease-smooth',
                    collapsed && 'justify-center px-0',
                    isActive ?
                    'bg-primary-light text-primary-dark' :
                    'text-muted hover:bg-surface-secondary hover:text-ink'
                  )
                  }>
                  
                      <Icon className="h-[18px] w-[18px] shrink-0" />
                      {!collapsed ? <span className="truncate">{label}</span> : null}
                    </NavLink>
                  </li>
              )}
              </ul>
            </div>
          )}
        </nav>

        <div className="border-t border-line p-3">
          <button
            type="button"
            onClick={onToggle}
            className={cn(
              'hidden w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-muted transition-colors duration-150 ease-smooth hover:bg-surface-secondary hover:text-ink lg:flex',
              collapsed && 'justify-center px-0'
            )}>
            
            {collapsed ?
            <PanelLeftOpenIcon className="h-[18px] w-[18px]" /> :

            <>
                <PanelLeftCloseIcon className="h-[18px] w-[18px]" />
                <span>Collapse</span>
              </>
            }
          </button>
        </div>
      </aside>
    </>);

}