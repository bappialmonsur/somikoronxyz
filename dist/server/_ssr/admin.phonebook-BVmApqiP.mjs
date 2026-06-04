import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-BChoM5Ac.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { s as sendBulkSms } from "./sms.functions-C7jdFVh0.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { D as Dialog, a as DialogContent, c as DialogHeader, b as DialogTitle, d as DialogFooter } from "./dialog-BBLoBcjX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import "../_libs/seroval.mjs";
import { u as Send, af as Search, L as LoaderCircle, P as Phone, M as MessageSquare, ak as Copy } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
function formatPhoneDisplay(phone) {
  if (!phone) return "—";
  return "0" + phone.replace(/^\+?880/, "");
}
function PhonebookPage() {
  const [search, setSearch] = reactExports.useState("");
  const [tab, setTab] = reactExports.useState("active");
  const [open, setOpen] = reactExports.useState(false);
  const [message, setMessage] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const sendSmsApi = useServerFn(sendBulkSms);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["phonebook"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("students").select("id, full_name, phone, guardian_phone, class_level, is_active").order("full_name");
      if (error) throw error;
      return data2;
    }
  });
  const filtered = reactExports.useMemo(() => {
    const rows = (data ?? []).filter((r) => r.is_active === (tab === "active"));
    const q = search.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) => r.full_name.toLowerCase().includes(q) || (r.phone ?? "").includes(q) || (r.guardian_phone ?? "").includes(q));
  }, [data, tab, search]);
  const allNumbers = reactExports.useMemo(() => {
    const nums = /* @__PURE__ */ new Set();
    filtered.forEach((r) => {
      if (r.phone) nums.add(r.phone);
      if (r.guardian_phone) nums.add(r.guardian_phone);
    });
    return Array.from(nums);
  }, [filtered]);
  const counts = reactExports.useMemo(() => {
    const all = data ?? [];
    return {
      active: all.filter((r) => r.is_active).length,
      inactive: all.filter((r) => !r.is_active).length
    };
  }, [data]);
  const sendSms = async () => {
    if (allNumbers.length === 0) {
      toast.error("কোনো নাম্বার নেই");
      return;
    }
    if (!message.trim()) {
      toast.error("মেসেজ লিখুন");
      return;
    }
    setSending(true);
    try {
      const res = await sendSmsApi({
        data: {
          message: message.trim(),
          numbers: allNumbers
        }
      });
      toast.success(`${res.sent}টি নাম্বারে SMS পাঠানো হয়েছে`);
      setMessage("");
      setOpen(false);
    } catch (e) {
      toast.error(e?.message ?? "SMS পাঠানো যায়নি");
    } finally {
      setSending(false);
    }
  };
  const copyNumbers = async () => {
    if (allNumbers.length === 0) return;
    await navigator.clipboard.writeText(allNumbers.join(", "));
    toast.success(`${allNumbers.length}টি নাম্বার কপি হয়েছে`);
  };
  const openWhatsApp = async () => {
    if (allNumbers.length === 0) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(allNumbers.join(", "));
        toast.info("নাম্বারগুলো কপি হয়েছে। WhatsApp এ ব্রডকাস্ট লিস্টে পেস্ট করুন।");
      } else {
        toast.info("WhatsApp খোলা হচ্ছে। নাম্বার ম্যানুয়ালি পেস্ট করুন।");
      }
    } catch {
      toast.info("WhatsApp খোলা হচ্ছে।");
    }
    const win = window.open("https://web.whatsapp.com/", "_blank", "noopener,noreferrer");
    if (!win) {
      window.location.href = "https://web.whatsapp.com/";
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl md:text-3xl font-bold text-academy-navy", children: "ফোনবুক" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "সকল শিক্ষার্থীর নাম ও ফোন নাম্বার" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setOpen(true), className: "bg-academy-navy text-white hover:bg-academy-navy/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4 mr-2" }),
        "সবাইকে মেসেজ পাঠান"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab("active"), className: `px-4 py-2 rounded-xl text-sm font-medium border transition ${tab === "active" ? "bg-academy-navy text-white border-academy-navy" : "bg-white text-academy-navy border-academy-navy/20 hover:border-academy-navy/40"}`, children: [
        "একটিভ (",
        counts.active,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab("inactive"), className: `px-4 py-2 rounded-xl text-sm font-medium border transition ${tab === "inactive" ? "bg-academy-navy text-white border-academy-navy" : "bg-white text-academy-navy border-academy-navy/20 hover:border-academy-navy/40"}`, children: [
        "ইনএকটিভ (",
        counts.inactive,
        ")"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: search, onChange: (e) => setSearch(e.target.value), placeholder: "নাম বা ফোন দিয়ে খুঁজুন...", className: "pl-9" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-6 animate-spin text-academy-navy" }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-10 text-center text-muted-foreground text-sm", children: "কোনো শিক্ষার্থী পাওয়া যায়নি" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: filtered.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-4 flex items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-academy-navy truncate", children: r.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "ক্লাস ",
          r.class_level,
          " · ",
          formatPhoneDisplay(r.phone),
          r.guardian_phone && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " · অভিভাবক: ",
            formatPhoneDisplay(r.guardian_phone)
          ] })
        ] })
      ] }),
      r.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${r.phone}`, className: "size-9 rounded-full bg-academy-soft hover:bg-academy-navy hover:text-white flex items-center justify-center transition shrink-0", "aria-label": "কল করুন", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-4" }) }),
      r.phone && /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `sms:${r.phone}`, className: "size-9 rounded-full bg-academy-soft hover:bg-academy-navy hover:text-white flex items-center justify-center transition shrink-0", "aria-label": "মেসেজ পাঠান", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4" }) })
    ] }, r.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: setOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
        "সবাইকে মেসেজ পাঠান (",
        allNumbers.length,
        "টি নাম্বার)"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "বর্তমান ফিল্টার (",
          tab === "active" ? "একটিভ" : "ইনএকটিভ",
          ") অনুযায়ী শিক্ষার্থী ও অভিভাবকের নাম্বারগুলোতে SMS API দিয়ে মেসেজ যাবে।"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: message, onChange: (e) => setMessage(e.target.value), placeholder: "আপনার মেসেজ লিখুন...", rows: 5, maxLength: 1e3 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground text-right", children: [
          message.length,
          "/1000"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: sendSms, disabled: sending || !message.trim() || allNumbers.length === 0, className: "bg-academy-navy text-white hover:bg-academy-navy/90 w-full", children: [
          sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-2 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4 mr-2" }),
          sending ? "পাঠানো হচ্ছে..." : `SMS পাঠান (${allNumbers.length})`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openWhatsApp, variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4 mr-2" }),
            " WhatsApp"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: copyNumbers, variant: "outline", size: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-4 mr-2" }),
            " নাম্বার কপি"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", onClick: () => setOpen(false), children: "বন্ধ" }) })
    ] }) })
  ] });
}
export {
  PhonebookPage as component
};
