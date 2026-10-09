import React, { useState } from 'react';
import { DownloadIcon, SaveIcon } from 'lucide-react';
import { PageHeader, Panel } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Form';
import { Badge } from '../../components/ui/Badge';
import { useToast } from '../../components/ui/Toast';
import { gradeBookColumns, gradeBookStudents } from '../../data/analytics';
import { cn } from '../../utils/cn';

type Scores = Record<string, Record<string, number | null>>;

export function GradeBook() {
  const { notify } = useToast();
  const [scores, setScores] = useState<Scores>(() =>
  gradeBookStudents.reduce<Scores>((acc, s) => {
    acc[s.id] = { ...s.scores };
    return acc;
  }, {})
  );
  const [dirty, setDirty] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const update = (studentId: string, key: string, raw: string) => {
    const parsed = raw === '' ? null : Math.max(0, Math.min(100, Number(raw)));
    setScores((prev) => ({ ...prev, [studentId]: { ...prev[studentId], [key]: parsed } }));
    setDirty(true);
  };

  const averageFor = (studentId: string) => {
    const values = Object.values(scores[studentId]).filter((v): v is number => v !== null);
    if (values.length === 0) return null;
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const columnAverage = (key: string) => {
    const values = gradeBookStudents.
    map((s) => scores[s.id][key]).
    filter((v): v is number => v !== null && v !== undefined);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  return (
    <>
      <PageHeader
        title="Grade book"
        subtitle="CUL-101 · Cohort 24B. Click any cell to edit a score inline."
        actions={
        <>
            <Select aria-label="Select course" defaultValue="CUL-101" className="w-44">
              <option>CUL-101</option>
              <option>HSP-210</option>
              <option>FNB-150</option>
            </Select>
            <Button variant="secondary" icon={DownloadIcon}>
              Export CSV
            </Button>
            <Button
            icon={SaveIcon}
            disabled={!dirty}
            onClick={() => {
              setDirty(false);
              notify({ tone: 'success', title: 'Grades saved', message: 'Students have been notified.' });
            }}>
            
              Save changes
            </Button>
          </>
        } />
      

      <Panel className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-secondary">
                <th
                  scope="col"
                  className="sticky left-0 z-10 bg-surface-secondary px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted">
                  
                  Student
                </th>
                {gradeBookColumns.map((c) =>
                <th
                  key={c.key}
                  scope="col"
                  className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-muted">
                  
                    {c.label}
                    <span className="mt-0.5 block font-normal normal-case tracking-normal text-muted/80">
                      / {c.outOf}
                    </span>
                  </th>
                )}
                <th
                  scope="col"
                  className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-muted">
                  
                  Average
                </th>
              </tr>
            </thead>
            <tbody>
              {gradeBookStudents.map((s) => {
                const avg = averageFor(s.id);
                return (
                  <tr key={s.id} className="border-b border-line last:border-0">
                    <th
                      scope="row"
                      className="sticky left-0 z-10 bg-white px-5 py-2.5 text-left text-[13px] font-medium text-ink">
                      
                      {s.name}
                    </th>
                    {gradeBookColumns.map((c) => {
                      const cellId = `${s.id}-${c.key}`;
                      const value = scores[s.id][c.key];
                      return (
                        <td key={c.key} className="px-2 py-1.5 text-center">
                          <input
                            type="number"
                            min={0}
                            max={c.outOf}
                            aria-label={`${c.label} score for ${s.name}`}
                            value={value ?? ''}
                            onFocus={() => setEditing(cellId)}
                            onBlur={() => setEditing(null)}
                            onChange={(e) => update(s.id, c.key, e.target.value)}
                            className={cn(
                              'h-9 w-16 rounded-md border bg-white text-center text-[13px] tabular-nums transition-colors duration-150 ease-smooth focus:outline-none',
                              editing === cellId ?
                              'border-primary ring-2 ring-primary/20' :
                              'border-transparent hover:border-line',
                              value !== null && value < 60 ? 'text-error' : 'text-ink'
                            )}
                            placeholder="—" />
                          
                        </td>);

                    })}
                    <td className="px-5 py-2.5 text-right">
                      {avg === null ?
                      <span className="text-[13px] text-muted">—</span> :

                      <Badge tone={avg >= 80 ? 'success' : avg >= 70 ? 'blue' : avg >= 60 ? 'warning' : 'error'}>
                          {avg}%
                        </Badge>
                      }
                    </td>
                  </tr>);

              })}
              <tr className="bg-surface-secondary">
                <th
                  scope="row"
                  className="sticky left-0 z-10 bg-surface-secondary px-5 py-3 text-left text-[13px] font-semibold text-ink">
                  
                  Class average
                </th>
                {gradeBookColumns.map((c) =>
                <td
                  key={c.key}
                  className="px-4 py-3 text-center text-[13px] font-semibold tabular-nums text-ink">
                  
                    {columnAverage(c.key)}
                  </td>
                )}
                <td className="px-5 py-3 text-right text-[13px] font-semibold text-ink">
                  {Math.round(
                    gradeBookStudents.reduce((s, st) => s + (averageFor(st.id) ?? 0), 0) /
                    gradeBookStudents.length
                  )}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="mt-3 text-[13px] text-muted">
        Scores below 60 are highlighted in red. Changes are held locally until you save.
      </p>
    </>);

}