import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { M as MessageSquare, L as LoaderCircle, a5 as ChevronLeft, G as GraduationCap, u as Send } from "../_libs/lucide-react.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function AdminMessages() {
  useSession();
  const qc = useQueryClient();
  const [active, setActive] = reactExports.useState(null);
  const [text, setText] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const endRef = reactExports.useRef(null);
  const {
    data: all,
    isLoading
  } = useQuery({
    queryKey: ["admin-conversations"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("messages").select("*").order("created_at", {
        ascending: true
      });
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    const channel = supabase.channel("admin-msg-rt").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "messages"
    }, () => {
      qc.invalidateQueries({
        queryKey: ["admin-conversations"]
      });
      qc.invalidateQueries({
        queryKey: ["admin-notifications"]
      });
    }).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);
  const convos = reactExports.useMemo(() => {
    const map = /* @__PURE__ */ new Map();
    for (const m of all ?? []) {
      const cur = map.get(m.student_user_id);
      const unread = (cur?.unread ?? 0) + (m.sender_role === "student" && !m.is_read ? 1 : 0);
      map.set(m.student_user_id, {
        id: m.student_user_id,
        name: m.sender_role === "student" ? m.sender_name ?? "শিক্ষার্থী" : cur?.name ?? "শিক্ষার্থী",
        meta: m.sender_role === "student" ? m.sender_meta ?? "" : cur?.meta ?? "",
        last: m,
        unread
      });
    }
    return Array.from(map.values()).sort((a, b) => +new Date(b.last.created_at) - +new Date(a.last.created_at));
  }, [all]);
  const thread = reactExports.useMemo(() => (all ?? []).filter((m) => m.student_user_id === active), [all, active]);
  reactExports.useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth"
    });
    if (active && thread.some((m) => m.sender_role === "student" && !m.is_read)) {
      supabase.from("messages").update({
        is_read: true
      }).eq("student_user_id", active).eq("sender_role", "student").eq("is_read", false).then(() => qc.invalidateQueries({
        queryKey: ["admin-notifications"]
      }));
    }
  }, [active, thread, qc]);
  const send = async () => {
    if (!text.trim() || !active) return;
    setSending(true);
    try {
      const {
        error
      } = await supabase.from("messages").insert({
        student_user_id: active,
        sender_role: "admin",
        sender_name: "এডমিন",
        body: text.trim()
      });
      if (error) throw error;
      setText("");
      qc.invalidateQueries({
        queryKey: ["admin-conversations"]
      });
    } catch (e) {
      toast.error(e.message ?? "পাঠানো যায়নি");
    } finally {
      setSending(false);
    }
  };
  const activeConvo = convos.find((c) => c.id === active);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-xl bg-academy-navy/10 text-academy-navy flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-academy-navy leading-tight", children: "শিক্ষার্থী মেসেজ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "শিক্ষার্থীদের বার্তা ও উত্তর" })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin text-academy-gold" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[260px_1fr] gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bg-white rounded-2xl border overflow-hidden ${active ? "hidden md:block" : ""}`, children: convos.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-8 text-center text-sm text-muted-foreground", children: "কোনো মেসেজ নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y max-h-[70vh] overflow-y-auto", children: convos.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setActive(c.id), className: `w-full text-left p-3 hover:bg-academy-soft/60 transition-colors ${active === c.id ? "bg-academy-soft" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm text-academy-navy truncate flex-1", children: c.name }),
          c.unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-white bg-red-500 rounded-full px-1.5 py-0.5 min-w-5 text-center", children: c.unread })
        ] }),
        c.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground truncate", children: c.meta }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate mt-0.5", children: c.last.body })
      ] }) }, c.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `bg-white rounded-2xl border flex flex-col ${active ? "" : "hidden md:flex"}`, style: {
        height: "70vh"
      }, children: !active ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center text-sm text-muted-foreground", children: "একটি কথোপকথন বেছে নিন" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border-b flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "md:hidden", onClick: () => setActive(null), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 rounded-full bg-academy-gold/30 flex items-center justify-center text-academy-navy", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-academy-navy truncate", children: activeConvo?.name }),
            activeConvo?.meta && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground truncate", children: activeConvo.meta })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto p-3 space-y-2 bg-academy-soft/40", children: [
          thread.map((m) => {
            const mine = m.sender_role === "admin";
            return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${mine ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${mine ? "bg-academy-navy text-white rounded-br-sm" : "bg-white border rounded-bl-sm text-academy-navy"}`, children: [
              m.body,
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] mt-1 ${mine ? "text-white/60" : "text-muted-foreground"}`, children: new Date(m.created_at).toLocaleString("bn-BD") })
            ] }) }, m.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: endRef })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 p-3 border-t", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 1, placeholder: "উত্তর লিখুন...", value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }, className: "resize-none min-h-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: send, disabled: sending || !text.trim(), className: "bg-academy-navy text-white shrink-0", children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }) })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  AdminMessages as component
};
