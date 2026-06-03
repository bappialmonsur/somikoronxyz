import { c as createSsrRpc } from "./createSsrRpc-CnB93obs.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BdDOp7xZ.mjs";
import { c as createServerFn } from "./server-BRebtgSX.mjs";
import { o as objectType, a as arrayType, s as stringType } from "../_libs/zod.mjs";
const Input = objectType({
  message: stringType().min(1).max(1e3),
  numbers: arrayType(stringType().min(8).max(20)).min(1).max(1e3)
});
const sendBulkSms = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => Input.parse(input)).handler(createSsrRpc("27aeb153a917bb953e3f5a8b11c0ab7125188fc155f7e1d966f8c50023e304b5"));
export {
  sendBulkSms as s
};
