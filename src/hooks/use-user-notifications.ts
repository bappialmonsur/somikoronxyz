import { useEffect, useRef } from "react";
import type { User } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type NotificationRow = {
  id: string;
  user_id: string;
  type: "like" | "comment" | string;
  post_id: string;
  actor_id: string | null;
  actor_name: string | null;
  actor_meta: string | null;
  body: string | null;
  is_read: boolean;
  created_at: string;
};

/**
 * Per-user in-app notifications: likes & comments on the user's own posts.
 * Live via realtime, fires a toast on new activity.
 */
export function useUserNotifications(user: User | null | undefined) {
  const qc = useQueryClient();
  const inited = useRef(false);

  const query = useQuery<NotificationRow[]>({
    queryKey: ["user-notifications", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(40);
      if (error) throw error;
      return (data ?? []) as NotificationRow[];
    },
  });

  useEffect(() => {
    if (!user) return;
    inited.current = false;
    const t = setTimeout(() => (inited.current = true), 1500);

    const channel = supabase
      .channel(`user-notify-${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          qc.invalidateQueries({ queryKey: ["user-notifications", user.id] });
          if (!inited.current) return;
          const n = payload.new as NotificationRow;
          const who = n.actor_name || "একজন";
          if (n.type === "like") {
            toast.info(`${who} আপনার পোস্ট পছন্দ করেছেন`);
          } else if (n.type === "comment") {
            toast.info(`${who} মন্তব্য করেছেন`, { description: n.body ?? undefined });
          }
        },
      )
      .subscribe();

    return () => {
      clearTimeout(t);
      supabase.removeChannel(channel);
    };
  }, [user, qc]);

  return query;
}

export async function markNotificationsRead(userId: string) {
  await supabase
    .from("notifications")
    .update({ is_read: true })
    .eq("user_id", userId)
    .eq("is_read", false);
}
