import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { a as bnNum } from "./grading-0NP-FUhN.mjs";
import { b as ChartColumn, L as LoaderCircle, a2 as TrendingUp, a8 as TrendingDown, a9 as Minus } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, b as Cell, c as Rectangle } from "../_libs/recharts.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function renderBarShape({
  x,
  y,
  width,
  height,
  value,
  payload,
  payloadKey,
  fill,
  inside = false,
  insideTextFill = "#ffffff",
  outsideTextFill = "#0f172a"
}) {
  const resolvedValue = value ?? (payloadKey ? payload?.[payloadKey] : void 0);
  if (typeof x !== "number" || typeof y !== "number" || typeof width !== "number" || typeof height !== "number" || resolvedValue === void 0 || resolvedValue === null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("g", {});
  }
  const useInside = inside && height > 22;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Rectangle, { x, y, width, height, radius: [6, 6, 0, 0], fill }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: x + width / 2, y: useInside ? y + 14 : y - 6, textAnchor: "middle", fontSize: 10, fontWeight: 700, fill: useInside ? insideTextFill : outsideTextFill, pointerEvents: "none", children: bnNum(resolvedValue) })
  ] });
}
function StudentAnalysis() {
  const {
    user
  } = useSession();
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["my-analysis", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data: s
      } = await supabase.from("students").select("id, class_level").eq("user_id", user.id).maybeSingle();
      if (!s) return [];
      const {
        data: exams
      } = await supabase.from("exams").select("*").eq("class_level", s.class_level).order("exam_date");
      const {
        data: results
      } = await supabase.from("exam_results").select("exam_id, marks").eq("student_id", s.id);
      const map = new Map(results?.map((r) => [r.exam_id, Number(r.marks)]) ?? []);
      return (exams ?? []).filter((e) => map.has(e.id)).map((e) => ({
        id: e.id,
        subject: e.subject,
        date: e.exam_date,
        full: e.full_marks,
        marks: map.get(e.id),
        pct: map.get(e.id) / e.full_marks * 100
      }));
    }
  });
  const overallData = reactExports.useMemo(() => (data ?? []).map((d) => ({
    label: `${d.subject.slice(0, 6)} · ${new Date(d.date).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "short"
    })}`,
    "শতকরা": Number(d.pct.toFixed(1))
  })), [data]);
  const subjectStats = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    (data ?? []).forEach((d) => {
      const e = m.get(d.subject) ?? {
        pcts: [],
        dates: [],
        obtained: 0,
        full: 0
      };
      e.pcts.push(d.pct);
      e.dates.push(d.date);
      e.obtained += d.marks;
      e.full += d.full;
      m.set(d.subject, e);
    });
    return Array.from(m.entries()).map(([subject, v]) => {
      const avg = v.pcts.reduce((s, x) => s + x, 0) / v.pcts.length;
      const best = Math.max(...v.pcts);
      const worst = Math.min(...v.pcts);
      let trend = "flat";
      if (v.pcts.length >= 2) {
        const mid = Math.floor(v.pcts.length / 2);
        const firstHalf = v.pcts.slice(0, mid || 1);
        const secondHalf = v.pcts.slice(mid || 1);
        const diff = secondHalf.reduce((s, x) => s + x, 0) / secondHalf.length - firstHalf.reduce((s, x) => s + x, 0) / firstHalf.length;
        if (diff > 3) trend = "up";
        else if (diff < -3) trend = "down";
      }
      return {
        subject,
        avg,
        best,
        worst,
        count: v.pcts.length,
        trend,
        obtained: v.obtained,
        full: v.full
      };
    }).sort((a, b) => b.avg - a.avg);
  }, [data]);
  const subjectBarData = reactExports.useMemo(() => subjectStats.map((s) => ({
    subject: s.subject,
    "প্রাপ্ত নম্বর": Number(s.obtained.toFixed(1)),
    "মোট নম্বর": Number(s.full.toFixed(1))
  })), [subjectStats]);
  const overallComment = reactExports.useMemo(() => {
    if (subjectStats.length === 0) return null;
    const overallAvg = subjectStats.reduce((s, x) => s + x.avg, 0) / subjectStats.length;
    const strongest = subjectStats[0];
    const weakest = subjectStats[subjectStats.length - 1];
    const improving = subjectStats.filter((s) => s.trend === "up").map((s) => s.subject);
    const declining = subjectStats.filter((s) => s.trend === "down").map((s) => s.subject);
    const lines = [];
    lines.push(overallAvg >= 80 ? `অসাধারণ পারফরম্যান্স! সামগ্রিক গড় ${bnNum(overallAvg.toFixed(1))}% — এই ধারা বজায় রাখুন।` : overallAvg >= 60 ? `ভালো পারফরম্যান্স। সামগ্রিক গড় ${bnNum(overallAvg.toFixed(1))}% — আরও পরিশ্রম করলে A+ সম্ভব।` : overallAvg >= 40 ? `সামগ্রিক গড় ${bnNum(overallAvg.toFixed(1))}% — দুর্বল বিষয়গুলোতে বাড়তি মনোযোগ দিন।` : `সামগ্রিক গড় ${bnNum(overallAvg.toFixed(1))}% — নিয়মিত অধ্যয়ন ও শিক্ষকের সাহায্য নেওয়া জরুরি।`);
    if (subjectStats.length > 1) {
      lines.push(`সবচেয়ে শক্তিশালী বিষয়: ${strongest.subject} (${bnNum(strongest.avg.toFixed(1))}%)।`);
      if (weakest.avg < strongest.avg) {
        lines.push(`সবচেয়ে দুর্বল বিষয়: ${weakest.subject} (${bnNum(weakest.avg.toFixed(1))}%) — এই বিষয়ে বাড়তি সময় দিন।`);
      }
    }
    if (improving.length) lines.push(`উন্নতি হচ্ছে: ${improving.join(", ")} 👍`);
    if (declining.length) lines.push(`অবনতি লক্ষণীয়: ${declining.join(", ")} — এখনই মনোযোগ প্রয়োজন।`);
    return lines;
  }, [subjectStats]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "রেজাল্ট এনালাইসিস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "আপনার পারফরম্যান্সের সারসংক্ষেপ" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : (data?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border p-12 text-center text-muted-foreground", children: "এনালাইসিসের জন্য পর্যাপ্ত ডেটা নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-academy-navy mb-3", children: "তারিখ অনুযায়ী সব পরীক্ষা (শতকরা %)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: overallData, margin: {
          top: 10,
          right: 10,
          left: 0,
          bottom: 40
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#eee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", angle: -30, textAnchor: "end", interval: 0, tick: {
            fontSize: 10
          }, height: 60 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [0, 100], tick: {
            fontSize: 11
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "শতকরা", fill: "#1e3a8a", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-academy-navy mb-1", children: "বিষয়ভিত্তিক প্রাপ্ত vs মোট নম্বর" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3", children: "প্রতিটি বিষয়ে আপনার মোট প্রাপ্ত নম্বর এবং পূর্ণমান" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: subjectBarData, margin: {
          top: 36,
          right: 10,
          left: 0,
          bottom: 40
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#eee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "subject", angle: -20, textAnchor: "end", interval: 0, tick: {
            fontSize: 11
          }, height: 60 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 11
          }, domain: [0, (dataMax) => Math.ceil(dataMax * 1.2)] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "মোট নম্বর", fill: "#cbd5e1", radius: [6, 6, 0, 0], isAnimationActive: false, shape: (props) => renderBarShape({
            ...props,
            payloadKey: "মোট নম্বর",
            inside: true,
            insideTextFill: "#334155",
            outsideTextFill: "#334155"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "প্রাপ্ত নম্বর", fill: "#1e3a8a", radius: [6, 6, 0, 0], isAnimationActive: false, shape: (props) => renderBarShape({
            ...props,
            payloadKey: "প্রাপ্ত নম্বর",
            inside: true
          }), children: subjectStats.map((s, i) => {
            const color = s.avg >= 80 ? "#16a34a" : s.avg >= 60 ? "#1e3a8a" : s.avg >= 40 ? "#d97706" : "#dc2626";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: color }, i);
          }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-academy-navy mb-3", children: "বিষয়ভিত্তিক বিশদ মন্তব্য" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: subjectStats.map((s) => {
          const status = s.avg >= 80 ? {
            label: "চমৎকার",
            color: "bg-green-100 text-green-700",
            comment: `${s.subject}-এ আপনি দুর্দান্ত করছেন। এই গতি ধরে রাখুন।`
          } : s.avg >= 60 ? {
            label: "ভালো",
            color: "bg-blue-100 text-blue-700",
            comment: `${s.subject}-এ ভালো করছেন, তবে আরও পরিশ্রম করলে A+ আসবে।`
          } : s.avg >= 40 ? {
            label: "মাঝারি",
            color: "bg-amber-100 text-amber-700",
            comment: `${s.subject}-এ আরও মনোযোগ দিন এবং নিয়মিত অনুশীলন করুন।`
          } : {
            label: "দুর্বল",
            color: "bg-red-100 text-red-700",
            comment: `${s.subject}-এ বিশেষ মনোযোগ প্রয়োজন। শিক্ষকের সাহায্য নিন।`
          };
          const TrendIcon = s.trend === "up" ? TrendingUp : s.trend === "down" ? TrendingDown : Minus;
          const trendColor = s.trend === "up" ? "text-green-600" : s.trend === "down" ? "text-red-600" : "text-muted-foreground";
          const trendText = s.trend === "up" ? "উন্নতি হচ্ছে" : s.trend === "down" ? "অবনতি হচ্ছে" : "স্থির";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "border rounded-xl p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: s.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`, children: status.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-xs flex items-center gap-1 ${trendColor}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendIcon, { className: "size-3.5" }),
                  " ",
                  trendText
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "গড়", value: `${bnNum(s.avg.toFixed(1))}%` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "সর্বোচ্চ", value: `${bnNum(s.best.toFixed(1))}%` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { label: "সর্বনিম্ন", value: `${bnNum(s.worst.toFixed(1))}%` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: status.comment })
          ] }, s.subject);
        }) })
      ] }),
      overallComment && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gradient-to-br from-academy-soft to-white rounded-2xl border p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-academy-navy mb-2", children: "সামগ্রিক মন্তব্য" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-sm text-academy-navy/90", children: overallComment.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "• ",
          line
        ] }, i)) })
      ] })
    ] })
  ] });
}
function Stat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-academy-soft/60 rounded-lg px-2 py-1.5 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: value })
  ] });
}
export {
  StudentAnalysis as component
};
