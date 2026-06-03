import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { u as useMyAccess } from "./use-access-BrU4QPMt.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as CLASS_LEVELS, b as bnClass } from "./grading-0NP-FUhN.mjs";
import { N as Newspaper, X, al as ImagePlus, am as Video, an as Music, L as LoaderCircle, u as Send, y as Clock, G as GraduationCap, a7 as Check, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
function mediaUrl(path) {
  return supabase.storage.from("feed-media").getPublicUrl(path).data.publicUrl;
}
function FeedAdmin() {
  const qc = useQueryClient();
  const {
    user
  } = useSession();
  const {
    data: access
  } = useMyAccess(user);
  const fileRef = reactExports.useRef(null);
  const [body, setBody] = reactExports.useState("");
  const [classLevel, setClassLevel] = reactExports.useState("all");
  const [file, setFile] = reactExports.useState(null);
  const [preview, setPreview] = reactExports.useState(null);
  const [posting, setPosting] = reactExports.useState(false);
  const {
    data: profile
  } = useQuery({
    queryKey: ["my-profile-name", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle();
      return data;
    }
  });
  const mediaType = !file ? "text" : file.type.startsWith("image/") ? "image" : file.type.startsWith("video/") ? "video" : file.type.startsWith("audio/") ? "audio" : "text";
  const {
    data: posts,
    isLoading
  } = useQuery({
    queryKey: ["admin-feed"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("feed_posts").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    const channel = supabase.channel("admin-feed-rt").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "feed_posts"
    }, () => {
      qc.invalidateQueries({
        queryKey: ["admin-feed"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-notifications"]
      });
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);
  const pending = (posts ?? []).filter((p) => p.status === "pending");
  const published = (posts ?? []).filter((p) => p.status !== "pending");
  const pickFile = (f) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };
  const clearFile = () => {
    pickFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };
  const submit = async () => {
    if (!body.trim() && !file) {
      toast.error("কিছু লিখুন অথবা একটি মিডিয়া যোগ করুন");
      return;
    }
    setPosting(true);
    try {
      let media_path = null;
      if (file) {
        const ext = file.name.split(".").pop() ?? "bin";
        const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const {
          error: upErr
        } = await supabase.storage.from("feed-media").upload(path, file, {
          cacheControl: "3600",
          upsert: false
        });
        if (upErr) throw upErr;
        media_path = path;
      }
      const isAdmin = !!access?.isAdmin;
      const authorRole = isAdmin ? "admin" : "teacher";
      const authorName = isAdmin ? "সমীকরণ শিক্ষা পরিবার" : profile?.full_name || "শিক্ষক";
      const {
        error
      } = await supabase.from("feed_posts").insert({
        body: body.trim() || null,
        media_type: mediaType,
        media_path,
        class_level: classLevel === "all" ? null : classLevel,
        author_id: user.id,
        author_name: authorName,
        author_role: authorRole,
        status: "approved"
      });
      if (error) throw error;
      toast.success("পোস্ট প্রকাশিত হয়েছে");
      setBody("");
      setClassLevel("all");
      clearFile();
      qc.invalidateQueries({
        queryKey: ["admin-feed"]
      });
    } catch (e) {
      toast.error(e.message ?? "পোস্ট ব্যর্থ হয়েছে");
    } finally {
      setPosting(false);
    }
  };
  const approve = async (id) => {
    const {
      error
    } = await supabase.from("feed_posts").update({
      status: "approved"
    }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("অনুমোদিত হয়েছে — এখন ফিডে দেখা যাবে");
    qc.invalidateQueries({
      queryKey: ["admin-feed"]
    });
    qc.invalidateQueries({
      queryKey: ["admin-notifications"]
    });
  };
  const reject = async (id, path) => {
    if (!confirm("পোস্টটি বাতিল করবেন?")) return;
    if (path) await supabase.storage.from("feed-media").remove([path]);
    const {
      error
    } = await supabase.from("feed_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("বাতিল করা হয়েছে");
    qc.invalidateQueries({
      queryKey: ["admin-feed"]
    });
    qc.invalidateQueries({
      queryKey: ["admin-notifications"]
    });
  };
  const toggleActive = async (id, val) => {
    await supabase.from("feed_posts").update({
      is_active: val
    }).eq("id", id);
    qc.invalidateQueries({
      queryKey: ["admin-feed"]
    });
  };
  const handleDelete = async (id, path) => {
    if (!confirm("পোস্টটি মুছবেন?")) return;
    if (path) await supabase.storage.from("feed-media").remove([path]);
    const {
      error
    } = await supabase.from("feed_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("মুছে ফেলা হয়েছে");
    qc.invalidateQueries({
      queryKey: ["admin-feed"]
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Newspaper, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "নিউজফিড পোস্ট" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "ছবি, ভিডিও, অডিও বা লেখা পোস্ট করুন — শিক্ষার্থীরা ফিডে দেখবে" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, placeholder: "কিছু লিখুন...", value: body, onChange: (e) => setBody(e.target.value) }),
      preview && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-xl overflow-hidden border bg-academy-soft", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: clearFile, className: "absolute top-2 right-2 z-10 size-7 rounded-full bg-black/60 text-white flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }) }),
        mediaType === "image" && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: preview, alt: "preview", className: "w-full max-h-80 object-contain" }),
        mediaType === "video" && /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: preview, controls: true, className: "w-full max-h-80" }),
        mediaType === "audio" && /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { src: preview, controls: true, className: "w-full p-3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*,video/*,audio/*", className: "hidden", onChange: (e) => pickFile(e.target.files?.[0] ?? null) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", variant: "outline", size: "sm", onClick: () => fileRef.current?.click(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "size-4 mr-1" }),
          " মিডিয়া যোগ"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground hidden sm:flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "size-3.5" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "size-3.5" }),
          " ছবি/ভিডিও/অডিও"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: classLevel, onValueChange: setClassLevel, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-36 h-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "সবার জন্য" }),
              CLASS_LEVELS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: c, children: [
                bnClass(c),
                " শ্রেণি"
              ] }, c))
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: submit, disabled: posting, className: "bg-academy-navy text-white", children: [
            posting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4 mr-1" }),
            "পোস্ট"
          ] })
        ] })
      ] })
    ] }),
    pending.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-amber-50 rounded-2xl border border-amber-200 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex items-center gap-2 border-b border-amber-200 bg-amber-100/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-4 text-amber-700" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-amber-800 text-sm", children: [
          "শিক্ষার্থীদের অপেক্ষমাণ পোস্ট (",
          pending.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-amber-200", children: pending.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-academy-navy mb-1 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-3.5" }),
            " ",
            p.author_name
          ] }),
          p.author_meta && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "· ",
            p.author_meta
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            "· ",
            new Date(p.created_at).toLocaleString("bn-BD")
          ] })
        ] }),
        p.body && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-academy-navy whitespace-pre-wrap", children: p.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", className: "bg-green-600 hover:bg-green-700 text-white", onClick: () => approve(p.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-4 mr-1" }),
            " অনুমোদন"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "text-red-600 border-red-200", onClick: () => reject(p.id, p.media_path), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4 mr-1" }),
            " বাতিল"
          ] })
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : published.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "কোনো পোস্ট নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: published.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-4 flex gap-3 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        p.author_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs font-semibold text-academy-navy mb-1", children: [
          p.author_name,
          p.author_meta ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
            " · ",
            p.author_meta
          ] }) : null
        ] }),
        p.body && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-academy-navy whitespace-pre-wrap line-clamp-3", children: p.body }),
        p.media_type === "image" && p.media_path && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: mediaUrl(p.media_path), alt: "", className: "mt-2 rounded-lg max-h-32 border" }),
        p.media_type === "video" && p.media_path && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "size-3.5" }),
          " ভিডিও পোস্ট"
        ] }),
        p.media_type === "audio" && p.media_path && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-xs text-muted-foreground flex items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "size-3.5" }),
          " অডিও পোস্ট"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-2 flex gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-academy-soft rounded-full", children: p.class_level ? `${bnClass(p.class_level)} শ্রেণি` : "সবার জন্য" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(p.created_at).toLocaleString("bn-BD") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: p.is_active, onCheckedChange: (v) => toggleActive(p.id, v) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => handleDelete(p.id, p.media_path), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4 text-red-500" }) })
      ] })
    ] }, p.id)) }) })
  ] });
}
export {
  FeedAdmin as component
};
