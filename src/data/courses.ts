import type { Course } from '../types';

export const courses: Course[] = [
{
  id: 'c-101',
  code: 'CUL-101',
  title: 'Professional Culinary Foundations',
  instructor: 'Chef Eric Habimana',
  department: 'Culinary Arts',
  duration: '12 weeks',
  lessonsTotal: 24,
  lessonsCompleted: 17,
  progress: 71,
  status: 'in-progress',
  enrolled: 48,
  thumbnailTone: 'blue',
  description:
  'Knife skills, mother sauces, station discipline and kitchen safety — the baseline competency every LIKS graduate carries into a professional brigade.',
  modules: [
  {
    id: 'm-1',
    title: 'Kitchen Safety & Sanitation',
    published: true,
    lessons: [
    { id: 'l-1', title: 'HACCP principles in practice', type: 'text', duration: '18 min', completed: true },
    { id: 'l-2', title: 'Walkthrough: station setup', type: 'video', duration: '22 min', completed: true },
    { id: 'l-3', title: 'Sanitation checklist (PDF)', type: 'pdf', duration: '10 min', completed: true },
    { id: 'l-4', title: 'Safety knowledge check', type: 'quiz', duration: '15 min', completed: true }]

  },
  {
    id: 'm-2',
    title: 'Knife Skills & Mise en Place',
    published: true,
    lessons: [
    { id: 'l-5', title: 'The eight classical cuts', type: 'video', duration: '26 min', completed: true },
    { id: 'l-6', title: 'Speed and consistency drills', type: 'text', duration: '14 min', completed: true },
    { id: 'l-7', title: 'Practical: brunoise under time', type: 'text', duration: '45 min', completed: false }]

  },
  {
    id: 'm-3',
    title: 'Mother Sauces',
    published: false,
    lessons: [
    { id: 'l-8', title: 'Béchamel and velouté', type: 'video', duration: '31 min', completed: false },
    { id: 'l-9', title: 'Emulsion troubleshooting', type: 'text', duration: '20 min', completed: false }]

  }]

},
{
  id: 'c-102',
  code: 'HSP-210',
  title: 'Front Office & Guest Relations',
  instructor: 'Ms. Esther Nyambura',
  department: 'Hospitality Operations',
  duration: '8 weeks',
  lessonsTotal: 18,
  lessonsCompleted: 6,
  progress: 33,
  status: 'in-progress',
  enrolled: 62,
  thumbnailTone: 'teal',
  description:
  'Reservation systems, check-in choreography, complaint recovery and upselling at the desk without eroding trust.',
  modules: [
  {
    id: 'm-4',
    title: 'The Arrival Experience',
    published: true,
    lessons: [
    { id: 'l-10', title: 'First ninety seconds', type: 'video', duration: '17 min', completed: true },
    { id: 'l-11', title: 'PMS walkthrough', type: 'text', duration: '24 min', completed: true }]

  },
  {
    id: 'm-5',
    title: 'Service Recovery',
    published: true,
    lessons: [
    { id: 'l-12', title: 'De-escalation scripts', type: 'text', duration: '19 min', completed: false },
    { id: 'l-13', title: 'Recovery scenarios quiz', type: 'quiz', duration: '20 min', completed: false }]

  }]

},
{
  id: 'c-103',
  code: 'FNB-150',
  title: 'Food & Beverage Service Standards',
  instructor: 'Mr. Jean-Paul Mugenzi',
  department: 'Food & Beverage',
  duration: '10 weeks',
  lessonsTotal: 20,
  lessonsCompleted: 20,
  progress: 100,
  status: 'completed',
  enrolled: 54,
  thumbnailTone: 'amber',
  description:
  'Silver service, wine pairing fundamentals, table turnover discipline and the service sequence end to end.',
  modules: [
  {
    id: 'm-6',
    title: 'Service Sequence',
    published: true,
    lessons: [
    { id: 'l-14', title: 'Greeting to settlement', type: 'video', duration: '28 min', completed: true },
    { id: 'l-15', title: 'Tray and plate carrying', type: 'video', duration: '15 min', completed: true }]

  }]

},
{
  id: 'c-104',
  code: 'HSK-120',
  title: 'Housekeeping Operations & Standards',
  instructor: 'Mrs. Immaculee Mukamana',
  department: 'Rooms Division',
  duration: '6 weeks',
  lessonsTotal: 14,
  lessonsCompleted: 0,
  progress: 0,
  status: 'not-started',
  enrolled: 37,
  thumbnailTone: 'slate',
  description:
  'Room cycles, linen handling, chemical safety and inspection scoring for consistent room readiness.',
  modules: [
  {
    id: 'm-7',
    title: 'Room Cycle Basics',
    published: true,
    lessons: [
    { id: 'l-16', title: 'The 14-point room check', type: 'pdf', duration: '12 min', completed: false }]

  }]

},
{
  id: 'c-105',
  code: 'BAR-180',
  title: 'Bar Operations & Mixology',
  instructor: 'Mr. Samuel Otieno',
  department: 'Food & Beverage',
  duration: '8 weeks',
  lessonsTotal: 16,
  lessonsCompleted: 0,
  progress: 0,
  status: 'not-started',
  enrolled: 29,
  thumbnailTone: 'blue',
  description: 'Pour control, classic cocktail builds, stock rotation and responsible service compliance.',
  modules: [
  {
    id: 'm-8',
    title: 'Station & Stock',
    published: true,
    lessons: [{ id: 'l-17', title: 'Building a speed rail', type: 'video', duration: '21 min', completed: false }]
  }]

},
{
  id: 'c-106',
  code: 'MGT-240',
  title: 'Hospitality Revenue Management',
  instructor: 'Dr. Faith Chebet',
  department: 'Management',
  duration: '10 weeks',
  lessonsTotal: 22,
  lessonsCompleted: 0,
  progress: 0,
  status: 'archived',
  enrolled: 18,
  thumbnailTone: 'slate',
  description: 'Rate strategy, forecasting, channel mix and the metrics that actually move RevPAR.',
  modules: []
}];


export const courseById = (id: string) => courses.find((c) => c.id === id);