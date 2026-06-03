import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { f as UserPlus, a3 as CalendarDays, a4 as BellRing, G as GraduationCap, M as MessageSquare, s as ArrowRight } from "../_libs/lucide-react.mjs";
const adminCards = [
  {
    to: "/admin/admission",
    title: "নতুন ভর্তি",
    desc: "নতুন শিক্ষার্থী যোগ করুন",
    icon: UserPlus,
    gradient: "from-academy-navy via-academy-navy/90 to-academy-navy/70",
    accent: "text-academy-gold"
  },
  {
    to: "/admin/site",
    title: "ক্লাস রুটিন",
    desc: "সাপ্তাহিক ক্লাসের সময়সূচি",
    icon: CalendarDays,
    gradient: "from-academy-gold via-amber-500 to-orange-500",
    accent: "text-white"
  },
  {
    to: "/admin/notices",
    title: "নোটিফিকেশন",
    desc: "নোটিশ ও ঘোষণা",
    icon: BellRing,
    gradient: "from-rose-700 via-rose-600 to-academy-navy",
    accent: "text-amber-200"
  }
];
const studentCards = [
  {
    to: "/student/results",
    title: "রেজাল্ট",
    desc: "পরীক্ষার ফলাফল দেখুন",
    icon: GraduationCap,
    gradient: "from-emerald-600 via-teal-600 to-academy-navy",
    accent: "text-white"
  },
  {
    to: "/student/attendance",
    title: "ক্লাস রুটিন",
    desc: "ক্লাস ও উপস্থিতির সময়",
    icon: CalendarDays,
    gradient: "from-academy-gold via-amber-500 to-orange-500",
    accent: "text-white"
  },
  {
    to: "/student/notices",
    title: "নোটিশ",
    desc: "সর্বশেষ নোটিশ দেখুন",
    icon: BellRing,
    gradient: "from-rose-700 via-rose-600 to-academy-navy",
    accent: "text-amber-200"
  },
  {
    to: "/student/messages",
    title: "মেসেজ",
    desc: "এডমিনের সাথে চ্যাট",
    icon: MessageSquare,
    gradient: "from-indigo-600 via-blue-600 to-academy-navy",
    accent: "text-white"
  }
];
function FeatureCards({ variant }) {
  const cards = variant === "admin" ? adminCards : studentCards;
  const gridCols = cards.length === 4 ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-3";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `grid ${gridCols} gap-4`, children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: c.to,
      className: `group relative overflow-hidden rounded-2xl bg-gradient-to-br ${c.gradient} p-5 text-white shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-6 -top-6 size-28 rounded-full bg-white/10 blur-2xl group-hover:bg-white/20 transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -right-2 -bottom-8 size-24 rounded-full bg-black/10 blur-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `size-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center ${c.accent}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "size-6" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-5 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-lg font-bold leading-tight", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs opacity-80 mt-1", children: c.desc })
        ] })
      ]
    },
    c.title
  )) });
}
export {
  FeatureCards as F
};
