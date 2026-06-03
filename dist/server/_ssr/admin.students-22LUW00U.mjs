import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { D as Dialog, a as DialogContent, c as DialogHeader, b as DialogTitle, d as DialogFooter } from "./dialog-BBLoBcjX.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { g as Users, f as UserPlus, af as Search, L as LoaderCircle, P as Phone, ag as Pencil, ah as Power, ai as PowerOff, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
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
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-presence.mjs";
const BATCH_LABEL = {
  morning: "সকাল",
  afternoon: "বিকাল",
  evening: "সন্ধ্যা"
};
const DEPT_LABEL = {
  science: "বিজ্ঞান",
  business: "ব্যবসায়",
  none: "—"
};
const CLASSES = ["5", "6", "7", "8", "9", "10", "11", "12"];
const toBn = (s) => s.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[+d]);
function StudentsPage() {
  const qc = useQueryClient();
  const [q, setQ] = reactExports.useState("");
  const [cls, setCls] = reactExports.useState("all");
  const [batch, setBatch] = reactExports.useState("all");
  const [dept, setDept] = reactExports.useState("all");
  const [status, setStatus] = reactExports.useState("active");
  const [editing, setEditing] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["students", cls, batch, dept, status],
    queryFn: async () => {
      let query = supabase.from("students").select("*").order("created_at", {
        ascending: false
      });
      if (cls !== "all") query = query.eq("class_level", cls);
      if (batch !== "all") query = query.eq("batch", batch);
      if (dept !== "all") query = query.eq("department", dept);
      if (status === "active") query = query.eq("is_active", true);
      else if (status === "inactive") query = query.eq("is_active", false);
      const {
        data: data2,
        error
      } = await query;
      if (error) throw error;
      return data2;
    }
  });
  const filtered = data?.filter((s) => !q || s.full_name.toLowerCase().includes(q.toLowerCase()) || (s.phone ?? "").includes(q));
  const handleDelete = async (id, name) => {
    if (!confirm(`"${name}" কে স্থায়ীভাবে মুছে ফেলবেন? এই কাজ ফেরানো যাবে না।`)) return;
    const {
      error
    } = await supabase.from("students").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("মুছে ফেলা হয়েছে");
    qc.invalidateQueries({
      queryKey: ["students"]
    });
  };
  const handleToggleActive = async (id, current, name) => {
    const next = !current;
    const msg = next ? `"${name}" কে আবার এক্টিভ করবেন?` : `"${name}" কে ইনএক্টিভ করবেন? উপস্থিতি ও ফলাফলে দেখা যাবে না (ডেটা থেকে যাবে)।`;
    if (!confirm(msg)) return;
    const {
      error
    } = await supabase.from("students").update({
      is_active: next
    }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(next ? "এক্টিভ করা হয়েছে" : "ইনএক্টিভ করা হয়েছে");
    qc.invalidateQueries({
      queryKey: ["students"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "সকল শিক্ষার্থী" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          filtered?.length ?? 0,
          " জন"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/admission", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-academy-navy text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, {}),
        " নতুন ভর্তি"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "নাম/ফোন খুঁজুন", className: "pl-9", value: q, onChange: (e) => setQ(e.target.value) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cls, onValueChange: setCls, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "শ্রেণি" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব শ্রেণি" }),
          CLASSES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
            toBn(c),
            "ম"
          ] }, c))
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: batch, onValueChange: setBatch, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "ব্যাচ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব ব্যাচ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "morning", children: "সকাল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "afternoon", children: "বিকাল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "evening", children: "সন্ধ্যা" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: dept, onValueChange: setDept, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বিভাগ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সব বিভাগ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "science", children: "বিজ্ঞান" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "business", children: "ব্যবসায়" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "বিভাগ নেই" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: setStatus, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "active", children: "শুধু এক্টিভ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "inactive", children: "শুধু ইনএক্টিভ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সবাই" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : (filtered?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "কোনো শিক্ষার্থী পাওয়া যায়নি" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "নাম" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "শ্রেণি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ব্যাচ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "বিভাগ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ফোন" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "স্ট্যাটাস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: filtered.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: s.is_active === false ? "opacity-60" : "", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-academy-navy", children: s.full_name }),
          s.roll && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            "রোল: ",
            s.roll
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          toBn(String(s.class_level)),
          "ম"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: BATCH_LABEL[s.batch] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: DEPT_LABEL[s.department] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.guardian_phone || s.phone ? /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${s.guardian_phone || s.phone}`, className: "text-academy-navy hover:text-academy-gold flex items-center gap-1 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "size-3" }),
          " ",
          s.guardian_phone || s.phone
        ] }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.is_active === false ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-700", children: "ইনএক্টিভ" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700", children: "এক্টিভ" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "এডিট করুন", onClick: () => setEditing(s), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-4 text-blue-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: s.is_active === false ? "এক্টিভ করুন" : "ইনএক্টিভ করুন", onClick: () => handleToggleActive(s.id, s.is_active !== false, s.full_name), children: s.is_active === false ? /* @__PURE__ */ jsxRuntimeExports.jsx(Power, { className: "size-4 text-green-600" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(PowerOff, { className: "size-4 text-amber-600" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", title: "মুছে ফেলুন", onClick: () => handleDelete(s.id, s.full_name), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4 text-red-500" }) })
        ] }) })
      ] }, s.id)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditStudentDialog, { student: editing, onClose: () => setEditing(null), onSaved: () => {
      setEditing(null);
      qc.invalidateQueries({
        queryKey: ["students"]
      });
    } })
  ] });
}
function EditStudentDialog({
  student,
  onClose,
  onSaved
}) {
  const [form, setForm] = reactExports.useState({});
  const [busy, setBusy] = reactExports.useState(false);
  const [lastId, setLastId] = reactExports.useState(null);
  if (student && student.id !== lastId) {
    setLastId(student.id);
    setForm({
      full_name: student.full_name ?? "",
      roll: student.roll ?? "",
      class_level: String(student.class_level ?? ""),
      batch: student.batch ?? "",
      department: student.department ?? "none",
      father_name: student.father_name ?? "",
      mother_name: student.mother_name ?? "",
      father_occupation: student.father_occupation ?? "",
      school_name: student.school_name ?? "",
      phone: student.phone ?? "",
      guardian_phone: student.guardian_phone ?? "",
      address: student.address ?? ""
    });
  }
  if (!student && lastId !== null) setLastId(null);
  const set = (k, v) => setForm((f) => ({
    ...f,
    [k]: v
  }));
  const showDept = ["9", "10", "11", "12"].includes(String(form.class_level));
  const onSave = async () => {
    if (!form.full_name?.trim()) return toast.error("নাম আবশ্যক");
    setBusy(true);
    const payload = {
      full_name: form.full_name.trim(),
      roll: form.roll?.trim() || null,
      class_level: form.class_level,
      batch: form.batch,
      department: showDept ? form.department : "none",
      father_name: form.father_name?.trim() || null,
      mother_name: form.mother_name?.trim() || null,
      father_occupation: form.father_occupation?.trim() || null,
      school_name: form.school_name?.trim() || null,
      phone: form.phone?.trim() || null,
      guardian_phone: form.guardian_phone?.trim() || null,
      address: form.address?.trim() || null
    };
    const {
      error
    } = await supabase.from("students").update(payload).eq("id", student.id);
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success("তথ্য আপডেট হয়েছে");
    onSaved();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!student, onOpenChange: (o) => {
    if (!o) onClose();
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-2xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "শিক্ষার্থীর তথ্য এডিট" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "পুরো নাম *", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.full_name ?? "", onChange: (e) => set("full_name", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "রোল", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.roll ?? "", onChange: (e) => set("roll", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "শ্রেণি", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.class_level ?? "", onValueChange: (v) => set("class_level", v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বেছে নিন" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLASSES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
          toBn(c),
          "ম শ্রেণি"
        ] }, c)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ব্যাচ", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.batch ?? "", onValueChange: (v) => set("batch", v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বেছে নিন" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "morning", children: "সকাল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "afternoon", children: "বিকাল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "evening", children: "সন্ধ্যা" })
        ] })
      ] }) }),
      showDept && /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "বিভাগ", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.department ?? "none", onValueChange: (v) => set("department", v), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "প্রযোজ্য নয়" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "science", children: "বিজ্ঞান" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "business", children: "ব্যবসায় শিক্ষা" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "শিক্ষার্থীর ফোন", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.phone ?? "", onChange: (e) => set("phone", e.target.value), placeholder: "01XXXXXXXXX" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "অভিভাবকের ফোন", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.guardian_phone ?? "", onChange: (e) => set("guardian_phone", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "বাবার নাম", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.father_name ?? "", onChange: (e) => set("father_name", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "মায়ের নাম", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.mother_name ?? "", onChange: (e) => set("mother_name", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "পিতার পেশা", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.father_occupation ?? "", onChange: (e) => set("father_occupation", e.target.value) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "স্কুলের নাম", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.school_name ?? "", onChange: (e) => set("school_name", e.target.value) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "ঠিকানা", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.address ?? "", onChange: (e) => set("address", e.target.value), rows: 2 }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: onClose, disabled: busy, children: "বাতিল" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-academy-navy text-white", onClick: onSave, disabled: busy, children: [
        busy && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }),
        " সংরক্ষণ"
      ] })
    ] })
  ] }) });
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
  StudentsPage as component
};
