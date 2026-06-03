import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { D as Dialog, e as DialogTrigger, a as DialogContent, c as DialogHeader, b as DialogTitle, d as DialogFooter } from "./dialog-BBLoBcjX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as CLASS_LEVELS, b as bnClass, E as EXAM_TYPE_LABEL, d as EXAM_PATTERN_LABEL, D as DEPT_LABEL, B as BATCH_LABEL, f as DEPT_CLASS_LEVELS } from "./grading-0NP-FUhN.mjs";
import { G as GraduationCap, k as Printer, w as Plus, L as LoaderCircle, F as FileText, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function ResultsPage() {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const [cls, setCls] = reactExports.useState("all");
  const [open, setOpen] = reactExports.useState(false);
  const {
    data: exams,
    isLoading
  } = useQuery({
    queryKey: ["exams", cls],
    queryFn: async () => {
      let q = supabase.from("exams").select("*").order("exam_date", {
        ascending: false
      });
      if (cls !== "all") q = q.eq("class_level", cls);
      const {
        data,
        error
      } = await q;
      if (error) throw error;
      return data;
    }
  });
  const handleDelete = async (id, title) => {
    if (!confirm(`"${title}" পরীক্ষা ও সব ফলাফল মুছবেন?`)) return;
    const {
      error
    } = await supabase.from("exams").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("মুছে ফেলা হয়েছে");
    qc.invalidateQueries({
      queryKey: ["exams"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "পরীক্ষা ও ফলাফল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "ক্লাস ওয়াইজ পরীক্ষা তৈরি ও নাম্বার এন্ট্রি" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/marksheet", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-1" }),
        " মার্কশীট প্রিন্ট"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-academy-navy text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
          " নতুন পরীক্ষা"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NewExamDialog, { onDone: () => {
          setOpen(false);
          qc.invalidateQueries({
            queryKey: ["exams"]
          });
        } })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 flex gap-3 flex-wrap items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: "শ্রেণি ফিল্টার:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cls, onValueChange: setCls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব শ্রেণি" }),
          CLASS_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
            bnClass(c),
            " শ্রেণি"
          ] }, c))
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : (exams?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: 'কোনো পরীক্ষা নেই। উপরে "নতুন পরীক্ষা" থেকে তৈরি করুন।' }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: exams.map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-4 flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-lg bg-academy-soft text-academy-navy flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-academy-navy", children: [
          e.subject,
          e.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            " — ",
            e.title
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          bnClass(e.class_level),
          " শ্রেণি · ",
          EXAM_TYPE_LABEL[e.exam_type],
          " · ",
          EXAM_PATTERN_LABEL[e.pattern ?? "written"],
          " · পূর্ণমান ",
          e.full_marks,
          e.department ? ` · ${DEPT_LABEL[e.department]}` : "",
          e.batch ? ` · ${BATCH_LABEL[e.batch]} ব্যাচ` : "",
          " ·",
          " ",
          new Date(e.exam_date).toLocaleDateString("bn-BD")
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => navigate({
        to: "/admin/results/$examId",
        params: {
          examId: e.id
        }
      }), children: "নাম্বার এন্ট্রি" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => handleDelete(e.id, e.subject), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4 text-red-500" }) })
    ] }, e.id)) }) })
  ] });
}
function NewExamDialog({
  onDone
}) {
  const [classLevel, setClassLevel] = reactExports.useState("");
  const [examType, setExamType] = reactExports.useState("");
  const [pattern, setPattern] = reactExports.useState("written");
  const [department, setDepartment] = reactExports.useState("all");
  const [batch, setBatch] = reactExports.useState("all");
  const [subject, setSubject] = reactExports.useState("");
  const [fullMarks, setFullMarks] = reactExports.useState("100");
  const [examDate, setExamDate] = reactExports.useState((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  const [title, setTitle] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const showDept = DEPT_CLASS_LEVELS.includes(classLevel);
  const submit = async (e) => {
    e.preventDefault();
    if (!classLevel || !examType || !pattern || !subject.trim() || !fullMarks || !examDate) {
      return toast.error("সব ঘর পূরণ করুন");
    }
    setSaving(true);
    const {
      error
    } = await supabase.from("exams").insert({
      class_level: classLevel,
      exam_type: examType,
      pattern,
      department: showDept && department !== "all" ? department : null,
      batch: batch !== "all" ? batch : null,
      subject: subject.trim(),
      full_marks: Number(fullMarks),
      exam_date: examDate,
      title: title.trim() || null
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("পরীক্ষা তৈরি হয়েছে");
    onDone();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "নতুন পরীক্ষা তৈরি" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শ্রেণি *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: classLevel, onValueChange: setClassLevel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বাছাই করুন" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLASS_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: bnClass(c) }, c)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ধরন *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: examType, onValueChange: setExamType, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বাছাই করুন" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "daily", children: "দৈনিক" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "weekly", children: "সাপ্তাহিক" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "model_test", children: "মডেল টেস্ট" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "প্যাটার্ন *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: pattern, onValueChange: setPattern, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "written", children: "লিখিত" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "mcq", children: "বহুনির্বাচনি" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "বিষয় *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: subject, onChange: (e) => setSubject(e.target.value), placeholder: "যেমন: গণিত" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "পূর্ণমান *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: fullMarks, onChange: (e) => setFullMarks(e.target.value), min: 1 })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "তারিখ *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: examDate, onChange: (e) => setExamDate(e.target.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        showDept && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "বিভাগ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: department, onValueChange: setDepartment, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব বিভাগ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "science", children: DEPT_LABEL.science }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "business", children: DEPT_LABEL.business })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ব্যাচ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: batch, onValueChange: setBatch, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব ব্যাচ" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "morning", children: BATCH_LABEL.morning }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "afternoon", children: BATCH_LABEL.afternoon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "evening", children: BATCH_LABEL.evening })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শিরোনাম (ঐচ্ছিক)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value), placeholder: "যেমন: ১ম সপ্তাহ" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: saving, className: "bg-academy-navy text-white w-full", children: [
        saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-1 animate-spin" }),
        "পরীক্ষা তৈরি করুন"
      ] }) })
    ] })
  ] });
}
export {
  ResultsPage as component
};
