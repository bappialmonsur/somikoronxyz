import { c as createSsrRpc } from "./createSsrRpc-Cciirfj4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DBcDkPtY.mjs";
import { c as createServerFn } from "./server-CQ0U_xoc.mjs";
import { o as objectType, s as stringType, b as booleanType, e as enumType } from "../_libs/zod.mjs";
const FEATURES = ["attendance", "results", "newsfeed", "admission"];
const signupSchema = objectType({
  phone: stringType().trim().min(11).max(20),
  password: stringType().min(6).max(72),
  full_name: stringType().trim().min(2).max(100)
});
const teacherSignup = createServerFn({
  method: "POST"
}).inputValidator((input) => signupSchema.parse(input)).handler(createSsrRpc("67104b0ad0f902c9082fea8532deffe60afe3f694b2747ff1642b5b987de74d6"));
const listTeachers = createServerFn({
  method: "GET"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("34d6b810e18b5bd0b649092fea3e4305b0b44607518969d459923f5aafa88373"));
const setPermSchema = objectType({
  user_id: stringType().uuid(),
  feature: enumType(FEATURES),
  enabled: booleanType()
});
const setTeacherPermission = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => setPermSchema.parse(input)).handler(createSsrRpc("65164ee1284c263c620a557ef52b01460ff1fed4ef562485487e943d4d16779e"));
export {
  listTeachers as l,
  setTeacherPermission as s,
  teacherSignup as t
};
