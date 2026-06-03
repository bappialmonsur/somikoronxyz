import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { j as CalendarSearch, L as LoaderCircle, P as Phone, M as MessageSquare } from "../_libs/lucide-react.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/class-variance-authority.mjs";
const today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
const BATCH = {
  morning: "সকাল",
  afternoon: "বিকাল",
  evening: "সন্ধ্যা"
};
function AbsentPage() {
  const [date, setDate] = reactExports.useState(today());
  const [cls, setCls] = reactExports.useState("all");
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["absent", date, cls],
    queryFn: async () => {
      let q = supabase.from("attendance").select("id, reason, class_level, students!inner(id, full_name, roll, batch, phone, guardian_phone, is_active)").eq("date", date).eq("status", "absent").eq("students.is_active", true);
      if (cls !== "all") q = q.eq("class_level", cls);
      const {
        data: data2,
        error
      } = await q;
      if (error) throw error;
      return data2;
    }
  });
  const grouped = (data ?? []).reduce((acc, r) => {
    const k = r.class_level;
    (acc[k] ??= []).push(r);
    return acc;
  }, {});
  const sendSMS = (phone, name) => {
    if (!phone) return;
    const msg = encodeURIComponent(`প্রিয় অভিভাবক, ${date} তারিখে ${name} অনুপস্থিত ছিল। — সমীকরণ শিক্ষা পরিবার`);
    window.open(`sms:${phone}?body=${msg}`, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-red-500/15 text-red-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarSearch, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "অনুপস্থিতি ট্র্যাকার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "তারিখ অনুযায়ী অনুপস্থিতের তালিকা" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 grid sm:grid-cols-2 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cls, onValueChange: setCls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব শ্রেণি" }),
          ["5", "6", "7", "8", "9", "10", "11", "12"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
            c.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]),
            "ম শ্রেণি"
          ] }, c))
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-12 rounded-2xl border flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : (data?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-12 rounded-2xl border text-center text-muted-foreground", children: "এই তারিখে কোনো অনুপস্থিতির রেকর্ড নেই" }) : Object.entries(grouped).sort().map(([cls2, items]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-academy-soft px-4 py-2 font-bold text-academy-navy flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          cls2.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]),
          "ম শ্রেণি"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
          items.length,
          " জন অনুপস্থিত"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y", children: items.map((r) => {
        const s = r.students;
        if (!s) return null;
        const phone = s.guardian_phone || s.phone;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col sm:flex-row sm:items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-academy-navy", children: s.full_name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              s.roll && `রোল: ${s.roll} • `,
              BATCH[s.batch]
            ] }),
            r.reason && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm mt-1 text-red-600", children: [
              "কারণ: ",
              r.reason
            ] })
          ] }),
          phone && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${phone}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3" }),
              " কল"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: () => sendSMS(phone, s.full_name), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-3" }),
              " SMS"
            ] })
          ] })
        ] }, r.id);
      }) })
    ] }, cls2))
  ] });
}
export {
  AbsentPage as component
};
