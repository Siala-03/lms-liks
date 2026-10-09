import type { Application, Student } from '../types';

export const students: Student[] = [
{ id: 's-001', name: 'Aline Uwase', email: 'aline.uwase@liks.edu', cohort: '24B', courses: 3, attendance: 94, average: 87, status: 'active' },
{ id: 's-002', name: 'Brian Omondi', email: 'brian.omondi@liks.edu', cohort: '24B', courses: 2, attendance: 88, average: 79, status: 'active' },
{ id: 's-003', name: 'Clarisse Ingabire', email: 'clarisse.ingabire@liks.edu', cohort: '24A', courses: 4, attendance: 97, average: 92, status: 'active' },
{ id: 's-004', name: 'David Mwangi', email: 'david.mwangi@liks.edu', cohort: '24B', courses: 2, attendance: 71, average: 64, status: 'on-hold' },
{ id: 's-005', name: 'Joy Wanjiku', email: 'joy.wanjiku@liks.edu', cohort: '24C', courses: 3, attendance: 91, average: 83, status: 'active' },
{ id: 's-006', name: 'Emmanuel Nkurunziza', email: 'emmanuel.nkurunziza@liks.edu', cohort: '24A', courses: 1, attendance: 99, average: 95, status: 'graduated' },
{ id: 's-007', name: 'Grace Nyamu', email: 'grace.nyamu@liks.edu', cohort: '24C', courses: 3, attendance: 85, average: 76, status: 'active' },
{ id: 's-008', name: 'Patrick Rukundo', email: 'patrick.rukundo@liks.edu', cohort: '24B', courses: 2, attendance: 78, average: 71, status: 'active' },
{ id: 's-009', name: 'Winnie Njeri', email: 'winnie.njeri@liks.edu', cohort: '24C', courses: 4, attendance: 96, average: 89, status: 'active' },
{ id: 's-010', name: 'Josiane Uwimana', email: 'josiane.uwimana@liks.edu', cohort: '24A', courses: 2, attendance: 82, average: 74, status: 'active' },
{ id: 's-011', name: 'Kevin Odhiambo', email: 'kevin.odhiambo@liks.edu', cohort: '24B', courses: 3, attendance: 90, average: 81, status: 'active' },
{ id: 's-012', name: 'Vanessa Mugisha', email: 'vanessa.mugisha@liks.edu', cohort: '24C', courses: 2, attendance: 68, average: 59, status: 'on-hold' }];


export const applications: Application[] = [
{
  id: 'a-2041',
  applicant: 'Alice Wambui',
  email: 'alice.wambui@gmail.com',
  phone: '+254 712 114 993',
  course: 'Professional Culinary Foundations',
  appliedOn: '18 Sep 2026',
  status: 'pending',
  education: 'BSc Food Science, University of Nairobi (2024)',
  experience: '1 year line cook, Villa Rosa Kempinski Nairobi',
  note: ''
},
{
  id: 'a-2040',
  applicant: 'Moses Kiptoo',
  email: 'moses.kiptoo@outlook.com',
  phone: '+254 723 772 118',
  course: 'Bar Operations & Mixology',
  appliedOn: '17 Sep 2026',
  status: 'pending',
  education: 'Diploma in Hotel Management, Kenya Utalii College',
  experience: '2 years bar-back, Sarova Stanley Nairobi',
  note: ''
},
{
  id: 'a-2039',
  applicant: 'Claudine Mukeshimana',
  email: 'c.mukeshimana@gmail.com',
  phone: '+250 788 441 226',
  course: 'Front Office & Guest Relations',
  appliedOn: '16 Sep 2026',
  status: 'approved',
  education: 'BA English, University of Rwanda',
  experience: 'Front desk intern, Kigali Serena Hotel',
  note: 'Strong communication score in interview. Placed in cohort 24C.'
},
{
  id: 'a-2038',
  applicant: 'Felix Wafula',
  email: 'felix.wafula@gmail.com',
  phone: '+254 734 330 447',
  course: 'Housekeeping Operations & Standards',
  appliedOn: '15 Sep 2026',
  status: 'pending',
  education: 'KCSE, Alliance High School',
  experience: 'No formal experience',
  note: ''
},
{
  id: 'a-2037',
  applicant: 'Josephine Nyiraneza',
  email: 'j.nyiraneza@gmail.com',
  phone: '+250 722 991 772',
  course: 'Food & Beverage Service Standards',
  appliedOn: '14 Sep 2026',
  status: 'rejected',
  education: 'Ordinary Level Certificate',
  experience: 'None listed',
  note: 'Application incomplete — missing academic transcript after two follow-ups.'
},
{
  id: 'a-2036',
  applicant: 'James Kariuki',
  email: 'james.kariuki@gmail.com',
  phone: '+254 745 220 881',
  course: 'Professional Culinary Foundations',
  appliedOn: '13 Sep 2026',
  status: 'approved',
  education: 'Diploma in Culinary Arts, Kenya Utalii College',
  experience: '3 years commis chef, Fairmont The Norfolk Nairobi',
  note: 'Advanced placement recommended.'
},
{
  id: 'a-2035',
  applicant: 'Olivier Mugabo',
  email: 'o.mugabo@gmail.com',
  phone: '+250 783 556 209',
  course: 'Hospitality Revenue Management',
  appliedOn: '12 Sep 2026',
  status: 'pending',
  education: 'BSc Economics, University of Rwanda',
  experience: 'Revenue analyst intern, Marriott Kigali',
  note: ''
}];


export const applicationById = (id: string) => applications.find((a) => a.id === id);

export const recentEnrollments = [
{ id: 'e-1', student: 'Claudine Mukeshimana', course: 'Front Office & Guest Relations', cohort: '24C', date: '18 Sep 2026' },
{ id: 'e-2', student: 'James Kariuki', course: 'Professional Culinary Foundations', cohort: '24C', date: '17 Sep 2026' },
{ id: 'e-3', student: 'Winnie Njeri', course: 'Bar Operations & Mixology', cohort: '24C', date: '16 Sep 2026' },
{ id: 'e-4', student: 'Josiane Uwimana', course: 'Food & Beverage Service Standards', cohort: '24A', date: '15 Sep 2026' },
{ id: 'e-5', student: 'Kevin Odhiambo', course: 'Housekeeping Operations & Standards', cohort: '24B', date: '15 Sep 2026' }];