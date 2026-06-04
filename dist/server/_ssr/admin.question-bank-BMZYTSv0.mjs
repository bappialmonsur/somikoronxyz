import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-Cciirfj4.mjs";
import { C as CURRICULUM, l as listQuestions, b as addManualQuestion, d as deleteQuestion, c as aiGenerateQuestions } from "./mcq-exam.functions-Bc4OxhUt.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as bnClass, a as bnNum } from "./grading-0NP-FUhN.mjs";
import { M as MathText } from "./math-text-ChCUGY98.mjs";
import "../_libs/seroval.mjs";
import "../_libs/katex.mjs";
import { D as Database, aj as ListChecks, w as Plus, Z as Sparkles, L as LoaderCircle, T as Trash2 } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./server-CQ0U_xoc.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "./auth-middleware-DBcDkPtY.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
function QuestionBankPage() {
  const [classLevel, setClassLevel] = reactExports.useState("5");
  const [subjectKey, setSubjectKey] = reactExports.useState("");
  const [chapter, setChapter] = reactExports.useState("");
  const subjects = reactExports.useMemo(() => CURRICULUM[classLevel] ?? [], [classLevel]);
  const subject = subjects.find((s) => s.key === subjectKey);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-11 rounded-2xl bg-gradient-to-br from-academy-navy to-academy-navy/80 text-academy-gold flex items-center justify-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Database, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "প্রশ্নব্যাংক" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "বহুনির্বাচনি প্রশ্ন যোগ ও পরিচালনা করুন। শিক্ষার্থীরা এখান থেকেই পরীক্ষা দেবে।" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 grid grid-cols-1 md:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "শ্রেণি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: classLevel, onValueChange: (v) => {
          setClassLevel(v);
          setSubjectKey("");
          setChapter("");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.keys(CURRICULUM).map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
            bnClass(c),
            " শ্রেণি"
          ] }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "বিষয়" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: subjectKey, onValueChange: (v) => {
          setSubjectKey(v);
          setChapter("");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বিষয় নির্বাচন করুন" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: subjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s.key, children: s.name }, s.key)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "অধ্যায়" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: chapter, onValueChange: setChapter, disabled: !subject, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "অধ্যায় নির্বাচন করুন" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: subject?.chapters.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: ch, children: ch }, ch)) })
        ] })
      ] })
    ] }),
    subject && chapter ? /* @__PURE__ */ jsxRuntimeExports.jsx(BankTabs, { classLevel, subjectName: subject.name, chapter }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-academy-soft border border-dashed rounded-2xl p-8 text-center text-sm text-muted-foreground", children: "শ্রেণি, বিষয় ও অধ্যায় নির্বাচন করলে প্রশ্ন তালিকা ও যোগ করার অপশন আসবে।" })
  ] });
}
function BankTabs({
  classLevel,
  subjectName,
  chapter
}) {
  const qc = useQueryClient();
  const list = useServerFn(listQuestions);
  const add = useServerFn(addManualQuestion);
  const del = useServerFn(deleteQuestion);
  const ai = useServerFn(aiGenerateQuestions);
  const queryKey = ["mcq-bank", classLevel, subjectName, chapter];
  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey,
    queryFn: () => list({
      data: {
        classLevel,
        subject: subjectName,
        chapter
      }
    })
  });
  const questions = data?.questions ?? [];
  const aiMut = useMutation({
    mutationFn: (count) => ai({
      data: {
        classLevel,
        subject: subjectName,
        chapter,
        count
      }
    }),
    onSuccess: (r) => {
      toast.success(`${bnNum(r.saved)}টি প্রশ্ন সেভ হয়েছে`);
      qc.invalidateQueries({
        queryKey
      });
    },
    onError: (e) => toast.error(e?.message ?? "ত্রুটি")
  });
  const delMut = useMutation({
    mutationFn: (id) => del({
      data: {
        id
      }
    }),
    onSuccess: () => {
      toast.success("ডিলিট হয়েছে");
      qc.invalidateQueries({
        queryKey
      });
    },
    onError: (e) => toast.error(e?.message ?? "ত্রুটি")
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "list", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "list", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "size-4 mr-1" }),
        " তালিকা (",
        bnNum(questions.length),
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "manual", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-1" }),
        " ম্যানুয়াল"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTrigger, { value: "ai", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 mr-1" }),
        " AI জেনারেট"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "list", className: "space-y-3 mt-4", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin mx-auto" }) }) : questions.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-academy-soft border border-dashed rounded-2xl p-8 text-center text-sm text-muted-foreground", children: "এখনো কোনো প্রশ্ন নেই। ম্যানুয়াল বা AI ট্যাব থেকে যোগ করুন।" }) : questions.map((q, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-academy-gold font-bold mb-1", children: [
          "প্রশ্ন ",
          bnNum(i + 1),
          " · ",
          q.source === "ai" ? "AI" : "ম্যানুয়াল"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy text-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: q.question }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-1.5 mt-2", children: q.options.map((opt, j) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-xs rounded-lg px-2 py-1.5 border ${j === q.correct_index ? "border-green-300 bg-green-50 text-green-800 font-medium" : "border-academy-navy/10 text-academy-navy/80"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("b", { children: [
            ["ক", "খ", "গ", "ঘ"][j],
            "."
          ] }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: opt }),
          " ",
          j === q.correct_index && "✓"
        ] }, j)) }),
        q.explanation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-2", children: [
          "ব্যাখ্যা: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: q.explanation })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => {
        if (confirm("এই প্রশ্নটি ডিলিট করবেন?")) delMut.mutate(q.id);
      }, disabled: delMut.isPending, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4 text-red-600" }) })
    ] }) }, q.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "manual", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ManualForm, { classLevel, subjectName, chapter, onSaved: () => {
      refetch();
    }, addFn: add }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "ai", className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-5 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "মনে রাখবেন:" }),
        " AI জেনারেট করলে শুধু ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "একবারের" }),
        " জন্য ক্রেডিট কাটবে। এরপর প্রশ্ন ডাটাবেসে সেভ থাকবে — শিক্ষার্থীরা পরীক্ষা দিলে আর কোনো ক্রেডিট লাগবে না।"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm", children: "AI স্বয়ংক্রিয়ভাবে ২০২৬-এর বই অনুযায়ী প্রশ্ন তৈরি করে সেভ করবে। একসাথে কত টি প্রশ্ন তৈরি করতে চান?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: [10, 20, 30, 50].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => aiMut.mutate(n), disabled: aiMut.isPending, className: "bg-academy-navy text-white hover:bg-academy-navy/90", children: [
        aiMut.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-1 animate-spin" }),
        bnNum(n),
        "টি জেনারেট করুন"
      ] }, n)) })
    ] }) })
  ] });
}
function ManualForm({
  classLevel,
  subjectName,
  chapter,
  onSaved,
  addFn
}) {
  const [question, setQuestion] = reactExports.useState("");
  const [options, setOptions] = reactExports.useState(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = reactExports.useState(0);
  const [explanation, setExplanation] = reactExports.useState("");
  const [saving, setSaving] = reactExports.useState(false);
  const reset = () => {
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectIndex(0);
    setExplanation("");
  };
  const submit = async () => {
    if (question.trim().length < 3) {
      toast.error("প্রশ্ন লিখুন");
      return;
    }
    if (options.some((o) => o.trim().length === 0)) {
      toast.error("৪টি অপশনই পূরণ করুন");
      return;
    }
    setSaving(true);
    try {
      await addFn({
        data: {
          classLevel,
          subject: subjectName,
          chapter,
          question: question.trim(),
          options: options.map((o) => o.trim()),
          correctIndex,
          explanation: explanation.trim() || void 0
        }
      });
      toast.success("প্রশ্ন সেভ হয়েছে");
      reset();
      onSaved();
    } catch (e) {
      toast.error(e?.message ?? "ত্রুটি");
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "প্রশ্ন" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: question, onChange: (e) => setQuestion(e.target.value), rows: 3, placeholder: "প্রশ্ন লিখুন..." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: options.map((opt, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "radio", checked: correctIndex === i, onChange: () => setCorrectIndex(i) }),
        "অপশন ",
        ["ক", "খ", "গ", "ঘ"][i],
        " ",
        correctIndex === i && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-700 text-xs font-bold", children: "(সঠিক)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: opt, onChange: (e) => {
        const n = [...options];
        n[i] = e.target.value;
        setOptions(n);
      }, placeholder: `অপশন ${["ক", "খ", "গ", "ঘ"][i]}` })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ব্যাখ্যা (ঐচ্ছিক)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: explanation, onChange: (e) => setExplanation(e.target.value), rows: 2, placeholder: "সঠিক উত্তরের সংক্ষিপ্ত ব্যাখ্যা..." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: submit, disabled: saving, className: "bg-academy-navy text-white hover:bg-academy-navy/90 w-full", children: [
      saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-1 animate-spin" }),
      "প্রশ্ন সেভ করুন"
    ] })
  ] });
}
export {
  QuestionBankPage as component
};
