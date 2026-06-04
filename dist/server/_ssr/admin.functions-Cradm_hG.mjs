import { c as createServerRpc } from "./createServerRpc-BMqY2YdI.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DBcDkPtY.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { n as normalizeBdPhone, d as defaultStudentPassword } from "./phone-B7PBua8H.mjs";
import { c as createServerFn } from "./server-CQ0U_xoc.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
const CLASSES = ["5", "6", "7", "8", "9", "10", "11", "12"];
const BATCHES = ["morning", "afternoon", "evening"];
const DEPTS = ["none", "science", "business"];
const studentSchema = objectType({
  full_name: stringType().trim().min(2).max(100),
  father_name: stringType().trim().max(100).optional().default(""),
  mother_name: stringType().trim().max(100).optional().default(""),
  father_occupation: stringType().trim().max(100).optional().default(""),
  school_name: stringType().trim().max(150).optional().default(""),
  phone: stringType().trim().min(11).max(20),
  guardian_phone: stringType().trim().max(20).optional().default(""),
  class_level: enumType(CLASSES),
  batch: enumType(BATCHES),
  department: enumType(DEPTS).default("none"),
  address: stringType().trim().max(500).optional().default("")
});
const createStudentAccount_createServerFn_handler = createServerRpc({
  id: "d1281c587aa83399699ff80cfcfb8da6bde1b61ce7c8f48b15159a4273ae5960",
  name: "createStudentAccount",
  filename: "src/lib/admin.functions.ts"
}, (opts) => createStudentAccount.__executeServer(opts));
const createStudentAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => studentSchema.parse(input)).handler(createStudentAccount_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    data: roleRow,
    error: roleErr
  } = await context.supabase.from("user_roles").select("role").eq("user_id", context.userId).eq("role", "admin").maybeSingle();
  if (roleErr) throw new Error(roleErr.message);
  if (!roleRow) {
    const {
      data: perm,
      error: permErr
    } = await context.supabase.from("teacher_permissions").select("id").eq("user_id", context.userId).eq("feature", "admission").maybeSingle();
    if (permErr) throw new Error(permErr.message);
    if (!perm) throw new Error("এই কাজের অনুমতি নেই");
  }
  const phoneE164 = normalizeBdPhone(data.phone);
  if (!phoneE164) throw new Error("সঠিক ফোন নম্বর দিন (১১ ডিজিটের, ০১... দিয়ে শুরু)");
  const syntheticEmail = `${phoneE164.replace(/\D/g, "")}@somikoron.local`;
  const autoPassword = defaultStudentPassword(phoneE164);
  const {
    data: created,
    error: createErr
  } = await supabaseAdmin.auth.admin.createUser({
    email: syntheticEmail,
    password: autoPassword,
    email_confirm: true,
    user_metadata: {
      full_name: data.full_name,
      role: "student",
      phone: phoneE164
    }
  });
  if (createErr || !created.user) {
    throw new Error(createErr?.message ?? "ব্যবহারকারী তৈরি ব্যর্থ");
  }
  const newUserId = created.user.id;
  const {
    data: student,
    error: insErr
  } = await supabaseAdmin.from("students").insert({
    user_id: newUserId,
    full_name: data.full_name,
    father_name: data.father_name || null,
    mother_name: data.mother_name || null,
    father_occupation: data.father_occupation || null,
    school_name: data.school_name || null,
    phone: phoneE164,
    guardian_phone: data.guardian_phone || null,
    class_level: data.class_level,
    batch: data.batch,
    department: data.class_level >= "9" ? data.department : "none",
    address: data.address || null
  }).select("id, roll, class_level").single();
  if (insErr) {
    await supabaseAdmin.auth.admin.deleteUser(newUserId).catch(() => {
    });
    throw new Error(insErr.message);
  }
  return {
    id: student.id,
    roll: student.roll,
    class_level: student.class_level,
    phone: phoneE164,
    password: autoPassword
  };
});
const adminSignupSchema = objectType({
  phone: stringType().trim().min(11).max(20),
  password: stringType().min(6).max(72),
  full_name: stringType().trim().min(2).max(100)
});
const bootstrapAdminAccount_createServerFn_handler = createServerRpc({
  id: "b4f744ed33855f0a21ae2c89fbab6aab79cf5301fc4e2fe686559ed0fb7df3c2",
  name: "bootstrapAdminAccount",
  filename: "src/lib/admin.functions.ts"
}, (opts) => bootstrapAdminAccount.__executeServer(opts));
const bootstrapAdminAccount = createServerFn({
  method: "POST"
}).inputValidator((input) => adminSignupSchema.parse(input)).handler(bootstrapAdminAccount_createServerFn_handler, async ({
  data
}) => {
  const {
    count,
    error: countErr
  } = await supabaseAdmin.from("user_roles").select("*", {
    count: "exact",
    head: true
  }).eq("role", "admin");
  if (countErr) throw new Error(countErr.message);
  if ((count ?? 0) > 0) {
    throw new Error("ইতিমধ্যে এডমিন আছেন। কর্তৃপক্ষের সাথে যোগাযোগ করুন।");
  }
  const phoneE164 = normalizeBdPhone(data.phone);
  if (!phoneE164) throw new Error("সঠিক ফোন নম্বর দিন");
  const syntheticEmail = `${phoneE164.replace(/\D/g, "")}@somikoron.local`;
  const {
    data: created,
    error: createErr
  } = await supabaseAdmin.auth.admin.createUser({
    email: syntheticEmail,
    password: data.password,
    email_confirm: true,
    user_metadata: {
      full_name: data.full_name,
      role: "admin",
      phone: phoneE164
    }
  });
  if (createErr || !created.user) {
    throw new Error(createErr?.message ?? "একাউন্ট তৈরি ব্যর্থ");
  }
  const {
    error: roleErr
  } = await supabaseAdmin.from("user_roles").insert({
    user_id: created.user.id,
    role: "admin"
  });
  if (roleErr) {
    await supabaseAdmin.auth.admin.deleteUser(created.user.id).catch(() => {
    });
    throw new Error(roleErr.message);
  }
  return {
    phone: phoneE164
  };
});
const checkAdminExists_createServerFn_handler = createServerRpc({
  id: "06628d9cc974261677972ea34a60b163199fc08c454cc0b55cfe9f0049fc54b3",
  name: "checkAdminExists",
  filename: "src/lib/admin.functions.ts"
}, (opts) => checkAdminExists.__executeServer(opts));
const checkAdminExists = createServerFn({
  method: "GET"
}).handler(checkAdminExists_createServerFn_handler, async () => {
  const {
    count,
    error
  } = await supabaseAdmin.from("user_roles").select("*", {
    count: "exact",
    head: true
  }).eq("role", "admin");
  if (error) throw new Error(error.message);
  return {
    exists: (count ?? 0) > 0
  };
});
export {
  bootstrapAdminAccount_createServerFn_handler,
  checkAdminExists_createServerFn_handler,
  createStudentAccount_createServerFn_handler
};
