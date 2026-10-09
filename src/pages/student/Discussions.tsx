import React, { useState } from 'react';
import { PinIcon, PlusIcon } from 'lucide-react';
import { PageHeader, Panel, PanelHeader } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Field, Select, TextArea, TextInput } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../components/ui/Toast';
import { useAuth, ROLE_LABEL } from '../../contexts/AuthContext';
import { useDataStore } from '../../data/store';
import { cn } from '../../utils/cn';

export function Discussions() {
  const { notify } = useToast();
  const { user } = useAuth();
  const { discussions, setDiscussions, courses } = useDataStore();
  const [activeId, setActiveId] = useState(discussions[0].id);
  const [reply, setReply] = useState('');
  const [newOpen, setNewOpen] = useState(false);
  const [newCourse, setNewCourse] = useState(courses[0]?.code ?? '');
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const thread = discussions.find((d) => d.id === activeId) ?? discussions[0];

  const postReply = () => {
    if (!reply.trim() || !user) return;
    setDiscussions((prev) =>
    prev.map((d) =>
    d.id === thread.id ?
    {
      ...d,
      replies: [
      ...d.replies,
      {
        id: `dr-${Date.now()}`,
        author: user.name,
        authorInitials: user.avatarInitials,
        role: ROLE_LABEL[user.role],
        createdAt: 'Just now',
        body: reply.trim()
      }]

    } :
    d
    )
    );
    notify({ tone: 'success', title: 'Reply posted', message: 'Your reply is visible to the course.' });
    setReply('');
  };

  const postThread = () => {
    if (!newTitle.trim() || !newBody.trim() || !user) return;
    const id = `d-${Date.now()}`;
    setDiscussions((prev) => [
    {
      id,
      title: newTitle.trim(),
      course: newCourse,
      author: user.name,
      authorInitials: user.avatarInitials,
      createdAt: 'Just now',
      pinned: false,
      replies: [
      {
        id: `dr-${Date.now()}`,
        author: user.name,
        authorInitials: user.avatarInitials,
        role: ROLE_LABEL[user.role],
        createdAt: 'Just now',
        body: newBody.trim()
      }]

    },
    ...prev]
    );
    setActiveId(id);
    setNewOpen(false);
    setNewTitle('');
    setNewBody('');
    notify({ tone: 'success', title: 'Thread created', message: 'Your thread is now live.' });
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
            <Button onClick={postThread} disabled={!newTitle.trim() || !newBody.trim()}>
              Post thread
            </Button>
          </>
        }>

        <div className="space-y-4">
          <Field label="Course" htmlFor="thread-course" required>
            <Select id="thread-course" value={newCourse} onChange={(e) => setNewCourse(e.target.value)}>
              {courses.
              filter((c) => c.status !== 'archived').
              map((c) =>
              <option key={c.id} value={c.code}>
                    {c.code} · {c.title}
                  </option>
              )}
            </Select>
          </Field>
          <Field label="Title" htmlFor="thread-title" required>
            <TextInput id="thread-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What is your question?" />
          </Field>
          <Field label="Message" htmlFor="thread-body" required>
            <TextArea
              id="thread-body"
              rows={5}
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Give enough detail to get a useful answer…" />

          </Field>
        </div>
      </Modal>
    </>);

}