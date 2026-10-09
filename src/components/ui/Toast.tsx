import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangleIcon, CheckCircle2Icon, InfoIcon, XIcon } from 'lucide-react';

type ToastTone = 'success' | 'info' | 'error';

interface ToastItem {
  id: number;
  tone: ToastTone;
  title: string;
  message?: string;
}

const ToastContext = createContext<{notify: (t: Omit<ToastItem, 'id'>) => void;} | undefined>(
  undefined
);

const ICONS: Record<ToastTone, React.ComponentType<{className?: string;}>> = {
  success: CheckCircle2Icon,
  info: InfoIcon,
  error: AlertTriangleIcon
};

const ACCENT: Record<ToastTone, string> = {
  success: 'text-success',
  info: 'text-primary',
  error: 'text-error'
};

export function ToastProvider({ children }: {children: React.ReactNode;}) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const notify = useCallback(
    (t: Omit<ToastItem, 'id'>) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { ...t, id }]);
      window.setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[60] flex w-[360px] flex-col gap-2">
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const Icon = ICONS[t.tone];
            return (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                className="pointer-events-auto flex items-start gap-3 rounded-lg border border-line bg-white px-4 py-3 shadow-pop"
                role="status">
                
                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${ACCENT[t.tone]}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold text-ink">{t.title}</p>
                  {t.message ? <p className="mt-0.5 text-xs text-muted">{t.message}</p> : null}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  className="text-muted transition-colors duration-150 ease-smooth hover:text-ink">
                  
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </motion.div>);

          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>);

}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}