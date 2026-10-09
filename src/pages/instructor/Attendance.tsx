import React, { useState } from 'react';
import { CheckIcon, ClockIcon, SaveIcon, XIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Form';
import { useToast } from '../../components/ui/Toast';
import { attendanceRoster, attendanceSessions } from '../../data/academics';
import { cn } from '../../utils/cn';
import type { AttendanceRecord } from '../../types';

const OPTIONS: Array<{
  value: AttendanceRecord['status'];
  label: string;
  icon: React.ComponentType<{className?: string;}>;
  active: string;
}> = [
{ value: 'present', label: 'Present', icon: CheckIcon, active: 'bg-success text-white border-success' },
{ value: 'late', label: 'Late', icon: ClockIcon, active: 'bg-warning text-[#3F2E00] border-warning' },
{ value: 'absent', label: 'Absent', icon: XIcon, active: 'bg-error text-white border-error' }];


export function Attendance() {
  const { notify } = useToast();
  const [session, setSession] = useState(attendanceSessions[0].id);
  const [roster, setRoster] = useState<AttendanceRecord[]>(attendanceRoster);

  const counts = {
    present: roster.filter((r) => r.status === 'present').length,
    late: roster.filter((r) => r.status === 'late').length,
    absent: roster.filter((r) => r.status === 'absent').length
  };
  const rate = Math.round((counts.present + counts.late) / roster.length * 100);
  const current = attendanceSessions.find((s) => s.id === session) ?? attendanceSessions[0];

  const setStatus = (studentId: string, status: AttendanceRecord['status']) =>
  setRoster((prev) => prev.map((r) => r.studentId === studentId ? { ...r, status } : r));

  const markAllPresent = () =>
  setRoster((prev) => prev.map((r) => ({ ...r, status: 'present' as const })));

  return (
    <>
      <PageHeader
        title="Attendance"
        subtitle="CUL-101 · Cohort 24B. Registers close 24 hours after the session ends."
        actions={
        <>
            <Select
            aria-label="Select session"
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-64">
            
              {attendanceSessions.map((s) =>
            <option key={s.id} value={s.id}>
                  {s.label}
                </option>
            )}
            </Select>
            <Button
            icon={SaveIcon}
            onClick={() =>
            notify({
              tone: 'success',
              title: 'Register saved',
              message: `${current.label} · ${rate}% attendance recorded.`
            })
            }>
            
              Save register
            </Button>
          </>
        } />
      

      <div className="mb-6 grid gap-5 sm:grid-cols-4">
        <Panel className="border-primary/30 p-5 ring-1 ring-primary/10">
          <p className="text-[13px] text-muted">Attendance rate</p>
          <p className="mt-1.5 text-3xl font-semibold tracking-[-0.02em] text-ink">{rate}%</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Present</p>
          <p className="mt-1.5 text-2xl font-semibold text-ink">{counts.present}</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Late</p>
          <p className="mt-1.5 text-2xl font-semibold text-ink">{counts.late}</p>
        </Panel>
        <Panel className="p-5">
          <p className="text-[13px] text-muted">Absent</p>
          <p className="mt-1.5 text-2xl font-semibold text-ink">{counts.absent}</p>
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          title={current.label}
          subtitle={current.topic}
          action={
          <Button size="sm" variant="secondary" onClick={markAllPresent}>
              Mark all present
            </Button>
          } />
        
        <ul className="divide-y divide-line">
          {roster.map((r) =>
          <li key={r.studentId} className="flex flex-wrap items-center justify-between gap-4 px-5 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-secondary text-[11px] font-semibold text-muted">
                  {r.studentName.
                split(' ').
                map((p) => p[0]).
                join('')}
                </span>
                <div>
                  <p className="text-[13px] font-medium text-ink">{r.studentName}</p>
                  <p className="text-xs text-muted">{r.studentId.toUpperCase()}</p>
                </div>
              </div>

              <div className="flex gap-1.5" role="group" aria-label={`Attendance for ${r.studentName}`}>
                {OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = r.status === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStatus(r.studentId, opt.value)}
                    className={cn(
                      'inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 ease-smooth',
                      active ? opt.active : 'border-line text-muted hover:bg-surface-secondary'
                    )}>
                    
                      <Icon className="h-3.5 w-3.5" />
                      {opt.label}
                    </button>);

              })}
              </div>
            </li>
          )}
        </ul>
      </Panel>
    </>);

}