import React from 'react';
import { AwardIcon, DownloadIcon } from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import type { Certificate } from '../types';

export function CertificateCard({
  certificate,
  onDownload



}: {certificate: Certificate;onDownload: (cert: Certificate) => void;}) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-line bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
          <AwardIcon className="h-5 w-5 text-primary" />
        </span>
        <Badge tone={certificate.grade === 'Distinction' ? 'success' : 'blue'}>{certificate.grade}</Badge>
      </div>

      <h3 className="mt-4 text-[15px] font-semibold leading-snug text-ink">{certificate.course}</h3>
      <dl className="mt-3 space-y-1 text-[13px] text-muted">
        <div className="flex gap-1.5">
          <dt>Issued</dt>
          <dd className="text-ink">{certificate.issuedOn}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt>Credential</dt>
          <dd className="font-mono text-[12px] text-ink">{certificate.credentialId}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt>Contact hours</dt>
          <dd className="text-ink">{certificate.hours}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        <Button variant="secondary" size="sm" icon={DownloadIcon} onClick={() => onDownload(certificate)}>
          Download PDF
        </Button>
      </div>
    </article>);

}