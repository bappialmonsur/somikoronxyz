import { c as createServerRpc } from "./createServerRpc-DYtfftUa.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BdDOp7xZ.mjs";
import { s as supabaseAdmin } from "./client.server-U_pH-Evd.mjs";
import { c as createServerFn } from "./server-BRebtgSX.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, s as stringType, n as numberType, a as arrayType } from "../_libs/zod.mjs";
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
async function assertAdmin(userId) {
  const {
    data: isAdminRow
  } = await supabaseAdmin.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!isAdminRow) throw new Error("শুধু অ্যাডমিন এই কাজ করতে পারে");
}
const getInputSchema = objectType({
  classLevel: stringType().min(1).max(3),
  subject: stringType().min(1).max(120),
  chapter: stringType().min(1).max(160)
});
const getExamQuestions_createServerFn_handler = createServerRpc({
  id: "0178e54aab8dc50fda474bc24bd1b377d83d5cec3f554dec88a847f9a2cbad16",
  name: "getExamQuestions",
  filename: "src/lib/mcq-exam.functions.ts"
}, (opts) => getExamQuestions.__executeServer(opts));
const getExamQuestions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => getInputSchema.parse(input)).handler(getExamQuestions_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase
  } = context;
  const {
    data: rows,
    error
  } = await supabase.from("mcq_questions").select("id, question, options, correct_index, explanation").eq("class_level", data.classLevel).eq("subject", data.subject).eq("chapter", data.chapter).eq("is_active", true).limit(500);
  if (error) throw new Error(error.message);
  const pool = rows ?? [];
  if (pool.length < 10) {
    throw new Error(`এই অধ্যায়ে এখনো যথেষ্ট প্রশ্ন নেই (${pool.length}টি আছে, কমপক্ষে ১০টি দরকার)। অ্যাডমিন প্রশ্ন যোগ করলে পরীক্ষা দেওয়া যাবে।`);
  }
  const arr = [...pool];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  const picked = arr.slice(0, Math.min(30, arr.length));
  const questions = picked.map((r) => ({
    question: r.question,
    options: Array.isArray(r.options) ? r.options : [],
    answerIndex: r.correct_index,
    explanation: r.explanation ?? void 0
  }));
  return {
    questions
  };
});
const listInputSchema = objectType({
  classLevel: stringType().min(1).max(3),
  subject: stringType().min(1).max(120),
  chapter: stringType().min(1).max(160)
});
const listQuestions_createServerFn_handler = createServerRpc({
  id: "4944ede2a3ee245a7b8d803a1c8c8c2ca89110942813b3e65df140405a36227b",
  name: "listQuestions",
  filename: "src/lib/mcq-exam.functions.ts"
}, (opts) => listQuestions.__executeServer(opts));
const listQuestions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => listInputSchema.parse(input)).handler(listQuestions_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    supabase,
    userId
  } = context;
  const {
    data: isAdminRow
  } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (!isAdminRow) throw new Error("শুধু অ্যাডমিন এই কাজ করতে পারে");
  const {
    data: rows,
    error
  } = await supabase.from("mcq_questions").select("id, question, options, correct_index, explanation, source, created_at").eq("class_level", data.classLevel).eq("subject", data.subject).eq("chapter", data.chapter).eq("is_active", true).order("created_at", {
    ascending: false
  }).limit(500);
  if (error) throw new Error(error.message);
  return {
    questions: rows ?? []
  };
});
const manualSchema = objectType({
  classLevel: stringType().min(1).max(3),
  subject: stringType().min(1).max(120),
  chapter: stringType().min(1).max(160),
  question: stringType().min(3).max(2e3),
  options: arrayType(stringType().min(1).max(500)).length(4),
  correctIndex: numberType().int().min(0).max(3),
  explanation: stringType().max(2e3).optional()
});
const addManualQuestion_createServerFn_handler = createServerRpc({
  id: "a5d1683bb4b95702362a2075c4db3a5d4a6c725523ed01783551fc52c852d883",
  name: "addManualQuestion",
  filename: "src/lib/mcq-exam.functions.ts"
}, (opts) => addManualQuestion.__executeServer(opts));
const addManualQuestion = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => manualSchema.parse(input)).handler(addManualQuestion_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  await assertAdmin(userId);
  const {
    error
  } = await supabaseAdmin.from("mcq_questions").insert({
    class_level: data.classLevel,
    subject: data.subject,
    chapter: data.chapter,
    question: data.question,
    options: data.options,
    correct_index: data.correctIndex,
    explanation: data.explanation || null,
    source: "manual",
    created_by: userId
  });
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const deleteSchema = objectType({
  id: stringType().uuid()
});
const deleteQuestion_createServerFn_handler = createServerRpc({
  id: "039d12a690ef404de37f7d36b2f1cc36217007db89f0ff8c8ad611137ecdee39",
  name: "deleteQuestion",
  filename: "src/lib/mcq-exam.functions.ts"
}, (opts) => deleteQuestion.__executeServer(opts));
const deleteQuestion = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => deleteSchema.parse(input)).handler(deleteQuestion_createServerFn_handler, async ({
  data,
  context
}) => {
  await assertAdmin(context.userId);
  const {
    error
  } = await supabaseAdmin.from("mcq_questions").update({
    is_active: false
  }).eq("id", data.id);
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const aiBatchSchema = objectType({
  classLevel: stringType().min(1).max(3),
  subject: stringType().min(1).max(120),
  chapter: stringType().min(1).max(160),
  count: numberType().int().min(5).max(50)
});
const aiGenerateQuestions_createServerFn_handler = createServerRpc({
  id: "62b36bc49952779054a80a7137354e32b57d18e19764c680023c660b1b90aa1a",
  name: "aiGenerateQuestions",
  filename: "src/lib/mcq-exam.functions.ts"
}, (opts) => aiGenerateQuestions.__executeServer(opts));
const aiGenerateQuestions = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => aiBatchSchema.parse(input)).handler(aiGenerateQuestions_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  await assertAdmin(userId);
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("AI কনফিগারেশন পাওয়া যায়নি");
  const system = `তুমি বাংলাদেশের NCTB ২০২৬ সালের পাঠ্যবইয়ের একজন অভিজ্ঞ শিক্ষক। প্রশ্ন বাংলায় হবে (English বিষয় হলে ইংরেজিতে)। অধ্যায়ভিত্তিক, পাঠ্যবইয়ের তথ্যনির্ভর বহুনির্বাচনি (MCQ)। প্রতি প্রশ্নে ঠিক ৪টি অপশন, একটি সঠিক উত্তর। মান ও ভাষা শ্রেণি অনুযায়ী মানানসই।`;
  const user = `ঠিক ${data.count}টি বহুনির্বাচনি প্রশ্ন তৈরি করো:
- শ্রেণি: ${data.classLevel}ম
- বিষয়: ${data.subject}
- অধ্যায়: ${data.chapter}
- পাঠ্যক্রম: NCTB ২০২৬
- সহজ, মাঝারি, কঠিন মিশ্রিত
- প্রতি প্রশ্নে ৪টি অপশন, answerIndex 0..3
- explanation এক বাক্যে`;
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{
        role: "system",
        content: system
      }, {
        role: "user",
        content: user
      }],
      tools: [{
        type: "function",
        function: {
          name: "submit_mcq",
          parameters: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question: {
                      type: "string"
                    },
                    options: {
                      type: "array",
                      items: {
                        type: "string"
                      },
                      minItems: 4,
                      maxItems: 4
                    },
                    answerIndex: {
                      type: "integer",
                      minimum: 0,
                      maximum: 3
                    },
                    explanation: {
                      type: "string"
                    }
                  },
                  required: ["question", "options", "answerIndex"]
                }
              }
            },
            required: ["questions"]
          }
        }
      }],
      tool_choice: {
        type: "function",
        function: {
          name: "submit_mcq"
        }
      }
    })
  });
  if (!res.ok) {
    if (res.status === 429) throw new Error("অনেকবার অনুরোধ — পরে চেষ্টা করুন");
    if (res.status === 402) throw new Error("AI ক্রেডিট শেষ। ওয়ার্কস্পেস সেটিংসে ক্রেডিট যোগ করুন।");
    const t = await res.text().catch(() => "");
    throw new Error(`AI ত্রুটি (${res.status}): ${t.slice(0, 200)}`);
  }
  const body = await res.json();
  const argsStr = body?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  if (!argsStr) throw new Error("AI প্রশ্ন তৈরি করতে পারেনি");
  let parsed;
  try {
    parsed = JSON.parse(argsStr);
  } catch {
    throw new Error("AI উত্তর পার্স করা যায়নি");
  }
  const valid = (parsed.questions ?? []).filter((q) => q && typeof q.question === "string" && Array.isArray(q.options) && q.options.length === 4 && Number.isInteger(q.answerIndex) && q.answerIndex >= 0 && q.answerIndex <= 3);
  if (valid.length === 0) throw new Error("কোনো বৈধ প্রশ্ন পাওয়া যায়নি");
  const rows = valid.map((q) => ({
    class_level: data.classLevel,
    subject: data.subject,
    chapter: data.chapter,
    question: q.question,
    options: q.options,
    correct_index: q.answerIndex,
    explanation: q.explanation || null,
    source: "ai",
    created_by: userId
  }));
  const {
    error
  } = await supabaseAdmin.from("mcq_questions").insert(rows);
  if (error) throw new Error(error.message);
  return {
    saved: rows.length
  };
});
export {
  addManualQuestion_createServerFn_handler,
  aiGenerateQuestions_createServerFn_handler,
  deleteQuestion_createServerFn_handler,
  getExamQuestions_createServerFn_handler,
  listQuestions_createServerFn_handler
};
