import { c as createSsrRpc } from "./createSsrRpc-Cciirfj4.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DBcDkPtY.mjs";
import { c as createServerFn } from "./server-CQ0U_xoc.mjs";
import { o as objectType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
const getExamToppers = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  examIds: arrayType(stringType().uuid()).min(1).max(200)
}).parse(input)).handler(createSsrRpc("d32a89716f8dfbc9c4487e683562baeb6857d6d61810527c0762055dad688afe"));
const getMyClassPosition = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("a697a2427b4e8a52059a2d2ffc69698cd8b4134ef4f9d318dff6505641716872"));
const getMonthlyClassMerit = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).handler(createSsrRpc("e8e52ac00ab0a87cbe53cfcbfc78584acde27cbb6865d9060b473a61ba8e950b"));
export {
  getExamToppers as a,
  getMyClassPosition as b,
  getMonthlyClassMerit as g
};
