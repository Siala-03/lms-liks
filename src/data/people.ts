import type { Application, Student } from '../types';

export const students: Student[] = [
{ id: 's-001', name: 'Amara Okonjo', email: 'amara.okonjo@liks.edu', cohort: '24B', courses: 3, attendance: 94, average: 87, status: 'active' },
{ id: 's-002', name: 'Bayo Adeleke', email: 'bayo.adeleke@liks.edu', cohort: '24B', courses: 2, attendance: 88, average: 79, status: 'active' },
{ id: 's-003', name: 'Chidinma Eze', email: 'chidinma.eze@liks.edu', cohort: '24A', courses: 4, attendance: 97, average: 92, status: 'active' },
{ id: 's-004', name: 'Daniel Owusu', email: 'daniel.owusu@liks.edu', cohort: '24B', courses: 2, attendance: 71, average: 64, status: 'on-hold' },
{ id: 's-005', name: 'Esther Mwangi', email: 'esther.mwangi@liks.edu', cohort: '24C', courses: 3, attendance: 91, average: 83, status: 'active' },
{ id: 's-006', name: 'Femi Balogun', email: 'femi.balogun@liks.edu', cohort: '24A', courses: 1, attendance: 99, average: 95, status: 'graduated' },
{ id: 's-007', name: 'Grace Nkemdirim', email: 'grace.n@liks.edu', cohort: '24C', courses: 3, attendance: 85, average: 76, status: 'active' },
{ id: 's-008', name: 'Hassan Suleiman', email: 'hassan.s@liks.edu', cohort: '24B', courses: 2, attendance: 78, average: 71, status: 'active' },
{ id: 's-009', name: 'Ibukun Ajayi', email: 'ibukun.ajayi@liks.edu', cohort: '24C', courses: 4, attendance: 96, average: 89, status: 'active' },
{ id: 's-010', name: 'Joyce Kimani', email: 'joyce.kimani@liks.edu', cohort: '24A', courses: 2, attendance: 82, average: 74, status: 'active' },
{ id: 's-011', name: 'Kofi Asante', email: 'kofi.asante@liks.edu', cohort: '24B', courses: 3, attendance: 90, average: 81, status: 'active' },
{ id: 's-012', name: 'Lydia Abiodun', email: 'lydia.a@liks.edu', cohort: '24C', courses: 2, attendance: 68, average: 59, status: 'on-hold' }];


export const applications: Application[] = [
{
  id: 'a-2041',
  applicant: 'Nneka Obi',
  email: 'nneka.obi@gmail.com',
  phone: '+234 802 114 9930',
  course: 'Professional Culinary Foundations',
  appliedOn: '18 Sep 2026',
  status: 'pending',
  education: 'BSc Food Science, University of Lagos (2024)',
  experience: '1 year line cook, Radisson Blu Ikeja',
  note: ''
},
{
  id: 'a-2040',
  applicant: 'Oluwole Dada',
  email: 'wole.dada@outlook.com',
  phone: '+234 803 772 1188',
  course: 'Bar Operations & Mixology',
  appliedOn: '17 Sep 2026',
  status: 'pending',
  education: 'OND Hotel Management, Yaba College of Technology',
  experience: '2 years bar-back, Eko Hotel',
  note: ''
},
{
  id: 'a-2039',
  applicant: 'Patience Aluko',
  email: 'p.aluko@gmail.com',
  phone: '+234 809 441 2266',
  course: 'Front Office & Guest Relations',
  appliedOn: '16 Sep 2026',
  status: 'approved',
  education: 'BA English, Obafemi Awolowo University',
  experience: 'Front desk intern, Sheraton Abuja',
  note: 'Strong communication score in interview. Placed in cohort 24C.'
},
{
  id: 'a-2038',
  applicant: 'Quadri Lawal',
  email: 'quadri.lawal@gmail.com',
  phone: '+234 812 330 4471',
  course: 'Housekeeping Operations & Standards',
  appliedOn: '15 Sep 2026',
  status: 'pending',
  education: 'SSCE, Kings College Lagos',
  experience: 'No formal experience',
  note: ''
},
{
  id: 'a-2037',
  applicant: 'Rita Nwachukwu',
  email: 'rita.nwa@gmail.com',
  phone: '+234 806 991 7723',
  course: 'Food & Beverage Service Standards',
  appliedOn: '14 Sep 2026',
  status: 'rejected',
  education: 'SSCE',
  experience: 'None listed',
  note: 'Application incomplete — missing academic transcript after two follow-ups.'
},
{
  id: 'a-2036',
  applicant: 'Samuel Etim',
  email: 's.etim@gmail.com',
  phone: '+234 807 220 8814',
  course: 'Professional Culinary Foundations',
  appliedOn: '13 Sep 2026',
  status: 'approved',
  education: 'HND Catering, Federal Polytechnic Ilaro',
  experience: '3 years commis chef, Transcorp Hilton',
  note: 'Advanced placement recommended.'
},
{
  id: 'a-2035',
  applicant: 'Tolu Ogunleye',
  email: 'tolu.ogun@gmail.com',
  phone: '+234 811 556 2093',
  course: 'Hospitality Revenue Management',
  appliedOn: '12 Sep 2026',
  status: 'pending',
  education: 'BSc Economics, University of Ibadan',
  experience: 'Revenue analyst intern, Legend Hotels',
  note: ''
}];


export const applicationById = (id: string) => applications.find((a) => a.id === id);

export const recentEnrollments = [
{ id: 'e-1', student: 'Patience Aluko', course: 'Front Office & Guest Relations', cohort: '24C', date: '18 Sep 2026' },
{ id: 'e-2', student: 'Samuel Etim', course: 'Professional Culinary Foundations', cohort: '24C', date: '17 Sep 2026' },
{ id: 'e-3', student: 'Ibukun Ajayi', course: 'Bar Operations & Mixology', cohort: '24C', date: '16 Sep 2026' },
{ id: 'e-4', student: 'Joyce Kimani', course: 'Food & Beverage Service Standards', cohort: '24A', date: '15 Sep 2026' },
{ id: 'e-5', student: 'Kofi Asante', course: 'Housekeeping Operations & Standards', cohort: '24B', date: '15 Sep 2026' }];