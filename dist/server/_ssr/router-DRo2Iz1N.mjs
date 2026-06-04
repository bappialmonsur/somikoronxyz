import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-DbZVJCfb.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$B = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "সমীকরণ শিক্ষা পরিবার" },
      { name: "description", content: "A web application for a coaching center, managing student admissions, attendance, results, and course content." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "সমীকরণ শিক্ষা পরিবার" },
      { property: "og:description", content: "A web application for a coaching center, managing student admissions, attendance, results, and course content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "সমীকরণ শিক্ষা পরিবার" },
      { name: "twitter:description", content: "A web application for a coaching center, managing student admissions, attendance, results, and course content." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/5VzX71UjK5PQkazWxKmIQ2gqBEH2/social-images/social-1780167462513-somikoron_logo512-x-512-px.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/5VzX71UjK5PQkazWxKmIQ2gqBEH2/social-images/social-1780167462513-somikoron_logo512-x-512-px.webp" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$B.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthSync, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-center" })
  ] });
}
function AuthSync() {
  const router2 = useRouter();
  const queryClient = useQueryClient();
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router2.invalidate();
      queryClient.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router2, queryClient]);
  return null;
}
const $$splitComponentImporter$z = () => import("./student-BVaUbQ_7.mjs");
const Route$A = createFileRoute("/student")({
  head: () => ({
    meta: [{
      title: "শিক্ষার্থী প্যানেল — সমীকরণ শিক্ষা পরিবার"
    }],
    links: [{
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import("./login-RmVaDSQ0.mjs");
const Route$z = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "লগইন — সমীকরণ শিক্ষা পরিবার"
    }],
    links: [{
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./admin-D3pHoMQk.mjs");
const Route$y = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "প্যানেল — সমীকরণ শিক্ষা পরিবার"
    }],
    links: [{
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./index-BdoVUK2g.mjs");
const Route$x = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "সমীকরণ শিক্ষা পরিবার — মেধা গড়ার বিশ্বস্ত ঠিকানা"
    }, {
      name: "description",
      content: "সমীকরণ শিক্ষা পরিবার — SSC, HSC ও বিশ্ববিদ্যালয় ভর্তি প্রস্তুতির জন্য দেশের অন্যতম নির্ভরযোগ্য কোচিং সেন্টার।"
    }, {
      property: "og:title",
      content: "সমীকরণ শিক্ষা পরিবার"
    }, {
      property: "og:description",
      content: "মেধা ও নিষ্ঠার সমন্বয়ে গড়ি আগামীর কারিগর।"
    }],
    links: [{
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./student.index-DIFJl2eN.mjs");
const Route$w = createFileRoute("/student/")({
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./admin.index-CtcwyDG1.mjs");
const Route$v = createFileRoute("/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./student.results-CMlCVQBi.mjs");
const Route$u = createFileRoute("/student/results")({
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./student.profile-CUUhY8ta.mjs");
const Route$t = createFileRoute("/student/profile")({
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./student.pdfs-Bb3S1sl9.mjs");
const Route$s = createFileRoute("/student/pdfs")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const $$splitComponentImporter$q = () => import("./student.notices-DibKgibh.mjs");
const Route$r = createFileRoute("/student/notices")({
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./student.messages-BzPaQupk.mjs");
const Route$q = createFileRoute("/student/messages")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./student.exam-DcKOSsoC.mjs");
const Route$p = createFileRoute("/student/exam")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./student.dashboard-iCdhhFEd.mjs");
const Route$o = createFileRoute("/student/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./student.attendance-H2VhT6ML.mjs");
const Route$n = createFileRoute("/student/attendance")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./student.analysis-DadcfzZK.mjs");
const Route$m = createFileRoute("/student/analysis")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./admin.videos-D5WXYfKq.mjs");
const Route$l = createFileRoute("/admin/videos")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./admin.teachers-Bh-e5OF7.mjs");
const Route$k = createFileRoute("/admin/teachers")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./admin.students-22LUW00U.mjs");
const Route$j = createFileRoute("/admin/students")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./admin.sms-B-pUAQQH.mjs");
const Route$i = createFileRoute("/admin/sms")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./admin.site-Cf4bZQMf.mjs");
const Route$h = createFileRoute("/admin/site")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./admin.security-B8wmbUav.mjs");
const Route$g = createFileRoute("/admin/security")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./admin.results-BFsOu0JM.mjs");
const Route$f = createFileRoute("/admin/results")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./admin.question-bank-BMZYTSv0.mjs");
const Route$e = createFileRoute("/admin/question-bank")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin.profile-WGM45qSJ.mjs");
const Route$d = createFileRoute("/admin/profile")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./admin.phonebook-CWCKc4mG.mjs");
const Route$c = createFileRoute("/admin/phonebook")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./admin.notices-gg_x5uq4.mjs");
const Route$b = createFileRoute("/admin/notices")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./admin.newsfeed-BRL4O4oU.mjs");
const Route$a = createFileRoute("/admin/newsfeed")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./admin.messages-DnRcbTKi.mjs");
const Route$9 = createFileRoute("/admin/messages")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./admin.marksheet-CZiqcWuV.mjs");
const Route$8 = createFileRoute("/admin/marksheet")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.feed-CGRudYJl.mjs");
const Route$7 = createFileRoute("/admin/feed")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.attendance-GCMybX6M.mjs");
const Route$6 = createFileRoute("/admin/attendance")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.analysis-jTLM-r-3.mjs");
const Route$5 = createFileRoute("/admin/analysis")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.admission-y95hA3f9.mjs");
const Route$4 = createFileRoute("/admin/admission")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.absent-DM92E0JZ.mjs");
const Route$3 = createFileRoute("/admin/absent")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.results.index-Dx_InVPu.mjs");
const Route$2 = createFileRoute("/admin/results/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.results._examId-6CTJEBtb.mjs");
const Route$1 = createFileRoute("/admin/results/$examId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
function decodeEntities(s) {
  return s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'");
}
function parseFeed(xml) {
  const out = [];
  const entries = xml.split("<entry>").slice(1);
  for (const entry of entries) {
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const author = entry.match(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    if (videoId && title) {
      out.push({
        videoId: videoId.trim(),
        title: decodeEntities(title.trim()),
        author: decodeEntities((author ?? "").trim()),
        published: published ?? (/* @__PURE__ */ new Date()).toISOString()
      });
    }
  }
  return out;
}
async function postRandomVideo(forcedChannelId) {
  let query = supabaseAdmin.from("video_sources").select("channel_id, name").eq("is_active", true);
  if (forcedChannelId) query = query.eq("channel_id", forcedChannelId);
  const { data: sources, error: srcErr } = await query;
  if (srcErr) throw new Error(srcErr.message);
  if (!sources || sources.length === 0) {
    return { ok: false, reason: "no_active_channels" };
  }
  const shuffled = [...sources].sort(() => Math.random() - 0.5);
  for (const source of shuffled.slice(0, 5)) {
    try {
      const res = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${source.channel_id}`,
        { headers: { "User-Agent": "Mozilla/5.0" } }
      );
      if (!res.ok) continue;
      const xml = await res.text();
      const videos = parseFeed(xml).slice(0, 15);
      if (videos.length === 0) continue;
      const candidates = [...videos].sort(() => Math.random() - 0.5);
      for (const v of candidates) {
        const link = `https://www.youtube.com/watch?v=${v.videoId}`;
        const { data: existing } = await supabaseAdmin.from("feed_posts").select("id").eq("link_url", link).maybeSingle();
        if (existing) continue;
        const channelName = source.name || v.author || "শিক্ষামূলক ভিডিও";
        const { error: insErr } = await supabaseAdmin.from("feed_posts").insert({
          body: `🎬 ${v.title}

${channelName} চ্যানেল থেকে নির্বাচিত শিক্ষামূলক ভিডিও।`,
          media_type: "video",
          media_path: null,
          link_url: link,
          class_level: null,
          author_id: null,
          author_name: channelName,
          author_role: "admin",
          author_meta: "শিক্ষামূলক ভিডিও",
          status: "approved",
          is_active: true
        });
        if (insErr) throw new Error(insErr.message);
        return { ok: true, posted: { title: v.title, channel: channelName, link } };
      }
    } catch {
      continue;
    }
  }
  return { ok: false, reason: "no_fresh_video" };
}
const Route = createFileRoute("/api/public/hooks/youtube-feed")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let forcedChannelId;
        try {
          const body = await request.json();
          forcedChannelId = body?.channel_id;
        } catch {
        }
        try {
          const result = await postRandomVideo(forcedChannelId);
          return Response.json(result, { status: result.ok ? 200 : 200 });
        } catch (e) {
          return Response.json(
            { ok: false, error: e?.message ?? "unknown error" },
            { status: 500 }
          );
        }
      }
    }
  }
});
const StudentRoute = Route$A.update({
  id: "/student",
  path: "/student",
  getParentRoute: () => Route$B
});
const LoginRoute = Route$z.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$B
});
const AdminRoute = Route$y.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$B
});
const IndexRoute = Route$x.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$B
});
const StudentIndexRoute = Route$w.update({
  id: "/",
  path: "/",
  getParentRoute: () => StudentRoute
});
const AdminIndexRoute = Route$v.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const StudentResultsRoute = Route$u.update({
  id: "/results",
  path: "/results",
  getParentRoute: () => StudentRoute
});
const StudentProfileRoute = Route$t.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => StudentRoute
});
const StudentPdfsRoute = Route$s.update({
  id: "/pdfs",
  path: "/pdfs",
  getParentRoute: () => StudentRoute
});
const StudentNoticesRoute = Route$r.update({
  id: "/notices",
  path: "/notices",
  getParentRoute: () => StudentRoute
});
const StudentMessagesRoute = Route$q.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => StudentRoute
});
const StudentExamRoute = Route$p.update({
  id: "/exam",
  path: "/exam",
  getParentRoute: () => StudentRoute
});
const StudentDashboardRoute = Route$o.update({
  id: "/dashboard",
  path: "/dashboard",
  getParentRoute: () => StudentRoute
});
const StudentAttendanceRoute = Route$n.update({
  id: "/attendance",
  path: "/attendance",
  getParentRoute: () => StudentRoute
});
const StudentAnalysisRoute = Route$m.update({
  id: "/analysis",
  path: "/analysis",
  getParentRoute: () => StudentRoute
});
const AdminVideosRoute = Route$l.update({
  id: "/videos",
  path: "/videos",
  getParentRoute: () => AdminRoute
});
const AdminTeachersRoute = Route$k.update({
  id: "/teachers",
  path: "/teachers",
  getParentRoute: () => AdminRoute
});
const AdminStudentsRoute = Route$j.update({
  id: "/students",
  path: "/students",
  getParentRoute: () => AdminRoute
});
const AdminSmsRoute = Route$i.update({
  id: "/sms",
  path: "/sms",
  getParentRoute: () => AdminRoute
});
const AdminSiteRoute = Route$h.update({
  id: "/site",
  path: "/site",
  getParentRoute: () => AdminRoute
});
const AdminSecurityRoute = Route$g.update({
  id: "/security",
  path: "/security",
  getParentRoute: () => AdminRoute
});
const AdminResultsRoute = Route$f.update({
  id: "/results",
  path: "/results",
  getParentRoute: () => AdminRoute
});
const AdminQuestionBankRoute = Route$e.update({
  id: "/question-bank",
  path: "/question-bank",
  getParentRoute: () => AdminRoute
});
const AdminProfileRoute = Route$d.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => AdminRoute
});
const AdminPhonebookRoute = Route$c.update({
  id: "/phonebook",
  path: "/phonebook",
  getParentRoute: () => AdminRoute
});
const AdminNoticesRoute = Route$b.update({
  id: "/notices",
  path: "/notices",
  getParentRoute: () => AdminRoute
});
const AdminNewsfeedRoute = Route$a.update({
  id: "/newsfeed",
  path: "/newsfeed",
  getParentRoute: () => AdminRoute
});
const AdminMessagesRoute = Route$9.update({
  id: "/messages",
  path: "/messages",
  getParentRoute: () => AdminRoute
});
const AdminMarksheetRoute = Route$8.update({
  id: "/marksheet",
  path: "/marksheet",
  getParentRoute: () => AdminRoute
});
const AdminFeedRoute = Route$7.update({
  id: "/feed",
  path: "/feed",
  getParentRoute: () => AdminRoute
});
const AdminAttendanceRoute = Route$6.update({
  id: "/attendance",
  path: "/attendance",
  getParentRoute: () => AdminRoute
});
const AdminAnalysisRoute = Route$5.update({
  id: "/analysis",
  path: "/analysis",
  getParentRoute: () => AdminRoute
});
const AdminAdmissionRoute = Route$4.update({
  id: "/admission",
  path: "/admission",
  getParentRoute: () => AdminRoute
});
const AdminAbsentRoute = Route$3.update({
  id: "/absent",
  path: "/absent",
  getParentRoute: () => AdminRoute
});
const AdminResultsIndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminResultsRoute
});
const AdminResultsExamIdRoute = Route$1.update({
  id: "/$examId",
  path: "/$examId",
  getParentRoute: () => AdminResultsRoute
});
const ApiPublicHooksYoutubeFeedRoute = Route.update({
  id: "/api/public/hooks/youtube-feed",
  path: "/api/public/hooks/youtube-feed",
  getParentRoute: () => Route$B
});
const AdminResultsRouteChildren = {
  AdminResultsExamIdRoute,
  AdminResultsIndexRoute
};
const AdminResultsRouteWithChildren = AdminResultsRoute._addFileChildren(
  AdminResultsRouteChildren
);
const AdminRouteChildren = {
  AdminAbsentRoute,
  AdminAdmissionRoute,
  AdminAnalysisRoute,
  AdminAttendanceRoute,
  AdminFeedRoute,
  AdminMarksheetRoute,
  AdminMessagesRoute,
  AdminNewsfeedRoute,
  AdminNoticesRoute,
  AdminPhonebookRoute,
  AdminProfileRoute,
  AdminQuestionBankRoute,
  AdminResultsRoute: AdminResultsRouteWithChildren,
  AdminSecurityRoute,
  AdminSiteRoute,
  AdminSmsRoute,
  AdminStudentsRoute,
  AdminTeachersRoute,
  AdminVideosRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const StudentRouteChildren = {
  StudentAnalysisRoute,
  StudentAttendanceRoute,
  StudentDashboardRoute,
  StudentExamRoute,
  StudentMessagesRoute,
  StudentNoticesRoute,
  StudentPdfsRoute,
  StudentProfileRoute,
  StudentResultsRoute,
  StudentIndexRoute
};
const StudentRouteWithChildren = StudentRoute._addFileChildren(StudentRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AdminRoute: AdminRouteWithChildren,
  LoginRoute,
  StudentRoute: StudentRouteWithChildren,
  ApiPublicHooksYoutubeFeedRoute
};
const routeTree = Route$B._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$1 as R,
  router as r
};
