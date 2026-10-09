import React from 'react';

interface Point {
  label: string;
  value: number;
}

export function LineChart({ data, unit = '' }: {data: Point[];unit?: string;}) {
  const width = 640;
  const height = 220;
  const padX = 8;
  const padY = 16;
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  const min = Math.min(...data.map((d) => d.value)) * 0.85;
  const stepX = (width - padX * 2) / (data.length - 1);
  const scaleY = (v: number) => height - padY - (v - min) / (max - min) * (height - padY * 2);

  const points = data.map((d, i) => ({ x: padX + i * stepX, y: scaleY(d.value), ...d }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const area = `${path} L${points[points.length - 1].x.toFixed(1)},${height - padY} L${points[0].x.toFixed(1)},${height - padY} Z`;

  return (
    <figure className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-[220px] w-full" role="img" aria-label="Enrollment trend line chart">
        {[0, 0.25, 0.5, 0.75, 1].map((t) =>
        <line
          key={t}
          x1={padX}
          x2={width - padX}
          y1={padY + t * (height - padY * 2)}
          y2={padY + t * (height - padY * 2)}
          stroke="#E0E0E0"
          strokeWidth="1" />

        )}
        <path d={area} fill="#1A73E8" fillOpacity="0.08" />
        <path d={path} fill="none" stroke="#1A73E8" strokeWidth="2.5" strokeLinecap="round" />
        {points.map((p) =>
        <g key={p.label}>
            <circle cx={p.x} cy={p.y} r="4.5" fill="#FFFFFF" stroke="#1A73E8" strokeWidth="2.5" />
            <text x={p.x} y={p.y - 12} textAnchor="middle" className="fill-[#1A1A1A] text-[11px] font-semibold">
              {p.value}
              {unit}
            </text>
          </g>
        )}
      </svg>
      <div className="mt-2 flex justify-between px-1">
        {data.map((d) =>
        <span key={d.label} className="text-xs text-muted">
            {d.label}
          </span>
        )}
      </div>
    </figure>);

}

export function BarChart({
  data,
  unit = '%',
  max = 100




}: {data: Point[];unit?: string;max?: number;}) {
  return (
    <figure className="w-full" aria-label="Course performance bar chart">
      <ul className="space-y-3">
        {data.map((d) =>
        <li key={d.label} className="flex items-center gap-3">
            <span className="w-20 shrink-0 text-xs font-medium text-muted">{d.label}</span>
            <div className="h-7 flex-1 overflow-hidden rounded-md bg-surface-secondary">
              <div
              className="flex h-7 items-center justify-end rounded-md bg-primary px-2"
              style={{ width: `${Math.max(6, d.value / max * 100)}%` }}>
              
                <span className="text-[11px] font-semibold text-white">
                  {d.value}
                  {unit}
                </span>
              </div>
            </div>
          </li>
        )}
      </ul>
    </figure>);

}

export function StackedBars({
  rows,
  series



}: {rows: Array<{band: string;label: string;counts: Record<string, number>;}>;series: string[];}) {
  const tones = ['#1A73E8', '#5B9BF0', '#A8C7FA'];
  const totals = rows.map((r) => series.reduce((s, k) => s + (r.counts[k] ?? 0), 0));
  const max = Math.max(...totals);

  return (
    <figure className="w-full">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {series.map((s, i) =>
        <span key={s} className="inline-flex items-center gap-2 text-xs text-muted">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: tones[i % tones.length] }} />
            {s}
          </span>
        )}
      </div>
      <ul className="space-y-3.5">
        {rows.map((r, idx) =>
        <li key={r.band} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-xs font-medium text-muted">{r.band}</span>
            <div className="flex h-8 flex-1 items-stretch overflow-hidden rounded-md bg-surface-secondary">
              {series.map((s, i) => {
              const v = r.counts[s] ?? 0;
              if (v === 0) return null;
              return (
                <div
                  key={s}
                  style={{ width: `${v / max * 100}%`, background: tones[i % tones.length] }}
                  className="flex items-center justify-center"
                  title={`${s}: ${v}`}>
                  
                    <span className="text-[11px] font-semibold text-white">{v}</span>
                  </div>);

            })}
            </div>
            <span className="w-16 shrink-0 text-right text-xs text-muted">{totals[idx]} total</span>
          </li>
        )}
      </ul>
    </figure>);

}