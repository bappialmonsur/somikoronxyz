import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-Cciirfj4.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { c as calcGrade, b as bnClass, a as bnNum } from "./grading-0NP-FUhN.mjs";
import { b as getMyClassPosition } from "./student-stats.functions-BbfXqChp.mjs";
import { F as FeatureCards } from "./feature-cards-BuzaS7zM.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, O as Trophy, C as CalendarCheck, a2 as TrendingUp, G as GraduationCap, F as FileText, a as Bell, b as ChartColumn } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
function StudentDashboard() {
  const {
    user
  } = useSession();
  const fetchPosition = useServerFn(getMyClassPosition);
  const {
    data: pos
  } = useQuery({
    queryKey: ["my-class-position", user?.id],
    enabled: !!user,
    queryFn: () => fetchPosition()
  });
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["student-dashboard", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data: s
      } = await supabase.from("students").select("id, full_name, class_level").eq("user_id", user.id).maybeSingle();
      if (!s) return null;
      const today2 = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
      const monthStart = /* @__PURE__ */ new Date();
      monthStart.setDate(1);
      const monthStartStr = monthStart.toISOString().slice(0, 10);
      const [noticesQ, attendanceQ, monthAttQ, examsQ, resultsQ, pdfsQ, coursesQ] = await Promise.all([supabase.from("notices").select("id, title, created_at, class_level").eq("is_active", true).or(`class_level.is.null,class_level.eq.${s.class_level}`).order("created_at", {
        ascending: false
      }).limit(3), supabase.from("attendance").select("status, reason").eq("student_id", s.id).eq("date", today2).maybeSingle(), supabase.from("attendance").select("status").eq("student_id", s.id).gte("date", monthStartStr), supabase.from("exams").select("id, subject, title, full_marks, exam_date, pattern, exam_type").eq("class_level", s.class_level).order("exam_date", {
        ascending: false
      }).limit(20), supabase.from("exam_results").select("exam_id, marks").eq("student_id", s.id), supabase.from("pdf_notes").select("id").eq("is_active", true).eq("class_level", s.class_level), supabase.from("courses").select("*").eq("is_active", true).or(`class_level.is.null,class_level.eq.${s.class_level}`).order("sort_order")]);
      const marksMap = new Map(resultsQ.data?.map((r) => [r.exam_id, Number(r.marks)]) ?? []);
      const latestExamWithResult = (examsQ.data ?? []).find((e) => marksMap.has(e.id));
      const presentCount = (monthAttQ.data ?? []).filter((a) => a.status === "present").length;
      const totalCount = (monthAttQ.data ?? []).length;
      return {
        student: s,
        notices: noticesQ.data ?? [],
        today: attendanceQ.data,
        monthPct: totalCount ? Math.round(presentCount / totalCount * 100) : null,
        monthPresent: presentCount,
        monthTotal: totalCount,
        latestResult: latestExamWithResult ? {
          exam: latestExamWithResult,
          marks: marksMap.get(latestExamWithResult.id)
        } : null,
        examsCount: examsQ.data?.length ?? 0,
        resultsCount: marksMap.size,
        pdfCount: pdfsQ.data?.length ?? 0,
        courses: coursesQ.data ?? []
      };
    }
  });
  if (isLoading || !data) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) });
  }
  const {
    student,
    notices,
    today,
    monthPct,
    monthPresent,
    monthTotal,
    latestResult,
    resultsCount,
    pdfCount,
    courses
  } = data;
  const g = latestResult ? calcGrade(latestResult.marks, latestResult.exam.full_marks) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-academy-navy to-academy-navy/80 text-white rounded-2xl p-5 shadow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80", children: "স্বাগতম" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold mt-1", children: student.full_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm opacity-90", children: [
        bnClass(student.class_level),
        " শ্রেণি"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCards, { variant: "student" }),
    pos && pos.position != null && (() => {
      const overall = pos.myFullTotal > 0 ? calcGrade(pos.myTotal, pos.myFullTotal) : null;
      const pct = pos.myFullTotal > 0 ? (pos.myTotal / pos.myFullTotal * 100).toFixed(1) : null;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-academy-gold/20 to-amber-100 border border-amber-300 rounded-2xl p-5 flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-14 rounded-2xl bg-academy-gold text-white flex items-center justify-center shrink-0 shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "size-7" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-amber-900/80", children: "শ্রেণিতে আপনার অবস্থান (মোট প্রাপ্ত নম্বরে)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-3xl font-bold text-academy-navy leading-tight", children: [
              bnNum(pos.position),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-base text-muted-foreground font-normal", children: [
                "/",
                bnNum(pos.classSize)
              ] })
            ] }),
            overall && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-lg font-bold ${overall.color} bg-white/70 rounded-lg px-2.5 py-0.5`, children: [
              overall.grade,
              pct && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-normal ml-1", children: [
                "· ",
                bnNum(pct),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "মোট প্রাপ্ত নম্বর: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-academy-navy", children: bnNum(pos.myTotal) }),
            pos.myFullTotal > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
              "/",
              bnNum(pos.myFullTotal)
            ] })
          ] })
        ] })
      ] });
    })(),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, { className: "size-5" }), color: "bg-green-500/15 text-green-600", label: "আজকের উপস্থিতি", value: today ? today.status === "present" ? "উপস্থিত" : "অনুপস্থিত" : "—", sub: today?.reason ?? void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-5" }), color: "bg-blue-500/15 text-blue-600", label: "মাসিক হাজিরা", value: monthPct != null ? `${bnNum(monthPct)}%` : "—", sub: monthTotal ? `${bnNum(monthPresent)}/${bnNum(monthTotal)} দিন` : void 0 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-5" }), color: "bg-purple-500/15 text-purple-600", label: "মোট রেজাল্ট", value: bnNum(resultsCount) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5" }), color: "bg-amber-500/15 text-amber-600", label: "পিডিএফ নোটস", value: bnNum(pdfCount) })
    ] }),
    latestResult && g && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-academy-navy", children: "সর্বশেষ রেজাল্ট" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/results", className: "text-xs text-academy-navy underline", children: "সব দেখুন" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-academy-navy", children: [
            latestResult.exam.subject,
            latestResult.exam.title && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
              " — ",
              latestResult.exam.title
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(latestResult.exam.exam_date).toLocaleDateString("bn-BD") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-2xl font-bold text-academy-navy", children: [
            bnNum(latestResult.marks),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
              "/",
              bnNum(latestResult.exam.full_marks)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-xs font-bold ${g.color}`, children: g.grade })
        ] })
      ] })
    ] }),
    courses.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-academy-navy flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-4" }),
          " আপনার কোর্সসমূহ"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          bnNum(courses.length),
          " টি কোর্স"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-3", children: courses.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border bg-academy-soft overflow-hidden hover:shadow-md hover:border-academy-gold/50 transition-all flex flex-col", children: [
        c.image_path ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: supabase.storage.from("site-assets").getPublicUrl(c.image_path).data.publicUrl, alt: c.title, className: "w-full aspect-video object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-video bg-gradient-to-br from-academy-navy to-academy-navy/70 flex items-center justify-center text-academy-gold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-10" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex-1 flex flex-col", children: [
          c.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-bold text-academy-gold uppercase tracking-wider mb-1", children: c.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy text-sm leading-tight", children: c.title }),
          c.description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground line-clamp-2 mt-1", children: c.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-2 flex flex-wrap gap-x-2", children: [
            c.class_level && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              bnClass(c.class_level),
              " শ্রেণি"
            ] }),
            c.duration && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "· ",
              c.duration
            ] }),
            c.fee && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-academy-navy", children: [
              "· ",
              c.fee
            ] })
          ] })
        ] })
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-bold text-academy-navy flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-4" }),
          " সর্বশেষ নোটিশ"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/student/notices", className: "text-xs text-academy-navy underline", children: "সব দেখুন" })
      ] }),
      notices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground py-4 text-center", children: "কোনো নোটিশ নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: notices.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "border-l-2 border-academy-gold pl-3 py-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-academy-navy text-sm", children: n.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: new Date(n.created_at).toLocaleDateString("bn-BD") })
      ] }, n.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuickLink, { to: "/student/attendance", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, {}), label: "উপস্থিতি" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuickLink, { to: "/student/results", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, {}), label: "রেজাল্ট" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuickLink, { to: "/student/analysis", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, {}), label: "এনালাইসিস" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuickLink, { to: "/student/pdfs", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}), label: "পিডিএফ" })
    ] })
  ] });
}
function StatCard({
  icon,
  color,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-9 rounded-lg ${color} flex items-center justify-center mb-2`, children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy text-lg leading-tight mt-0.5", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: sub })
  ] });
}
function QuickLink({
  to,
  icon,
  label
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "bg-white rounded-2xl border p-4 hover:shadow-md hover:border-academy-navy/30 transition-all flex flex-col items-center gap-2 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-academy-soft text-academy-navy flex items-center justify-center", children: icon }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium text-academy-navy", children: label })
  ] });
}
export {
  StudentDashboard as component
};
