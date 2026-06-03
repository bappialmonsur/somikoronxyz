import { c as createServerRpc } from "./createServerRpc-DYtfftUa.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BdDOp7xZ.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { c as createServerFn } from "./server-BRebtgSX.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "./createMiddleware-BvN2ghIY.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:http";
import "node:stream";
import "node:stream/promises";
import "node:https";
import "node:http2";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const setMyPhoto_createServerFn_handler = createServerRpc({
  id: "2a6a278b97a24e8039bc58615402c494518d87223e067466daf786b5f1879cd9",
  name: "setMyPhoto",
  filename: "src/lib/student-photo.functions.ts"
}, (opts) => setMyPhoto.__executeServer(opts));
const setMyPhoto = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  // path must live inside the caller's own folder (uid/...)
  photoPath: stringType().min(1).max(300).nullable()
}).parse(input)).handler(setMyPhoto_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: me
  } = await supabaseAdmin.from("students").select("id, is_active").eq("user_id", userId).maybeSingle();
  if (!me || !me.is_active) throw new Error("অ্যাক্সেস নেই");
  if (data.photoPath && !data.photoPath.startsWith(`${userId}/`)) {
    throw new Error("অবৈধ ছবির পথ");
  }
  const {
    error
  } = await supabaseAdmin.from("students").update({
    photo_path: data.photoPath
  }).eq("id", me.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getMyPhotoUrl_createServerFn_handler = createServerRpc({
  id: "b0980aca9b03f4c97b016650970472ca5e9d89dd9e01af095432e2097510d418",
  name: "getMyPhotoUrl",
  filename: "src/lib/student-photo.functions.ts"
}, (opts) => getMyPhotoUrl.__executeServer(opts));
const getMyPhotoUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getMyPhotoUrl_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: me
  } = await supabaseAdmin.from("students").select("photo_path").eq("user_id", userId).maybeSingle();
  if (!me?.photo_path) return {
    url: null
  };
  const {
    data: signed
  } = await supabaseAdmin.storage.from("student-photos").createSignedUrl(me.photo_path, 60 * 60);
  return {
    url: signed?.signedUrl ?? null
  };
});
export {
  getMyPhotoUrl_createServerFn_handler,
  setMyPhoto_createServerFn_handler
};
