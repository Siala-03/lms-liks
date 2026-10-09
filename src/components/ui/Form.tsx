import React from 'react';
import { ChevronDownIcon, UploadCloudIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Field({
  label,
  hint,
  htmlFor,
  required,
  children,
  className







}: {label: string;hint?: string;htmlFor?: string;required?: boolean;children: React.ReactNode;className?: string;}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={htmlFor} className="text-[13px] font-medium text-ink">
        {label}
        {required ? <span className="ml-0.5 text-error">*</span> : null}
      </label>
      {children}
      {hint ? <p className="text-xs text-muted">{hint}</p> : null}
    </div>);

}

const CONTROL =
'w-full rounded-md border border-line bg-white px-3 text-sm text-ink placeholder:text-muted/70 transition-colors duration-150 ease-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20';

export function TextInput({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(CONTROL, 'h-10', className)} {...rest} />;
}

export function TextArea({ className, ...rest }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(CONTROL, 'py-2.5 leading-relaxed', className)} {...rest} />;
}

export function Select({
  className,
  children,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select className={cn(CONTROL, 'h-10 appearance-none pr-9', className)} {...rest}>
        {children}
      </select>
      <ChevronDownIcon className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-muted" />
    </div>);

}

export function DateInput({ className, ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input type="date" className={cn(CONTROL, 'h-10', className)} {...rest} />;
}

export function Toggle({
  checked,
  onChange,
  label,
  description





}: {checked: boolean;onChange: (next: boolean) => void;label: string;description?: string;}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-[13px] font-medium text-ink">{label}</p>
        {description ? <p className="text-xs text-muted">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-150 ease-smooth',
          checked ? 'bg-primary' : 'bg-line'
        )}>
        
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-150 ease-smooth',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          )} />
        
      </button>
    </div>);

}

export function FileUpload({
  files,
  onAdd,
  onRemove,
  hint = 'PDF, DOCX, JPG or PNG up to 25 MB'





}: {files: string[];onAdd: () => void;onRemove: (name: string) => void;hint?: string;}) {
  return (
    <div>
      <button
        type="button"
        onClick={onAdd}
        className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-line bg-surface-secondary px-6 py-9 text-center transition-colors duration-150 ease-smooth hover:border-primary hover:bg-primary-light/40">
        
        <UploadCloudIcon className="h-6 w-6 text-primary" />
        <span className="text-sm font-medium text-ink">
          Drag files here or <span className="text-primary">browse</span>
        </span>
        <span className="text-xs text-muted">{hint}</span>
      </button>
      {files.length > 0 ?
      <ul className="mt-3 space-y-2">
          {files.map((f) =>
        <li
          key={f}
          className="flex items-center justify-between rounded-md border border-line px-3 py-2 text-[13px]">
          
              <span className="truncate text-ink">{f}</span>
              <button
            type="button"
            onClick={() => onRemove(f)}
            className="text-xs font-medium text-error transition-colors duration-150 ease-smooth hover:underline">
            
                Remove
              </button>
            </li>
        )}
        </ul> :
      null}
    </div>);

}