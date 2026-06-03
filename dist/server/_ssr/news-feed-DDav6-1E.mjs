import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { M as MathText } from "./math-text-ChCUGY98.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { Z as Sparkles, L as LoaderCircle, ab as ImageOff, z as BadgeCheck, G as GraduationCap, y as Clock, T as Trash2, p as Heart, q as MessageCircle, ac as Share2, u as Send } from "../_libs/lucide-react.mjs";
function youtubeId(url) {
  if (!url) return null;
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([\w-]{11})/);
  return m ? m[1] : null;
}
function mediaUrl(path) {
  return supabase.storage.from("feed-media").getPublicUrl(path).data.publicUrl;
}
function timeAgo(iso) {
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 1e3);
  if (diff < 60) return "এইমাত্র";
  if (diff < 3600) return `${Math.floor(diff / 60)} মিনিট আগে`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ঘণ্টা আগে`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} দিন আগে`;
  return d.toLocaleDateString("bn-BD");
}
const ROLE_LABEL = {
  admin: "এডমিন",
  teacher: "শিক্ষক",
  student: "শিক্ষার্থী"
};
function useViewerIdentity(userId) {
  return useQuery({
    queryKey: ["viewer-identity", userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data: stu } = await supabase.from("students").select("full_name, class_level, roll").eq("user_id", userId).maybeSingle();
      if (stu) {
        const meta = stu.class_level ? `${stu.class_level} শ্রেণি · রোল ${stu.roll ?? ""}`.trim() : null;
        return { name: stu.full_name, role: "student", meta };
      }
      const [{ data: prof }, { data: roles }] = await Promise.all([
        supabase.from("profiles").select("full_name").eq("id", userId).maybeSingle(),
        supabase.from("user_roles").select("role").eq("user_id", userId)
      ]);
      const isAdmin = (roles ?? []).some((r) => r.role === "admin");
      return {
        name: prof?.full_name || (isAdmin ? "এডমিন" : "শিক্ষক"),
        role: isAdmin ? "admin" : "teacher",
        meta: null
      };
    }
  });
}
function FeedHeader({ subtitle }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: "relative overflow-hidden rounded-3xl p-5 text-white shadow-xl",
      style: { background: "var(--gradient-hero)" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -right-10 -top-12 size-40 rounded-full opacity-25 blur-2xl",
            style: { background: "var(--gradient-gold)" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -left-8 bottom-0 size-24 rounded-full bg-white/10 blur-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "size-12 rounded-2xl flex items-center justify-center text-academy-navy font-extrabold text-xl shadow-lg ring-2 ring-white/30",
              style: { background: "var(--gradient-gold)" },
              children: "স"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold leading-tight truncate", children: "নিউজফিড" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-[10px] font-semibold bg-white/20 backdrop-blur px-2 py-0.5 rounded-full ring-1 ring-white/25", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3" }),
                " এক্সক্লুসিভ"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/75 mt-0.5", children: subtitle ?? "সমীকরণ শিক্ষা পরিবারের সর্বশেষ আপডেট" })
          ] })
        ] })
      ]
    }
  );
}
function CommentSection({ postId }) {
  const { user } = useSession();
  const qc = useQueryClient();
  const { data: viewer } = useViewerIdentity(user?.id);
  const [text, setText] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const { data: comments, isLoading } = useQuery({
    queryKey: ["post-comments", postId],
    queryFn: async () => {
      const { data, error } = await supabase.from("post_comments").select("id, user_id, author_name, author_role, author_meta, body, created_at").eq("post_id", postId).order("created_at", { ascending: true });
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    const channel = supabase.channel(`comments-rt-${postId}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "post_comments", filter: `post_id=eq.${postId}` },
      () => {
        qc.invalidateQueries({ queryKey: ["post-comments", postId] });
        qc.invalidateQueries({ queryKey: ["post-comment-count", postId] });
      }
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId, qc]);
  const submit = async () => {
    if (!text.trim() || !user || !viewer) return;
    setSending(true);
    try {
      const { error } = await supabase.from("post_comments").insert({
        post_id: postId,
        user_id: user.id,
        author_name: viewer.name,
        author_role: viewer.role,
        author_meta: viewer.meta,
        body: text.trim()
      });
      if (error) throw error;
      setText("");
      qc.invalidateQueries({ queryKey: ["post-comments", postId] });
      qc.invalidateQueries({ queryKey: ["post-comment-count", postId] });
    } catch (e) {
      toast.error(e.message ?? "মন্তব্য ব্যর্থ হয়েছে");
    } finally {
      setSending(false);
    }
  };
  const remove = async (id) => {
    const { error } = await supabase.from("post_comments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["post-comments", postId] });
    qc.invalidateQueries({ queryKey: ["post-comment-count", postId] });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pb-4 pt-1 space-y-3 bg-academy-soft/30 border-t border-border/60", children: [
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-3 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin text-academy-gold" }) }) : comments && comments.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pt-2", children: comments.map((c) => {
      const initial = (c.author_name || "?").charAt(0);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-7 shrink-0 rounded-full bg-academy-navy/10 text-academy-navy text-xs font-bold flex items-center justify-center", children: initial }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 bg-card rounded-2xl px-3 py-2 border border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-academy-navy", children: c.author_name }),
            (c.author_role === "admin" || c.author_role === "teacher") && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-3 text-academy-gold" }),
            c.author_meta && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground", children: [
              "· ",
              c.author_meta
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground ml-auto", children: timeAgo(c.created_at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-academy-navy/90 whitespace-pre-wrap break-words mt-0.5", children: c.body })
        ] }),
        user?.id === c.user_id && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => remove(c.id),
            className: "text-muted-foreground hover:text-destructive shrink-0 mt-1",
            "aria-label": "মুছুন",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" })
          }
        )
      ] }, c.id);
    }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-2", children: "প্রথম মন্তব্যটি করুন" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          rows: 1,
          placeholder: "মন্তব্য লিখুন...",
          value: text,
          onChange: (e) => setText(e.target.value),
          className: "resize-none min-h-9 py-2 text-sm bg-card",
          onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          onClick: submit,
          disabled: sending || !text.trim(),
          size: "icon",
          className: "bg-academy-navy text-white shrink-0",
          children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" })
        }
      )
    ] })
  ] });
}
function PostCard({ post }) {
  const { user } = useSession();
  const qc = useQueryClient();
  const { data: viewer } = useViewerIdentity(user?.id);
  const name = post.author_name?.trim() || "সমীকরণ শিক্ষা পরিবার";
  const role = post.author_role || "admin";
  const isStaff = role === "admin" || role === "teacher";
  const initial = name.charAt(0) || "স";
  const pending = post.status === "pending";
  const [showComments, setShowComments] = reactExports.useState(false);
  const [deleting, setDeleting] = reactExports.useState(false);
  const canDelete = !!user && (viewer?.role === "admin" || viewer?.role === "teacher" || !!post.author_id && post.author_id === user.id);
  const removePost = async () => {
    if (!confirm("পোস্টটি মুছে ফেলবেন?")) return;
    setDeleting(true);
    try {
      if (post.media_path) {
        await supabase.storage.from("feed-media").remove([post.media_path]);
      }
      const { error } = await supabase.from("feed_posts").delete().eq("id", post.id);
      if (error) throw error;
      toast.success("পোস্টটি মুছে ফেলা হয়েছে");
      qc.invalidateQueries({ queryKey: ["student-feed"] });
      qc.invalidateQueries({ queryKey: ["panel-feed"] });
      qc.invalidateQueries({ queryKey: ["admin-feed"] });
    } catch (e) {
      toast.error(e.message ?? "মুছে ফেলা ব্যর্থ হয়েছে");
    } finally {
      setDeleting(false);
    }
  };
  const { data: likeData } = useQuery({
    queryKey: ["post-likes", post.id, user?.id],
    queryFn: async () => {
      const [{ count }, mine] = await Promise.all([
        supabase.from("post_likes").select("id", { count: "exact", head: true }).eq("post_id", post.id),
        user ? supabase.from("post_likes").select("id").eq("post_id", post.id).eq("user_id", user.id).maybeSingle() : Promise.resolve({ data: null })
      ]);
      return { count: count ?? 0, liked: !!mine.data };
    }
  });
  const { data: commentCount } = useQuery({
    queryKey: ["post-comment-count", post.id],
    queryFn: async () => {
      const { count } = await supabase.from("post_comments").select("id", { count: "exact", head: true }).eq("post_id", post.id);
      return count ?? 0;
    }
  });
  reactExports.useEffect(() => {
    const channel = supabase.channel(`likes-rt-${post.id}`).on(
      "postgres_changes",
      { event: "*", schema: "public", table: "post_likes", filter: `post_id=eq.${post.id}` },
      () => qc.invalidateQueries({ queryKey: ["post-likes", post.id] })
    ).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [post.id, qc]);
  const toggleLike = async () => {
    if (!user) return toast.error("পছন্দ দিতে লগইন করুন");
    try {
      if (likeData?.liked) {
        await supabase.from("post_likes").delete().eq("post_id", post.id).eq("user_id", user.id);
      } else {
        await supabase.from("post_likes").insert({ post_id: post.id, user_id: user.id });
      }
      qc.invalidateQueries({ queryKey: ["post-likes", post.id] });
    } catch (e) {
      toast.error(e.message ?? "ব্যর্থ হয়েছে");
    }
  };
  const share = async () => {
    const url = `${window.location.origin}${window.location.pathname}#post-${post.id}`;
    const shareData = { title: "সমীকরণ শিক্ষা নিউজফিড", text: post.body ?? "", url };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("লিংক কপি হয়েছে");
      }
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "article",
    {
      id: `post-${post.id}`,
      className: "group bg-card rounded-3xl border border-border/70 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden scroll-mt-20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex items-center gap-3 p-4 pb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "size-11 rounded-full flex items-center justify-center text-academy-navy font-bold shadow ring-2 ring-academy-gold/30",
              style: { background: "var(--gradient-gold)" },
              children: initial
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-academy-navy text-sm truncate", children: name }),
              isStaff && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "size-4 text-academy-gold shrink-0" }),
              !isStaff && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-0.5 text-[10px] font-semibold text-academy-navy/70 bg-academy-soft px-1.5 py-0.5 rounded-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-3" }),
                " ",
                ROLE_LABEL[role]
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: timeAgo(post.created_at) }),
              post.author_meta && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-40", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: post.author_meta })
              ] })
            ] })
          ] }),
          pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
            " অপেক্ষমাণ"
          ] }),
          !pending && post.class_level && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold text-academy-navy bg-academy-soft px-2.5 py-1 rounded-full border border-academy-gold/30 shrink-0", children: post.class_level }),
          canDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: removePost,
              disabled: deleting,
              "aria-label": "পোস্ট মুছুন",
              className: "shrink-0 size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-50",
              children: deleting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
            }
          )
        ] }),
        post.body && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 text-[15px] text-academy-navy/90 whitespace-pre-wrap leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MathText, { children: post.body }) }),
        post.media_type === "image" && post.media_path && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden bg-academy-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: mediaUrl(post.media_path),
            alt: post.body ?? "পোস্ট ছবি",
            loading: "lazy",
            className: "w-full max-h-[600px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          }
        ) }),
        post.media_type === "video" && youtubeId(post.link_url) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full bg-black", style: { aspectRatio: "16 / 9" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            src: `https://www.youtube.com/embed/${youtubeId(post.link_url)}`,
            title: post.body ?? "YouTube ভিডিও",
            loading: "lazy",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowFullScreen: true,
            className: "absolute inset-0 w-full h-full"
          }
        ) }),
        post.media_type === "video" && !youtubeId(post.link_url) && post.media_path && /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: mediaUrl(post.media_path), controls: true, playsInline: true, className: "w-full max-h-[600px] bg-black" }),
        post.media_type === "audio" && post.media_path && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("audio", { src: mediaUrl(post.media_path), controls: true, className: "w-full" }) }),
        ((likeData?.count ?? 0) > 0 || (commentCount ?? 0) > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 pt-3 text-xs text-muted-foreground", children: [
          (likeData?.count ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "size-3 fill-rose-500 text-rose-500" }),
            " ",
            likeData?.count
          ] }),
          (commentCount ?? 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setShowComments(true), className: "ml-auto hover:underline", children: [
            commentCount,
            " মন্তব্য"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "flex items-center gap-1 px-2 py-1.5 mt-1 border-t border-border/60 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: toggleLike,
              className: `flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-academy-soft ${likeData?.liked ? "text-rose-500" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: `size-4 ${likeData?.liked ? "fill-rose-500" : ""}` }),
                " পছন্দ"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => setShowComments((s) => !s),
              className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-academy-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-4" }),
                " মন্তব্য"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: share,
              className: "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium transition-colors hover:bg-academy-soft",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "size-4" }),
                " শেয়ার"
              ]
            }
          )
        ] }),
        showComments && /* @__PURE__ */ jsxRuntimeExports.jsx(CommentSection, { postId: post.id })
      ]
    }
  );
}
function FeedList({
  posts,
  isLoading
}) {
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-16 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin text-academy-gold" }) });
  }
  if (!posts || posts.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-3xl border p-14 text-center text-muted-foreground shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ImageOff, { className: "size-12 mx-auto mb-3 opacity-40" }),
      "এখনো কোনো পোস্ট নেই"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: posts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(PostCard, { post: p }, p.id)) });
}
export {
  FeedHeader as F,
  FeedList as a,
  timeAgo as t
};
