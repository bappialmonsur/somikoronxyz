import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useServerFn } from "./createSsrRpc-CnB93obs.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { P as PasswordInput } from "./password-input-ptnVnuNG.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger } from "./tabs-D_u1EXWn.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { n as normalizeBdPhone } from "./phone-B7PBua8H.mjs";
import { c as checkAdminExists, b as bootstrapAdminAccount } from "./admin.functions-Boxvezwd.mjs";
import { t as teacherSignup } from "./teacher.functions-DZb7IobK.mjs";
import "../_libs/seroval.mjs";
import { d as ShieldCheck, P as Phone, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
import "./server-BRebtgSX.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "./auth-middleware-BdDOp7xZ.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = reactExports.useState("login");
  const [phone, setPhone] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [busy, setBusy] = reactExports.useState(false);
  const [adminExists, setAdminExists] = reactExports.useState(null);
  const callBootstrap = useServerFn(bootstrapAdminAccount);
  const callCheckAdmin = useServerFn(checkAdminExists);
  const callTeacherSignup = useServerFn(teacherSignup);
  reactExports.useEffect(() => {
    callCheckAdmin().then((r) => setAdminExists(r.exists)).catch(() => setAdminExists(true));
  }, [callCheckAdmin]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneE164 = normalizeBdPhone(phone);
    if (!phoneE164) {
      toast.error("সঠিক ১১ ডিজিটের ফোন নম্বর দিন (যেমন: 01712345678)");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষর");
      return;
    }
    setBusy(true);
    const syntheticEmail = `${phoneE164.replace(/\D/g, "")}@somikoron.local`;
    try {
      if (mode === "bootstrap" || mode === "teacher") {
        if (fullName.trim().length < 2) {
          toast.error("পুরো নাম দিন");
          setBusy(false);
          return;
        }
        if (mode === "bootstrap") {
          await callBootstrap({
            data: {
              phone: phoneE164,
              password,
              full_name: fullName
            }
          });
        } else {
          await callTeacherSignup({
            data: {
              phone: phoneE164,
              password,
              full_name: fullName
            }
          });
        }
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email: syntheticEmail,
          password
        });
        if (error) throw error;
        toast.success(mode === "bootstrap" ? "এডমিন একাউন্ট তৈরি হয়েছে!" : "শিক্ষক একাউন্ট তৈরি হয়েছে!");
      } else {
        const {
          error
        } = await supabase.auth.signInWithPassword({
          email: syntheticEmail,
          password
        });
        if (error) throw error;
        toast.success("সফলভাবে লগইন হয়েছেন");
      }
      const {
        data: {
          user
        }
      } = await supabase.auth.getUser();
      let dest = "/student";
      if (user) {
        const {
          data: roleRows
        } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
        if ((roleRows ?? []).some((r) => r.role === "admin" || r.role === "teacher")) dest = "/admin";
      }
      navigate({
        to: dest
      });
    } catch (err) {
      toast.error(err.message ?? "ত্রুটি হয়েছে");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-academy-soft p-4", style: {
    fontFamily: "'Hind Siliguri', sans-serif"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-academy-navy/10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 mb-6 text-academy-navy", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-academy-navy text-white flex items-center justify-center font-bold", children: "স" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold", children: "সমীকরণ শিক্ষা পরিবার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "লগইন প্যানেল" })
      ] })
    ] }),
    adminExists === false ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: mode === "teacher" ? "login" : mode, onValueChange: (v) => setMode(v), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-2 w-full mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "login", children: "লগইন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "bootstrap", children: "প্রথম এডমিন তৈরি" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormBody, { ...{
        mode,
        phone,
        setPhone,
        password,
        setPassword,
        fullName,
        setFullName,
        busy,
        handleSubmit
      } })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FormBody, { ...{
      mode: mode === "bootstrap" ? "login" : mode,
      phone,
      setPhone,
      password,
      setPassword,
      fullName,
      setFullName,
      busy,
      handleSubmit
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-center text-sm", children: mode === "teacher" ? /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("login"), className: "text-academy-navy underline", children: "লগইনে ফিরে যান" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setMode("teacher"), className: "text-academy-navy underline", children: "শিক্ষক? নতুন একাউন্ট তৈরি করুন" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 p-3 bg-academy-soft rounded-lg flex gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 text-academy-gold shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "শিক্ষার্থী: ভর্তি ফরমে দেওয়া ফোন নম্বর ও এডমিন কর্তৃক সেট করা পাসওয়ার্ড দিয়ে লগইন করুন। শিক্ষক একাউন্ট তৈরির পর এডমিন অনুমতি দিলে ফিচার দেখা যাবে।" })
    ] })
  ] }) });
}
function FormBody(props) {
  const {
    mode,
    phone,
    setPhone,
    password,
    setPassword,
    fullName,
    setFullName,
    busy,
    handleSubmit
  } = props;
  const isSignup = mode === "bootstrap" || mode === "teacher";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
    isSignup && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "name", children: "পুরো নাম" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "name", value: fullName, onChange: (e) => setFullName(e.target.value), placeholder: "আপনার নাম" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "phone", children: "ফোন নম্বর" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "phone", inputMode: "numeric", value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "01712345678", className: "pl-9", required: true })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "password", children: "পাসওয়ার্ড" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { id: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "submit", disabled: busy, className: "w-full bg-academy-navy hover:bg-academy-navy/90 text-white", children: [
      busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }),
      mode === "bootstrap" ? "এডমিন একাউন্ট তৈরি করুন" : mode === "teacher" ? "শিক্ষক একাউন্ট তৈরি করুন" : "লগইন করুন"
    ] })
  ] });
}
export {
  LoginPage as component
};
