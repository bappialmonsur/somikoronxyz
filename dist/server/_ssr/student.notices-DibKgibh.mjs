import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { b as bnClass } from "./grading-0NP-FUhN.mjs";
import { a as Bell, L as LoaderCircle } from "../_libs/lucide-react.mjs";
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
function StudentNotices() {
  const {
    user
  } = useSession();
  const {
    data: notices,
    isLoading
  } = useQuery({
    queryKey: ["student-notices", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data: student
      } = await supabase.from("students").select("class_level").eq("user_id", user.id).maybeSingle();
      let q = supabase.from("notices").select("*").eq("is_active", true).order("created_at", {
        ascending: false
      });
      if (student?.class_level) {
        q = q.or(`class_level.is.null,class_level.eq.${student.class_level}`);
      } else {
        q = q.is("class_level", null);
      }
      const {
        data,
        error
      } = await q;
      if (error) throw error;
      return data;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "নোটিশ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "সর্বশেষ ঘোষণা ও বার্তা" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : (notices?.length ?? 0) === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border p-12 text-center text-muted-foreground", children: "কোনো নোটিশ নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: notices.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "bg-white rounded-2xl border p-4 hover:shadow-sm transition-shadow", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-lg bg-academy-gold/15 text-academy-gold flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "size-4" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy", children: n.title }),
        n.body && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground mt-1 whitespace-pre-wrap", children: n.body }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-2 flex gap-2 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 bg-academy-soft rounded-full", children: n.class_level ? `${bnClass(n.class_level)} শ্রেণি` : "সবার জন্য" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(n.created_at).toLocaleDateString("bn-BD") })
        ] })
      ] })
    ] }) }, n.id)) })
  ] });
}
export {
  StudentNotices as component
};
