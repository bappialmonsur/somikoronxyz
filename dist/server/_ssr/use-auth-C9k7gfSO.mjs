import { r as reactExports } from "../_libs/react.mjs";
import { s as supabase } from "./client-BHmQHd0X.mjs";
function useSession() {
  const [session, setSession] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);
  return { session, user: session?.user ?? null, loading };
}
export {
  useSession as u
};
