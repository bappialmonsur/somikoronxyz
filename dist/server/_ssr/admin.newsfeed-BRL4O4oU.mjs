import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { F as FeedHeader, a as FeedList } from "./news-feed-DDav6-1E.mjs";
import "../_libs/katex.mjs";
import "../_libs/sonner.mjs";
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
import "./math-text-ChCUGY98.mjs";
import "./button-BC9oXVxV.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "./textarea-DSyJ1nlY.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function PanelNewsfeed() {
  const {
    user
  } = useSession();
  const qc = useQueryClient();
  const {
    data: posts,
    isLoading
  } = useQuery({
    queryKey: ["panel-feed"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("feed_posts").select("id, body, media_type, media_path, link_url, class_level, created_at, author_id, author_name, author_role, author_meta, status").eq("status", "approved").eq("is_active", true).order("created_at", {
        ascending: false
      }).limit(100);
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    if (!user) return;
    const channel = supabase.channel("panel-feed-rt").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "feed_posts"
    }, () => {
      qc.invalidateQueries({
        queryKey: ["panel-feed"]
      });
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, qc]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto space-y-5 pb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeedHeader, { subtitle: "সর্বশেষ অনুমোদিত পোস্টসমূহ" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeedList, { posts, isLoading })
  ] });
}
export {
  PanelNewsfeed as component
};
