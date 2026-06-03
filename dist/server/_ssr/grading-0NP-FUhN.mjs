function calcGrade(marks, fullMarks) {
  if (marks == null || isNaN(marks)) {
    return { grade: "—", gpa: 0, color: "text-muted-foreground" };
  }
  const pct = Number(marks) / fullMarks * 100;
  if (pct >= 80) return { grade: "A+", gpa: 5, color: "text-green-600" };
  if (pct >= 70) return { grade: "A", gpa: 4, color: "text-green-600" };
  if (pct >= 60) return { grade: "A-", gpa: 3.5, color: "text-blue-600" };
  if (pct >= 50) return { grade: "B", gpa: 3, color: "text-blue-600" };
  if (pct >= 40) return { grade: "C", gpa: 2, color: "text-amber-600" };
  if (pct >= 33) return { grade: "D", gpa: 1, color: "text-amber-600" };
  return { grade: "F", gpa: 0, color: "text-red-600" };
}
const EXAM_TYPE_LABEL = {
  daily: "দৈনিক",
  weekly: "সাপ্তাহিক",
  model_test: "মডেল টেস্ট"
};
const EXAM_PATTERN_LABEL = {
  written: "লিখিত",
  mcq: "বহুনির্বাচনি"
};
const CLASS_LEVELS = ["5", "6", "7", "8", "9", "10", "11", "12"];
const DEPT_LABEL = {
  none: "প্রযোজ্য নয়",
  science: "বিজ্ঞান",
  business: "ব্যবসায় শিক্ষা"
};
const BATCH_LABEL = {
  morning: "সকাল",
  afternoon: "বিকাল",
  evening: "সন্ধ্যা"
};
const DEPT_CLASS_LEVELS = ["9", "10", "11", "12"];
const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
function bnNum(n) {
  return String(n).replace(/[0-9]/g, (d) => BN_DIGITS[+d]);
}
function bnClass(c) {
  return bnNum(c) + "ম";
}
function calcPositions(rows) {
  const scored = rows.filter((r) => r.marks != null).sort((a, b) => Number(b.marks) - Number(a.marks));
  const pos = /* @__PURE__ */ new Map();
  let rank = 0;
  let prev = null;
  let idx = 0;
  for (const r of scored) {
    idx++;
    const m = Number(r.marks);
    if (prev === null || m < prev) {
      rank = idx;
      prev = m;
    }
    pos.set(r.student_id, rank);
  }
  return pos;
}
export {
  BATCH_LABEL as B,
  CLASS_LEVELS as C,
  DEPT_LABEL as D,
  EXAM_TYPE_LABEL as E,
  bnNum as a,
  bnClass as b,
  calcGrade as c,
  EXAM_PATTERN_LABEL as d,
  calcPositions as e,
  DEPT_CLASS_LEVELS as f
};
