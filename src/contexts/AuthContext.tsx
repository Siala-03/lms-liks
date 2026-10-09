import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Role, User } from '../types';

const USERS: Record<Role, User> = {
  student: {
    id: 'u-1',
    name: 'Aline Uwase',
    email: 'aline.uwase@liks.edu',
    role: 'student',
    avatarInitials: 'AU',
    title: 'Culinary Arts · Cohort 24B'
  },
  instructor: {
    id: 'u-2',
    name: 'Chef Eric Habimana',
    email: 'e.habimana@liks.edu',
    role: 'instructor',
    avatarInitials: 'EH',
    title: 'Senior Instructor · Culinary'
  },
  admin: {
    id: 'u-3',
    name: 'Doreen Achieng',
    email: 'd.achieng@liks.edu',
    role: 'admin',
    avatarInitials: 'DA',
    title: 'Registrar · Admissions'
  },
  management: {
    id: 'u-4',
    name: 'Peter Kamau',
    email: 'p.kamau@liks.edu',
    role: 'management',
    avatarInitials: 'PK',
    title: 'Academy Director'
  }
};

interface AuthValue {
  user: User | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthValue | undefined>(undefined);

export function AuthProvider({ children }: {children: React.ReactNode;}) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((role: Role) => setUser(USERS[role]), []);
  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export const ROLE_HOME: Record<Role, string> = {
  student: '/student',
  instructor: '/instructor',
  admin: '/admin',
  management: '/management'
};

export const ROLE_LABEL: Record<Role, string> = {
  student: 'Student',
  instructor: 'Instructor',
  admin: 'Admin',
  management: 'Management'
};