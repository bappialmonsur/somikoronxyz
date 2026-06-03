import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useServerFn } from "./createSsrRpc-CnB93obs.mjs";
import { u as useQueryClient, a as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { l as listTeachers, s as setTeacherPermission } from "./teacher.functions-DZb7IobK.mjs";
import "../_libs/seroval.mjs";
import { l as UserCog, L as LoaderCircle, P as Phone } from "../_libs/lucide-react.mjs";
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
import "./server-BRebtgSX.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./auth-middleware-BdDOp7xZ.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
const FEATURES = [{
  key: "attendance",
  label: "উপস্থিতি"
}, {
  key: "results",
  label: "ফলাফল ও মার্কশিট"
}, {
  key: "newsfeed",
  label: "নোটিশ ও নিউজফিড"
}, {
  key: "admission",
  label: "নতুন ভর্তি"
}];
function TeachersAdmin() {
  const qc = useQueryClient();
  const callList = useServerFn(listTeachers);
  const callSet = useServerFn(setTeacherPermission);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-teachers"],
    queryFn: () => callList()
  });
  const mutation = useMutation({
    mutationFn: (v) => callSet({
      data: v
    }),
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: ["admin-teachers"]
      });
    },
    onError: (e) => toast.error(e?.message ?? "পরিবর্তন ব্যর্থ")
  });
  const teachers = data?.teachers ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "size-6 text-academy-navy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "শিক্ষক ব্যবস্থাপনা" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "প্রতিটি শিক্ষককে কোন কোন ফিচার ব্যবস্থাপনার অনুমতি দেবেন তা নিচে নির্ধারণ করুন। অনুমতি দেওয়া ফিচারগুলো শিক্ষকের ড্যাশবোর্ডে দেখা যাবে।" }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin text-academy-navy" }) }) : teachers.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border p-8 text-center text-muted-foreground", children: "এখনো কোনো শিক্ষক সাইনআপ করেননি।" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: teachers.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: t.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3" }),
          t.phone ? "0" + t.phone.replace(/^\+?880/, "") : "—"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: FEATURES.map((f) => {
        const enabled = t.permissions.includes(f.key);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center justify-between gap-3 rounded-xl border bg-academy-soft/40 px-4 py-3 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-academy-navy", children: f.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: enabled, disabled: mutation.isPending, onCheckedChange: (checked) => mutation.mutate({
            user_id: t.user_id,
            feature: f.key,
            enabled: checked
          }) })
        ] }, f.key);
      }) })
    ] }, t.user_id)) })
  ] });
}
export {
  TeachersAdmin as component
};
