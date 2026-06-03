import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { S as Switch } from "./switch-CQ4rbtn8.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { Y as Youtube, L as LoaderCircle, aa as Zap, w as Plus, T as Trash2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-switch.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
function VideoSourcesAdmin() {
  const qc = useQueryClient();
  const [name, setName] = reactExports.useState("");
  const [channelId, setChannelId] = reactExports.useState("");
  const [adding, setAdding] = reactExports.useState(false);
  const [posting, setPosting] = reactExports.useState(false);
  const [postingId, setPostingId] = reactExports.useState(null);
  const {
    data: sources,
    isLoading
  } = useQuery({
    queryKey: ["video-sources"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("video_sources").select("id, channel_id, name, is_active").order("name");
      if (error) throw error;
      return data;
    }
  });
  const add = async () => {
    if (!name.trim() || !channelId.trim()) {
      toast.error("চ্যানেলের নাম ও আইডি দিন");
      return;
    }
    setAdding(true);
    try {
      const {
        error
      } = await supabase.from("video_sources").insert({
        name: name.trim(),
        channel_id: channelId.trim()
      });
      if (error) throw error;
      toast.success("চ্যানেল যোগ হয়েছে");
      setName("");
      setChannelId("");
      qc.invalidateQueries({
        queryKey: ["video-sources"]
      });
    } catch (e) {
      toast.error(e.message ?? "যোগ করা ব্যর্থ হয়েছে");
    } finally {
      setAdding(false);
    }
  };
  const toggle = async (id, val) => {
    await supabase.from("video_sources").update({
      is_active: val
    }).eq("id", id);
    qc.invalidateQueries({
      queryKey: ["video-sources"]
    });
  };
  const remove = async (id) => {
    if (!confirm("চ্যানেলটি মুছবেন?")) return;
    const {
      error
    } = await supabase.from("video_sources").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("মুছে ফেলা হয়েছে");
    qc.invalidateQueries({
      queryKey: ["video-sources"]
    });
  };
  const doPost = async (channelId2) => {
    try {
      const res = await fetch("/api/public/hooks/youtube-feed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(channelId2 ? {
          channel_id: channelId2
        } : {})
      });
      const json = await res.json();
      if (json.ok) {
        toast.success(`পোস্ট হয়েছে: ${json.posted?.channel ?? "ভিডিও"}`);
      } else if (json.reason === "no_active_channels") {
        toast.error("কোনো সক্রিয় চ্যানেল নেই");
      } else if (json.reason === "no_fresh_video") {
        toast.info("নতুন কোনো ভিডিও পাওয়া যায়নি");
      } else {
        toast.error(json.error ?? "পোস্ট ব্যর্থ হয়েছে");
      }
    } catch (e) {
      toast.error(e.message ?? "পোস্ট ব্যর্থ হয়েছে");
    }
  };
  const postNow = async () => {
    setPosting(true);
    try {
      await doPost();
    } finally {
      setPosting(false);
    }
  };
  const postFromChannel = async (channelId2) => {
    setPostingId(channelId2);
    try {
      await doPost(channelId2);
    } finally {
      setPostingId(null);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 max-w-3xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-red-500/15 text-red-600 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Youtube, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "শিক্ষামূলক ভিডিও" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "প্রতি ঘন্টায় এই চ্যানেলগুলো থেকে র‍্যান্ডম শিক্ষামূলক ভিডিও স্বয়ংক্রিয়ভাবে নিউজফিডে পোস্ট হবে" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: postNow, disabled: posting, className: "bg-academy-navy text-white", children: [
        posting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 mr-1 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 mr-1" }),
        "এখনই একটি পোস্ট করুন"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-academy-navy", children: "নতুন চ্যানেল যোগ করুন" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-2 sm:grid-cols-[1fr_1fr_auto]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "চ্যানেলের নাম (যেমন Khan Academy)", value: name, onChange: (e) => setName(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "চ্যানেল আইডি (UCxxxx...)", value: channelId, onChange: (e) => setChannelId(e.target.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: add, disabled: adding, className: "bg-academy-gold text-academy-navy", children: [
          adding ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
          "যোগ"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: 'চ্যানেল আইডি পেতে: YouTube চ্যানেলের পেজে গিয়ে "Share channel" → "Copy channel ID" (UC দিয়ে শুরু হয়)।' })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-2xl border overflow-hidden", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "animate-spin" }) }) : !sources || sources.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-12 text-center text-muted-foreground", children: "কোনো চ্যানেল নেই" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: sources.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "p-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-academy-navy text-sm truncate", children: s.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: s.channel_id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", disabled: postingId === s.channel_id || !s.is_active, onClick: () => postFromChannel(s.channel_id), title: "এই চ্যানেল থেকে এখনই পোস্ট করুন", children: [
        postingId === s.channel_id ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4" }),
        "পোস্ট"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: s.is_active, onCheckedChange: (v) => toggle(s.id, v) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => remove(s.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4 text-red-500" }) })
    ] }, s.id)) }) })
  ] });
}
export {
  VideoSourcesAdmin as component
};
