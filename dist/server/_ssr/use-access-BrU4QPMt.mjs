import { a as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
function useMyAccess(user) {
  return useQuery({
    queryKey: ["my-access", user?.id],
    enabled: !!user,
    queryFn: async () => {
      if (!user) return { isAdmin: false, isTeacher: false, permissions: [] };
      const { data: roles, error: rErr } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (rErr) throw new Error(rErr.message);
      const roleSet = new Set((roles ?? []).map((r) => r.role));
      const isAdmin = roleSet.has("admin");
      const isTeacher = roleSet.has("teacher");
      let permissions = [];
      if (isTeacher) {
        const { data: perms, error: pErr } = await supabase.from("teacher_permissions").select("feature").eq("user_id", user.id);
        if (pErr) throw new Error(pErr.message);
        permissions = (perms ?? []).map((p) => p.feature);
      }
      return { isAdmin, isTeacher, permissions };
    }
  });
}
export {
  useMyAccess as u
};
