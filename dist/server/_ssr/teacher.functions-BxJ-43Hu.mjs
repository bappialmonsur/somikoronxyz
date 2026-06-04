import { c as createServerRpc } from "./createServerRpc-3xqCa_X_.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-yOiDSkhF.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { n as normalizeBdPhone } from "./phone-B7PBua8H.mjs";
import { c as createServerFn } from "./server-B3epVi8w.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, b as booleanType, e as enumType } from "../_libs/zod.mjs";
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
const FEATURES = ["attendance", "results", "newsfeed", "admission"];
const signupSchema = objectType({
  phone: stringType().trim().min(11).max(20),
  password: stringType().min(6).max(72),
  full_name: stringType().trim().min(2).max(100)
});
const teacherSignup_createServerFn_handler = createServerRpc({
  id: "67104b0ad0f902c9082fea8532deffe60afe3f694b2747ff1642b5b987de74d6",
  name: "teacherSignup",
  filename: "src/lib/teacher.functions.ts"
}, (opts) => teacherSignup.__executeServer(opts));
const teacherSignup = createServerFn({
  method: "POST"
}).inputValidator((input) => signupSchema.parse(input)).handler(teacherSignup_createServerFn_handler, async ({
  data
}) => {
  const phoneE164 = normalizeBdPhone(data.phone);
  if (!phoneE164) throw new Error("সঠিক ফোন নম্বর দিন (১১ ডিজিটের, ০১... দিয়ে শুরু)");
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
      role: "teacher",
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
    role: "teacher"
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
async function assertAdmin(ctx) {
  const {
    data,
    error
  } = await ctx.supabase.from("user_roles").select("role").eq("user_id", ctx.userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("শুধুমাত্র এডমিন এই কাজ করতে পারবেন");
}
const listTeachers_createServerFn_handler = createServerRpc({
  id: "34d6b810e18b5bd0b649092fea3e4305b0b44607518969d459923f5aafa88373",
  name: "listTeachers",
  filename: "src/lib/teacher.functions.ts"
}, (opts) => listTeachers.__executeServer(opts));
const listTeachers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(listTeachers_createServerFn_handler, async ({
  context
}) => {
  await assertAdmin(context);
  const {
    data: roleRows,
    error: rErr
  } = await supabaseAdmin.from("user_roles").select("user_id").eq("role", "teacher");
  if (rErr) throw new Error(rErr.message);
  const ids = (roleRows ?? []).map((r) => r.user_id);
  if (ids.length === 0) return {
    teachers: []
  };
  const [{
    data: profs
  }, {
    data: perms
  }, usersRes] = await Promise.all([supabaseAdmin.from("profiles").select("id, full_name").in("id", ids), supabaseAdmin.from("teacher_permissions").select("user_id, feature").in("user_id", ids), supabaseAdmin.auth.admin.listUsers({
    page: 1,
    perPage: 1e3
  })]);
  const nameMap = new Map((profs ?? []).map((p) => [p.id, p.full_name]));
  const phoneMap = /* @__PURE__ */ new Map();
  for (const u of usersRes.data?.users ?? []) {
    if (ids.includes(u.id)) {
      const meta = u.user_metadata ?? {};
      phoneMap.set(u.id, meta.phone ?? (u.email ?? "").replace(/@.*/, ""));
    }
  }
  const permMap = /* @__PURE__ */ new Map();
  for (const p of perms ?? []) {
    const list = permMap.get(p.user_id) ?? [];
    list.push(p.feature);
    permMap.set(p.user_id, list);
  }
  const teachers = ids.map((id) => ({
    user_id: id,
    full_name: nameMap.get(id) || "নামহীন শিক্ষক",
    phone: phoneMap.get(id) ?? "",
    permissions: permMap.get(id) ?? []
  }));
  return {
    teachers
  };
});
const setPermSchema = objectType({
  user_id: stringType().uuid(),
  feature: enumType(FEATURES),
  enabled: booleanType()
});
const setTeacherPermission_createServerFn_handler = createServerRpc({
  id: "65164ee1284c263c620a557ef52b01460ff1fed4ef562485487e943d4d16779e",
  name: "setTeacherPermission",
  filename: "src/lib/teacher.functions.ts"
}, (opts) => setTeacherPermission.__executeServer(opts));
const setTeacherPermission = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => setPermSchema.parse(input)).handler(setTeacherPermission_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context);
  if (data.enabled) {
    const {
      error
    } = await supabaseAdmin.from("teacher_permissions").upsert({
      user_id: data.user_id,
      feature: data.feature
    }, {
      onConflict: "user_id,feature"
    });
    if (error) throw new Error(error.message);
  } else {
    const {
      error
    } = await supabaseAdmin.from("teacher_permissions").delete().eq("user_id", data.user_id).eq("feature", data.feature);
    if (error) throw new Error(error.message);
  }
  return {
    ok: true
  };
});
export {
  listTeachers_createServerFn_handler,
  setTeacherPermission_createServerFn_handler,
  teacherSignup_createServerFn_handler
};
