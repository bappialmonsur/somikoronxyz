import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { C as CLASS_LEVELS, b as bnClass } from "./grading-0NP-FUhN.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-CnB93obs.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BdDOp7xZ.mjs";
import { c as createServerFn } from "./server-BRebtgSX.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, w as Plus, T as Trash2, Z as Sparkles, V as Upload } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
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
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
const inputSchema = objectType({
  title: stringType().trim().min(1).max(200),
  tag: stringType().trim().max(100).optional().default(""),
  class_level: stringType().trim().max(20).optional().default(""),
  duration: stringType().trim().max(50).optional().default(""),
  description: stringType().trim().max(800).optional().default("")
});
const generateCourseCover = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => inputSchema.parse(input)).handler(createSsrRpc("6943534347f56242f50e500b18d39b90dc1377a093a548fc533aedda28d18a4c"));
const SITE_BUCKET = "site-assets";
const PDF_BUCKET = "pdf-notes";
function publicUrl(path) {
  const {
    data
  } = supabase.storage.from(SITE_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
function SiteManagement() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-6xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "ওয়েবসাইট ম্যানেজমেন্ট" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "ফ্রন্টপেজের কনটেন্ট এখান থেকে কন্ট্রোল করুন" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "hero", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-4 max-w-2xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "hero", children: "ব্যানার" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "courses", children: "কোর্স" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "pdfs", children: "পিডিএফ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "gallery", children: "গ্যালারি" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "hero", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeroManager, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "courses", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CoursesManager, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "pdfs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PdfsManager, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "gallery", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GalleryManager, {}) })
    ] })
  ] });
}
function HeroManager() {
  const qc = useQueryClient();
  const [busy, setBusy] = reactExports.useState(false);
  const [title, setTitle] = reactExports.useState("");
  const [subtitle, setSubtitle] = reactExports.useState("");
  const [badge, setBadge] = reactExports.useState("");
  const fileRef = reactExports.useRef(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["admin-hero"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("hero_slides").select("*").order("sort_order");
      if (error) throw error;
      return data2 ?? [];
    }
  });
  const onAdd = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file || !title) return toast.error("ছবি ও টাইটেল দিন");
    setBusy(true);
    try {
      const path = `hero/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const {
        error: upErr
      } = await supabase.storage.from(SITE_BUCKET).upload(path, file);
      if (upErr) throw upErr;
      const {
        error
      } = await supabase.from("hero_slides").insert({
        title,
        subtitle: subtitle || null,
        badge: badge || null,
        image_path: path,
        sort_order: (data?.length ?? 0) + 1
      });
      if (error) throw error;
      toast.success("যোগ হয়েছে");
      setTitle("");
      setSubtitle("");
      setBadge("");
      if (fileRef.current) fileRef.current.value = "";
      qc.invalidateQueries({
        queryKey: ["admin-hero"]
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  const onDelete = async (id, path) => {
    if (!confirm("মুছবেন?")) return;
    await supabase.storage.from(SITE_BUCKET).remove([path]);
    await supabase.from("hero_slides").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-hero"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: "নতুন ব্যানার যোগ করুন" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "টাইটেল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: title, onChange: (e) => setTitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ব্যাজ (ঐচ্ছিক)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: badge, onChange: (e) => setBadge(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "সাবটাইটেল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: subtitle, onChange: (e) => setSubtitle(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ছবি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ref: fileRef, type: "file", accept: "image/*" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onAdd, disabled: busy, className: "bg-academy-navy text-white", children: [
        busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
        " যোগ করুন"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: [
      isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }),
      data?.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: publicUrl(s.image_path), alt: s.title, className: "w-full aspect-video object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: s.title }),
          s.subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: s.subtitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", size: "sm", onClick: () => onDelete(s.id, s.image_path), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" }),
            " মুছুন"
          ] })
        ] })
      ] }, s.id))
    ] })
  ] });
}
function CoursesManager() {
  const qc = useQueryClient();
  const [busy, setBusy] = reactExports.useState(false);
  const [genBusy, setGenBusy] = reactExports.useState(false);
  const [aiCoverPath, setAiCoverPath] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState({
    title: "",
    description: "",
    tag: "",
    fee: "",
    duration: "",
    class_level: ""
  });
  const fileRef = reactExports.useRef(null);
  const genCover = useServerFn(generateCourseCover);
  const {
    data
  } = useQuery({
    queryKey: ["admin-courses"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("courses").select("*").order("sort_order");
      if (error) throw error;
      return data2 ?? [];
    }
  });
  const onAdd = async () => {
    if (!form.title) return toast.error("নাম দিন");
    setBusy(true);
    try {
      let path = aiCoverPath;
      const file = fileRef.current?.files?.[0];
      if (file) {
        path = `courses/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const {
          error: upErr
        } = await supabase.storage.from(SITE_BUCKET).upload(path, file);
        if (upErr) throw upErr;
      }
      const {
        error
      } = await supabase.from("courses").insert({
        title: form.title,
        description: form.description || null,
        tag: form.tag || null,
        fee: form.fee || null,
        duration: form.duration || null,
        class_level: form.class_level || null,
        image_path: path,
        sort_order: (data?.length ?? 0) + 1
      });
      if (error) throw error;
      toast.success("যোগ হয়েছে");
      setForm({
        title: "",
        description: "",
        tag: "",
        fee: "",
        duration: "",
        class_level: ""
      });
      setAiCoverPath(null);
      if (fileRef.current) fileRef.current.value = "";
      qc.invalidateQueries({
        queryKey: ["admin-courses"]
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  const onGenerateCover = async () => {
    if (!form.title) return toast.error("আগে কোর্সের নাম দিন");
    setGenBusy(true);
    try {
      const res = await genCover({
        data: {
          title: form.title,
          tag: form.tag,
          class_level: form.class_level,
          duration: form.duration,
          description: form.description
        }
      });
      setAiCoverPath(res.path);
      if (fileRef.current) fileRef.current.value = "";
      toast.success("AI কভার তৈরি হয়েছে — যোগ করুন চাপুন");
    } catch (e) {
      toast.error(e.message ?? "ব্যর্থ");
    } finally {
      setGenBusy(false);
    }
  };
  const onDelete = async (id, path) => {
    if (!confirm("মুছবেন?")) return;
    if (path) await supabase.storage.from(SITE_BUCKET).remove([path]);
    await supabase.from("courses").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-courses"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: "নতুন কোর্স যোগ করুন" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "কোর্সের নাম" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ট্যাগ (যেমন SSC Batch)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.tag, onChange: (e) => setForm({
            ...form,
            tag: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ফি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.fee, onChange: (e) => setForm({
            ...form,
            fee: e.target.value
          }), placeholder: "যেমন ১৫০০/মাস" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "সময়কাল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.duration, onChange: (e) => setForm({
            ...form,
            duration: e.target.value
          }), placeholder: "যেমন ৬ মাস" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শ্রেণি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.class_level, onValueChange: (v) => setForm({
            ...form,
            class_level: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বাছাই" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLASS_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
              bnClass(c),
              " শ্রেণি"
            ] }, c)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "কভার ছবি (আপলোড করুন অথবা AI দিয়ে তৈরি করুন)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ref: fileRef, type: "file", accept: "image/*", onChange: () => setAiCoverPath(null) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "বিবরণ" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: form.description, onChange: (e) => setForm({
            ...form,
            description: e.target.value
          }), rows: 3 })
        ] })
      ] }),
      aiCoverPath && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-academy-gold/40 bg-academy-soft p-3 flex gap-3 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: publicUrl(aiCoverPath), alt: "AI cover preview", className: "w-32 aspect-video object-cover rounded-md border" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-academy-gold", children: "AI দ্বারা তৈরি কভার প্রস্তুত" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: '"যোগ করুন" চাপলে এটি কোর্সের সাথে সেভ হবে।' })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", onClick: () => setAiCoverPath(null), children: "বাতিল" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onAdd, disabled: busy || genBusy, className: "bg-academy-navy text-white", children: [
          busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
          " যোগ করুন"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onGenerateCover, disabled: genBusy || busy, variant: "outline", className: "border-academy-gold text-academy-navy", children: [
          genBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-academy-gold" }),
          genBusy ? "AI কভার তৈরি হচ্ছে…" : "AI দিয়ে এক্সক্লুসিভ কভার তৈরি করুন"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4", children: data?.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border overflow-hidden", children: [
      c.image_path && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: publicUrl(c.image_path), alt: c.title, className: "w-full aspect-video object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 space-y-1", children: [
        c.tag && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-bold text-academy-gold", children: c.tag }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: c.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground line-clamp-2", children: c.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
          c.class_level && `${bnClass(c.class_level)} শ্রেণি`,
          " ",
          c.fee && ` • ${c.fee}`,
          " ",
          c.duration && ` • ${c.duration}`
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive", size: "sm", onClick: () => onDelete(c.id, c.image_path), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" }),
          " মুছুন"
        ] })
      ] })
    ] }, c.id)) })
  ] });
}
function PdfsManager() {
  const qc = useQueryClient();
  const [busy, setBusy] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    title: "",
    subject: "",
    class_level: "",
    pages: ""
  });
  const fileRef = reactExports.useRef(null);
  const {
    data
  } = useQuery({
    queryKey: ["admin-pdfs"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("pdf_notes").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2 ?? [];
    }
  });
  const onAdd = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file || !form.title || !form.class_level) return toast.error("টাইটেল, শ্রেণি ও ফাইল দিন");
    setBusy(true);
    try {
      const path = `${form.class_level}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const {
        error: upErr
      } = await supabase.storage.from(PDF_BUCKET).upload(path, file);
      if (upErr) throw upErr;
      const {
        error
      } = await supabase.from("pdf_notes").insert({
        title: form.title,
        subject: form.subject || null,
        class_level: form.class_level,
        pages: form.pages ? Number(form.pages) : null,
        file_size_kb: Math.round(file.size / 1024),
        file_path: path
      });
      if (error) throw error;
      toast.success("যোগ হয়েছে");
      setForm({
        title: "",
        subject: "",
        class_level: "",
        pages: ""
      });
      if (fileRef.current) fileRef.current.value = "";
      qc.invalidateQueries({
        queryKey: ["admin-pdfs"]
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  const onDelete = async (id, path) => {
    if (!confirm("মুছবেন?")) return;
    await supabase.storage.from(PDF_BUCKET).remove([path]);
    await supabase.from("pdf_notes").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-pdfs"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: "নতুন পিডিএফ নোট" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "টাইটেল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.title, onChange: (e) => setForm({
            ...form,
            title: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "বিষয়" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.subject, onChange: (e) => setForm({
            ...form,
            subject: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "শ্রেণি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: form.class_level, onValueChange: (v) => setForm({
            ...form,
            class_level: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "বাছাই" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CLASS_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
              bnClass(c),
              " শ্রেণি"
            ] }, c)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "পৃষ্ঠা সংখ্যা" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: form.pages, onChange: (e) => setForm({
            ...form,
            pages: e.target.value
          }), type: "number" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:col-span-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "পিডিএফ ফাইল" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ref: fileRef, type: "file", accept: "application/pdf" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onAdd, disabled: busy, className: "bg-academy-navy text-white", children: [
        busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4" }),
        " আপলোড করুন"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-academy-soft text-academy-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2 text-left", children: "টাইটেল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "বিষয়" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "শ্রেণি" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "পৃষ্ঠা" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2", children: "সাইজ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-2" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: data?.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2", children: n.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: n.subject }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: bnClass(n.class_level) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: n.pages ?? "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-center", children: n.file_size_kb ? `${(n.file_size_kb / 1024).toFixed(1)} MB` : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "p-2 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", onClick: () => onDelete(n.id, n.file_path), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" }) }) })
      ] }, n.id)) })
    ] }) })
  ] });
}
function GalleryManager() {
  const qc = useQueryClient();
  const [busy, setBusy] = reactExports.useState(false);
  const [caption, setCaption] = reactExports.useState("");
  const fileRef = reactExports.useRef(null);
  const {
    data
  } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("gallery_images").select("*").order("sort_order");
      if (error) throw error;
      return data2 ?? [];
    }
  });
  const onAdd = async () => {
    const file = fileRef.current?.files?.[0];
    if (!file) return toast.error("ছবি দিন");
    setBusy(true);
    try {
      const path = `gallery/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const {
        error: upErr
      } = await supabase.storage.from(SITE_BUCKET).upload(path, file);
      if (upErr) throw upErr;
      const {
        error
      } = await supabase.from("gallery_images").insert({
        caption: caption || null,
        image_path: path,
        sort_order: (data?.length ?? 0) + 1
      });
      if (error) throw error;
      toast.success("যোগ হয়েছে");
      setCaption("");
      if (fileRef.current) fileRef.current.value = "";
      qc.invalidateQueries({
        queryKey: ["admin-gallery"]
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };
  const onDelete = async (id, path) => {
    if (!confirm("মুছবেন?")) return;
    await supabase.storage.from(SITE_BUCKET).remove([path]);
    await supabase.from("gallery_images").delete().eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-gallery"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 mt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: "নতুন ছবি" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ক্যাপশন (ঐচ্ছিক)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: caption, onChange: (e) => setCaption(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "ছবি" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ref: fileRef, type: "file", accept: "image/*" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: onAdd, disabled: busy, className: "bg-academy-navy text-white", children: [
        busy ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
        " যোগ করুন"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3", children: data?.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group bg-white rounded-xl border overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: publicUrl(g.image_path), alt: g.caption ?? "", className: "w-full aspect-square object-cover" }),
      g.caption && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-xs", children: g.caption }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", size: "sm", className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100", onClick: () => onDelete(g.id, g.image_path), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" }) })
    ] }, g.id)) })
  ] });
}
export {
  SiteManagement as component
};
