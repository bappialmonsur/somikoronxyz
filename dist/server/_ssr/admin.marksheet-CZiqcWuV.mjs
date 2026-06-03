import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { C as CLASS_LEVELS, b as bnClass, B as BATCH_LABEL, e as calcPositions, c as calcGrade, E as EXAM_TYPE_LABEL, d as EXAM_PATTERN_LABEL } from "./grading-0NP-FUhN.mjs";
import { L as LoaderCircle, k as Printer } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
const todayStr = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const monthAgoStr = () => {
  const d = /* @__PURE__ */ new Date();
  d.setMonth(d.getMonth() - 1);
  return d.toISOString().slice(0, 10);
};
function MarksheetPage() {
  const [cls, setCls] = reactExports.useState("");
  const [batch, setBatch] = reactExports.useState("all");
  const [studentId, setStudentId] = reactExports.useState("all");
  const [from, setFrom] = reactExports.useState(monthAgoStr());
  const [to, setTo] = reactExports.useState(todayStr());
  const [generated, setGenerated] = reactExports.useState(null);
  const {
    data: classStudents
  } = useQuery({
    queryKey: ["marksheet-students", cls, batch],
    enabled: !!cls,
    queryFn: async () => {
      let q = supabase.from("students").select("id, full_name, roll").eq("class_level", cls).eq("is_active", true);
      if (batch !== "all") q = q.eq("batch", batch);
      const {
        data,
        error
      } = await q.order("roll", {
        ascending: true
      });
      if (error) throw error;
      return data ?? [];
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "মার্কশীট প্রিন্ট" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "ক্লাস, শিক্ষার্থী ও তারিখ পরিসর সিলেক্ট করে মার্কশীট তৈরি করুন" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 grid sm:grid-cols-2 lg:grid-cols-6 gap-3 print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শ্রেণি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cls, onValueChange: (v) => {
          setCls(v);
          setStudentId("all");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বাছাই" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLASS_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: bnClass(c) }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ব্যাচ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: batch, onValueChange: (v) => {
          setBatch(v);
          setStudentId("all");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব ব্যাচ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "morning", children: BATCH_LABEL.morning }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "afternoon", children: BATCH_LABEL.afternoon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "evening", children: BATCH_LABEL.evening })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শিক্ষার্থী" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: studentId, onValueChange: setStudentId, disabled: !cls, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বাছাই" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সবাই" }),
            (classStudents ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id, children: [
              s.roll ? `${s.roll} — ` : "",
              s.full_name
            ] }, s.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শুরু তারিখ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: from, onChange: (e) => setFrom(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শেষ তারিখ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: to, onChange: (e) => setTo(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-academy-navy text-white w-full", disabled: !cls, onClick: () => setGenerated({
        cls,
        batch,
        from,
        to,
        studentId
      }), children: "মার্কশীট তৈরি" }) })
    ] }),
    generated && /* @__PURE__ */ jsxRuntimeExports.jsx(MarksheetView, { ...generated })
  ] });
}
function MarksheetView({
  cls,
  batch,
  from,
  to,
  studentId
}) {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["marksheet", cls, batch, from, to],
    queryFn: async () => {
      let studentQ = supabase.from("students").select("id, full_name, roll").eq("class_level", cls).eq("is_active", true);
      if (batch !== "all") studentQ = studentQ.eq("batch", batch);
      let examQ = supabase.from("exams").select("*").eq("class_level", cls).gte("exam_date", from).lte("exam_date", to);
      if (batch !== "all") examQ = examQ.or(`batch.is.null,batch.eq.${batch}`);
      const [{
        data: students2,
        error: e1
      }, {
        data: exams2,
        error: e2
      }] = await Promise.all([studentQ.order("roll", {
        ascending: true
      }), examQ.order("exam_date", {
        ascending: true
      })]);
      if (e1) throw e1;
      if (e2) throw e2;
      const examIds = (exams2 ?? []).map((e) => e.id);
      let results2 = [];
      if (examIds.length) {
        const {
          data: r,
          error: e3
        } = await supabase.from("exam_results").select("exam_id, student_id, marks").in("exam_id", examIds);
        if (e3) throw e3;
        results2 = (r ?? []).map((x) => ({
          ...x,
          marks: x.marks == null ? null : Number(x.marks)
        }));
      }
      const posByExam2 = /* @__PURE__ */ new Map();
      for (const ex of exams2 ?? []) {
        const rows = (students2 ?? []).map((s) => ({
          student_id: s.id,
          marks: results2.find((r) => r.exam_id === ex.id && r.student_id === s.id)?.marks ?? null
        }));
        posByExam2.set(ex.id, calcPositions(rows));
      }
      return {
        students: students2 ?? [],
        exams: exams2 ?? [],
        results: results2,
        posByExam: posByExam2
      };
    }
  });
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) });
  if (!data) return null;
  const {
    students: allStudents,
    exams,
    results,
    posByExam
  } = data;
  const students = studentId && studentId !== "all" ? allStudents.filter((s) => s.id === studentId) : allStudents;
  if (exams.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-12 rounded-2xl border text-center text-muted-foreground", children: "এই সময়ের মধ্যে কোনো পরীক্ষা নেই" });
  }
  if (students.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-12 rounded-2xl border text-center text-muted-foreground", children: "শিক্ষার্থী পাওয়া যায়নি" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print:hidden flex justify-end mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => window.print(), variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-1" }),
      " প্রিন্ট"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6 print:space-y-4", children: students.map((s) => {
      const studentRows = exams.map((ex) => {
        const r = results.find((rr) => rr.exam_id === ex.id && rr.student_id === s.id);
        const marks = r?.marks ?? null;
        const g = calcGrade(marks, ex.full_marks);
        const pos = posByExam.get(ex.id)?.get(s.id) ?? null;
        return {
          ex,
          marks,
          grade: g,
          pos
        };
      });
      const totalFull = studentRows.reduce((a, b) => a + (b.marks != null ? b.ex.full_marks : 0), 0);
      const totalGot = studentRows.reduce((a, b) => a + (b.marks ?? 0), 0);
      const overall = allStudents.map((st) => {
        const sum = exams.reduce((acc, ex) => {
          const m = results.find((r) => r.exam_id === ex.id && r.student_id === st.id)?.marks;
          return acc + (m ?? 0);
        }, 0);
        return {
          id: st.id,
          sum
        };
      }).sort((a, b) => b.sum - a.sum);
      const classRank = overall.findIndex((x) => x.id === s.id) + 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "marksheet-page bg-white rounded-2xl border p-6 print:border-0 print:shadow-none mx-auto", style: {
        width: "210mm",
        minHeight: "297mm"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-b pb-3 mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "সমীকরণ শিক্ষা পরিবার" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-academy-navy", children: "মার্কশীট" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            new Date(from).toLocaleDateString("bn-BD"),
            " — ",
            new Date(to).toLocaleDateString("bn-BD")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-sm mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "নাম: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.full_name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "রোল: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: s.roll ?? "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "শ্রেণি: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: bnClass(cls) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm border-collapse", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-academy-soft", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border p-2 text-left", children: "তারিখ" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border p-2 text-left", children: "বিষয়" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border p-2 text-left", children: "ধরন" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border p-2", children: "পূর্ণমান" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border p-2", children: "প্রাপ্ত" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border p-2", children: "গ্রেড" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "border p-2", children: "পজিশন" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
            studentRows.map(({
              ex,
              marks,
              grade,
              pos
            }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border p-2", children: new Date(ex.exam_date).toLocaleDateString("bn-BD") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "border p-2", children: [
                ex.subject,
                ex.title ? ` (${ex.title})` : ""
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "border p-2", children: [
                EXAM_TYPE_LABEL[ex.exam_type],
                " (",
                EXAM_PATTERN_LABEL[ex.pattern ?? "written"],
                ")"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border p-2 text-center", children: ex.full_marks }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border p-2 text-center", children: marks ?? "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `border p-2 text-center font-bold ${grade.color}`, children: grade.grade }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border p-2 text-center", children: pos ?? "—" })
            ] }, ex.id)),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-academy-soft font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 3, className: "border p-2 text-right", children: "সর্বমোট" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border p-2 text-center", children: totalFull }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "border p-2 text-center", children: totalGot }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "border p-2 text-center", colSpan: 2, children: [
                "ক্লাসে অবস্থান: ",
                classRank,
                " / ",
                allStudents.length
              ] })
            ] })
          ] })
        ] })
      ] }, s.id);
    }) })
  ] });
}
export {
  MarksheetPage as component
};
