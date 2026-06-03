import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { i as ClipboardCheck, L as LoaderCircle, a7 as Check, X, M as MessageSquare } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
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
const today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
function AttendancePage() {
  const qc = useQueryClient();
  const [cls, setCls] = reactExports.useState("");
  const [date, setDate] = reactExports.useState(today());
  const [rows, setRows] = reactExports.useState({});
  const [saving, setSaving] = reactExports.useState(false);
  const {
    data: students,
    isLoading
  } = useQuery({
    enabled: !!cls,
    queryKey: ["attendance-students", cls],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("students").select("*").eq("class_level", cls).eq("is_active", true).order("full_name");
      if (error) throw error;
      return data;
    }
  });
  const {
    data: existing
  } = useQuery({
    enabled: !!cls && !!date,
    queryKey: ["attendance-existing", cls, date],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("attendance").select("*").eq("class_level", cls).eq("date", date);
      if (error) throw error;
      const map = {};
      data?.forEach((a) => {
        map[a.student_id] = {
          status: a.status,
          reason: a.reason ?? ""
        };
      });
      setRows(map);
      return data;
    }
  });
  const setRow = (id, patch) => setRows((r) => ({
    ...r,
    [id]: {
      status: r[id]?.status ?? null,
      reason: r[id]?.reason ?? "",
      ...patch
    }
  }));
  const summary = reactExports.useMemo(() => {
    const arr = Object.values(rows);
    return {
      present: arr.filter((r) => r.status === "present").length,
      absent: arr.filter((r) => r.status === "absent").length
    };
  }, [rows]);
  const saveAll = async () => {
    if (!students?.length) return;
    const entries = students.filter((s) => rows[s.id]?.status).map((s) => ({
      student_id: s.id,
      class_level: cls,
      date,
      status: rows[s.id].status,
      reason: rows[s.id].status === "absent" ? rows[s.id].reason || null : null
    }));
    if (!entries.length) return toast.error("কমপক্ষে একজনের হাজিরা চিহ্নিত করুন");
    setSaving(true);
    const {
      error
    } = await supabase.from("attendance").upsert(entries, {
      onConflict: "student_id,date"
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("হাজিরা সংরক্ষিত হয়েছে");
    qc.invalidateQueries({
      queryKey: ["admin-stats"]
    });
  };
  const sendSMS = (phone, name) => {
    if (!phone) return toast.error("ফোন নম্বর নেই");
    const msg = encodeURIComponent(`প্রিয় অভিভাবক, আজ ${date} তারিখে ${name} অনুপস্থিত ছিল। — সমীকরণ শিক্ষা পরিবার`);
    window.open(`sms:${phone}?body=${msg}`, "_blank");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-green-500/15 text-green-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "দৈনিক হাজিরা" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "শ্রেণি ও তারিখ বেছে হাজিরা নিন" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 grid sm:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cls, onValueChange: setCls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "শ্রেণি নির্বাচন করুন" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["5", "6", "7", "8", "9", "10", "11", "12"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
          c.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]),
          "ম শ্রেণি"
        ] }, c)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", value: date, onChange: (e) => setDate(e.target.value) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-green-100 text-green-700", children: [
          "উপস্থিত: ",
          summary.present
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-3 py-1 rounded-full bg-red-100 text-red-700", children: [
          "অনুপস্থিত: ",
          summary.absent
        ] })
      ] })
    ] }),
    !cls ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-12 rounded-2xl border text-center text-muted-foreground", children: "শ্রেণি নির্বাচন করুন" }) : isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-12 rounded-2xl border flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : !students?.length ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white p-12 rounded-2xl border text-center text-muted-foreground", children: "এই শ্রেণিতে কোনো শিক্ষার্থী নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border divide-y", children: students.map((s) => {
        const row = rows[s.id] ?? {
          status: null,
          reason: ""
        };
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 flex flex-col sm:flex-row sm:items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-academy-navy truncate", children: s.full_name }),
            s.roll && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
              "রোল: ",
              s.roll
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: row.status === "present" ? "default" : "outline", className: row.status === "present" ? "bg-green-600 hover:bg-green-700 text-white" : "", onClick: () => setRow(s.id, {
              status: "present",
              reason: ""
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Check, {}),
              " উপস্থিত"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: row.status === "absent" ? "default" : "outline", className: row.status === "absent" ? "bg-red-600 hover:bg-red-700 text-white" : "", onClick: () => setRow(s.id, {
              status: "absent"
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}),
              " অনুপস্থিত"
            ] })
          ] }),
          row.status === "absent" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "কারণ", value: row.reason, onChange: (e) => setRow(s.id, {
              reason: e.target.value
            }), className: "sm:w-48" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "outline", title: "অভিভাবককে এসএমএস পাঠান", onClick: () => sendSMS(s.guardian_phone || s.phone, s.full_name), children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-4" }) })
          ] })
        ] }, s.id);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end gap-2 sticky bottom-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: saveAll, disabled: saving, className: "bg-academy-navy text-white shadow-lg", children: [
        saving && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }),
        "হাজিরা সংরক্ষণ করুন"
      ] }) })
    ] })
  ] });
}
export {
  AttendancePage as component
};
