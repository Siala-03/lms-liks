import React from 'react';
import { AwardIcon } from 'lucide-react';
import { PageHeader, Panel } from '../../components/ui/Panel';
import { CertificateCard } from '../../components/CertificateCard';
import { useToast } from '../../components/ui/Toast';
import { certificates } from '../../data/academics';
import { courses } from '../../data/courses';
import { ProgressBar } from '../../components/ui/ProgressBar';

export function Certificates() {
  const { notify } = useToast();
  const inProgress = courses.filter((c) => c.status === 'in-progress');

  return (
    <>
      <PageHeader
        title="Certificates"
        subtitle="Credentials issued by LIKS Hospitality Academy. Each carries a verifiable ID." />
      

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {certificates.map((c) =>
        <CertificateCard
          key={c.id}
          certificate={c}
          onDownload={(cert) =>
          notify({
            tone: 'success',
            title: 'Download started',
            message: `${cert.course} certificate (PDF).`
          })
          } />

        )}
      </div>

      <Panel className="mt-6 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-secondary">
            <AwardIcon className="h-[18px] w-[18px] text-muted" />
          </span>
          <div className="w-full">
            <h2 className="text-sm font-semibold text-ink">On the way</h2>
            <p className="mt-1 text-[13px] text-muted">
              Certificates are issued automatically once a course reaches 100% and all assessments are
              graded.
            </p>
            <ul className="mt-4 space-y-4">
              {inProgress.map((c) =>
              <li key={c.id} className="max-w-xl">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-[13px] font-medium text-ink">{c.title}</p>
                    <span className="text-[13px] text-muted">{100 - c.progress}% remaining</span>
                  </div>
                  <ProgressBar className="mt-2" value={c.progress} size="sm" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </Panel>
    </>);

}