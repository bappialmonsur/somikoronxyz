import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-CYB9djso.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { R as Root, I as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { g as getSubjects, a as getExamQuestions } from "./mcq-exam.functions-TlLrbnWa.mjs";
import { b as bnClass, a as bnNum } from "./grading-0NP-FUhN.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { M as MathText } from "./math-text-ChCUGY98.mjs";
import "../_libs/seroval.mjs";
import "../_libs/katex.mjs";
import { L as LoaderCircle, B as BookOpenCheck, Z as Sparkles, _ as Timer, $ as RotateCcw, a0 as CircleCheck, a1 as CircleX } from "../_libs/lucide-react.mjs";
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
import "./server-BaXZwRBy.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
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
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/tailwind-merge.mjs";
import "./auth-middleware-DoNSGWpn.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
const Progress = reactExports.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Indicator,
      {
        className: "h-full w-full flex-1 bg-primary transition-all",
        style: { transform: `translateX(-${100 - (value || 0)}%)` }
      }
    )
  }
));
Progress.displayName = Root.displayName;
function ExamPage() {
  const {
    user
  } = useSession();
  const generate = useServerFn(getExamQuestions);
  const {
    data: student
  } = useQuery({
    queryKey: ["my-student-exam", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("students").select("class_level, full_name").eq("user_id", user.id).maybeSingle();
      return data;
    }
  });
  const [stage, setStage] = reactExports.useState("select");
  const [subjectKey, setSubjectKey] = reactExports.useState("");
  const [chapter, setChapter] = reactExports.useState("");
  const [questions, setQuestions] = reactExports.useState([]);
  const [answers, setAnswers] = reactExports.useState([]);
  const [current, setCurrent] = reactExports.useState(0);
  const DURATION_MS = 30 * 60 * 1e3;
  const deadlineRef = reactExports.useRef(null);
  const [secondsLeft, setSecondsLeft] = reactExports.useState(30 * 60);
  const autoSubmittedRef = reactExports.useRef(false);
  const subjects = reactExports.useMemo(() => student ? getSubjects(student.class_level) : [], [student]);
  const subject = subjects.find((s) => s.key === subjectKey);
  const finalize = reactExports.useCallback(() => {
    if (autoSubmittedRef.current) return;
    autoSubmittedRef.current = true;
    deadlineRef.current = null;
    setSecondsLeft(0);
    setStage("result");
  }, []);
  reactExports.useEffect(() => {
    if (stage !== "running" || deadlineRef.current == null) return;
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((deadlineRef.current - Date.now()) / 1e3));
      setSecondsLeft(remaining);
      if (remaining <= 0) {
        finalize();
        toast.info("সময় শেষ — পরীক্ষা স্বয়ংক্রিয়ভাবে জমা হয়েছে");
      }
    };
    tick();
    const id = setInterval(tick, 500);
    const onVis = () => tick();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("focus", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("focus", onVis);
    };
  }, [stage, finalize]);
  async function startExam() {
    if (!student || !subject || !chapter) {
      toast.error("বিষয় ও অধ্যায় নির্বাচন করুন");
      return;
    }
    setStage("loading");
    try {
      const res = await generate({
        data: {
          classLevel: student.class_level,
          subject: subject.name,
          chapter
        }
      });
      setQuestions(res.questions);
      setAnswers(Array(res.questions.length).fill(null));
      setCurrent(0);
      autoSubmittedRef.current = false;
      deadlineRef.current = Date.now() + DURATION_MS;
      setSecondsLeft(Math.ceil(DURATION_MS / 1e3));
      setStage("running");
    } catch (e) {
      toast.error(e?.message ?? "প্রশ্ন তৈরি করা যায়নি");
      setStage("select");
    }
  }
  function selectOption(i) {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = i;
      return next;
    });
  }
  function submit() {
    finalize();
  }
  function reset() {
    autoSubmittedRef.current = false;
    deadlineRef.current = null;
    setStage("select");
    setQuestions([]);
    setAnswers([]);
    setCurrent(0);
    setSecondsLeft(Math.ceil(DURATION_MS / 1e3));
  }
  if (!student) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) });
  }
  if (stage === "select") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-11 rounded-2xl bg-gradient-to-br from-academy-navy to-academy-navy/80 text-academy-gold flex items-center justify-center shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpenCheck, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "অনলাইন পরীক্ষা" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
            bnClass(student.class_level),
            " শ্রেণি · NCTB ২০২৬ · ৩০ MCQ · ৩০ মিনিট"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-academy-gold/15 to-amber-100/40 border border-amber-200 rounded-2xl p-4 flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 text-amber-600 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-academy-navy", children: [
          "প্রশ্নব্যাংক থেকে ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: "প্রতিবার ৩০টি র‍্যান্ডম প্রশ্ন" }),
          " বেছে নেওয়া হয়—একই অধ্যায়ে বারবার পরীক্ষা দিলেও প্রশ্ন আলাদা হবে। শেষ হলে স্কোর ও সঠিক উত্তর দেখানো হবে।"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-5 space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-bold text-academy-navy block mb-2", children: "বিষয় নির্বাচন করুন" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 gap-2", children: subjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setSubjectKey(s.key);
            setChapter("");
          }, className: `text-sm rounded-xl border p-3 text-left transition-all ${subjectKey === s.key ? "border-academy-gold bg-academy-gold/10 text-academy-navy font-bold shadow" : "border-academy-navy/10 hover:border-academy-navy/30 text-academy-navy"}`, children: s.name }, s.key)) })
        ] }),
        subject && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-bold text-academy-navy block mb-2", children: "অধ্যায় নির্বাচন করুন" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 max-h-80 overflow-auto", children: subject.chapters.map((ch) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setChapter(ch), className: `text-sm rounded-xl border p-3 text-left transition-all ${chapter === ch ? "border-academy-gold bg-academy-gold/10 text-academy-navy font-bold shadow" : "border-academy-navy/10 hover:border-academy-navy/30 text-academy-navy"}`, children: ch }, ch)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: startExam, disabled: !subject || !chapter, className: "w-full bg-academy-navy text-white hover:bg-academy-navy/90 h-12 text-base font-bold", children: "পরীক্ষা শুরু করুন" })
      ] })
    ] });
  }
  if (stage === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto py-16 text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-12 mx-auto animate-spin text-academy-navy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-academy-navy font-bold", children: "প্রশ্ন প্রস্তুত করা হচ্ছে…" })
    ] });
  }
  if (stage === "running") {
    const q = questions[current];
    const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
    const ss = String(secondsLeft % 60).padStart(2, "0");
    const answeredCount = answers.filter((a) => a != null).length;
    const answeredPct = Math.round(answeredCount / questions.length * 100);
    const timePct = Math.round(secondsLeft / (30 * 60) * 100);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 sticky top-14 z-10 shadow-sm space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 px-3 py-1.5 rounded-lg font-bold ${secondsLeft < 60 ? "bg-red-100 text-red-700" : "bg-academy-soft text-academy-navy"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { className: "size-4" }),
            bnNum(mm),
            ":",
            bnNum(ss)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
            "প্রশ্ন ",
            bnNum(current + 1),
            "/",
            bnNum(questions.length),
            " · উত্তর: ",
            bnNum(answeredCount)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, variant: "outline", className: "ml-auto h-8 text-xs", children: "জমা দিন" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "অগ্রগতি" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-academy-navy", children: [
              bnNum(answeredPct),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: answeredPct, className: "h-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[11px] text-muted-foreground pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "সময় বাকি" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-bold ${secondsLeft < 60 ? "text-red-600" : "text-academy-navy"}`, children: [
              bnNum(timePct),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: timePct, className: `h-2 ${secondsLeft < 60 ? "[&>div]:bg-red-500" : "[&>div]:bg-academy-gold"}` })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-academy-gold font-bold mb-2", children: [
          "প্রশ্ন ",
          bnNum(current + 1)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy text-base leading-relaxed mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: q.question }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: q.options.map((opt, i) => {
          const selected = answers[current] === i;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => selectOption(i), className: `w-full text-left rounded-xl border p-3 flex items-center gap-3 transition-all ${selected ? "border-academy-gold bg-academy-gold/10 shadow" : "border-academy-navy/10 hover:border-academy-navy/30 bg-white"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `size-8 rounded-lg flex items-center justify-center font-bold shrink-0 ${selected ? "bg-academy-gold text-academy-navy" : "bg-academy-soft text-academy-navy"}`, children: ["ক", "খ", "গ", "ঘ"][i] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-academy-navy flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: opt }) })
          ] }, i);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", disabled: current === 0, onClick: () => setCurrent((c) => Math.max(0, c - 1)), children: "পূর্ববর্তী" }),
        current < questions.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "ml-auto bg-academy-navy text-white hover:bg-academy-navy/90", onClick: () => setCurrent((c) => Math.min(questions.length - 1, c + 1)), children: "পরবর্তী" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "ml-auto bg-academy-gold text-academy-navy hover:bg-academy-gold/90 font-bold", onClick: submit, children: "পরীক্ষা জমা দিন" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mb-2", children: "দ্রুত নেভিগেশন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-10 gap-1.5", children: questions.map((_, i) => {
          const ans = answers[i] != null;
          const isCur = i === current;
          return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setCurrent(i), className: `aspect-square rounded-md text-xs font-bold ${isCur ? "bg-academy-navy text-white ring-2 ring-academy-gold" : ans ? "bg-academy-gold/30 text-academy-navy" : "bg-academy-soft text-academy-navy/70"}`, children: bnNum(i + 1) }, i);
        }) })
      ] })
    ] });
  }
  const correct = questions.reduce((acc, q, i) => acc + (answers[i] === q.answerIndex ? 1 : 0), 0);
  const pct = Math.round(correct / questions.length * 100);
  const grade = pct >= 80 ? {
    g: "A+",
    c: "text-green-600 bg-green-50"
  } : pct >= 70 ? {
    g: "A",
    c: "text-green-600 bg-green-50"
  } : pct >= 60 ? {
    g: "A-",
    c: "text-blue-600 bg-blue-50"
  } : pct >= 50 ? {
    g: "B",
    c: "text-blue-600 bg-blue-50"
  } : pct >= 40 ? {
    g: "C",
    c: "text-amber-600 bg-amber-50"
  } : pct >= 33 ? {
    g: "D",
    c: "text-amber-600 bg-amber-50"
  } : {
    g: "F",
    c: "text-red-600 bg-red-50"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-academy-navy to-academy-navy/80 text-white rounded-2xl p-6 shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80", children: "ফলাফল" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold mt-1", children: [
        bnNum(correct),
        " / ",
        bnNum(questions.length)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2.5 py-0.5 rounded-lg font-bold ${grade.c}`, children: grade.g }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm opacity-90", children: [
          bnNum(pct),
          "% সঠিক"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs opacity-80 mt-2", children: [
        subject?.name,
        " · ",
        chapter
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: reset, className: "bg-academy-gold text-academy-navy hover:bg-academy-gold/90 font-bold", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-4 mr-1" }),
      " নতুন পরীক্ষা"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-academy-navy", children: "সঠিক উত্তরসহ পর্যালোচনা" }),
      questions.map((q, i) => {
        const my = answers[i];
        const isCorrect = my === q.answerIndex;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            isCorrect ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-5 text-green-600 shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-5 text-red-600 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-academy-navy text-sm leading-relaxed", children: [
              bnNum(i + 1),
              ". ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: q.question })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 mt-3 ml-7", children: q.options.map((opt, j) => {
            const isAnswer = j === q.answerIndex;
            const isMine = j === my;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-sm rounded-lg px-3 py-2 border ${isAnswer ? "border-green-300 bg-green-50 text-green-800 font-medium" : isMine ? "border-red-300 bg-red-50 text-red-800" : "border-academy-navy/10 text-academy-navy/80"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold mr-1", children: [
                ["ক", "খ", "গ", "ঘ"][j],
                "."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: opt }),
              isAnswer && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs font-bold", children: "✓ সঠিক" }),
              isMine && !isAnswer && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs font-bold", children: "আপনার উত্তর" })
            ] }, j);
          }) }),
          q.explanation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-7 mt-2 text-xs text-muted-foreground bg-academy-soft rounded-lg px-3 py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: "text-academy-navy", children: "ব্যাখ্যা:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: q.explanation })
          ] })
        ] }, i);
      })
    ] })
  ] });
}
export {
  ExamPage as component
};
