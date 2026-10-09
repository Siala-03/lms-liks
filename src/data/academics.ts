import type {
  Assignment,
  AttendanceRecord,
  Certificate,
  DiscussionThread,
  GradeRow,
  Notification,
  Quiz,
  QuizQuestion,
  RubricCriterion } from
'../types';

export const assignments: Assignment[] = [
{
  id: 'as-1',
  title: 'Mise en Place Timed Practical — Photo Log',
  course: 'Professional Culinary Foundations',
  courseId: 'c-101',
  dueDate: '24 Sep 2026, 17:00',
  dueIn: '2 days',
  status: 'submitted',
  points: 100
},
{
  id: 'as-2',
  title: 'Service Recovery Reflection (800 words)',
  course: 'Front Office & Guest Relations',
  courseId: 'c-102',
  dueDate: '26 Sep 2026, 23:59',
  dueIn: '4 days',
  status: 'pending',
  points: 50
},
{
  id: 'as-3',
  title: 'Sauce Emulsion Lab Report',
  course: 'Professional Culinary Foundations',
  courseId: 'c-101',
  dueDate: '14 Sep 2026, 17:00',
  dueIn: 'Closed',
  status: 'graded',
  points: 100,
  score: 88
},
{
  id: 'as-4',
  title: 'Wine Pairing Menu Proposal',
  course: 'Food & Beverage Service Standards',
  courseId: 'c-103',
  dueDate: '08 Sep 2026, 17:00',
  dueIn: 'Closed',
  status: 'graded',
  points: 100,
  score: 94
},
{
  id: 'as-5',
  title: 'Room Inspection Scorecard',
  course: 'Housekeeping Operations & Standards',
  courseId: 'c-104',
  dueDate: '20 Sep 2026, 17:00',
  dueIn: 'Closed',
  status: 'late',
  points: 50
}];


export const quizzes: Quiz[] = [
{ id: 'q-1', title: 'Kitchen Safety & HACCP Check', course: 'CUL-101', questions: 12, timeLimitMins: 15, attemptsAllowed: 2, status: 'completed', score: 92 },
{ id: 'q-2', title: 'Knife Cuts Identification', course: 'CUL-101', questions: 5, timeLimitMins: 12, attemptsAllowed: 2, status: 'available' },
{ id: 'q-3', title: 'Service Recovery Scenarios', course: 'HSP-210', questions: 5, timeLimitMins: 20, attemptsAllowed: 1, status: 'available' },
{ id: 'q-4', title: 'Wine Regions & Pairing', course: 'FNB-150', questions: 15, timeLimitMins: 25, attemptsAllowed: 2, status: 'completed', score: 86 },
{ id: 'q-5', title: 'Mother Sauces Final', course: 'CUL-101', questions: 20, timeLimitMins: 30, attemptsAllowed: 1, status: 'locked' }];


export const quizQuestions: QuizQuestion[] = [
// q-2 — Knife Cuts Identification (CUL-101)
{
  id: 'qq-1',
  quizId: 'q-2',
  prompt: 'A brunoise cut produces cubes of which approximate dimension?',
  type: 'multiple-choice',
  options: ['1 mm × 1 mm × 1 mm', '3 mm × 3 mm × 3 mm', '6 mm × 6 mm × 6 mm', '12 mm × 12 mm × 12 mm'],
  correctAnswer: '3 mm × 3 mm × 3 mm'
},
{
  id: 'qq-2',
  quizId: 'q-2',
  prompt: 'Which cut must be completed before a brunoise can be produced?',
  type: 'multiple-choice',
  options: ['Julienne', 'Chiffonade', 'Paysanne', 'Tourné'],
  correctAnswer: 'Julienne'
},
{
  id: 'qq-3',
  quizId: 'q-2',
  prompt: 'A chiffonade cut is used primarily on which ingredient type?',
  type: 'multiple-choice',
  options: ['Root vegetables', 'Leafy herbs and greens', 'Citrus fruit', 'Hard cheese'],
  correctAnswer: 'Leafy herbs and greens'
},
{
  id: 'qq-4',
  quizId: 'q-2',
  prompt: 'A tourné cut traditionally has how many faces?',
  type: 'multiple-choice',
  options: ['3', '5', '7', '9'],
  correctAnswer: '7'
},
{
  id: 'qq-5',
  quizId: 'q-2',
  prompt: 'Which grip keeps fingertips curled under and away from the blade?',
  type: 'multiple-choice',
  options: ['Pinch grip', 'Claw grip', 'Hammer grip', 'Pencil grip'],
  correctAnswer: 'Claw grip'
},
// q-3 — Service Recovery Scenarios (HSP-210)
{
  id: 'qq-6',
  quizId: 'q-3',
  prompt: 'A guest complains their room was not ready at the promised check-in time. What is the best first response?',
  type: 'multiple-choice',
  options: [
  'Explain that housekeeping is short-staffed today',
  'Apologise, offer a concrete update, and propose a concrete remedy',
  'Offer a discount immediately without further discussion',
  'Ask the guest to wait in the lobby until notified'],

  correctAnswer: 'Apologise, offer a concrete update, and propose a concrete remedy'
},
{
  id: 'qq-7',
  quizId: 'q-3',
  prompt: 'The safe internal holding temperature for hot food service is:',
  type: 'multiple-choice',
  options: ['45 °C or above', '52 °C or above', '63 °C or above', '78 °C or above'],
  correctAnswer: '63 °C or above'
},
{
  id: 'qq-8',
  quizId: 'q-3',
  prompt: 'A guest is overheard being rude to a colleague at the next desk. What should you do?',
  type: 'multiple-choice',
  options: [
  'Ignore it — it is not your guest',
  'Quietly check in with your colleague once free and offer support',
  'Publicly correct the guest',
  'Report the guest to security immediately'],

  correctAnswer: 'Quietly check in with your colleague once free and offer support'
},
{
  id: 'qq-9',
  quizId: 'q-3',
  prompt: 'Which best describes the LEARN framework taught for complaint handling?',
  type: 'multiple-choice',
  options: [
  'Listen, Empathise, Apologise, Resolve, Notify',
  'Leave, Escalate, Avoid, Repeat, Notify',
  'Listen, Explain, Argue, Refuse, Negotiate',
  'Log, Escalate, Assign, Review, Notify'],

  correctAnswer: 'Listen, Empathise, Apologise, Resolve, Notify'
},
{
  id: 'qq-10',
  quizId: 'q-3',
  prompt: 'When should a service recovery gesture (upgrade, voucher, etc.) be offered?',
  type: 'multiple-choice',
  options: [
  'Before you have understood what went wrong',
  'Only after the guest explicitly demands compensation',
  'After acknowledging the issue and only if it fits policy',
  'Never — gestures should be avoided entirely'],

  correctAnswer: 'After acknowledging the issue and only if it fits policy'
}];


export const grades: GradeRow[] = [
{ id: 'g-1', assessment: 'Sauce Emulsion Lab Report', course: 'CUL-101', type: 'Assignment', submitted: '13 Sep 2026', score: 88, outOf: 100, status: 'graded', feedback: 'Strong technique notes. Tighten your conclusion — tie failures back to temperature control.', assignmentId: 'as-3' },
{ id: 'g-2', assessment: 'Kitchen Safety & HACCP Check', course: 'CUL-101', type: 'Quiz', submitted: '06 Sep 2026', score: 92, outOf: 100, status: 'graded', feedback: 'Excellent. Only miss was on allergen cross-contact.', quizId: 'q-1' },
{ id: 'g-3', assessment: 'Mise en Place Timed Practical', course: 'CUL-101', type: 'Practical', submitted: '21 Sep 2026', score: null, outOf: 100, status: 'pending', feedback: 'Awaiting instructor review.', assignmentId: 'as-1' },
{ id: 'g-4', assessment: 'Wine Pairing Menu Proposal', course: 'FNB-150', type: 'Assignment', submitted: '07 Sep 2026', score: 94, outOf: 100, status: 'graded', feedback: 'Best proposal in the cohort. Consider a non-alcoholic pairing tier.', assignmentId: 'as-4' },
{ id: 'g-5', assessment: 'Wine Regions & Pairing', course: 'FNB-150', type: 'Quiz', submitted: '02 Sep 2026', score: 86, outOf: 100, status: 'graded', feedback: 'Review Loire Valley whites.', quizId: 'q-4' },
{ id: 'g-6', assessment: 'Peer Review — Lab Report', course: 'CUL-101', type: 'Peer Review', submitted: '12 Sep 2026', score: 18, outOf: 20, status: 'graded', feedback: 'Fair, evidence-based scoring. Comments were specific and actionable.' },
{ id: 'g-7', assessment: 'Room Inspection Scorecard', course: 'HSK-120', type: 'Assignment', submitted: '21 Sep 2026', score: null, outOf: 50, status: 'late', feedback: 'Submitted after deadline — late penalty under review.', assignmentId: 'as-5' },
{ id: 'g-8', assessment: 'Service Recovery Reflection', course: 'HSP-210', type: 'Assignment', submitted: '—', score: null, outOf: 50, status: 'pending', feedback: 'Not yet submitted.', assignmentId: 'as-2' }];


export const rubric: RubricCriterion[] = [
{ id: 'r-1', criterion: 'Technical accuracy', description: 'Method matches the taught standard; measurements and temperatures correct.', max: 30 },
{ id: 'r-2', criterion: 'Documentation quality', description: 'Steps recorded clearly with photographic evidence at each stage.', max: 25 },
{ id: 'r-3', criterion: 'Analysis & reflection', description: 'Failures are diagnosed with cause, not just described.', max: 25 },
{ id: 'r-4', criterion: 'Presentation & hygiene', description: 'Station discipline and plating visible in submitted evidence.', max: 20 }];


export const peerSubmission = {
  id: 'ps-1',
  anonymousLabel: 'Submission #7 · Anonymous',
  assignment: 'Sauce Emulsion Lab Report',
  course: 'CUL-101 · Professional Culinary Foundations',
  submittedOn: '13 Sep 2026, 16:41',
  attachments: ['emulsion-lab-report.pdf', 'stage-photos.zip'],
  body: `I prepared three hollandaise batches at 62 °C, 68 °C and 74 °C water-bath temperatures, holding each for twelve minutes before assessing stability.

The 62 °C batch stayed loose and never fully thickened. The 68 °C batch produced a stable, glossy emulsion that held for the full holding period. The 74 °C batch broke at nine minutes — the yolk proteins over-coagulated and the butterfat separated at the edge of the bowl.

Correcting the broken batch: I started a fresh yolk with a teaspoon of cold water and re-incorporated the broken mixture drop by drop, which recovered roughly 80% of the volume. My conclusion is that the workable window is narrower than the range given in the manual, and that pan residual heat is the main uncontrolled variable on our stations.`
};

export const attendanceSessions = [
{ id: 'ses-1', label: 'Session 14 · Mon 21 Sep', topic: 'Emulsion troubleshooting lab' },
{ id: 'ses-2', label: 'Session 13 · Thu 17 Sep', topic: 'Mother sauces demonstration' },
{ id: 'ses-3', label: 'Session 12 · Mon 14 Sep', topic: 'Timed brunoise assessment' }];


export const attendanceRoster: AttendanceRecord[] = [
{ studentId: 's-001', studentName: 'Aline Uwase', status: 'present' },
{ studentId: 's-002', studentName: 'Brian Omondi', status: 'present' },
{ studentId: 's-003', studentName: 'Clarisse Ingabire', status: 'present' },
{ studentId: 's-004', studentName: 'David Mwangi', status: 'absent' },
{ studentId: 's-005', studentName: 'Joy Wanjiku', status: 'late' },
{ studentId: 's-007', studentName: 'Grace Nyamu', status: 'present' },
{ studentId: 's-008', studentName: 'Patrick Rukundo', status: 'late' },
{ studentId: 's-009', studentName: 'Winnie Njeri', status: 'present' },
{ studentId: 's-011', studentName: 'Kevin Odhiambo', status: 'present' },
{ studentId: 's-012', studentName: 'Vanessa Mugisha', status: 'absent' }];


export const discussions: DiscussionThread[] = [
{
  id: 'd-1',
  title: 'Hollandaise keeps breaking on the induction stations — anyone else?',
  course: 'CUL-101',
  author: 'Brian Omondi',
  authorInitials: 'BO',
  createdAt: '2 hours ago',
  pinned: false,
  replies: [
  { id: 'dr-1', author: 'Clarisse Ingabire', authorInitials: 'CI', role: 'Student', createdAt: '1 hour ago', body: 'Pull the pan off the ring for ten seconds between additions. The induction residual heat is the problem, not your ratio.' },
  { id: 'dr-2', author: 'Chef Eric Habimana', authorInitials: 'EH', role: 'Instructor', createdAt: '42 min ago', body: 'Clarisse is right. Station 4 and 6 run hot. I have flagged them for calibration — until then work off the residual heat and keep a bowl of cold water beside you.' }]

},
{
  id: 'd-2',
  title: 'Read this before the timed practical — station setup expectations',
  course: 'CUL-101',
  author: 'Chef Eric Habimana',
  authorInitials: 'EH',
  createdAt: '2 days ago',
  pinned: true,
  replies: [
  { id: 'dr-3', author: 'Aline Uwase', authorInitials: 'AU', role: 'Student', createdAt: '1 day ago', body: 'Are we allowed to pre-portion before the clock starts, or does that count as part of the assessed time?' },
  { id: 'dr-4', author: 'Chef Eric Habimana', authorInitials: 'EH', role: 'Instructor', createdAt: '1 day ago', body: 'Setup is untimed. The clock starts at first cut.' }]

},
{
  id: 'd-3',
  title: 'Study group for the Mother Sauces final — Thursday 6pm?',
  course: 'CUL-101',
  author: 'Joy Wanjiku',
  authorInitials: 'JW',
  createdAt: '4 days ago',
  pinned: false,
  replies: [
  { id: 'dr-5', author: 'Patrick Rukundo', authorInitials: 'PR', role: 'Student', createdAt: '3 days ago', body: 'In. I can book the demo kitchen if we are more than four.' }]

}];


export const certificates: Certificate[] = [
{ id: 'cert-1', course: 'Food & Beverage Service Standards', issuedOn: '12 Sep 2026', credentialId: 'LIKS-FNB150-24A-0417', grade: 'Distinction', hours: 120 },
{ id: 'cert-2', course: 'Food Safety & Hygiene Level 2', issuedOn: '04 Jul 2026', credentialId: 'LIKS-FSH102-24A-0221', grade: 'Merit', hours: 40 },
{ id: 'cert-3', course: 'Customer Service Essentials', issuedOn: '19 Apr 2026', credentialId: 'LIKS-CSE100-23D-1138', grade: 'Pass', hours: 30 }];


export const notifications: Notification[] = [
{ id: 'n-1', type: 'deadline', title: 'Mise en Place Practical due in 2 days', message: 'Photo log submission closes 24 Sep at 17:00. Late submissions carry a 10% penalty.', timestamp: '20 min ago', unread: true },
{ id: 'n-2', type: 'grade', title: 'Sauce Emulsion Lab Report graded — 88/100', message: 'Chef Eric Habimana left written feedback on your submission.', timestamp: '3 hours ago', unread: true },
{ id: 'n-3', type: 'discussion', title: 'Chef Eric Habimana replied to your thread', message: '"Setup is untimed. The clock starts at first cut."', timestamp: '1 day ago', unread: true },
{ id: 'n-4', type: 'announcement', title: 'Stations 4 and 6 offline for calibration', message: 'Culinary lab stations 4 and 6 will be unavailable Wednesday morning.', timestamp: '1 day ago', unread: false },
{ id: 'n-5', type: 'grade', title: 'Peer review completed', message: 'Your peer grading of Submission #7 has been accepted and scored 18/20.', timestamp: '3 days ago', unread: false },
{ id: 'n-6', type: 'deadline', title: 'Service Recovery Reflection opens', message: 'The reflection assignment for HSP-210 is now available.', timestamp: '5 days ago', unread: false }];


export const badges = [
{ id: 'b-1', label: 'Perfect Attendance', detail: 'Six consecutive weeks', earned: true },
{ id: 'b-2', label: 'Knife Skills Certified', detail: 'Passed timed assessment', earned: true },
{ id: 'b-3', label: 'Peer Mentor', detail: 'Five peer reviews completed', earned: true },
{ id: 'b-4', label: 'Sauce Master', detail: 'Complete the Mother Sauces module', earned: false },
{ id: 'b-5', label: 'Top of Cohort', detail: 'Finish a term ranked first', earned: false }];


export const surveyResults = [
{ id: 'sv-1', question: 'The course content was relevant to my career goals', average: 4.6, distribution: [1, 0, 2, 12, 27] },
{ id: 'sv-2', question: 'The instructor explained concepts clearly', average: 4.8, distribution: [0, 1, 1, 6, 34] },
{ id: 'sv-3', question: 'Practical sessions had enough equipment and time', average: 3.4, distribution: [3, 7, 11, 13, 8] },
{ id: 'sv-4', question: 'Assessment expectations were communicated clearly', average: 4.1, distribution: [1, 2, 6, 15, 18] }];


export const surveyComments = [
{ id: 'sc-1', author: 'Anonymous · Cohort 24B', body: 'Chef Habimana is the reason I stayed. The demos are worth the early start.' },
{ id: 'sc-2', author: 'Anonymous · Cohort 24B', body: 'Two of us had to share a station during the timed practical, which cost me time I was being graded on.' },
{ id: 'sc-3', author: 'Anonymous · Cohort 24A', body: 'More written material on emulsions would help. The video is good but hard to reference mid-service.' },
{ id: 'sc-4', author: 'Anonymous · Cohort 24C', body: 'Clear rubrics. I always knew what was being marked.' }];