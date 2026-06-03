import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { f as DEPT_CLASS_LEVELS, e as calcPositions, E as EXAM_TYPE_LABEL, d as EXAM_PATTERN_LABEL, D as DEPT_LABEL, B as BATCH_LABEL, b as bnClass, c as calcGrade } from "./grading-0NP-FUhN.mjs";
import { R as Route$1 } from "./router-CL7ie-OK.mjs";
import { L as LoaderCircle, A as ArrowLeft, ao as Save } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "./client.server-U_pH-Evd.mjs";
function MarksEntryPage() {
  const {
    examId
  } = Route$1.useParams();
  const {
    data: exam,
    isLoading: loadingExam
  } = useQuery({
    queryKey: ["exam", examId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("exams").select("*").eq("id", examId).single();
      if (error) throw error;
      return data;
    }
  });
  const {
    data: rows,
    isLoading: loadingRows,
    refetch
  } = useQuery({
    queryKey: ["exam-roster", examId, exam?.class_level, exam?.department, exam?.batch],
    enabled: !!exam,
    queryFn: async () => {
      let sq = supabase.from("students").select("id, full_name, roll, department, batch").eq("class_level", exam.class_level).eq("is_active", true);
      if (exam.department) sq = sq.eq("department", exam.department);
      if (exam.batch) sq = sq.eq("batch", exam.batch);
      const [{
        data: students,
        error: e1
      }, {
        data: results,
        error: e2
      }] = await Promise.all([sq.order("roll", {
        ascending: true
      }), supabase.from("exam_results").select("student_id, marks").eq("exam_id", examId)]);
      if (e1) throw e1;
      if (e2) throw e2;
      const marksMap = new Map((results ?? []).map((r) => [r.student_id, Number(r.marks)]));
      return (students ?? []).map((s) => ({
        student_id: s.id,
        full_name: s.full_name,
        roll: s.roll,
        department: s.department ?? "none",
        batch: s.batch ?? "",
        marks: marksMap.has(s.id) ? marksMap.get(s.id) : null
      }));
    }
  });
  const [edits, setEdits] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  const [deptFilter, setDeptFilter] = reactExports.useState("all");
  const [batchFilter, setBatchFilter] = reactExports.useState("all");
  const showDept = DEPT_CLASS_LEVELS.includes(String(exam?.class_level ?? "")) && !exam?.department;
  const showBatch = !exam?.batch;
  const availableDepts = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    (rows ?? []).forEach((r) => set.add(r.department));
    return Array.from(set);
  }, [rows]);
  const availableBatches = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    (rows ?? []).forEach((r) => {
      if (r.batch) set.add(r.batch);
    });
    return Array.from(set);
  }, [rows]);
  reactExports.useEffect(() => {
    if (rows) {
      const init = {};
      rows.forEach((r) => {
        init[r.student_id] = r.marks == null ? "" : String(r.marks);
      });
      setEdits(init);
    }
  }, [rows]);
  const filteredRows = reactExports.useMemo(() => {
    if (!rows) return [];
    return rows.filter((r) => {
      if (showDept && deptFilter !== "all" && r.department !== deptFilter) return false;
      if (showBatch && batchFilter !== "all" && r.batch !== batchFilter) return false;
      return true;
    });
  }, [rows, showDept, deptFilter, showBatch, batchFilter]);
  const currentRows = reactExports.useMemo(() => {
    return filteredRows.map((r) => {
      const v = edits[r.student_id];
      const n = v === "" || v == null ? null : Number(v);
      return {
        ...r,
        marks: n != null && !isNaN(n) ? n : null
      };
    });
  }, [filteredRows, edits]);
  const positions = reactExports.useMemo(() => calcPositions(currentRows), [currentRows]);
  const handleSave = async () => {
    if (!exam || !rows) return;
    setSaving(true);
    const toUpsert = [];
    const toClear = [];
    for (const r of filteredRows) {
      const v = edits[r.student_id];
      if (v === "" || v == null) {
        if (r.marks != null) toClear.push(r.student_id);
        continue;
      }
      const n = Number(v);
      if (isNaN(n) || n < 0 || n > exam.full_marks) {
        setSaving(false);
        return toast.error(`"${r.full_name}" এর নাম্বার ০-${exam.full_marks} এর মধ্যে দিন`);
      }
      toUpsert.push({
        exam_id: examId,
        student_id: r.student_id,
        marks: n
      });
    }
    if (toUpsert.length) {
      const {
        error
      } = await supabase.from("exam_results").upsert(toUpsert, {
        onConflict: "exam_id,student_id"
      });
      if (error) {
        setSaving(false);
        return toast.error(error.message);
      }
    }
    if (toClear.length) {
      const {
        error
      } = await supabase.from("exam_results").delete().eq("exam_id", examId).in("student_id", toClear);
      if (error) {
        setSaving(false);
        return toast.error(error.message);
      }
    }
    setSaving(false);
    toast.success("সংরক্ষিত হয়েছে");
    refetch();
  };
  if (loadingExam || loadingRows) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) });
  }
  if (!exam) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center p-12 text-muted-foreground", children: "পরীক্ষা পাওয়া যায়নি" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/results", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, {}) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl md:text-2xl font-bold text-academy-navy truncate", children: [
          exam.subject,
          exam.title ? ` — ${exam.title}` : ""
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          bnClass(exam.class_level),
          " · ",
          EXAM_TYPE_LABEL[exam.exam_type],
          " · ",
          EXAM_PATTERN_LABEL[exam.pattern ?? "written"],
          " · পূর্ণমান ",
          exam.full_marks,
          exam.department ? ` · ${DEPT_LABEL[exam.department]}` : "",
          exam.batch ? ` · ${BATCH_LABEL[exam.batch]} ব্যাচ` : "",
          " ·",
          " ",
          new Date(exam.exam_date).toLocaleDateString("bn-BD")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: handleSave, disabled: saving, className: "bg-academy-navy text-white", children: [
        saving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "size-4 mr-1" }),
        "সংরক্ষণ"
      ] })
    ] }),
    (showDept || showBatch) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 flex items-center gap-3 flex-wrap", children: [
      showDept && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-academy-navy", children: "বিভাগ:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: deptFilter, onValueChange: setDeptFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব বিভাগ" }),
            availableDepts.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d, children: DEPT_LABEL[d] ?? d }, d))
          ] })
        ] })
      ] }),
      showBatch && availableBatches.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-academy-navy", children: "ব্যাচ:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: batchFilter, onValueChange: setBatchFilter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব ব্যাচ" }),
            availableBatches.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: BATCH_LABEL[b] ?? b }, b))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
        currentRows.length,
        " জন শিক্ষার্থী"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border overflow-hidden", children: currentRows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: showDept && deptFilter !== "all" ? "এই বিভাগে কোনো এক্টিভ শিক্ষার্থী নেই" : "এই শ্রেণিতে কোনো এক্টিভ শিক্ষার্থী নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-16", children: "রোল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "নাম" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-32", children: "নাম্বার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20", children: "গ্রেড" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-20", children: "পজিশন" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: currentRows.map((r) => {
        const g = calcGrade(r.marks, exam.full_marks);
        const pos = positions.get(r.student_id);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: r.roll ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-academy-navy", children: r.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", inputMode: "decimal", min: 0, max: exam.full_marks, value: edits[r.student_id] ?? "", onChange: (e) => setEdits((p) => ({
            ...p,
            [r.student_id]: e.target.value
          })), placeholder: "—", className: "h-9" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: `font-bold ${g.color}`, children: g.grade }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: pos ? `${pos}` : "—" })
        ] }, r.student_id);
      }) })
    ] }) })
  ] });
}
export {
  MarksEntryPage as component
};
