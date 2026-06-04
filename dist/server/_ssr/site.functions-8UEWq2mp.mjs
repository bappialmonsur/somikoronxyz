import { c as createSsrRpc } from "./createSsrRpc-BChoM5Ac.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-yOiDSkhF.mjs";
import { c as createServerFn } from "./server-B3epVi8w.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
const getPdfDownloadUrl = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({
  noteId: stringType().uuid()
}).parse(input)).handler(createSsrRpc("3647d76219b1f7498636f1521523ef0bd4db1b5500147283836ce2343c38b11e"));
export {
  getPdfDownloadUrl as g
};
