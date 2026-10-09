import React, { useMemo, useState } from 'react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: 'left' | 'right' | 'center';
  width?: string;
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
}

interface DataTableProps<T> {
  columns: Array<Column<T>>;
  rows: T[];
  rowKey: (row: T) => string;
  pageSize?: number;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function DataTable<T>({
  columns,
  rows,
  rowKey,
  pageSize = 8,
  onRowClick,
  emptyMessage = 'Nothing to show yet.'
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [dir, setDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (typeof av === 'number' && typeof bv === 'number') return dir === 'asc' ? av - bv : bv - av;
      return dir === 'asc' ?
      String(av).localeCompare(String(bv)) :
      String(bv).localeCompare(String(av));
    });
    return copy;
  }, [rows, columns, sortKey, dir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const current = Math.min(page, totalPages);
  const visible = sorted.slice((current - 1) * pageSize, current * pageSize);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setDir(dir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setDir('asc');
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-surface-secondary">
              {columns.map((col) =>
              <th
                key={col.key}
                scope="col"
                style={col.width ? { width: col.width } : undefined}
                className={cn(
                  'px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                )}>
                
                  {col.sortable ?
                <button
                  type="button"
                  onClick={() => toggleSort(col.key)}
                  className={cn(
                    'inline-flex items-center gap-1 rounded transition-colors duration-150 ease-smooth hover:text-primary',
                    sortKey === col.key && 'text-primary'
                  )}>
                  
                      {col.header}
                      {sortKey === col.key && dir === 'desc' ?
                  <ChevronDownIcon className="h-3.5 w-3.5" /> :

                  <ChevronUpIcon className="h-3.5 w-3.5" />
                  }
                    </button> :

                col.header
                }
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ?
            <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-[13px] text-muted">
                  {emptyMessage}
                </td>
              </tr> :

            visible.map((row) =>
            <tr
              key={rowKey(row)}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'border-b border-line last:border-0',
                onRowClick && 'cursor-pointer transition-colors duration-150 ease-smooth hover:bg-primary-light/50'
              )}>
              
                  {columns.map((col) =>
              <td
                key={col.key}
                className={cn(
                  'px-5 py-3.5 align-middle text-ink',
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                )}>
                
                      {col.render(row)}
                    </td>
              )}
                </tr>
            )
            }
          </tbody>
        </table>
      </div>

      {sorted.length > pageSize ?
      <div className="flex items-center justify-between border-t border-line px-5 py-3">
          <p className="text-[13px] text-muted">
            Showing {(current - 1) * pageSize + 1}–{Math.min(current * pageSize, sorted.length)} of{' '}
            {sorted.length}
          </p>
          <div className="flex items-center gap-1">
            <button
            type="button"
            onClick={() => setPage(Math.max(1, current - 1))}
            disabled={current === 1}
            aria-label="Previous page"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors duration-150 ease-smooth hover:bg-surface-secondary disabled:opacity-40">
            
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) =>
          <button
            key={p}
            type="button"
            onClick={() => setPage(p)}
            aria-current={p === current ? 'page' : undefined}
            className={cn(
              'h-8 min-w-8 rounded-md px-2 text-[13px] font-medium transition-colors duration-150 ease-smooth',
              p === current ? 'bg-primary text-white' : 'text-muted hover:bg-surface-secondary'
            )}>
            
                {p}
              </button>
          )}
            <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, current + 1))}
            disabled={current === totalPages}
            aria-label="Next page"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line text-muted transition-colors duration-150 ease-smooth hover:bg-surface-secondary disabled:opacity-40">
            
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div> :
      null}
    </div>);

}