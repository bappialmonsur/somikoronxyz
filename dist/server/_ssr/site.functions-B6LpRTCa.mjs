import { c as createServerRpc } from "./createServerRpc-BHOKVYWt.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DoNSGWpn.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { c as createServerFn } from "./server-BaXZwRBy.mjs";
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
const getPdfDownloadUrl_createServerFn_handler = createServerRpc({
  id: "3647d76219b1f7498636f1521523ef0bd4db1b5500147283836ce2343c38b11e",
  name: "getPdfDownloadUrl",
  filename: "src/lib/site.functions.ts"
}, (opts) => getPdfDownloadUrl.__executeServer(opts));
const getPdfDownloadUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  noteId: stringType().uuid()
}).parse(input)).handler(getPdfDownloadUrl_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: note,
    error: noteErr
  } = await supabaseAdmin.from("pdf_notes").select("id, file_path, class_level, is_active").eq("id", data.noteId).maybeSingle();
  if (noteErr) throw new Error(noteErr.message);
  if (!note || !note.is_active) throw new Error("নোটটি পাওয়া যায়নি");
  const {
    data: isAdmin
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!isAdmin) {
    const {
      data: student
    } = await supabaseAdmin.from("students").select("class_level, is_active").eq("user_id", userId).maybeSingle();
    if (!student || !student.is_active || student.class_level !== note.class_level) {
      throw new Error("এই পিডিএফ ডাউনলোডের অনুমতি নেই");
    }
  }
  const {
    data: signed,
    error: signErr
  } = await supabaseAdmin.storage.from("pdf-notes").createSignedUrl(note.file_path, 60 * 10);
  if (signErr || !signed) throw new Error(signErr?.message ?? "URL তৈরি ব্যর্থ");
  return {
    url: signed.signedUrl
  };
});
export {
  getPdfDownloadUrl_createServerFn_handler
};
