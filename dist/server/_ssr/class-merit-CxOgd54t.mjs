import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-BChoM5Ac.mjs";
import { R as Root, I as Image, F as Fallback } from "../_libs/radix-ui__react-avatar.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { a as bnNum } from "./grading-0NP-FUhN.mjs";
import { g as getMonthlyClassMerit } from "./student-stats.functions-MwxI9Uo6.mjs";
import { J as Medal, L as LoaderCircle, O as Trophy } from "../_libs/lucide-react.mjs";
const Avatar = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root,
  {
    ref,
    className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
    ...props
  }
));
Avatar.displayName = Root.displayName;
const AvatarImage = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = Image.displayName;
const AvatarFallback = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = Fallback.displayName;
function useMonthlyMerit(userId) {
  const fetchMerit = useServerFn(getMonthlyClassMerit);
  return useQuery({
    queryKey: ["monthly-class-merit", userId],
    enabled: !!userId,
    queryFn: () => fetchMerit(),
    staleTime: 6e4
  });
}
const RANK_STYLE = [
  "bg-academy-gold text-academy-navy",
  "bg-slate-300 text-slate-700",
  "bg-amber-700 text-white"
];
function pct(total, full) {
  return full > 0 ? (total / full * 100).toFixed(1) : null;
}
function ClassMeritStrip({ userId }) {
  const { data, isLoading } = useMonthlyMerit(userId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card rounded-3xl border border-border/70 shadow-sm p-6 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin text-academy-navy" }) });
  }
  if (!data || data.top.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl border border-border/70 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 pt-3.5 pb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "size-4 text-academy-gold" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-academy-navy", children: "শ্রেণির মেধাতালিকা" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[11px] text-muted-foreground", children: [
        data.monthLabel,
        " · মোট নম্বর অনুযায়ী"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/60", children: data.top.map((m) => {
      const p = pct(m.total, m.fullTotal);
      const isMe = data.me && m.position === data.me.position && m.total === data.me.total;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-3 px-4 py-2 ${isMe ? "bg-academy-gold/10" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `size-6 shrink-0 rounded-full grid place-items-center text-[11px] font-bold ${RANK_STYLE[m.position - 1] ?? "bg-academy-soft text-academy-navy"}`,
                children: bnNum(m.position)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { className: "size-9 shrink-0", children: [
              m.photoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { src: m.photoUrl, alt: m.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "text-xs bg-academy-soft text-academy-navy", children: m.name.slice(0, 1) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-academy-navy truncate", children: m.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground truncate", children: m.roll ? `রোল ${bnNum(m.roll)}` : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm font-bold text-academy-navy leading-none", children: [
                bnNum(m.total),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-normal text-muted-foreground", children: [
                  "/",
                  bnNum(m.fullTotal)
                ] })
              ] }),
              p && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                bnNum(p),
                "%"
              ] })
            ] })
          ]
        },
        m.student_id
      );
    }) })
  ] });
}
function PositionPill({ userId }) {
  const { data } = useMonthlyMerit(userId);
  const me = data?.me;
  if (!me || me.position == null) return null;
  const position = me.position;
  const p = pct(me.total, me.fullTotal);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-1.5 rounded-full bg-academy-gold/15 border border-academy-gold/40 px-2.5 h-9 text-academy-navy",
      title: `${data.monthLabel} · মোট ${bnNum(me.total)}/${bnNum(me.fullTotal)}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Medal, { className: "size-4 text-academy-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-bold leading-none", children: [
          bnNum(position),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-normal text-muted-foreground", children: [
            "/",
            bnNum(me.classSize)
          ] })
        ] }),
        p && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground hidden sm:inline", children: [
          "· ",
          bnNum(p),
          "%"
        ] })
      ]
    }
  );
}
export {
  ClassMeritStrip as C,
  PositionPill as P
};
