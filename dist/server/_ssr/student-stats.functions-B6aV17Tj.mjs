import { c as createServerRpc } from "./createServerRpc-BMqY2YdI.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DBcDkPtY.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { c as createServerFn } from "./server-CQ0U_xoc.mjs";
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
const getExamToppers_createServerFn_handler = createServerRpc({
  id: "d32a89716f8dfbc9c4487e683562baeb6857d6d61810527c0762055dad688afe",
  name: "getExamToppers",
  filename: "src/lib/student-stats.functions.ts"
}, (opts) => getExamToppers.__executeServer(opts));
const getExamToppers = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  examIds: arrayType(stringType().uuid()).min(1).max(200)
}).parse(input)).handler(getExamToppers_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: isAdmin
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  let allowedClass = null;
  if (!isAdmin) {
    const {
      data: student
    } = await supabaseAdmin.from("students").select("class_level, is_active").eq("user_id", userId).maybeSingle();
    if (!student || !student.is_active) throw new Error("অ্যাক্সেস নেই");
    allowedClass = student.class_level;
  }
  const {
    data: exams
  } = await supabaseAdmin.from("exams").select("id, class_level").in("id", data.examIds);
  const examMap = new Map((exams ?? []).map((e) => [e.id, e.class_level]));
  const validIds = data.examIds.filter((id) => {
    const cl = examMap.get(id);
    if (!cl) return false;
    if (allowedClass && cl !== allowedClass) return false;
    return true;
  });
  if (validIds.length === 0) return {};
  const {
    data: results
  } = await supabaseAdmin.from("exam_results").select("exam_id, student_id, marks").in("exam_id", validIds);
  const top = /* @__PURE__ */ new Map();
  for (const r of results ?? []) {
    const m = Number(r.marks);
    const cur = top.get(r.exam_id);
    if (!cur || m > cur.marks) top.set(r.exam_id, {
      student_id: r.student_id,
      marks: m
    });
  }
  const studentIds = Array.from(new Set(Array.from(top.values()).map((t) => t.student_id)));
  const {
    data: students
  } = studentIds.length ? await supabaseAdmin.from("students").select("id, full_name, roll").in("id", studentIds) : {
    data: []
  };
  const sMap = new Map((students ?? []).map((s) => [s.id, s]));
  const out = {};
  for (const [examId, t] of top.entries()) {
    const s = sMap.get(t.student_id);
    out[examId] = {
      name: s?.full_name ?? "—",
      roll: s?.roll ?? null,
      marks: t.marks
    };
  }
  return out;
});
const getMyClassPosition_createServerFn_handler = createServerRpc({
  id: "a697a2427b4e8a52059a2d2ffc69698cd8b4134ef4f9d318dff6505641716872",
  name: "getMyClassPosition",
  filename: "src/lib/student-stats.functions.ts"
}, (opts) => getMyClassPosition.__executeServer(opts));
const getMyClassPosition = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getMyClassPosition_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: me
  } = await supabaseAdmin.from("students").select("id, class_level, is_active").eq("user_id", userId).maybeSingle();
  if (!me || !me.is_active) return null;
  const {
    data: classmates
  } = await supabaseAdmin.from("students").select("id").eq("class_level", me.class_level).eq("is_active", true);
  const ids = (classmates ?? []).map((s) => s.id);
  if (ids.length === 0) return null;
  const {
    data: results
  } = await supabaseAdmin.from("exam_results").select("student_id, marks, exam_id").in("student_id", ids);
  const totals = /* @__PURE__ */ new Map();
  for (const r of results ?? []) {
    totals.set(r.student_id, (totals.get(r.student_id) ?? 0) + Number(r.marks));
  }
  const myTotal = totals.get(me.id) ?? 0;
  const myExamIds = (results ?? []).filter((r) => r.student_id === me.id).map((r) => r.exam_id);
  let myFullTotal = 0;
  if (myExamIds.length) {
    const {
      data: exams
    } = await supabaseAdmin.from("exams").select("id, full_marks").in("id", myExamIds);
    myFullTotal = (exams ?? []).reduce((s, e) => s + Number(e.full_marks), 0);
  }
  if (myTotal === 0 && !totals.has(me.id)) {
    return {
      position: null,
      classSize: ids.length,
      myTotal: 0,
      myFullTotal: 0
    };
  }
  const scored = ids.map((id) => totals.get(id) ?? 0).sort((a, b) => b - a);
  const better = scored.filter((m) => m > myTotal).length;
  const position = better + 1;
  return {
    position,
    classSize: ids.length,
    myTotal,
    myFullTotal,
    scoredCount: scored.filter((m) => m > 0).length
  };
});
const getMonthlyClassMerit_createServerFn_handler = createServerRpc({
  id: "e8e52ac00ab0a87cbe53cfcbfc78584acde27cbb6865d9060b473a61ba8e950b",
  name: "getMonthlyClassMerit",
  filename: "src/lib/student-stats.functions.ts"
}, (opts) => getMonthlyClassMerit.__executeServer(opts));
const getMonthlyClassMerit = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(getMonthlyClassMerit_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const now = /* @__PURE__ */ new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);
  const monthLabel = now.toLocaleDateString("bn-BD", {
    month: "long",
    year: "numeric"
  });
  const empty = {
    top: [],
    me: null,
    monthLabel
  };
  const {
    data: me
  } = await supabaseAdmin.from("students").select("id, class_level, is_active").eq("user_id", userId).maybeSingle();
  if (!me || !me.is_active) return empty;
  const classLevel = me.class_level;
  const {
    data: exams
  } = await supabaseAdmin.from("exams").select("id, full_marks").eq("class_level", classLevel).gte("exam_date", monthStart);
  const examIds = (exams ?? []).map((e) => e.id);
  const fullMap = new Map((exams ?? []).map((e) => [e.id, Number(e.full_marks)]));
  const {
    data: students
  } = await supabaseAdmin.from("students").select("id, full_name, roll, photo_path").eq("class_level", classLevel).eq("is_active", true);
  const sMap = new Map((students ?? []).map((s) => [s.id, s]));
  const totals = /* @__PURE__ */ new Map();
  const fullTotals = /* @__PURE__ */ new Map();
  if (examIds.length) {
    const {
      data: results
    } = await supabaseAdmin.from("exam_results").select("student_id, exam_id, marks").in("exam_id", examIds);
    for (const r of results ?? []) {
      if (!sMap.has(r.student_id) || r.marks == null) continue;
      totals.set(r.student_id, (totals.get(r.student_id) ?? 0) + Number(r.marks));
      fullTotals.set(r.student_id, (fullTotals.get(r.student_id) ?? 0) + (fullMap.get(r.exam_id) ?? 0));
    }
  }
  const ranked = Array.from(totals.entries()).map(([sid, total]) => ({
    sid,
    total
  })).sort((a, b) => b.total - a.total);
  const posMap = /* @__PURE__ */ new Map();
  ranked.forEach((r, i) => posMap.set(r.sid, i + 1));
  const top = [];
  for (const r of ranked.slice(0, 5)) {
    const s = sMap.get(r.sid);
    let photoUrl = null;
    if (s?.photo_path) {
      const {
        data: signed
      } = await supabaseAdmin.storage.from("student-photos").createSignedUrl(s.photo_path, 60 * 60);
      photoUrl = signed?.signedUrl ?? null;
    }
    top.push({
      student_id: r.sid,
      name: s?.full_name ?? "—",
      roll: s?.roll ?? null,
      photoUrl,
      total: r.total,
      fullTotal: fullTotals.get(r.sid) ?? 0,
      position: posMap.get(r.sid)
    });
  }
  return {
    top,
    me: {
      position: posMap.get(me.id) ?? null,
      classSize: ranked.length,
      total: totals.get(me.id) ?? 0,
      fullTotal: fullTotals.get(me.id) ?? 0
    },
    monthLabel
  };
});
export {
  getExamToppers_createServerFn_handler,
  getMonthlyClassMerit_createServerFn_handler,
  getMyClassPosition_createServerFn_handler
};
