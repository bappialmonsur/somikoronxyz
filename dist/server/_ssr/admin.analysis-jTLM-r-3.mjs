import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { C as CLASS_LEVELS, b as bnClass, c as calcGrade, a as bnNum } from "./grading-0NP-FUhN.mjs";
import { L as LoaderCircle, k as Printer, a2 as TrendingUp, a8 as TrendingDown, a9 as Minus } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
function AdminAnalysis() {
  const [cls, setCls] = reactExports.useState("");
  const [studentId, setStudentId] = reactExports.useState("");
  const {
    data: students
  } = useQuery({
    queryKey: ["analysis-students", cls],
    enabled: !!cls,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("students").select("id, full_name, roll").eq("class_level", cls).eq("is_active", true).order("roll", {
        ascending: true
      });
      return data ?? [];
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "রেজাল্ট এনালাইসিস" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "শিক্ষার্থী অনুযায়ী বিস্তারিত পারফরম্যান্স রিপোর্ট" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 grid sm:grid-cols-2 gap-3 print:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শ্রেণি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cls, onValueChange: (v) => {
          setCls(v);
          setStudentId("");
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বাছাই" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLASS_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: bnClass(c) }, c)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শিক্ষার্থী" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: studentId, onValueChange: setStudentId, disabled: !cls, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বাছাই" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: (students ?? []).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: s.id, children: [
            s.roll ? `${s.roll} — ` : "",
            s.full_name
          ] }, s.id)) })
        ] })
      ] })
    ] }),
    studentId && cls && /* @__PURE__ */ jsxRuntimeExports.jsx(StudentAnalysisView, { studentId, cls, studentName: students?.find((s) => s.id === studentId)?.full_name ?? "", studentRoll: students?.find((s) => s.id === studentId)?.roll ?? null })
  ] });
}
function StudentAnalysisView({
  studentId,
  cls,
  studentName,
  studentRoll
}) {
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-analysis", studentId, cls],
    queryFn: async () => {
      const {
        data: exams
      } = await supabase.from("exams").select("*").eq("class_level", cls).order("exam_date");
      const {
        data: results
      } = await supabase.from("exam_results").select("exam_id, marks").eq("student_id", studentId);
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
        obtained: 0,
        full: 0
      };
      e.pcts.push(d.pct);
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
        const a = v.pcts.slice(0, mid || 1);
        const b = v.pcts.slice(mid || 1);
        const diff = b.reduce((s, x) => s + x, 0) / b.length - a.reduce((s, x) => s + x, 0) / a.length;
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
  const totals = reactExports.useMemo(() => {
    const obtained = (data ?? []).reduce((a, b) => a + b.marks, 0);
    const full = (data ?? []).reduce((a, b) => a + b.full, 0);
    return {
      obtained,
      full,
      grade: full > 0 ? calcGrade(obtained, full) : null
    };
  }, [data]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) });
  if (!data || data.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border p-12 text-center text-muted-foreground", children: "এই শিক্ষার্থীর এনালাইসিসের জন্য পর্যাপ্ত ডেটা নেই" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "print:hidden flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => window.print(), variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "size-4 mr-1" }),
      " প্রিন্ট"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "print-area space-y-4 bg-white p-6 rounded-2xl border print:border-0 print:shadow-none mx-auto", style: {
      width: "210mm",
      minHeight: "297mm"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center border-b pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "সমীকরণ শিক্ষা পরিবার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-academy-navy", children: "শিক্ষার্থীর পারফরম্যান্স এনালাইসিস" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "নাম: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: studentName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "রোল: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: studentRoll ?? "—" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "শ্রেণি: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { children: bnClass(cls) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "গ্রেড: " }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("b", { className: totals.grade?.color, children: totals.grade?.grade ?? "—" }),
          totals.full > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground ml-1", children: [
            "(",
            bnNum(totals.obtained),
            "/",
            bnNum(totals.full),
            ")"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-academy-navy text-sm mb-2", children: "তারিখ অনুযায়ী সব পরীক্ষা (শতকরা %)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: overallData, margin: {
          top: 10,
          right: 10,
          left: 0,
          bottom: 40
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#eee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "label", angle: -30, textAnchor: "end", interval: 0, tick: {
            fontSize: 9
          }, height: 60 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { domain: [0, 100], tick: {
            fontSize: 10
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "শতকরা", fill: "#1e3a8a", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-academy-navy text-sm mb-2", children: "বিষয়ভিত্তিক প্রাপ্ত vs মোট নম্বর" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: subjectBarData, margin: {
          top: 36,
          right: 10,
          left: 0,
          bottom: 40
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#eee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "subject", angle: -20, textAnchor: "end", interval: 0, tick: {
            fontSize: 10
          }, height: 60 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tick: {
            fontSize: 10
          }, domain: [0, (dataMax) => Math.ceil(dataMax * 1.15)] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "মোট নম্বর", fill: "#cbd5e1", radius: [6, 6, 0, 0], isAnimationActive: false, shape: (props) => renderBarShape({
            ...props,
            payloadKey: "মোট নম্বর",
            inside: true,
            insideTextFill: "#334155",
            outsideTextFill: "#334155"
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "প্রাপ্ত নম্বর", radius: [6, 6, 0, 0], isAnimationActive: false, shape: (props) => renderBarShape({
            ...props,
            payloadKey: "প্রাপ্ত নম্বর",
            inside: true
          }), children: subjectStats.map((s, i) => {
            const color = s.avg >= 80 ? "#16a34a" : s.avg >= 60 ? "#1e3a8a" : s.avg >= 40 ? "#d97706" : "#dc2626";
            return /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: color }, i);
          }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-xl p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-bold text-academy-navy text-sm mb-2", children: "বিষয়ভিত্তিক মন্তব্য" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: subjectStats.map((s) => {
          const status = s.avg >= 80 ? {
            label: "চমৎকার",
            color: "bg-green-100 text-green-700",
            comment: `${s.subject}-এ দুর্দান্ত পারফরম্যান্স।`
          } : s.avg >= 60 ? {
            label: "ভালো",
            color: "bg-blue-100 text-blue-700",
            comment: `${s.subject}-এ ভালো করছে, আরও পরিশ্রমে A+ সম্ভব।`
          } : s.avg >= 40 ? {
            label: "মাঝারি",
            color: "bg-amber-100 text-amber-700",
            comment: `${s.subject}-এ বাড়তি মনোযোগ প্রয়োজন।`
          } : {
            label: "দুর্বল",
            color: "bg-red-100 text-red-700",
            comment: `${s.subject}-এ বিশেষ যত্ন ও অতিরিক্ত অনুশীলন দরকার।`
          };
          const TIcon = s.trend === "up" ? TrendingUp : s.trend === "down" ? TrendingDown : Minus;
          const tColor = s.trend === "up" ? "text-green-600" : s.trend === "down" ? "text-red-600" : "text-muted-foreground";
          const tText = s.trend === "up" ? "উন্নতি" : s.trend === "down" ? "অবনতি" : "স্থির";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "border rounded-lg p-2 text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1 flex-wrap gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy text-sm", children: s.subject }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-2 py-0.5 rounded-full font-medium ${status.color}`, children: status.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `flex items-center gap-1 ${tColor}`, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TIcon, { className: "size-3" }),
                  tText
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-4 gap-1 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell2, { label: "গড়", value: `${bnNum(s.avg.toFixed(1))}%` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell2, { label: "সর্বোচ্চ", value: `${bnNum(s.best.toFixed(1))}%` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell2, { label: "সর্বনিম্ন", value: `${bnNum(s.worst.toFixed(1))}%` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Cell2, { label: "পরীক্ষা", value: bnNum(s.count) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: status.comment })
          ] }, s.subject);
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @media print {
          @page { size: A4; margin: 10mm; }
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 210mm; }
        }
      ` })
  ] });
}
function Cell2({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-academy-soft/60 rounded px-1.5 py-1 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy text-xs", children: value })
  ] });
}
export {
  AdminAnalysis as component
};
