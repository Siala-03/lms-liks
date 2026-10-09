import React, { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';
import type { Role } from '../../types';

export function AppLayout({ role }: {role: Role;}) {
  const { user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (user.role !== role) return <Navigate to={`/${user.role}`} replace />;

  return (
    <div className="min-h-screen w-full bg-surface-secondary">
      <TopBar user={user} onMobileMenu={() => setMobileOpen(true)} />
      <Sidebar
        role={role}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
        mobileOpen={mobileOpen}
        onNavigate={() => setMobileOpen(false)} />
      
      <main
        className={cn(
          'pt-14 transition-[padding] duration-200 ease-smooth',
          collapsed ? 'lg:pl-[68px]' : 'lg:pl-60'
        )}>
        
        <div className="mx-auto max-w-[1440px] px-6 py-7 xl:px-10">
          <Outlet />
        </div>
      </main>
    </div>);

}