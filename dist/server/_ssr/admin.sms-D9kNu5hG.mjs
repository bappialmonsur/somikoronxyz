import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-BChoM5Ac.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { s as sendBulkSms } from "./sms.functions-C7jdFVh0.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { D as Dialog, a as DialogContent, c as DialogHeader, b as DialogTitle } from "./dialog-BBLoBcjX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as CLASS_LEVELS, b as bnClass } from "./grading-0NP-FUhN.mjs";
import "../_libs/seroval.mjs";
import { M as MessageSquare, af as Search, g as Users, L as LoaderCircle, u as Send } from "../_libs/lucide-react.mjs";
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
import "./server-B3epVi8w.mjs";
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
import "./auth-middleware-yOiDSkhF.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
function SmsPage() {
  const [cls, setCls] = reactExports.useState("all");
  const [q, setQ] = reactExports.useState("");
  const [recipientKind, setRecipientKind] = reactExports.useState("guardian");
  const [open, setOpen] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["sms-students"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("students").select("id, full_name, phone, guardian_phone, class_level, is_active").eq("is_active", true).order("full_name");
      if (error) throw error;
      return data2;
    }
  });
  const filtered = reactExports.useMemo(() => {
    const rows = (data ?? []).filter((r) => cls === "all" || r.class_level === cls);
    const t = q.trim().toLowerCase();
    if (!t) return rows;
    return rows.filter((r) => r.full_name.toLowerCase().includes(t) || (r.phone ?? "").includes(t) || (r.guardian_phone ?? "").includes(t));
  }, [data, cls, q]);
  const numbersFor = (r) => {
    const arr = [];
    if ((recipientKind === "student" || recipientKind === "both") && r.phone) arr.push(r.phone);
    if ((recipientKind === "guardian" || recipientKind === "both") && r.guardian_phone) arr.push(r.guardian_phone);
    return arr;
  };
  const allNumbers = reactExports.useMemo(() => {
    const set = /* @__PURE__ */ new Set();
    filtered.forEach((r) => numbersFor(r).forEach((n) => set.add(n)));
    return Array.from(set);
  }, [filtered, recipientKind]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "এস এম এস প্যানেল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "শ্রেণি ওয়াইজ ইনডিভিজুয়াল বা সবাইকে একসাথে মেসেজ পাঠান" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 grid sm:grid-cols-4 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cls, onValueChange: setCls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "শ্রেণি" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব শ্রেণি" }),
          CLASS_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: bnClass(c) }, c))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: recipientKind, onValueChange: (v) => setRecipientKind(v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "guardian", children: "অভিভাবকের নাম্বারে" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "student", children: "শিক্ষার্থীর নাম্বারে" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "both", children: "দুই নাম্বারেই" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative sm:col-span-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "নাম বা ফোন...", className: "pl-9", value: q, onChange: (e) => setQ(e.target.value) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
        "মোট ",
        filtered.length,
        " জন · ",
        allNumbers.length,
        "টি ইউনিক নাম্বার"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-academy-navy text-white", disabled: allNumbers.length === 0, onClick: () => setOpen({
        numbers: allNumbers,
        label: `সবাইকে (${allNumbers.length})`
      }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4 mr-1" }),
        " সবাইকে পাঠান"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "কোনো শিক্ষার্থী নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: filtered.map((r) => {
      const nums = numbersFor(r);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-4 flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-academy-navy truncate", children: r.full_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            bnClass(r.class_level),
            " · ",
            nums.length === 0 ? "কোনো নাম্বার নেই" : nums.join(", ")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: nums.length === 0, onClick: () => setOpen({
          numbers: nums,
          label: r.full_name
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4 mr-1" }),
          " মেসেজ"
        ] })
      ] }, r.id);
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SendDialog, { open, onClose: () => setOpen(null) })
  ] });
}
function SendDialog({
  open,
  onClose
}) {
  const [msg, setMsg] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const send = useServerFn(sendBulkSms);
  const submit = async () => {
    if (!open) return;
    if (!msg.trim()) return toast.error("মেসেজ লিখুন");
    setSending(true);
    try {
      const res = await send({
        data: {
          message: msg.trim(),
          numbers: open.numbers
        }
      });
      toast.success(`${res.sent}টি নাম্বারে পাঠানো হয়েছে`);
      setMsg("");
      onClose();
    } catch (e) {
      toast.error(e?.message ?? "পাঠানো যায়নি");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!open, onOpenChange: (v) => {
    if (!v) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
      "মেসেজ পাঠান — ",
      open?.label
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
        open?.numbers.length,
        "টি নাম্বারে SMS যাবে"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: msg, onChange: (e) => setMsg(e.target.value), placeholder: "মেসেজ লিখুন...", rows: 5, maxLength: 1e3 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground text-right", children: [
        msg.length,
        "/1000"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: submit, disabled: sending || !msg.trim(), className: "bg-academy-navy text-white w-full", children: [
        sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4 mr-1" }),
        sending ? "পাঠানো হচ্ছে..." : "পাঠান"
      ] })
    ] })
  ] }) });
}
export {
  SmsPage as component
};
