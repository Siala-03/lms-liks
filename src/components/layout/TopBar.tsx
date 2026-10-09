import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BellIcon, LogOutIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { ROLE_LABEL, useAuth } from '../../contexts/AuthContext';
import { useDataStore } from '../../data/store';
import type { User } from '../../types';

export function TopBar({ user, onMobileMenu }: {user: User;onMobileMenu: () => void;}) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { notifications } = useDataStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const unread = notifications.filter((n) => n.unread).length;

  const notificationsPath =
  user.role === 'student' ?
  '/student/notifications' :
  user.role === 'admin' ?
  '/admin/notifications' :
  `/${user.role}`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-4 bg-primary px-4 text-white">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenu}
          aria-label="Open navigation"
          className="-ml-1 flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-150 ease-smooth hover:bg-white/15 lg:hidden">
          
          <MenuIcon className="h-5 w-5" />
        </button>
        <Link to={`/${user.role}`} className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-[13px] font-bold text-primary">
            LK
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-semibold">LIKS Hospitality Academy</span>
            <span className="block text-[11px] text-white/75">Learning Management System</span>
          </span>
        </Link>
      </div>

      <div className="hidden max-w-md flex-1 items-center md:flex">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
          <input
            type="search"
            aria-label="Search the academy"
            placeholder="Search courses, students, assignments"
            className="h-9 w-full rounded-md bg-white/15 pl-9 pr-3 text-sm text-white placeholder:text-white/70 transition-colors duration-150 ease-smooth focus:bg-white focus:text-ink focus:outline-none focus:placeholder:text-muted" />
          
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <Link
          to={notificationsPath}
          aria-label={`Notifications, ${unread} unread`}
          className="relative flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-150 ease-smooth hover:bg-white/15">
          
          <BellIcon className="h-5 w-5" />
          {unread > 0 ?
          <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-error px-1 text-[10px] font-bold">
              {unread}
            </span> :
          null}
        </Link>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            className="flex items-center gap-2.5 rounded-md py-1 pl-1 pr-2 transition-colors duration-150 ease-smooth hover:bg-white/15">
            
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-primary">
              {user.avatarInitials}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-[13px] font-medium">{user.name}</span>
              <span className="block text-[11px] text-white/75">{ROLE_LABEL[user.role]}</span>
            </span>
          </button>

          {menuOpen ?
          <div className="absolute right-0 top-11 w-64 overflow-hidden rounded-lg border border-line bg-white text-ink shadow-pop">
              <div className="border-b border-line px-4 py-3">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-muted">{user.email}</p>
                <p className="mt-1 text-xs text-muted">{user.title}</p>
              </div>
              <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                logout();
                navigate('/login');
              }}
              className="flex w-full items-center gap-2.5 px-4 py-3 text-sm font-medium text-ink transition-colors duration-150 ease-smooth hover:bg-surface-secondary">
              
                <LogOutIcon className="h-4 w-4 text-muted" />
                Log out
              </button>
            </div> :
          null}
        </div>
      </div>
    </header>);

}