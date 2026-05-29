import { supabase } from "@/integrations/supabase/client";
import { MathText } from "@/components/math-text";
import {
  Sparkles, ImageOff, BadgeCheck, Heart, MessageCircle, Share2, Loader2, Clock, GraduationCap,
} from "lucide-react";

export type FeedPost = {
  id: string;
  body: string | null;
  media_type: "text" | "image" | "video" | "audio";
  media_path: string | null;
  class_level: string | null;
  created_at: string;
  author_name?: string | null;
  author_role?: string | null;
  author_meta?: string | null;
  status?: string | null;
};

export function mediaUrl(path: string) {
  return supabase.storage.from("feed-media").getPublicUrl(path).data.publicUrl;
}

export function timeAgo(iso: string) {
  const d = new Date(iso);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return "এইমাত্র";
  if (diff < 3600) return `${Math.floor(diff / 60)} মিনিট আগে`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ঘণ্টা আগে`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} দিন আগে`;
  return d.toLocaleDateString("bn-BD");
}

const ROLE_LABEL: Record<string, string> = {
  admin: "এডমিন",
  teacher: "শিক্ষক",
  student: "শিক্ষার্থী",
};

export function FeedHeader({ subtitle }: { subtitle?: string }) {
  return (
    <header
      className="relative overflow-hidden rounded-3xl p-5 text-white shadow-xl"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="absolute -right-10 -top-12 size-40 rounded-full opacity-25 blur-2xl"
        style={{ background: "var(--gradient-gold)" }}
      />
      <div className="absolute -left-8 bottom-0 size-24 rounded-full bg-white/10 blur-xl" />
      <div className="relative flex items-center gap-3">
        <div
          className="size-12 rounded-2xl flex items-center justify-center text-academy-navy font-extrabold text-xl shadow-lg ring-2 ring-white/30"
          style={{ background: "var(--gradient-gold)" }}
        >
          স
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <h1 className="text-lg font-bold leading-tight truncate">নিউজফিড</h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-white/20 backdrop-blur px-2 py-0.5 rounded-full ring-1 ring-white/25">
              <Sparkles className="size-3" /> এক্সক্লুসিভ
            </span>
          </div>
          <p className="text-xs text-white/75 mt-0.5">
            {subtitle ?? "সমীকরণ শিক্ষা পরিবারের সর্বশেষ আপডেট"}
          </p>
        </div>
      </div>
    </header>
  );
}

export function PostCard({ post }: { post: FeedPost }) {
  const name = post.author_name?.trim() || "সমীকরণ শিক্ষা পরিবার";
  const role = post.author_role || "admin";
  const isStaff = role === "admin" || role === "teacher";
  const initial = name.charAt(0) || "স";
  const pending = post.status === "pending";

  return (
    <article className="group bg-card rounded-3xl border border-border/70 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <header className="flex items-center gap-3 p-4 pb-3">
        <div className="relative shrink-0">
          <div
            className="size-11 rounded-full flex items-center justify-center text-academy-navy font-bold shadow ring-2 ring-academy-gold/30"
            style={{ background: "var(--gradient-gold)" }}
          >
            {initial}
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 flex-wrap">
            <span className="font-bold text-academy-navy text-sm truncate">{name}</span>
            {isStaff && <BadgeCheck className="size-4 text-academy-gold shrink-0" />}
            {!isStaff && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-academy-navy/70 bg-academy-soft px-1.5 py-0.5 rounded-full">
                <GraduationCap className="size-3" /> {ROLE_LABEL[role]}
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <span>{timeAgo(post.created_at)}</span>
            {post.author_meta && (
              <>
                <span className="opacity-40">·</span>
                <span className="truncate">{post.author_meta}</span>
              </>
            )}
          </div>
        </div>
        {pending && (
          <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1 shrink-0">
            <Clock className="size-3" /> অপেক্ষমাণ
          </span>
        )}
        {!pending && post.class_level && (
          <span className="text-[10px] font-semibold text-academy-navy bg-academy-soft px-2.5 py-1 rounded-full border border-academy-gold/30 shrink-0">
            {post.class_level}
          </span>
        )}
      </header>

      {post.body && (
        <div className="px-4 pb-3 text-[15px] text-academy-navy/90 whitespace-pre-wrap leading-relaxed">
          <MathText>{post.body}</MathText>
        </div>
      )}

      {post.media_type === "image" && post.media_path && (
        <div className="overflow-hidden bg-academy-soft">
          <img
            src={mediaUrl(post.media_path)}
            alt={post.body ?? "পোস্ট ছবি"}
            loading="lazy"
            className="w-full max-h-[600px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}
      {post.media_type === "video" && post.media_path && (
        <video src={mediaUrl(post.media_path)} controls playsInline className="w-full max-h-[600px] bg-black" />
      )}
      {post.media_type === "audio" && post.media_path && (
        <div className="px-4 pb-2">
          <audio src={mediaUrl(post.media_path)} controls className="w-full" />
        </div>
      )}

      <footer className="flex items-center gap-6 px-4 py-3 mt-1 border-t border-border/60 text-muted-foreground">
        <span className="flex items-center gap-1.5 text-xs font-medium">
          <Heart className="size-4" /> পছন্দ
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium">
          <MessageCircle className="size-4" /> মন্তব্য
        </span>
        <span className="flex items-center gap-1.5 text-xs font-medium ml-auto">
          <Share2 className="size-4" /> শেয়ার
        </span>
      </footer>
    </article>
  );
}

export function FeedList({
  posts,
  isLoading,
}: {
  posts: FeedPost[] | undefined;
  isLoading: boolean;
}) {
  if (isLoading) {
    return (
      <div className="p-16 flex justify-center">
        <Loader2 className="animate-spin text-academy-gold" />
      </div>
    );
  }
  if (!posts || posts.length === 0) {
    return (
      <div className="bg-card rounded-3xl border p-14 text-center text-muted-foreground shadow-sm">
        <ImageOff className="size-12 mx-auto mb-3 opacity-40" />
        এখনো কোনো পোস্ট নেই
      </div>
    );
  }
  return (
    <>
      {posts.map((p) => (
        <PostCard key={p.id} post={p} />
      ))}
    </>
  );
}
