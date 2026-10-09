import React, { useState } from 'react';
import { MailIcon, MessageSquareIcon, SendIcon, UsersIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DateInput, Field, Select, TextArea, TextInput, Toggle } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { useDataStore } from '../../data/store';
import { cn } from '../../utils/cn';

const GROUPS = [
{ id: 'g-1', label: 'All students', count: 241 },
{ id: 'g-2', label: 'Cohort 24B', count: 62 },
{ id: 'g-3', label: 'CUL-101 roster', count: 48 },
{ id: 'g-4', label: 'Students on hold', count: 9 },
{ id: 'g-5', label: 'Graduating this term', count: 34 }];


export function NotificationComposer() {
  const { notify } = useToast();
  const { courses } = useDataStore();
  const [channel, setChannel] = useState<'email' | 'sms'>('email');
  const [selected, setSelected] = useState<string[]>(['g-3']);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [schedule, setSchedule] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const recipients = GROUPS.filter((g) => selected.includes(g.id)).reduce((s, g) => s + g.count, 0);
  const toggleGroup = (id: string) =>
  setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const send = () => {
    setConfirm(false);
    notify({
      tone: 'success',
      title: schedule ? 'Notification scheduled' : 'Notification sent',
      message: `${recipients} recipients via ${channel === 'email' ? 'email' : 'SMS'}.`
    });
    setSubject('');
    setBody('');
  };

  return (
    <>
      <PageHeader
        title="Notification composer"
        subtitle="Send an email or SMS to a selected group of students." />
      

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Panel>
          <PanelHeader title="Message" subtitle="Plain text only — links are allowed in email" />
          <div className="space-y-5 px-5 py-5">
            <Field label="Channel">
              <div className="flex gap-2">
                {(
                [
                { value: 'email', label: 'Email', icon: MailIcon },
                { value: 'sms', label: 'SMS', icon: MessageSquareIcon }] as
                const).
                map((opt) => {
                  const Icon = opt.icon;
                  const active = channel === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setChannel(opt.value)}
                      className={cn(
                        'inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-[13px] font-medium transition-colors duration-150 ease-smooth',
                        active ?
                        'border-primary bg-primary-light text-primary-dark' :
                        'border-line text-muted hover:bg-surface-secondary'
                      )}>
                      
                      <Icon className="h-4 w-4" />
                      {opt.label}
                    </button>);

                })}
              </div>
            </Field>

            {channel === 'email' ?
            <Field label="Subject" htmlFor="notice-subject" required>
                <TextInput
                id="notice-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Timed practical moved to Thursday" />
              
              </Field> :
            null}

            <Field
              label="Message body"
              htmlFor="notice-body"
              required
              hint={
              channel === 'sms' ?
              `${body.length}/160 characters · one SMS segment` :
              'Keep it short. Students read these on their phones.'
              }>
              
              <TextArea
                id="notice-body"
                rows={channel === 'sms' ? 4 : 9}
                maxLength={channel === 'sms' ? 160 : undefined}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Stations 4 and 6 are offline for calibration on Wednesday morning…" />
              
            </Field>

            <Field label="Related course (optional)" htmlFor="notice-course">
              <Select id="notice-course">
                <option>No course link</option>
                {courses.map((c) =>
                <option key={c.id}>
                    {c.code} · {c.title}
                  </option>
                )}
              </Select>
            </Field>

            <div className="border-t border-line pt-4">
              <Toggle
                checked={schedule}
                onChange={setSchedule}
                label="Schedule for later"
                description="Otherwise the message sends immediately." />
              
              {schedule ?
              <div className="mt-4 grid grid-cols-2 gap-4">
                  <Field label="Send date" htmlFor="notice-date">
                    <DateInput id="notice-date" defaultValue="2026-09-23" />
                  </Field>
                  <Field label="Send time" htmlFor="notice-time">
                    <TextInput id="notice-time" type="time" defaultValue="08:00" />
                  </Field>
                </div> :
              null}
            </div>
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-secondary px-5 py-3.5">
            <p className="text-[13px] text-muted">
              {recipients} recipients selected
            </p>
            <div className="flex gap-2">
              <Button variant="secondary">Save draft</Button>
              <Button
                icon={SendIcon}
                disabled={recipients === 0 || body.trim().length < 5}
                onClick={() => setConfirm(true)}>
                
                {schedule ? 'Schedule' : 'Send now'}
              </Button>
            </div>
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="Recipient groups" subtitle="Select one or more" />
            <ul className="divide-y divide-line">
              {GROUPS.map((g) =>
              <li key={g.id}>
                  <label className="flex cursor-pointer items-center justify-between gap-3 px-5 py-3.5 transition-colors duration-150 ease-smooth hover:bg-surface-secondary">
                    <span className="flex items-center gap-3">
                      <input
                      type="checkbox"
                      checked={selected.includes(g.id)}
                      onChange={() => toggleGroup(g.id)}
                      className="h-4 w-4 rounded border-line text-primary focus:ring-primary/30" />
                    
                      <span className="text-[13px] font-medium text-ink">{g.label}</span>
                    </span>
                    <Badge tone="grey">{g.count}</Badge>
                  </label>
                </li>
              )}
            </ul>
          </Panel>

          <Panel className="p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-light">
                <UsersIcon className="h-[18px] w-[18px] text-primary" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-ink">Reach</h2>
                <p className="mt-1 text-[13px] text-muted">
                  {recipients} students will receive this {channel === 'email' ? 'email' : 'SMS'}. Students
                  who have opted out of non-essential messages are excluded automatically.
                </p>
              </div>
            </div>
          </Panel>
        </div>
      </div>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title={schedule ? 'Schedule this notification?' : 'Send this notification?'}
        description={`${recipients} students will be contacted by ${channel === 'email' ? 'email' : 'SMS'}.`}
        footer={
        <>
            <Button variant="secondary" onClick={() => setConfirm(false)}>
              Keep editing
            </Button>
            <Button onClick={send}>{schedule ? 'Schedule send' : 'Send now'}</Button>
          </>
        }>
        
        <div className="rounded-lg border border-line bg-surface-secondary p-4">
          {channel === 'email' ?
          <p className="text-[13px] font-semibold text-ink">{subject || '(no subject)'}</p> :
          null}
          <p className="mt-1.5 whitespace-pre-wrap text-[13px] leading-relaxed text-ink">
            {body || '(empty message)'}
          </p>
        </div>
      </Modal>
    </>);

}