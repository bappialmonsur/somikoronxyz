import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, O as Outlet, e as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { S as SidebarProvider, a as SidebarTrigger, N as NotificationsBell, b as Sidebar, c as SidebarHeader, d as SidebarContent, e as SidebarGroup, f as SidebarGroupLabel, g as SidebarGroupContent, h as SidebarMenu, i as SidebarMenuItem, j as SidebarMenuButton, k as SidebarFooter } from "./notifications-bell-Cphs0QJj.mjs";
import { b as bnClass } from "./grading-0NP-FUhN.mjs";
import { P as PositionPill } from "./class-merit-DkCbnMdS.mjs";
import "../_libs/sonner.mjs";
import "../_libs/katex.mjs";
import "../_libs/seroval.mjs";
import { L as LoaderCircle, S as ShieldAlert, N as Newspaper, H as House, M as MessageSquare, B as BookOpenCheck, a as Bell, C as CalendarCheck, G as GraduationCap, b as ChartColumn, F as FileText, U as UserRound, c as LogOut } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
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
import "./createSsrRpc-CnB93obs.mjs";
import "./server-BRebtgSX.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/radix-ui__react-avatar.mjs";
import "../_libs/@radix-ui/react-use-is-hydrated+[...].mjs";
import "../_libs/use-sync-external-store.mjs";
import "./student-stats.functions-DYQ0kPo3.mjs";
import "./auth-middleware-BdDOp7xZ.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
const menu = [{
  title: "নিউজফিড",
  url: "/student",
  icon: Newspaper,
  exact: true
}, {
  title: "ড্যাশবোর্ড",
  url: "/student/dashboard",
  icon: House
}, {
  title: "মেসেজ",
  url: "/student/messages",
  icon: MessageSquare
}, {
  title: "অনলাইন পরীক্ষা",
  url: "/student/exam",
  icon: BookOpenCheck
}, {
  title: "নোটিশ",
  url: "/student/notices",
  icon: Bell
}, {
  title: "উপস্থিতি",
  url: "/student/attendance",
  icon: CalendarCheck
}, {
  title: "রেজাল্ট",
  url: "/student/results",
  icon: GraduationCap
}, {
  title: "রেজাল্ট এনালাইসিস",
  url: "/student/analysis",
  icon: ChartColumn
}, {
  title: "পিডিএফ নোটস",
  url: "/student/pdfs",
  icon: FileText
}, {
  title: "আমার প্রোফাইল",
  url: "/student/profile",
  icon: UserRound
}];
function StudentLayout() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useSession();
  const {
    data: student,
    isLoading: sLoading
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
  if (loading || user && sLoading) {
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
  if (!student || !student.is_active) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex items-center justify-center bg-academy-soft p-4", style: {
      fontFamily: "'Hind Siliguri', sans-serif"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-12 mx-auto text-amber-500 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-academy-navy mb-2", children: "শিক্ষার্থী অ্যাক্সেস নেই" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "আপনার একাউন্টে কোনো এক্টিভ শিক্ষার্থী প্রোফাইল পাওয়া যায়নি।" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: async () => {
        await supabase.auth.signOut();
        navigate({
          to: "/login"
        });
      }, variant: "outline", className: "w-full", children: "লগআউট" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex w-full bg-academy-soft", style: {
    fontFamily: "'Hind Siliguri', sans-serif"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StudentSidebar, { name: student.full_name, classLabel: `${bnClass(student.class_level)} শ্রেণি`, onLogout: async () => {
      await supabase.auth.signOut();
      navigate({
        to: "/login"
      });
    } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "h-14 bg-white border-b border-academy-navy/10 flex items-center px-4 gap-2 sticky top-0 z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy truncate", children: "শিক্ষার্থী প্যানেল" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground hidden sm:block truncate", children: [
            student.full_name,
            " · ",
            bnClass(student.class_level)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PositionPill, { userId: user?.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsBell, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 md:p-6 overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
    ] })
  ] }) });
}
function StudentSidebar({
  name,
  classLabel,
  onLogout
}) {
  const path = useRouterState({
    select: (r) => r.location.pathname
  });
  const isActive = (url, exact) => exact ? path === url : path === url || path.startsWith(url + "/");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { collapsible: "icon", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { className: "border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-lg bg-academy-gold text-academy-navy flex items-center justify-center font-bold shrink-0", children: "স" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm leading-tight overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-sidebar-foreground truncate", children: name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-sidebar-foreground/70 truncate", children: classLabel })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "মেনু" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: menu.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive(item.url, item.exact), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: item.url, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.title })
      ] }) }) }, item.url)) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarFooter, { className: "border-t", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { onClick: onLogout, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "লগআউট" })
    ] }) }) }) })
  ] });
}
export {
  StudentLayout as component
};
