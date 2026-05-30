import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-auth";
import {
  useUserNotifications,
  markNotificationsRead,
  type NotificationRow,
} from "@/hooks/use-user-notifications";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { timeAgo } from "@/components/news-feed";
import { Bell, Heart, MessageCircle, BellOff } from "lucide-react";

function NotifIcon({ type }: { type: string }) {
  if (type === "like")
    return <Heart className="size-4 fill-rose-500 text-rose-500 shrink-0" />;
  return <MessageCircle className="size-4 text-academy-navy shrink-0" />;
}

function NotifText({ n }: { n: NotificationRow }) {
  const who = n.actor_name || "একজন";
  return (
    <div className="min-w-0">
      <p className="text-sm text-academy-navy/90 leading-snug">
        <span className="font-bold text-academy-navy">{who}</span>
        {n.actor_meta && (
          <span className="text-[11px] text-muted-foreground"> · {n.actor_meta}</span>
        )}{" "}
        {n.type === "like" ? "আপনার পোস্ট পছন্দ করেছেন" : "আপনার পোস্টে মন্তব্য করেছেন"}
      </p>
      {n.type === "comment" && n.body && (
        <p className="text-xs text-muted-foreground truncate mt-0.5">“{n.body}”</p>
      )}
      <p className="text-[10px] text-muted-foreground mt-0.5">{timeAgo(n.created_at)}</p>
    </div>
  );
}

export function NotificationsBell() {
  const { user } = useSession();
  const qc = useQueryClient();
  const { data: notifs } = useUserNotifications(user);
  const unread = (notifs ?? []).filter((n) => !n.is_read).length;

  const onOpenChange = async (open: boolean) => {
    if (open && user && unread > 0) {
      await markNotificationsRead(user.id);
      qc.invalidateQueries({ queryKey: ["user-notifications", user.id] });
    }
  };

  return (
    <Popover onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <button
          className="relative size-9 rounded-full flex items-center justify-center text-academy-navy hover:bg-academy-soft transition-colors"
          aria-label="নোটিফিকেশন"
        >
          <Bell className="size-5" />
          {unread > 0 && (
            <span className="absolute -top-0.5 -right-0.5 text-[10px] font-bold text-white bg-red-500 rounded-full px-1 min-w-[18px] h-[18px] flex items-center justify-center leading-none">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0 overflow-hidden">
        <div className="px-4 py-3 border-b bg-academy-soft/50">
          <h3 className="text-sm font-bold text-academy-navy">নোটিফিকেশন</h3>
        </div>
        <ScrollArea className="max-h-80">
          {notifs && notifs.length > 0 ? (
            <ul className="divide-y divide-border/60">
              {notifs.map((n) => (
                <li
                  key={n.id}
                  className={`flex items-start gap-2.5 px-4 py-3 ${
                    !n.is_read ? "bg-academy-gold/5" : ""
                  }`}
                >
                  <NotifIcon type={n.type} />
                  <NotifText n={n} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-10 text-center text-muted-foreground">
              <BellOff className="size-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">কোনো নোটিফিকেশন নেই</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
