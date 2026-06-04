import { c as createSsrRpc } from "./createSsrRpc-CYB9djso.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-DoNSGWpn.mjs";
import { c as createServerFn } from "./server-BaXZwRBy.mjs";
import { o as objectType, s as stringType, e as enumType } from "../_libs/zod.mjs";
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
const createStudentAccount = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((input) => studentSchema.parse(input)).handler(createSsrRpc("d1281c587aa83399699ff80cfcfb8da6bde1b61ce7c8f48b15159a4273ae5960"));
const adminSignupSchema = objectType({
  phone: stringType().trim().min(11).max(20),
  password: stringType().min(6).max(72),
  full_name: stringType().trim().min(2).max(100)
});
const bootstrapAdminAccount = createServerFn({
  method: "POST"
}).inputValidator((input) => adminSignupSchema.parse(input)).handler(createSsrRpc("b4f744ed33855f0a21ae2c89fbab6aab79cf5301fc4e2fe686559ed0fb7df3c2"));
const checkAdminExists = createServerFn({
  method: "GET"
}).handler(createSsrRpc("06628d9cc974261677972ea34a60b163199fc08c454cc0b55cfe9f0049fc54b3"));
export {
  createStudentAccount as a,
  bootstrapAdminAccount as b,
  checkAdminExists as c
};
