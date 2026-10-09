export const enrollmentTrend = [
{ label: 'Apr', value: 128 },
{ label: 'May', value: 146 },
{ label: 'Jun', value: 139 },
{ label: 'Jul', value: 172 },
{ label: 'Aug', value: 198 },
{ label: 'Sep', value: 241 }];


export const coursePerformance = [
{ label: 'CUL-101', value: 87 },
{ label: 'HSP-210', value: 79 },
{ label: 'FNB-150', value: 91 },
{ label: 'HSK-120', value: 74 },
{ label: 'BAR-180', value: 82 },
{ label: 'MGT-240', value: 68 }];


export const completionByCourse = [
{ course: 'Professional Culinary Foundations', code: 'CUL-101', enrolled: 48, completed: 39, rate: 81, avgDays: 84 },
{ course: 'Front Office & Guest Relations', code: 'HSP-210', enrolled: 62, completed: 44, rate: 71, avgDays: 61 },
{ course: 'Food & Beverage Service Standards', code: 'FNB-150', enrolled: 54, completed: 49, rate: 91, avgDays: 70 },
{ course: 'Housekeeping Operations & Standards', code: 'HSK-120', enrolled: 37, completed: 25, rate: 68, avgDays: 46 },
{ course: 'Bar Operations & Mixology', code: 'BAR-180', enrolled: 29, completed: 23, rate: 79, avgDays: 58 },
{ course: 'Hospitality Revenue Management', code: 'MGT-240', enrolled: 18, completed: 11, rate: 61, avgDays: 77 }];


export const attendanceByCourse = [
{ course: 'Professional Culinary Foundations', code: 'CUL-101', sessions: 24, avgAttendance: 94, belowThreshold: 3 },
{ course: 'Front Office & Guest Relations', code: 'HSP-210', sessions: 18, avgAttendance: 88, belowThreshold: 6 },
{ course: 'Food & Beverage Service Standards', code: 'FNB-150', sessions: 20, avgAttendance: 91, belowThreshold: 4 },
{ course: 'Housekeeping Operations & Standards', code: 'HSK-120', sessions: 14, avgAttendance: 79, belowThreshold: 9 },
{ course: 'Bar Operations & Mixology', code: 'BAR-180', sessions: 16, avgAttendance: 85, belowThreshold: 5 }];


export const gradeDistribution = [
{ band: '90–100', label: 'Distinction', counts: { 'CUL-101': 9, 'HSP-210': 6, 'FNB-150': 14 } },
{ band: '80–89', label: 'Merit', counts: { 'CUL-101': 17, 'HSP-210': 15, 'FNB-150': 19 } },
{ band: '70–79', label: 'Credit', counts: { 'CUL-101': 13, 'HSP-210': 21, 'FNB-150': 13 } },
{ band: '60–69', label: 'Pass', counts: { 'CUL-101': 6, 'HSP-210': 14, 'FNB-150': 6 } },
{ band: 'Below 60', label: 'Fail', counts: { 'CUL-101': 3, 'HSP-210': 6, 'FNB-150': 2 } }];


export const enrollmentReportRows = [
{ id: 'er-1', student: 'Claudine Mukeshimana', course: 'HSP-210', cohort: '24C', enrolledOn: '18 Sep 2026', channel: 'Website', status: 'Active' },
{ id: 'er-2', student: 'James Kariuki', course: 'CUL-101', cohort: '24C', enrolledOn: '17 Sep 2026', channel: 'Walk-in', status: 'Active' },
{ id: 'er-3', student: 'Winnie Njeri', course: 'BAR-180', cohort: '24C', enrolledOn: '16 Sep 2026', channel: 'Referral', status: 'Active' },
{ id: 'er-4', student: 'Josiane Uwimana', course: 'FNB-150', cohort: '24A', enrolledOn: '15 Sep 2026', channel: 'Website', status: 'Active' },
{ id: 'er-5', student: 'Kevin Odhiambo', course: 'HSK-120', cohort: '24B', enrolledOn: '15 Sep 2026', channel: 'Agent', status: 'Active' },
{ id: 'er-6', student: 'Vanessa Mugisha', course: 'HSP-210', cohort: '24C', enrolledOn: '12 Sep 2026', channel: 'Website', status: 'On hold' },
{ id: 'er-7', student: 'David Mwangi', course: 'CUL-101', cohort: '24B', enrolledOn: '09 Sep 2026', channel: 'Referral', status: 'On hold' },
{ id: 'er-8', student: 'Emmanuel Nkurunziza', course: 'FNB-150', cohort: '24A', enrolledOn: '02 Sep 2026', channel: 'Walk-in', status: 'Completed' }];


export const studentPerformanceRows = [
{ id: 'sp-1', student: 'Clarisse Ingabire', course: 'CUL-101', average: 92, trend: 4, band: 'Distinction' },
{ id: 'sp-2', student: 'Aline Uwase', course: 'CUL-101', average: 87, trend: 2, band: 'Merit' },
{ id: 'sp-3', student: 'Winnie Njeri', course: 'BAR-180', average: 89, trend: 6, band: 'Merit' },
{ id: 'sp-4', student: 'Joy Wanjiku', course: 'HSP-210', average: 83, trend: -1, band: 'Merit' },
{ id: 'sp-5', student: 'Kevin Odhiambo', course: 'HSK-120', average: 81, trend: 3, band: 'Merit' },
{ id: 'sp-6', student: 'Brian Omondi', course: 'CUL-101', average: 79, trend: -3, band: 'Credit' },
{ id: 'sp-7', student: 'Grace Nyamu', course: 'FNB-150', average: 76, trend: 1, band: 'Credit' },
{ id: 'sp-8', student: 'Patrick Rukundo', course: 'CUL-101', average: 71, trend: -2, band: 'Credit' },
{ id: 'sp-9', student: 'David Mwangi', course: 'CUL-101', average: 64, trend: -7, band: 'Pass' },
{ id: 'sp-10', student: 'Vanessa Mugisha', course: 'HSP-210', average: 59, trend: -5, band: 'Fail' }];


export const gradeBookStudents = [
{ id: 's-001', name: 'Aline Uwase', scores: { a1: 88, a2: 92, q1: 92, q2: 84, practical: 90 } },
{ id: 's-002', name: 'Brian Omondi', scores: { a1: 74, a2: 81, q1: 78, q2: 80, practical: 76 } },
{ id: 's-003', name: 'Clarisse Ingabire', scores: { a1: 95, a2: 91, q1: 96, q2: 88, practical: 94 } },
{ id: 's-004', name: 'David Mwangi', scores: { a1: 61, a2: null, q1: 66, q2: 58, practical: 64 } },
{ id: 's-005', name: 'Joy Wanjiku', scores: { a1: 84, a2: 86, q1: 80, q2: 82, practical: 85 } },
{ id: 's-007', name: 'Grace Nyamu', scores: { a1: 77, a2: 72, q1: 81, q2: 74, practical: 78 } },
{ id: 's-008', name: 'Patrick Rukundo', scores: { a1: 70, a2: 68, q1: 74, q2: 71, practical: 72 } },
{ id: 's-009', name: 'Winnie Njeri', scores: { a1: 90, a2: 88, q1: 91, q2: 86, practical: 89 } },
{ id: 's-011', name: 'Kevin Odhiambo', scores: { a1: 82, a2: 79, q1: 84, q2: 80, practical: 81 } },
{ id: 's-012', name: 'Vanessa Mugisha', scores: { a1: 58, a2: 61, q1: 55, q2: null, practical: 60 } }];


export const gradeBookColumns = [
{ key: 'a1', label: 'Sauce Lab', outOf: 100 },
{ key: 'a2', label: 'Mise Practical', outOf: 100 },
{ key: 'q1', label: 'Safety Quiz', outOf: 100 },
{ key: 'q2', label: 'Knife Quiz', outOf: 100 },
{ key: 'practical', label: 'Term Practical', outOf: 100 }] as
const;