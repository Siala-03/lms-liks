import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCapIcon, LockIcon, MailIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Field, TextInput } from '../components/ui/Form';
import { ROLE_HOME, ROLE_LABEL, useAuth } from '../contexts/AuthContext';
import { cn } from '../utils/cn';
import type { Role } from '../types';

const ROLES: Role[] = ['student', 'instructor', 'admin', 'management'];

const DEMO_EMAIL: Record<Role, string> = {
  student: 'aline.uwase@liks.edu',
  instructor: 'e.habimana@liks.edu',
  admin: 'd.achieng@liks.edu',
  management: 'p.kamau@liks.edu'
};

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState(DEMO_EMAIL.student);
  const [password, setPassword] = useState('••••••••••');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate(ROLE_HOME[role]);
  };

  const pickRole = (next: Role) => {
    setRole(next);
    setEmail(DEMO_EMAIL[next]);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-surface-secondary px-4 py-12">
      <div className="w-full max-w-[440px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <GraduationCapIcon className="h-6 w-6 text-white" />
          </span>
          <h1 className="mt-4 text-xl font-semibold tracking-[-0.01em] text-ink">
            LIKS Hospitality Academy
          </h1>
          <p className="mt-1 text-sm text-muted">Sign in to the Learning Management System</p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-xl border border-line bg-white p-6 shadow-card"
          aria-label="Sign in">
          
          <fieldset className="mb-5">
            <legend className="mb-2 text-[13px] font-medium text-ink">Sign in as</legend>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) =>
              <button
                key={r}
                type="button"
                onClick={() => pickRole(r)}
                aria-pressed={role === r}
                className={cn(
                  'rounded-md border px-3 py-2.5 text-[13px] font-medium transition-colors duration-150 ease-smooth',
                  role === r ?
                  'border-primary bg-primary-light text-primary-dark' :
                  'border-line bg-white text-muted hover:bg-surface-secondary'
                )}>
                
                  {ROLE_LABEL[r]}
                </button>
              )}
            </div>
          </fieldset>

          <div className="space-y-4">
            <Field label="Email address" htmlFor="email" required>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 h-4 w-4 text-muted" />
                <TextInput
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                  autoComplete="email"
                  required />
                
              </div>
            </Field>

            <Field label="Password" htmlFor="password" required>
              <div className="relative">
                <LockIcon className="absolute left-3 top-3 h-4 w-4 text-muted" />
                <TextInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                  autoComplete="current-password"
                  required />
                
              </div>
            </Field>
          </div>

          <div className="mt-4 flex items-center justify-between text-[13px]">
            <label className="inline-flex items-center gap-2 text-muted">
              <input
                type="checkbox"
                defaultChecked
                className="h-4 w-4 rounded border-line text-primary focus:ring-primary/30" />
              
              Keep me signed in
            </label>
            <a href="#reset" className="font-medium text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full">
            Sign in
          </Button>

          <p className="mt-4 text-center text-xs text-muted">
            Demo environment — any password works. Pick a role to explore that experience.
          </p>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Need an account? Applications are handled by the admissions office.
        </p>
      </div>
    </div>);

}