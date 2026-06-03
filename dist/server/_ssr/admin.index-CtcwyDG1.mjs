import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { F as FeatureCards } from "./feature-cards-BuzaS7zM.mjs";
import { g as Users, i as ClipboardCheck, j as CalendarSearch, f as UserPlus, h as BookUser, G as GraduationCap, k as Printer, M as MessageSquare } from "../_libs/lucide-react.mjs";
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
const today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function Dashboard() {
  const {
    data: stats
  } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [studentsRes, todayRes, absentTodayRes] = await Promise.all([supabase.from("students").select("id", {
        count: "exact",
        head: true
      }).eq("is_active", true), supabase.from("attendance").select("id", {
        count: "exact",
        head: true
      }).eq("date", today()), supabase.from("attendance").select("id", {
        count: "exact",
        head: true
      }).eq("date", today()).eq("status", "absent")]);
      return {
        total: studentsRes.count ?? 0,
        marked: todayRes.count ?? 0,
        absent: absentTodayRes.count ?? 0
      };
    }
  });
  const cards = [{
    label: "মোট শিক্ষার্থী",
    value: stats?.total ?? "—",
    icon: Users,
    color: "bg-blue-500"
  }, {
    label: "আজ হাজিরা নেওয়া",
    value: stats?.marked ?? "—",
    icon: ClipboardCheck,
    color: "bg-green-500"
  }, {
    label: "আজ অনুপস্থিত",
    value: stats?.absent ?? "—",
    icon: CalendarSearch,
    color: "bg-red-500"
  }];
  const quickLinks = [{
    to: "/admin/admission",
    label: "নতুন ভর্তি",
    icon: UserPlus
  }, {
    to: "/admin/attendance",
    label: "হাজিরা নিন",
    icon: ClipboardCheck
  }, {
    to: "/admin/students",
    label: "শিক্ষার্থী তালিকা",
    icon: Users
  }, {
    to: "/admin/phonebook",
    label: "ফোনবুক",
    icon: BookUser
  }, {
    to: "/admin/absent",
    label: "অনুপস্থিতি দেখুন",
    icon: CalendarSearch
  }, {
    to: "/admin/results",
    label: "পরীক্ষা ও ফলাফল",
    icon: GraduationCap
  }, {
    to: "/admin/marksheet",
    label: "মার্কশীট প্রিন্ট",
    icon: Printer
  }, {
    to: "/admin/sms",
    label: "এস এম এস",
    icon: MessageSquare
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-academy-navy", children: "স্বাগতম" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "আজকের তারিখ: ",
        (/* @__PURE__ */ new Date()).toLocaleDateString("bn-BD")
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-5 rounded-2xl border shadow-sm flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-12 rounded-xl ${c.color} text-white flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "size-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: c.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-bold text-academy-navy", children: c.value })
      ] })
    ] }, c.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-academy-navy mb-3", children: "ফিচার্ড" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCards, { variant: "admin" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-bold text-academy-navy mb-3", children: "দ্রুত অ্যাক্সেস" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: quickLinks.map((l, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: l.to, className: "group relative overflow-hidden bg-white p-5 rounded-2xl border border-academy-navy/10 hover:border-academy-gold hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-4 -top-4 size-20 rounded-full bg-academy-gold/10 group-hover:bg-academy-gold/20 transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-3 text-[10px] font-bold text-academy-gold/60", children: [
          "০",
          i + 1
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative size-12 rounded-xl bg-gradient-to-br from-academy-navy to-academy-navy/80 text-academy-gold flex items-center justify-center shadow-md group-hover:scale-110 transition-transform", children: /* @__PURE__ */ jsxRuntimeExports.jsx(l.icon, { className: "size-6" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-academy-navy leading-tight", children: l.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5 group-hover:text-academy-gold transition-colors", children: "→" })
        ] })
      ] }, l.to)) })
    ] })
  ] });
}
export {
  Dashboard as component
};
