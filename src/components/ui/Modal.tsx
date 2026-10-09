import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { XIcon } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  width?: string;
}

export function Modal({ open, onClose, title, description, footer, children, width = 'max-w-lg' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ?
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
          className="absolute inset-0 bg-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
          onClick={onClose} />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={`relative w-full ${width} rounded-xl border border-line bg-white shadow-pop`}
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 4 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-start justify-between gap-6 border-b border-line px-5 py-4">
              <div>
                <h2 className="text-base font-semibold text-ink">{title}</h2>
                {description ? <p className="mt-1 text-[13px] text-muted">{description}</p> : null}
              </div>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="-mr-1 -mt-1 flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors duration-150 ease-smooth hover:bg-surface-secondary">
              
                <XIcon className="h-4 w-4" />
              </button>
            </div>
            {children ? <div className="px-5 py-5">{children}</div> : null}
            {footer ?
          <div className="flex items-center justify-end gap-2 border-t border-line bg-surface-secondary px-5 py-3.5">
                {footer}
              </div> :
          null}
          </motion.div>
        </div> :
      null}
    </AnimatePresence>);

}