import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn } from "./createSsrRpc-CYB9djso.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { g as getPdfDownloadUrl } from "./site.functions-BGFLgTGx.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { a as bnNum } from "./grading-0NP-FUhN.mjs";
import { D as Dialog, a as DialogContent, b as DialogTitle } from "./dialog-BBLoBcjX.mjs";
import "../_libs/seroval.mjs";
import { F as FileText, L as LoaderCircle, W as BookOpen, X } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "./server-BaXZwRBy.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./auth-middleware-DoNSGWpn.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
function StudentPdfs() {
  const {
    user
  } = useSession();
  const getUrl = useServerFn(getPdfDownloadUrl);
  const [loadingId, setLoadingId] = reactExports.useState(null);
  const [viewer, setViewer] = reactExports.useState(null);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["my-pdfs", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data: s
      } = await supabase.from("students").select("class_level").eq("user_id", user.id).maybeSingle();
      if (!s) return [];
      const {
        data: data2,
        error
      } = await supabase.from("pdf_notes").select("*").eq("class_level", s.class_level).eq("is_active", true).order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  const handleRead = async (id, title) => {
    setLoadingId(id);
    try {
      const res = await getUrl({
        data: {
          noteId: id
        }
      });
      const url = `${res.url}#toolbar=0&navpanes=0&view=FitH`;
      setViewer({
        url,
        title
      });
    } catch (e) {
      toast.error(e.message ?? "খোলা যায়নি");
    } finally {
      setLoadingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-indigo-500/15 text-indigo-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "পিডিএফ নোটস" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "আপনার শ্রেণির জন্য প্রকাশিত নোট — এখান থেকে পড়ুন" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : (data?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border p-12 text-center text-muted-foreground", children: "কোনো পিডিএফ নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: data.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 flex gap-3 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-12 rounded-lg bg-academy-navy text-academy-gold flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy truncate", children: p.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          p.subject && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            p.subject,
            " · "
          ] }),
          p.pages && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            bnNum(p.pages),
            " পৃষ্ঠা · "
          ] }),
          p.file_size_kb && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            (p.file_size_kb / 1024).toFixed(1),
            " MB"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => handleRead(p.id, p.title), disabled: loadingId === p.id, className: "h-10 px-3 rounded-lg bg-academy-soft hover:bg-academy-navy hover:text-white flex items-center justify-center gap-1.5 text-xs font-bold transition-colors disabled:opacity-50", children: [
        loadingId === p.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: "size-4" }),
        "পড়ুন"
      ] })
    ] }, p.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!viewer, onOpenChange: (o) => !o && setViewer(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-6xl w-[96vw] h-[90vh] p-0 flex flex-col gap-0 [&>button]:hidden", onContextMenu: (e) => e.preventDefault(), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 h-12 border-b bg-academy-navy text-white rounded-t-lg shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-academy-gold" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-sm font-bold truncate flex-1 text-white", children: viewer?.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setViewer(null), className: "size-8 rounded-md hover:bg-white/10 flex items-center justify-center", "aria-label": "বন্ধ করুন", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }) })
      ] }),
      viewer && /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: viewer.url, title: viewer.title, className: "flex-1 w-full bg-neutral-100 rounded-b-lg", sandbox: "allow-scripts allow-same-origin" })
    ] }) })
  ] });
}
export {
  StudentPdfs as component
};
