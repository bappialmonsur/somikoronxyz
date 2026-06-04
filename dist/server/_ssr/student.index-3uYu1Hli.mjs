import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as bnClass, a as bnNum } from "./grading-0NP-FUhN.mjs";
import { F as FeedHeader, a as FeedList } from "./news-feed-DDav6-1E.mjs";
import { C as ClassMeritStrip } from "./class-merit-CcRrsFWv.mjs";
import { F as FeatureCards } from "./feature-cards-BuzaS7zM.mjs";
import "../_libs/katex.mjs";
import "../_libs/seroval.mjs";
import { t as PencilLine, L as LoaderCircle, u as Send, v as Film, w as Plus, x as Play, y as Clock, z as BadgeCheck, X, E as ChevronUp, I as ChevronDown, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./math-text-ChCUGY98.mjs";
import "./createSsrRpc-CYB9djso.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./server-BaXZwRBy.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./student-stats.functions-KjD_fr1i.mjs";
import "./auth-middleware-DoNSGWpn.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
function reelUrl(path) {
  return supabase.storage.from("feed-media").getPublicUrl(path).data.publicUrl;
}
async function getViewerIdentity(userId) {
  const { data: stu } = await supabase.from("students").select("full_name, class_level, roll").eq("user_id", userId).maybeSingle();
  if (stu) {
    const meta = stu.class_level ? `${bnClass(stu.class_level)} শ্রেণি · রোল ${bnNum(stu.roll ?? "")}`.trim() : null;
    return { name: stu.full_name, role: "student", meta };
  }
  const [{ data: prof }, { data: roles }] = await Promise.all([
    supabase.from("profiles").select("full_name").eq("id", userId).maybeSingle(),
    supabase.from("user_roles").select("role").eq("user_id", userId)
  ]);
  const isAdmin = (roles ?? []).some((r) => r.role === "admin");
  return {
    name: prof?.full_name || (isAdmin ? "সমীকরণ শিক্ষা পরিবার" : "শিক্ষক"),
    role: isAdmin ? "admin" : "teacher",
    meta: null
  };
}
function ReelsStrip() {
  const { user } = useSession();
  const qc = useQueryClient();
  const fileRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [viewerIndex, setViewerIndex] = reactExports.useState(null);
  const { data: reels } = useQuery({
    queryKey: ["reels", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase.from("feed_posts").select("id, body, media_path, author_id, author_name, author_role, author_meta, status, created_at").eq("is_reel", true).order("created_at", { ascending: false }).limit(40);
      if (error) throw error;
      return data.filter(
        (r) => r.status === "approved" || !!user && r.author_id === user.id
      );
    }
  });
  reactExports.useEffect(() => {
    if (!user) return;
    const channel = supabase.channel("reels-rt").on("postgres_changes", { event: "*", schema: "public", table: "feed_posts" }, () => {
      qc.invalidateQueries({ queryKey: ["reels", user.id] });
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, qc]);
  const onPick = async (f) => {
    if (!f || !user) return;
    if (!f.type.startsWith("video/")) {
      toast.error("শুধু ভিডিও ফাইল রিল হিসেবে যোগ করা যাবে");
      return;
    }
    if (f.size > 60 * 1024 * 1024) {
      toast.error("ভিডিওটি ৬০ MB এর বেশি — ছোট ভিডিও দিন");
      return;
    }
    setUploading(true);
    try {
      const ident = await getViewerIdentity(user.id);
      const ext = f.name.split(".").pop() ?? "mp4";
      const path = `reels/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage.from("feed-media").upload(path, f, { cacheControl: "3600", upsert: false });
      if (upErr) throw upErr;
      const isStaff = ident.role === "admin" || ident.role === "teacher";
      const { error } = await supabase.from("feed_posts").insert({
        body: null,
        media_type: "video",
        media_path: path,
        is_reel: true,
        class_level: null,
        author_id: user.id,
        author_name: ident.name,
        author_role: ident.role,
        author_meta: ident.meta,
        status: isStaff ? "approved" : "pending"
      });
      if (error) throw error;
      toast.success(
        isStaff ? "রিল প্রকাশিত হয়েছে" : "রিল জমা হয়েছে — এডমিন অনুমোদনের পর প্রকাশিত হবে"
      );
      qc.invalidateQueries({ queryKey: ["reels", user.id] });
    } catch (e) {
      toast.error(e.message ?? "রিল আপলোড ব্যর্থ হয়েছে");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };
  const list = reels ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl border border-border/70 shadow-sm p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 px-1 pb-2 text-sm font-semibold text-academy-navy", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Film, { className: "size-4 text-academy-gold" }),
      "রিলস"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "video/*",
        className: "hidden",
        onChange: (e) => onPick(e.target.files?.[0] ?? null)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => fileRef.current?.click(),
          disabled: uploading,
          className: "shrink-0 w-24 h-40 rounded-2xl border-2 border-dashed border-academy-gold/50 bg-academy-soft/50 flex flex-col items-center justify-center gap-2 text-academy-navy hover:bg-academy-soft transition-colors disabled:opacity-60",
          children: [
            uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-6 animate-spin text-academy-gold" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-10 rounded-full bg-academy-gold/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-5 text-academy-gold" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: "রিল যোগ" })
          ]
        }
      ),
      list.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setViewerIndex(i),
          className: "shrink-0 w-24 h-40 rounded-2xl overflow-hidden relative bg-black group",
          children: [
            r.media_path && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                src: reelUrl(r.media_path),
                muted: true,
                playsInline: true,
                preload: "metadata",
                className: "w-full h-full object-cover opacity-90 group-hover:opacity-100"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-9 rounded-full bg-white/25 backdrop-blur flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "size-4 text-white fill-white" }) }) }),
            r.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "absolute top-1.5 left-1.5 text-[9px] font-semibold text-amber-900 bg-amber-200/90 px-1.5 py-0.5 rounded-full flex items-center gap-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-2.5" }),
              " অপেক্ষমাণ"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-1.5 left-1.5 right-1.5 text-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] font-bold text-white truncate flex items-center gap-0.5", children: [
              r.author_name,
              (r.author_role === "admin" || r.author_role === "teacher") && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-2.5 text-academy-gold shrink-0" })
            ] }) })
          ]
        },
        r.id
      )),
      list.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 flex items-center text-xs text-muted-foreground px-2", children: "এখনো কোনো রিল নেই — প্রথম রিলটি যোগ করুন" })
    ] }),
    viewerIndex != null && list[viewerIndex] && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReelViewer,
      {
        reels: list,
        index: viewerIndex,
        setIndex: setViewerIndex,
        onClose: () => setViewerIndex(null),
        currentUserId: user?.id,
        onDeleted: () => qc.invalidateQueries({ queryKey: ["reels", user?.id] })
      }
    )
  ] });
}
function ReelViewer({
  reels,
  index,
  setIndex,
  onClose,
  currentUserId,
  onDeleted
}) {
  const r = reels[index];
  const [deleting, setDeleting] = reactExports.useState(false);
  const canDelete = !!currentUserId && r.author_id === currentUserId;
  const remove = async () => {
    if (!confirm("রিলটি মুছে ফেলবেন?")) return;
    setDeleting(true);
    try {
      if (r.media_path) await supabase.storage.from("feed-media").remove([r.media_path]);
      const { error } = await supabase.from("feed_posts").delete().eq("id", r.id);
      if (error) throw error;
      toast.success("রিল মুছে ফেলা হয়েছে");
      onDeleted();
      onClose();
    } catch (e) {
      toast.error(e.message ?? "মুছে ফেলা ব্যর্থ হয়েছে");
    } finally {
      setDeleting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 z-50 bg-black/95 flex items-center justify-center", onClick: onClose, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onClose,
        className: "absolute top-4 right-4 z-10 size-10 rounded-full bg-white/15 text-white flex items-center justify-center",
        "aria-label": "বন্ধ",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "relative w-full max-w-sm h-full sm:h-[85vh] sm:rounded-3xl overflow-hidden bg-black",
        onClick: (e) => e.stopPropagation(),
        children: [
          r.media_path && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              src: reelUrl(r.media_path),
              autoPlay: true,
              controls: true,
              playsInline: true,
              loop: true,
              className: "w-full h-full object-contain bg-black"
            },
            r.id
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-4 left-4 right-16 text-white", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-bold text-sm flex items-center gap-1", children: [
              r.author_name,
              (r.author_role === "admin" || r.author_role === "teacher") && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3.5 text-academy-gold" })
            ] }),
            r.author_meta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-white/70", children: r.author_meta }),
            r.body && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-white/90 mt-1 line-clamp-3", children: r.body })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                disabled: index === 0,
                onClick: () => setIndex(index - 1),
                className: "size-10 rounded-full bg-white/15 text-white flex items-center justify-center disabled:opacity-30",
                "aria-label": "আগের রিল",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                disabled: index === reels.length - 1,
                onClick: () => setIndex(index + 1),
                className: "size-10 rounded-full bg-white/15 text-white flex items-center justify-center disabled:opacity-30",
                "aria-label": "পরের রিল",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-5" })
              }
            ),
            canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: remove,
                disabled: deleting,
                className: "size-10 rounded-full bg-red-500/80 text-white flex items-center justify-center",
                "aria-label": "মুছুন",
                children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-5" })
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function StudentFeed() {
  const {
    user
  } = useSession();
  const qc = useQueryClient();
  const {
    data: student
  } = useQuery({
    queryKey: ["my-student", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data
      } = await supabase.from("students").select("*").eq("user_id", user.id).maybeSingle();
      return data;
    }
  });
  const {
    data: posts,
    isLoading
  } = useQuery({
    queryKey: ["student-feed", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("feed_posts").select("id, body, media_type, media_path, link_url, class_level, created_at, author_id, author_name, author_role, author_meta, status").eq("is_reel", false).order("created_at", {
        ascending: false
      }).limit(100);
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    if (!user) return;
    const channel = supabase.channel("student-feed-rt").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "feed_posts"
    }, () => {
      qc.invalidateQueries({
        queryKey: ["student-feed", user.id]
      });
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, qc]);
  const [body, setBody] = reactExports.useState("");
  const [posting, setPosting] = reactExports.useState(false);
  const submit = async () => {
    if (!body.trim() || !student) return;
    setPosting(true);
    try {
      const meta = `${bnClass(student.class_level)} শ্রেণি · রোল ${bnNum(student.roll ?? "")}`;
      const {
        error
      } = await supabase.from("feed_posts").insert({
        body: body.trim(),
        media_type: "text",
        media_path: null,
        class_level: null,
        author_id: user.id,
        author_name: student.full_name,
        author_role: "student",
        author_meta: meta,
        status: "pending"
      });
      if (error) throw error;
      toast.success("পোস্টটি জমা হয়েছে — এডমিন অনুমোদনের পর প্রকাশিত হবে");
      setBody("");
      qc.invalidateQueries({
        queryKey: ["student-feed", user.id]
      });
    } catch (e) {
      toast.error(e.message ?? "পোস্ট ব্যর্থ হয়েছে");
    } finally {
      setPosting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto space-y-5 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ClassMeritStrip, { userId: user?.id }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCards, { variant: "student" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeedHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReelsStrip, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl border border-border/70 shadow-sm p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm font-semibold text-academy-navy", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PencilLine, { className: "size-4 text-academy-gold" }),
        "কিছু শেয়ার করুন"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, placeholder: "আপনার মনের কথা লিখুন... (এডমিন অনুমোদনের পর সবার ফিডে যাবে)", value: body, onChange: (e) => setBody(e.target.value), className: "resize-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "আপনার নাম, শ্রেণি ও রোল পোস্টে দেখানো হবে" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: submit, disabled: posting || !body.trim(), className: "bg-academy-navy text-white", size: "sm", children: [
          posting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }),
          "পোস্ট করুন"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeedList, { posts, isLoading })
  ] });
}
export {
  StudentFeed as component
};
