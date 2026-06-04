import { c as createServerRpc } from "./createServerRpc-3xqCa_X_.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-yOiDSkhF.mjs";
import { c as createServerFn } from "./server-B3epVi8w.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
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
const SMS_ENDPOINT = "https://bulksmsbd.net/api/smsapi";
const Input = objectType({
  message: stringType().min(1).max(1e3),
  numbers: arrayType(stringType().min(8).max(20)).min(1).max(1e3)
});
function normalize(n) {
  let d = n.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("880")) return d;
  if (d.startsWith("0")) return "880" + d.slice(1);
  if (d.startsWith("1") && d.length === 10) return "880" + d;
  return d;
}
const sendBulkSms_createServerFn_handler = createServerRpc({
  id: "27aeb153a917bb953e3f5a8b11c0ab7125188fc155f7e1d966f8c50023e304b5",
  name: "sendBulkSms",
  filename: "src/lib/sms.functions.ts"
}, (opts) => sendBulkSms.__executeServer(opts));
const sendBulkSms = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => Input.parse(input)).handler(sendBulkSms_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: isAdmin
  } = await supabase.rpc("has_role", {
    _user_id: userId,
    _role: "admin"
  });
  if (!isAdmin) {
    throw new Error("শুধু এডমিন SMS পাঠাতে পারবেন");
  }
  const apiKey = process.env.BULKSMSBD_API_KEY;
  const senderId = process.env.BULKSMSBD_SENDER_ID;
  if (!apiKey || !senderId) {
    throw new Error("SMS কনফিগারেশন পাওয়া যায়নি");
  }
  const uniqueNumbers = Array.from(new Set(data.numbers.map(normalize))).filter((n) => n.length === 13);
  if (uniqueNumbers.length === 0) {
    throw new Error("বৈধ কোনো নাম্বার নেই");
  }
  const body = new URLSearchParams({
    api_key: apiKey,
    senderid: senderId,
    number: uniqueNumbers.join(","),
    message: data.message,
    type: "text"
  });
  const res = await fetch(SMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
  }
  const code = json?.response_code ?? res.status;
  const success = code === 202;
  if (!success) {
    const msg = json?.error_message || json?.message || text?.slice(0, 200) || `HTTP ${res.status}`;
    throw new Error(`SMS পাঠানো যায়নি: ${msg}`);
  }
  return {
    ok: true,
    sent: uniqueNumbers.length,
    messageId: json?.message_id ?? null
  };
});
export {
  sendBulkSms_createServerFn_handler
};
