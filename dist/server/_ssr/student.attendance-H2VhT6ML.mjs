import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { a as bnNum } from "./grading-0NP-FUhN.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { C as CalendarCheck, a5 as ChevronLeft, a6 as ChevronRight, L as LoaderCircle, a7 as Check, X } from "../_libs/lucide-react.mjs";
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
const BN_MONTHS = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
const BN_DAYS = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
function isoDate(d) {
  return d.toISOString().slice(0, 10);
}
function StudentAttendance() {
  const {
    user
  } = useSession();
  const [cursor, setCursor] = reactExports.useState(() => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(1);
    return d;
  });
  const {
    data: student
  } = useQuery({
    queryKey: ["my-student-att", user?.id],
    enabled: !!user,
    queryFn: async () => (await supabase.from("students").select("id").eq("user_id", user.id).maybeSingle()).data
  });
  const monthStart = reactExports.useMemo(() => new Date(cursor.getFullYear(), cursor.getMonth(), 1), [cursor]);
  const monthEnd = reactExports.useMemo(() => new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0), [cursor]);
  const {
    data: records,
    isLoading
  } = useQuery({
    queryKey: ["my-attendance", student?.id, isoDate(monthStart), isoDate(monthEnd)],
    enabled: !!student,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("attendance").select("*").eq("student_id", student.id).gte("date", isoDate(monthStart)).lte("date", isoDate(monthEnd)).order("date");
      if (error) throw error;
      return data;
    }
  });
  const map = reactExports.useMemo(() => {
    const m = /* @__PURE__ */ new Map();
    records?.forEach((r) => m.set(r.date, {
      status: r.status,
      reason: r.reason
    }));
    return m;
  }, [records]);
  const cells = reactExports.useMemo(() => {
    const firstWeekday = monthStart.getDay();
    const totalDays = monthEnd.getDate();
    const arr = [];
    for (let i = 0; i < firstWeekday; i++) arr.push(null);
    for (let d = 1; d <= totalDays; d++) {
      const dt = new Date(cursor.getFullYear(), cursor.getMonth(), d);
      arr.push({
        date: dt,
        iso: isoDate(dt)
      });
    }
    return arr;
  }, [cursor, monthStart, monthEnd]);
  const presentCount = records?.filter((r) => r.status === "present").length ?? 0;
  const absentCount = records?.filter((r) => r.status === "absent").length ?? 0;
  const [selected, setSelected] = reactExports.useState(null);
  const sel = selected ? map.get(selected) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-green-500/15 text-green-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarCheck, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "উপস্থিতি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "তারিখ অনুযায়ী আপনার হাজিরা" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-academy-navy", children: [
          BN_MONTHS[cursor.getMonth()],
          " ",
          bnNum(cursor.getFullYear())
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1)), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, {}) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-4 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-1 rounded-full bg-green-500/15 text-green-700", children: [
          "উপস্থিত: ",
          bnNum(presentCount)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-1 rounded-full bg-red-500/15 text-red-700", children: [
          "অনুপস্থিত: ",
          bnNum(absentCount)
        ] })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground mb-1", children: BN_DAYS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: d }, d)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-7 gap-1", children: cells.map((c, i) => {
          if (!c) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}, i);
          const rec = map.get(c.iso);
          const isSel = selected === c.iso;
          const bg = rec?.status === "present" ? "bg-green-500 text-white" : rec?.status === "absent" ? "bg-red-500 text-white" : "bg-academy-soft text-academy-navy/60";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(c.iso === selected ? null : c.iso), className: `aspect-square rounded-lg text-sm font-medium flex flex-col items-center justify-center ${bg} ${isSel ? "ring-2 ring-academy-gold" : ""}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: bnNum(c.date.getDate()) }),
            rec?.status === "present" && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3" }),
            rec?.status === "absent" && /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3" })
          ] }, c.iso);
        }) })
      ] })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground", children: new Date(selected).toLocaleDateString("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
      }) }),
      sel ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `px-3 py-1 rounded-full text-sm font-bold ${sel.status === "present" ? "bg-green-500/15 text-green-700" : "bg-red-500/15 text-red-700"}`, children: sel.status === "present" ? "উপস্থিত" : "অনুপস্থিত" }),
        sel.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          "কারণ: ",
          sel.reason
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-sm text-muted-foreground", children: "এই তারিখে হাজিরা নেওয়া হয়নি" })
    ] })
  ] });
}
export {
  StudentAttendance as component
};
