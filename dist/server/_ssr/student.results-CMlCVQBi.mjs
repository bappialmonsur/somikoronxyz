import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-Cciirfj4.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { c as calcGrade, E as EXAM_TYPE_LABEL, d as EXAM_PATTERN_LABEL, a as bnNum } from "./grading-0NP-FUhN.mjs";
import { a as getExamToppers } from "./student-stats.functions-BbfXqChp.mjs";
import "../_libs/seroval.mjs";
import { G as GraduationCap, L as LoaderCircle, F as FileText, Q as Crown } from "../_libs/lucide-react.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DBcDkPtY.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
function StudentResults() {
  const {
    user
  } = useSession();
  const fetchToppers = useServerFn(getExamToppers);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["my-results", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data: s
      } = await supabase.from("students").select("id, class_level").eq("user_id", user.id).maybeSingle();
      if (!s) return [];
      const {
        data: exams
      } = await supabase.from("exams").select("*").eq("class_level", s.class_level).order("exam_date", {
        ascending: false
      });
      const {
        data: results
      } = await supabase.from("exam_results").select("exam_id, marks").eq("student_id", s.id);
      const map = new Map(results?.map((r) => [r.exam_id, Number(r.marks)]) ?? []);
      return (exams ?? []).map((e) => ({
        ...e,
        my_marks: map.has(e.id) ? map.get(e.id) : null
      }));
    }
  });
  const examIds = (data ?? []).map((e) => e.id);
  const {
    data: toppers
  } = useQuery({
    queryKey: ["exam-toppers", examIds.join(",")],
    enabled: examIds.length > 0,
    queryFn: () => fetchToppers({
      data: {
        examIds
      }
    })
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-purple-500/15 text-purple-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "রেজাল্ট" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "তারিখ অনুযায়ী আপনার পরীক্ষার ফলাফল" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : (data?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border p-12 text-center text-muted-foreground", children: "কোনো পরীক্ষা নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: data.map((e) => {
      const g = calcGrade(e.my_marks, e.full_marks);
      const pct = e.my_marks != null ? (e.my_marks / e.full_marks * 100).toFixed(1) : null;
      const top = toppers?.[e.id];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "bg-white rounded-2xl border p-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-center flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-lg bg-academy-soft text-academy-navy flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-academy-navy", children: [
              e.subject,
              e.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
                " — ",
                e.title
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              EXAM_TYPE_LABEL[e.exam_type],
              " · ",
              EXAM_PATTERN_LABEL[e.pattern ?? "written"],
              " · পূর্ণমান ",
              bnNum(e.full_marks),
              " ·",
              " ",
              new Date(e.exam_date).toLocaleDateString("bn-BD")
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right", children: e.my_marks != null ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-academy-navy", children: [
              bnNum(e.my_marks),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                "/",
                bnNum(e.full_marks)
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-xs font-bold ${g.color}`, children: [
              g.grade,
              " · ",
              bnNum(pct),
              "%"
            ] })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "প্রকাশিত হয়নি" }) })
        ] }),
        top && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "size-4 text-amber-600 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "সর্বোচ্চ নাম্বার: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-academy-navy", children: bnNum(top.marks) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: " · প্রাপক: " }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-academy-navy truncate", children: top.name }),
            top.roll && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              " (রোল ",
              bnNum(top.roll),
              ")"
            ] })
          ] })
        ] })
      ] }, e.id);
    }) })
  ] });
}
export {
  StudentResults as component
};
