import React, { useState } from 'react';
import { PinIcon, PlusIcon, ReplyIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Field, Select, TextArea, TextInput } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { discussions } from '../../data/academics';
import { courses } from '../../data/courses';
import { cn } from '../../utils/cn';

export function Discussions() {
  const { notify } = useToast();
  const [activeId, setActiveId] = useState(discussions[0].id);
  const [reply, setReply] = useState('');
  const [newOpen, setNewOpen] = useState(false);

  const thread = discussions.find((d) => d.id === activeId) ?? discussions[0];

  const postReply = () => {
    if (!reply.trim()) return;
    notify({ tone: 'success', title: 'Reply posted', message: 'Your reply is visible to the course.' });
    setReply('');
  };

  return (
    <>
      <PageHeader
        title="Discussions"
        subtitle="Course forums. Instructors answer here rather than by email."
        actions={
        <Button icon={PlusIcon} onClick={() => setNewOpen(true)}>
            New thread
          </Button>
        } />
      

      <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
        <Panel className="h-fit">
          <PanelHeader title="Threads" subtitle="CUL-101 · Professional Culinary Foundations" />
          <ul className="divide-y divide-line">
            {discussions.map((d) =>
            <li key={d.id}>
                <button
                type="button"
                onClick={() => setActiveId(d.id)}
                className={cn(
                  'w-full px-5 py-4 text-left transition-colors duration-150 ease-smooth',
                  d.id === activeId ? 'bg-primary-light' : 'hover:bg-surface-secondary'
                )}>
                
                  <div className="flex items-start gap-2">
                    {d.pinned ? <PinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> : null}
                    <p
                    className={cn(
                      'text-[13px] font-medium leading-snug',
                      d.id === activeId ? 'text-primary-dark' : 'text-ink'
                    )}>
                    
                      {d.title}
                    </p>
                  </div>
                  <p className="mt-1.5 text-xs text-muted">
                    {d.author} · {d.createdAt} · {d.replies.length} replies
                  </p>
                </button>
              </li>
            )}
          </ul>
        </Panel>

        <Panel>
          <div className="border-b border-line px-6 py-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge tone="grey">{thread.course}</Badge>
              {thread.pinned ? <Badge tone="blue">Pinned by instructor</Badge> : null}
            </div>
            <h2 className="mt-3 text-lg font-semibold leading-snug text-ink">{thread.title}</h2>
            <p className="mt-1 text-[13px] text-muted">
              Started by {thread.author} · {thread.createdAt}
            </p>
          </div>

          <ul className="divide-y divide-line">
            {thread.replies.map((r) =>
            <li key={r.id} className="flex gap-3.5 px-6 py-5">
                <span
                className={cn(
                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold',
                  r.role === 'Instructor' ? 'bg-primary text-white' : 'bg-surface-secondary text-muted'
                )}>
                
                  {r.authorInitials}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13px] font-semibold text-ink">{r.author}</p>
                    {r.role === 'Instructor' ? <Badge tone="blue">Instructor</Badge> : null}
                    <span className="text-xs text-muted">{r.createdAt}</span>
                  </div>
                  <p className="mt-1.5 text-[15px] leading-7 text-ink">{r.body}</p>
                  <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline">
                  
                    <ReplyIcon className="h-3.5 w-3.5" />
                    Reply
                  </button>
                </div>
              </li>
            )}
          </ul>

          <div className="border-t border-line bg-surface-secondary px-6 py-5">
            <Field label="Add a reply" htmlFor="reply">
              <TextArea
                id="reply"
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Share what worked on your station…" />
              
            </Field>
            <div className="mt-3 flex justify-end">
              <Button onClick={postReply} disabled={!reply.trim()}>
                Post reply
              </Button>
            </div>
          </div>
        </Panel>
      </div>

      <Modal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="Start a new thread"
        description="Threads are visible to everyone enrolled in the course."
        footer={
        <>
            <Button variant="secondary" onClick={() => setNewOpen(false)}>
              Cancel
            </Button>
            <Button
            onClick={() => {
              setNewOpen(false);
              notify({ tone: 'success', title: 'Thread created', message: 'Your thread is now live.' });
            }}>
            
              Post thread
            </Button>
          </>
        }>
        
        <div className="space-y-4">
          <Field label="Course" htmlFor="thread-course" required>
            <Select id="thread-course">
              {courses.
              filter((c) => c.status !== 'archived').
              map((c) =>
              <option key={c.id}>
                    {c.code} · {c.title}
                  </option>
              )}
            </Select>
          </Field>
          <Field label="Title" htmlFor="thread-title" required>
            <TextInput id="thread-title" placeholder="What is your question?" />
          </Field>
          <Field label="Message" htmlFor="thread-body" required>
            <TextArea id="thread-body" rows={5} placeholder="Give enough detail to get a useful answer…" />
          </Field>
        </div>
      </Modal>
    </>);

}