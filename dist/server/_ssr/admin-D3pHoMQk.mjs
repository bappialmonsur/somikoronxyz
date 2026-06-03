import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, e as useRouterState, O as Outlet, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { u as useMyAccess } from "./use-access-BrU4QPMt.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { S as SidebarProvider, a as SidebarTrigger, N as NotificationsBell, b as Sidebar, c as SidebarHeader, d as SidebarContent, e as SidebarGroup, f as SidebarGroupLabel, g as SidebarGroupContent, h as SidebarMenu, i as SidebarMenuItem, j as SidebarMenuButton, k as SidebarFooter } from "./notifications-bell-Cphs0QJj.mjs";
import "../_libs/katex.mjs";
import { L as LoaderCircle, e as LayoutDashboard, U as UserRound, N as Newspaper, Y as Youtube, M as MessageSquare, f as UserPlus, g as Users, h as BookUser, i as ClipboardCheck, j as CalendarSearch, G as GraduationCap, k as Printer, b as ChartColumn, D as Database, a as Bell, l as UserCog, K as KeyRound, m as Globe, d as ShieldCheck, c as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "./input-C0QjszdI.mjs";
import "../_libs/radix-ui__react-separator.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-popover.mjs";
import "../_libs/radix-ui__react-scroll-area.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__number.mjs";
import "./news-feed-DDav6-1E.mjs";
import "./math-text-ChCUGY98.mjs";
import "./textarea-DSyJ1nlY.mjs";
function requestPushPermission() {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission === "default") {
    Notification.requestPermission().catch(() => {
    });
  }
}
function showPush(title, bodyText) {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  try {
    new Notification(title, { body: bodyText, icon: "/favicon.ico", tag: title });
  } catch {
  }
}
function useAdminNotifications(user, enabled) {
  const qc = useQueryClient();
  const inited = reactExports.useRef(false);
  const query = useQuery({
    queryKey: ["admin-notifications"],
    enabled: enabled && !!user,
    queryFn: async () => {
      const [postsRes, msgsRes] = await Promise.all([
        supabase.from("feed_posts").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("messages").select("id", { count: "exact", head: true }).eq("sender_role", "student").eq("is_read", false)
      ]);
      const pendingPosts = postsRes.count ?? 0;
      const unreadMessages = msgsRes.count ?? 0;
      return { pendingPosts, unreadMessages, total: pendingPosts + unreadMessages };
    }
  });
  reactExports.useEffect(() => {
    if (!enabled || !user) return;
    inited.current = false;
    const t = setTimeout(() => inited.current = true, 1500);
    const channel = supabase.channel("admin-notify-rt").on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "feed_posts", filter: "status=eq.pending" },
      (payload) => {
        qc.invalidateQueries({ queryKey: ["admin-notifications"] });
        qc.invalidateQueries({ queryKey: ["admin-feed"] });
        if (!inited.current) return;
        const name = payload.new?.author_name ?? "একজন শিক্ষার্থী";
        toast.info(`নতুন পোস্ট অনুমোদনের অপেক্ষায়: ${name}`);
        showPush("নতুন পোস্ট", `${name} একটি পোস্ট পাঠিয়েছে — অনুমোদন প্রয়োজন`);
      }
    ).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages", filter: "sender_role=eq.student" },
      (payload) => {
        qc.invalidateQueries({ queryKey: ["admin-notifications"] });
        qc.invalidateQueries({ queryKey: ["admin-conversations"] });
        if (!inited.current) return;
        const name = payload.new?.sender_name ?? "একজন শিক্ষার্থী";
        const body = payload.new?.body ?? "";
        toast.info(`নতুন মেসেজ: ${name}`);
        showPush(`নতুন মেসেজ — ${name}`, body.slice(0, 120));
      }
    ).subscribe();
    return () => {
      clearTimeout(t);
      supabase.removeChannel(channel);
    };
  }, [enabled, user, qc]);
  return query;
}
const menu = [{
  title: "ড্যাশবোর্ড",
  url: "/admin",
  icon: LayoutDashboard,
  exact: true
}, {
  title: "আমার প্রোফাইল",
  url: "/admin/profile",
  icon: UserRound,
  exact: true
}, {
  title: "নিউজফিড",
  url: "/admin/newsfeed",
  icon: Newspaper,
  feature: "newsfeed",
  exact: true
}, {
  title: "নিউজফিড পোস্ট",
  url: "/admin/feed",
  icon: Newspaper,
  feature: "newsfeed",
  badge: "pending"
}, {
  title: "শিক্ষামূলক ভিডিও",
  url: "/admin/videos",
  icon: Youtube
}, {
  title: "মেসেজ",
  url: "/admin/messages",
  icon: MessageSquare,
  badge: "messages"
}, {
  title: "ছাত্রছাত্রী ভর্তি",
  url: "/admin/admission",
  icon: UserPlus,
  feature: "admission"
}, {
  title: "সকল শিক্ষার্থী",
  url: "/admin/students",
  icon: Users,
  feature: "admission"
}, {
  title: "ফোনবুক",
  url: "/admin/phonebook",
  icon: BookUser,
  feature: "admission"
}, {
  title: "দৈনিক হাজিরা",
  url: "/admin/attendance",
  icon: ClipboardCheck,
  feature: "attendance"
}, {
  title: "অনুপস্থিতি ট্র্যাকার",
  url: "/admin/absent",
  icon: CalendarSearch,
  feature: "attendance"
}, {
  title: "পরীক্ষা ও ফলাফল",
  url: "/admin/results",
  icon: GraduationCap,
  feature: "results"
}, {
  title: "মার্কশীট প্রিন্ট",
  url: "/admin/marksheet",
  icon: Printer,
  feature: "results"
}, {
  title: "রেজাল্ট এনালাইসিস",
  url: "/admin/analysis",
  icon: ChartColumn,
  feature: "results"
}, {
  title: "প্রশ্নব্যাংক (MCQ)",
  url: "/admin/question-bank",
  icon: Database
}, {
  title: "নোটিশ",
  url: "/admin/notices",
  icon: Bell,
  feature: "newsfeed"
}, {
  title: "শিক্ষক ব্যবস্থাপনা",
  url: "/admin/teachers",
  icon: UserCog
}, {
  title: "পাসওয়ার্ড পরিবর্তন",
  url: "/admin/security",
  icon: KeyRound
}, {
  title: "ওয়েবসাইট কন্ট্রোল",
  url: "/admin/site",
  icon: Globe
}, {
  title: "এস এম এস প্যানেল",
  url: "/admin/sms",
  icon: MessageSquare
}];
function AdminLayout() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useSession();
  const {
    data: access,
    isLoading: accessLoading
  } = useMyAccess(user);
  const path = useRouterState({
    select: (r) => r.location.pathname
  });
  const isAdminUser = !!access?.isAdmin;
  const {
    data: counts
  } = useAdminNotifications(user, isAdminUser);
  reactExports.useEffect(() => {
    if (isAdminUser) requestPushPermission();
  }, [isAdminUser]);
  if (loading || user && accessLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-academy-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-8 animate-spin text-academy-navy" }) });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-academy-soft p-4", style: {
      fontFamily: "'Hind Siliguri', sans-serif"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-4 text-academy-navy", children: "প্রবেশ করতে লগইন করুন" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
        to: "/login"
      }), className: "bg-academy-navy text-white", children: "লগইন" })
    ] }) });
  }
  const isAdmin = !!access?.isAdmin;
  const isTeacher = !!access?.isTeacher;
  if (!isAdmin && !isTeacher) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NotAdmin, {});
  }
  const visibleMenu = isAdmin ? menu : menu.filter((m) => m.exact || m.feature && access.permissions.includes(m.feature));
  const isAllowedPath = (() => {
    if (isAdmin) return true;
    return visibleMenu.some((m) => m.exact ? path === m.url : path === m.url || path.startsWith(m.url + "/"));
  })();
  const panelLabel = isAdmin ? "এডমিন প্যানেল" : "শিক্ষক প্যানেল";
  const onLogout = async () => {
    await supabase.auth.signOut();
    navigate({
      to: "/login"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex w-full bg-academy-soft", style: {
    fontFamily: "'Hind Siliguri', sans-serif"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PanelSidebar, { items: visibleMenu, subtitle: isAdmin ? "শিক্ষা পরিবার" : "শিক্ষক", onLogout, counts }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-14 bg-white border-b border-academy-navy/10 flex items-center px-4 gap-2 sticky top-0 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: panelLabel }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground hidden sm:block", children: user.phone ? "0" + user.phone.replace(/^\+?880/, "") : user.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsBell, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 md:p-6 overflow-x-hidden", children: isAllowedPath ? /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8 text-center border mt-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-12 mx-auto text-academy-gold mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-academy-navy mb-2", children: "এই ফিচারের অনুমতি নেই" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "এই অংশটি ব্যবহারের অনুমতি আপনাকে দেওয়া হয়নি। প্রয়োজন হলে এডমিনের সাথে যোগাযোগ করুন।" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => navigate({
          to: "/admin"
        }), variant: "outline", className: "w-full", children: "ড্যাশবোর্ডে ফিরে যান" })
      ] }) })
    ] })
  ] }) });
}
function PanelSidebar({
  items,
  subtitle,
  onLogout,
  counts
}) {
  const path = useRouterState({
    select: (r) => r.location.pathname
  });
  const isActive = (url, exact) => exact ? path === url : path === url || path.startsWith(url + "/");
  const badgeCount = (b) => {
    if (!b || !counts) return 0;
    return b === "pending" ? counts.pendingPosts : counts.unreadMessages;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { className: "border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-lg bg-academy-gold text-academy-navy flex items-center justify-center font-bold shrink-0", children: "স" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm leading-tight overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sidebar-foreground truncate", children: "সমীকরণ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-sidebar-foreground/70 truncate", children: subtitle })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "মেনু" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: items.map((item) => {
        const bc = badgeCount(item.badge);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive(item.url, item.exact), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.url, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: item.title }),
          bc > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-white bg-red-500 rounded-full px-1.5 py-0.5 min-w-5 text-center leading-none", children: bc })
        ] }) }) }, item.url);
      }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarFooter, { className: "border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { onClick: onLogout, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "লগআউট" })
    ] }) }) }) })
  ] });
}
function NotAdmin() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate({
      to: "/login"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-academy-soft p-4", style: {
    fontFamily: "'Hind Siliguri', sans-serif"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-12 mx-auto text-academy-gold mb-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-academy-navy mb-2", children: "এডমিন অ্যাক্সেস নেই" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "আপনার একাউন্টে এডমিন পারমিশন নেই। শিক্ষার্থী হলে স্টুডেন্ট প্যানেলে যান।" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleLogout, variant: "outline", className: "w-full", children: "লগআউট" })
  ] }) });
}
export {
  AdminLayout as component
};
