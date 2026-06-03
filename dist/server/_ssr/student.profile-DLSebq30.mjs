import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueryClient, a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { u as useServerFn, c as createSsrRpc } from "./createSsrRpc-CnB93obs.mjs";
import { u as useSession } from "./use-auth-C9k7gfSO.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BdDOp7xZ.mjs";
import { c as createServerFn } from "./server-BRebtgSX.mjs";
import { b as bnClass } from "./grading-0NP-FUhN.mjs";
import "../_libs/seroval.mjs";
import { U as UserRound, L as LoaderCircle, R as Camera, V as Upload, T as Trash2 } from "../_libs/lucide-react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
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
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream/promises";
import "node:https";
import "node:http2";
const setMyPhoto = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  // path must live inside the caller's own folder (uid/...)
  photoPath: stringType().min(1).max(300).nullable()
}).parse(input)).handler(createSsrRpc("2a6a278b97a24e8039bc58615402c494518d87223e067466daf786b5f1879cd9"));
const getMyPhotoUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("b0980aca9b03f4c97b016650970472ca5e9d89dd9e01af095432e2097510d418"));
function ProfilePage() {
  const {
    user
  } = useSession();
  const qc = useQueryClient();
  const saveFn = useServerFn(setMyPhoto);
  const urlFn = useServerFn(getMyPhotoUrl);
  const uploadRef = reactExports.useRef(null);
  const cameraRef = reactExports.useRef(null);
  const [busy, setBusy] = reactExports.useState(false);
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
    data: photo
  } = useQuery({
    queryKey: ["my-photo-url", user?.id, student?.photo_path],
    enabled: !!user,
    queryFn: () => urlFn()
  });
  const handleFile = async (file) => {
    if (!user) return;
    if (!file.type.startsWith("image/")) return toast.error("শুধু ছবি আপলোড করুন");
    if (file.size > 5 * 1024 * 1024) return toast.error("ছবির সাইজ ৫MB এর কম হতে হবে");
    setBusy(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${user.id}/avatar.${ext}`;
      const {
        error: upErr
      } = await supabase.storage.from("student-photos").upload(path, file, {
        upsert: true,
        contentType: file.type
      });
      if (upErr) throw upErr;
      await saveFn({
        data: {
          photoPath: path
        }
      });
      await qc.invalidateQueries({
        queryKey: ["my-student"]
      });
      await qc.invalidateQueries({
        queryKey: ["my-photo-url"]
      });
      toast.success("ছবি সংরক্ষণ করা হয়েছে");
    } catch (e) {
      toast.error(e.message ?? "ছবি আপলোড ব্যর্থ হয়েছে");
    } finally {
      setBusy(false);
    }
  };
  const handleRemove = async () => {
    if (!user || !student?.photo_path) return;
    if (!confirm("ছবিটি মুছে ফেলবেন?")) return;
    setBusy(true);
    try {
      await supabase.storage.from("student-photos").remove([student.photo_path]);
      await saveFn({
        data: {
          photoPath: null
        }
      });
      await qc.invalidateQueries({
        queryKey: ["my-student"]
      });
      await qc.invalidateQueries({
        queryKey: ["my-photo-url"]
      });
      toast.success("ছবি মুছে ফেলা হয়েছে");
    } catch (e) {
      toast.error(e.message ?? "মুছতে ব্যর্থ হয়েছে");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-academy-navy", children: "আমার প্রোফাইল" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "প্রোফাইল ছবি তুলুন বা আপলোড করুন" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl border p-6 flex flex-col items-center gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-36 rounded-full overflow-hidden bg-academy-soft border-4 border-academy-gold/30 flex items-center justify-center", children: photo?.url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: photo.url, alt: "প্রোফাইল ছবি", className: "w-full h-full object-cover" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserRound, { className: "size-16 text-academy-navy/40" }) }),
        busy && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full bg-black/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-7 text-white animate-spin" }) })
      ] }),
      student && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-bold text-academy-navy text-lg", children: student.full_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-muted-foreground", children: [
          bnClass(student.class_level),
          " শ্রেণি"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: uploadRef, type: "file", accept: "image/*", className: "hidden", onChange: (e) => {
        const f = e.target.files?.[0];
        if (f) handleFile(f);
        e.target.value = "";
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: cameraRef, type: "file", accept: "image/*", capture: "user", className: "hidden", onChange: (e) => {
        const f = e.target.files?.[0];
        if (f) handleFile(f);
        e.target.value = "";
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", disabled: busy, onClick: () => cameraRef.current?.click(), className: "bg-academy-navy text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "size-4" }),
          " ছবি তুলুন"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", disabled: busy, variant: "outline", onClick: () => uploadRef.current?.click(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-4" }),
          " আপলোড করুন"
        ] })
      ] }),
      student?.photo_path && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", disabled: busy, variant: "ghost", onClick: handleRemove, className: "text-red-500 hover:text-red-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }),
        " ছবি মুছে ফেলুন"
      ] })
    ] })
  ] });
}
export {
  ProfilePage as component
};
