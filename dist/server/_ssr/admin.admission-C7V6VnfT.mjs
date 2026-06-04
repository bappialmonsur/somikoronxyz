import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./createSsrRpc-BChoM5Ac.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as createStudentAccount } from "./admin.functions-CRtp5XCl.mjs";
import { n as normalizeBdPhone, d as defaultStudentPassword } from "./phone-B7PBua8H.mjs";
import "../_libs/seroval.mjs";
import { f as UserPlus, L as LoaderCircle } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./auth-middleware-yOiDSkhF.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
const CLASSES = ["5", "6", "7", "8", "9", "10", "11", "12"];
const BATCHES = [{
  value: "morning",
  label: "সকাল"
}, {
  value: "afternoon",
  label: "বিকাল"
}, {
  value: "evening",
  label: "সন্ধ্যা"
}];
const DEPTS = [{
  value: "none",
  label: "প্রযোজ্য নয়"
}, {
  value: "science",
  label: "বিজ্ঞান"
}, {
  value: "business",
  label: "ব্যবসায় শিক্ষা"
}];
const schema = objectType({
  full_name: stringType().trim().min(2, "নাম দিন").max(100),
  father_name: stringType().trim().max(100).optional(),
  mother_name: stringType().trim().max(100).optional(),
  father_occupation: stringType().trim().max(100).optional(),
  school_name: stringType().trim().max(150).optional(),
  phone: stringType().trim().min(11, "ফোন নম্বর আবশ্যক"),
  guardian_phone: stringType().trim().max(20).optional(),
  class_level: enumType(CLASSES, {
    message: "শ্রেণি নির্বাচন করুন"
  }),
  batch: enumType(["morning", "afternoon", "evening"], {
    message: "ব্যাচ নির্বাচন করুন"
  }),
  department: enumType(["none", "science", "business"]),
  address: stringType().trim().max(500).optional()
});
const empty = {
  full_name: "",
  father_name: "",
  mother_name: "",
  father_occupation: "",
  school_name: "",
  phone: "",
  guardian_phone: "",
  class_level: "",
  batch: "",
  department: "none",
  address: ""
};
function AdmissionPage() {
  const navigate = useNavigate();
  const [form, setForm] = reactExports.useState(empty);
  const [busy, setBusy] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const set = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const submitFn = useServerFn(createStudentAccount);
  const showDept = ["9", "10", "11", "12"].includes(form.class_level);
  const phoneE164 = normalizeBdPhone(form.phone);
  const previewPassword = phoneE164 ? defaultStudentPassword(phoneE164) : "";
  const onSubmit = async (e) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    if (!normalizeBdPhone(parsed.data.phone)) {
      toast.error("সঠিক ১১ ডিজিটের ফোন দিন (০১...)");
      return;
    }
    setBusy(true);
    try {
      const res = await submitFn({
        data: {
          ...parsed.data,
          father_name: parsed.data.father_name ?? "",
          mother_name: parsed.data.mother_name ?? "",
          father_occupation: parsed.data.father_occupation ?? "",
          school_name: parsed.data.school_name ?? "",
          guardian_phone: parsed.data.guardian_phone ?? "",
          address: parsed.data.address ?? "",
          department: showDept ? parsed.data.department : "none"
        }
      });
      setResult({
        roll: res.roll ?? "",
        phone: res.phone,
        password: res.password
      });
      toast.success(`ভর্তি সম্পন্ন — রোল: ${res.roll}`);
    } catch (err) {
      toast.error(err.message ?? "ত্রুটি হয়েছে");
    } finally {
      setBusy(false);
    }
  };
  if (result) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white p-6 rounded-2xl border shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto mb-3", children: "✓" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-academy-navy text-center mb-2", children: "ভর্তি সফল হয়েছে" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-2 text-sm bg-academy-soft p-4 rounded-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "রোল নম্বর" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-academy-navy", children: result.roll })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "লগইন ফোন" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: result.phone })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "পাসওয়ার্ড" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-academy-gold", children: result.password })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-3 text-center", children: "পাসওয়ার্ড = মোবাইল নম্বরের শেষ ৬ ডিজিট। শিক্ষার্থীকে জানিয়ে দিন।" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          setResult(null);
          setForm(empty);
        }, className: "bg-academy-navy text-white flex-1", children: "আরো ভর্তি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: () => navigate({
          to: "/admin/students"
        }), className: "flex-1", children: "সকল শিক্ষার্থী" })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-academy-gold/15 text-academy-gold flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "ছাত্রছাত্রী ভর্তি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "রোল নম্বর স্বয়ংক্রিয়ভাবে তৈরি হবে" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "bg-white p-6 rounded-2xl border shadow-sm space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "পুরো নাম *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.full_name, onChange: (e) => set("full_name", e.target.value), required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "শ্রেণি *", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.class_level, onValueChange: (v) => set("class_level", v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বেছে নিন" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLASSES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
            c.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]),
            "ম শ্রেণি"
          ] }, c)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ব্যাচ *", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.batch, onValueChange: (v) => set("batch", v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বেছে নিন" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BATCHES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b.value, children: b.label }, b.value)) })
        ] }) }),
        showDept && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "বিভাগ", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.department, onValueChange: (v) => set("department", v), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: DEPTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: d.value, children: d.label }, d.value)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "বাবার নাম", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.father_name, onChange: (e) => set("father_name", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "মায়ের নাম", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.mother_name, onChange: (e) => set("mother_name", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "শিক্ষার্থীর ফোন (লগইনের জন্য) *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone, onChange: (e) => set("phone", e.target.value), placeholder: "01XXXXXXXXX", required: true }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "অভিভাবকের ফোন", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.guardian_phone, onChange: (e) => set("guardian_phone", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "পিতার পেশা", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.father_occupation, onChange: (e) => set("father_occupation", e.target.value) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "স্কুলের নাম", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.school_name, onChange: (e) => set("school_name", e.target.value) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ঠিকানা", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.address, onChange: (e) => set("address", e.target.value), rows: 2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t pt-4 bg-academy-soft -mx-6 px-6 py-4 rounded-b-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-academy-navy", children: "স্বয়ংক্রিয় পাসওয়ার্ড" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-1", children: [
          "পাসওয়ার্ড = মোবাইল নম্বরের শেষ ৬ ডিজিট",
          previewPassword && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " — যেমন: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-academy-gold", children: previewPassword })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: busy, className: "bg-academy-navy text-white", children: [
          busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }),
          "ভর্তি সম্পন্ন করুন"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: () => setForm(empty), children: "রিসেট" })
      ] })
    ] })
  ] });
}
function Field({
  label,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm", children: label }),
    children
  ] });
}
export {
  AdmissionPage as component
};
