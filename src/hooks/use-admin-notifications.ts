import { useEffect, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface AdminCounts {
  pendingPosts: number;
  unreadMessages: number;
  total: number;
}

/** Ask the browser for notification permission (once). */
export function requestPushPermission() {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => {});
  }
}

function showPush(title: string, bodyText: string) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification(title, { body: bodyText, icon: "/favicon.ico", tag: title });
  } catch {
    /* ignore */
  }
}

/**
 * Admin-only notification source: counts pending posts + unread student
 * messages, keeps them live via realtime, and fires browser push + toast on
 * new activity even when the tab is in the background.
 */
export function useAdminNotifications(user: User | null | undefined, enabled: boolean) {
  const qc = useQueryClient();
  const inited = useRef(false);

  const query = useQuery<AdminCounts>({
    queryKey: ["admin-notifications"],
    enabled: enabled && !!user,
    queryFn: async () => {
      const [postsRes, msgsRes] = await Promise.all([
        supabase
          .from("feed_posts")
          .select("id", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("messages")
          .select("id", { count: "exact", head: true })
          .eq("sender_role", "student")
          .eq("is_read", false),
      ]);
      const pendingPosts = postsRes.count ?? 0;
      const unreadMessages = msgsRes.count ?? 0;
      return { pendingPosts, unreadMessages, total: pendingPosts + unreadMessages };
    },
  });

  useEffect(() => {
    if (!enabled || !user) return;

    // Suppress the very first toast/push burst right after mount.
    inited.current = false;
    const t = setTimeout(() => (inited.current = true), 1500);

    const channel = supabase
      .channel("admin-notify-rt")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "feed_posts", filter: "status=eq.pending" },
        (payload) => {
          qc.invalidateQueries({ queryKey: ["admin-notifications"] });
          qc.invalidateQueries({ queryKey: ["admin-feed"] });
          if (!inited.current) return;
          const name = (payload.new as any)?.author_name ?? "একজন শিক্ষার্থী";
          toast.info(`নতুন পোস্ট অনুমোদনের অপেক্ষায়: ${name}`);
          showPush("নতুন পোস্ট", `${name} একটি পোস্ট পাঠিয়েছে — অনুমোদন প্রয়োজন`);
        },
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: "sender_role=eq.student" },
        (payload) => {
          qc.invalidateQueries({ queryKey: ["admin-notifications"] });
          qc.invalidateQueries({ queryKey: ["admin-conversations"] });
          if (!inited.current) return;
          const name = (payload.new as any)?.sender_name ?? "একজন শিক্ষার্থী";
          const body = (payload.new as any)?.body ?? "";
          toast.info(`নতুন মেসেজ: ${name}`);
          showPush(`নতুন মেসেজ — ${name}`, body.slice(0, 120));
        },
      )
      .subscribe();

    return () => {
      clearTimeout(t);
      supabase.removeChannel(channel);
    };
  }, [enabled, user, qc]);

  return query;
}
