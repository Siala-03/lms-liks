import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ClockIcon, FlagIcon } from 'lucide-react';
import { Panel } from '../../components/ui/Panel';
import { Button } from '../../components/ui/Button';
import { TextArea } from '../../components/ui/Form';
import { Modal } from '../../components/ui/Modal';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { useToast } from '../../components/ui/Toast';
import { quizQuestions, quizzes } from '../../data/academics';
import { cn } from '../../utils/cn';

export function QuizPlayer() {
  const { quizId } = useParams();
  const quiz = quizzes.find((q) => q.id === quizId) ?? quizzes[1];
  const navigate = useNavigate();
  const { notify } = useToast();

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Set<string>>(new Set());
  const [secondsLeft, setSecondsLeft] = useState(quiz.timeLimitMins * 60);
  const [submitOpen, setSubmitOpen] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setSecondsLeft((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, []);

  const question = quizQuestions[index];
  const total = quizQuestions.length;
  const answeredCount = Object.values(answers).filter((v) => v.trim().length > 0).length;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const lowTime = secondsLeft < 120;

  const setAnswer = (value: string) => setAnswers((prev) => ({ ...prev, [question.id]: value }));

  const toggleFlag = () => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(question.id)) next.delete(question.id);else
      next.add(question.id);
      return next;
    });
  };

  const finish = () => {
    setSubmitOpen(false);
    notify({
      tone: 'success',
      title: 'Quiz submitted',
      message: `${answeredCount} of ${total} questions answered. Results are available immediately.`
    });
    navigate('/student/quizzes');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">{quiz.course}</span>
          <h1 className="mt-1.5 text-xl font-semibold tracking-[-0.01em] text-ink">{quiz.title}</h1>
        </div>
        <div
          className={cn(
            'flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold tabular-nums',
            lowTime ? 'bg-error/10 text-error' : 'bg-primary-light text-primary-dark'
          )}
          role="timer"
          aria-live="off">
          
          <ClockIcon className="h-4 w-4" />
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </div>
      </div>

      <Panel>
        <div className="border-b border-line px-6 py-4">
          <div className="mb-2 flex items-center justify-between text-[13px]">
            <span className="font-medium text-ink">
              Question {index + 1} of {total}
            </span>
            <span className="text-muted">{answeredCount} answered</span>
          </div>
          <ProgressBar value={(index + 1) / total * 100} size="sm" />
        </div>

        <div className="px-6 py-7">
          <div className="flex items-start justify-between gap-6">
            <h2 className="max-w-2xl text-lg font-medium leading-snug text-ink">{question.prompt}</h2>
            <button
              type="button"
              onClick={toggleFlag}
              aria-pressed={flagged.has(question.id)}
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors duration-150 ease-smooth',
                flagged.has(question.id) ?
                'border-warning bg-warning/15 text-[#8A6100]' :
                'border-line text-muted hover:bg-surface-secondary'
              )}>
              
              <FlagIcon className="h-3.5 w-3.5" />
              {flagged.has(question.id) ? 'Flagged' : 'Flag'}
            </button>
          </div>

          {question.type === 'multiple-choice' ?
          <ul className="mt-6 space-y-2.5">
              {question.options?.map((opt) => {
              const selected = answers[question.id] === opt;
              return (
                <li key={opt}>
                    <button
                    type="button"
                    onClick={() => setAnswer(opt)}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-lg border px-4 py-3.5 text-left text-[15px] transition-colors duration-150 ease-smooth',
                      selected ?
                      'border-primary bg-primary-light text-primary-dark' :
                      'border-line hover:bg-surface-secondary'
                    )}>
                    
                      <span
                      className={cn(
                        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
                        selected ? 'border-primary' : 'border-line'
                      )}>
                      
                        {selected ? <span className="h-2.5 w-2.5 rounded-full bg-primary" /> : null}
                      </span>
                      {opt}
                    </button>
                  </li>);

            })}
            </ul> :

          <div className="mt-6">
              <TextArea
              rows={6}
              aria-label="Your answer"
              value={answers[question.id] ?? ''}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer…" />
            
              <p className="mt-1.5 text-xs text-muted">
                Short answers are marked manually by your instructor.
              </p>
            </div>
          }
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-surface-secondary px-6 py-4">
          <Button
            variant="secondary"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}>
            
            Previous
          </Button>
          <div className="flex items-center gap-1.5">
            {quizQuestions.map((q, i) =>
            <button
              key={q.id}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to question ${i + 1}`}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-colors duration-150 ease-smooth',
                i === index ?
                'bg-primary' :
                answers[q.id]?.trim() ?
                'bg-primary/40' :
                'bg-line'
              )} />

            )}
          </div>
          {index === total - 1 ?
          <Button onClick={() => setSubmitOpen(true)}>Submit quiz</Button> :

          <Button onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}>Next question</Button>
          }
        </div>
      </Panel>

      <Modal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        title="Submit your quiz?"
        description="You cannot return to your answers once submitted."
        footer={
        <>
            <Button variant="secondary" onClick={() => setSubmitOpen(false)}>
              Review answers
            </Button>
            <Button onClick={finish}>Submit quiz</Button>
          </>
        }>
        
        <ul className="space-y-2 text-[13px] text-ink">
          <li className="flex justify-between border-b border-line pb-2">
            <span className="text-muted">Answered</span>
            <span className="font-medium">
              {answeredCount} of {total}
            </span>
          </li>
          <li className="flex justify-between border-b border-line pb-2">
            <span className="text-muted">Flagged for review</span>
            <span className="font-medium">{flagged.size}</span>
          </li>
          <li className="flex justify-between">
            <span className="text-muted">Time remaining</span>
            <span className="font-medium tabular-nums">
              {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
            </span>
          </li>
        </ul>
      </Modal>
    </div>);

}