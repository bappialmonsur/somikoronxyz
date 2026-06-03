import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as bnClass, a as bnNum } from "./grading-0NP-FUhN.mjs";
import { M as MessageSquare, L as LoaderCircle, d as ShieldCheck, u as Send } from "../_libs/lucide-react.mjs";
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
function StudentMessages() {
  const {
    user
  } = useSession();
  const qc = useQueryClient();
  const endRef = reactExports.useRef(null);
  const [text, setText] = reactExports.useState("");
  const [sending, setSending] = reactExports.useState(false);
  const {
    data: student
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
  const {
    data: msgs,
    isLoading
  } = useQuery({
    queryKey: ["my-messages", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("messages").select("id, sender_role, body, created_at").eq("student_user_id", user.id).order("created_at", {
        ascending: true
      });
      if (error) throw error;
      return data;
    }
  });
  reactExports.useEffect(() => {
    if (!user) return;
    const channel = supabase.channel("student-msg-rt").on("postgres_changes", {
      event: "*",
      schema: "public",
      table: "messages",
      filter: `student_user_id=eq.${user.id}`
    }, () => qc.invalidateQueries({
      queryKey: ["my-messages", user.id]
    })).subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, qc]);
  reactExports.useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth"
    });
    if (user && (msgs ?? []).some((m) => m.sender_role === "admin")) {
      supabase.from("messages").update({
        is_read: true
      }).eq("student_user_id", user.id).eq("sender_role", "admin").eq("is_read", false).then(() => {
      });
    }
  }, [msgs, user]);
  const send = async () => {
    if (!text.trim() || !student) return;
    setSending(true);
    try {
      const meta = `${bnClass(student.class_level)} শ্রেণি · রোল ${bnNum(student.roll ?? "")}`;
      const {
        error
      } = await supabase.from("messages").insert({
        student_user_id: user.id,
        sender_role: "student",
        sender_name: student.full_name,
        sender_meta: meta,
        body: text.trim()
      });
      if (error) throw error;
      setText("");
      qc.invalidateQueries({
        queryKey: ["my-messages", user.id]
      });
    } catch (e) {
      toast.error(e.message ?? "মেসেজ পাঠানো যায়নি");
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto flex flex-col", style: {
    height: "calc(100vh - 8rem)"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-xl bg-academy-navy/10 text-academy-navy flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "size-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-bold text-academy-navy leading-tight", children: "এডমিনকে মেসেজ" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "যেকোনো প্রশ্ন বা সমস্যা সরাসরি জানান" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto space-y-2 rounded-2xl border bg-academy-soft/40 p-3", children: [
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin text-academy-gold" }) }) : (msgs ?? []).length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center text-sm text-muted-foreground py-10", children: "এখনো কোনো মেসেজ নেই। নিচে লিখে এডমিনকে পাঠান।" }) : (msgs ?? []).map((m) => {
        const mine = m.sender_role === "student";
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex ${mine ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${mine ? "bg-academy-navy text-white rounded-br-sm" : "bg-white border rounded-bl-sm text-academy-navy"}`, children: [
          !mine && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-[10px] font-semibold text-academy-gold mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3" }),
            " এডমিন"
          ] }),
          m.body,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `text-[10px] mt-1 ${mine ? "text-white/60" : "text-muted-foreground"}`, children: new Date(m.created_at).toLocaleString("bn-BD") })
        ] }) }, m.id);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: endRef })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 mt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 1, placeholder: "মেসেজ লিখুন...", value: text, onChange: (e) => setText(e.target.value), onKeyDown: (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          send();
        }
      }, className: "resize-none min-h-10" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: send, disabled: sending || !text.trim(), className: "bg-academy-navy text-white shrink-0", children: sending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "size-4" }) })
    ] })
  ] });
}
export {
  StudentMessages as component
};
