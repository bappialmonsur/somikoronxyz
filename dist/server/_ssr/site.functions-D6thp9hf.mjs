import { c as createSsrRpc } from "./createSsrRpc-CnB93obs.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-BdDOp7xZ.mjs";
import { c as createServerFn } from "./server-BRebtgSX.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const getPdfDownloadUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  noteId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("3647d76219b1f7498636f1521523ef0bd4db1b5500147283836ce2343c38b11e"));
export {
  getPdfDownloadUrl as g
};
