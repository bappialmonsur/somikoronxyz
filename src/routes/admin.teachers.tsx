import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@/components/ui/switch";
import { Loader2, UserCog, Phone } from "lucide-react";
import { toast } from "sonner";
import { listTeachers, setTeacherPermission } from "@/lib/teacher.functions";
import type { TeacherFeature } from "@/hooks/use-access";

export const Route = createFileRoute("/admin/teachers")({
  component: TeachersAdmin,
});

const FEATURES: { key: TeacherFeature; label: string }[] = [
  { key: "attendance", label: "উপস্থিতি" },
  { key: "results", label: "ফলাফল ও মার্কশিট" },
  { key: "newsfeed", label: "নোটিশ ও নিউজফিড" },
  { key: "admission", label: "নতুন ভর্তি" },
];

type Teacher = {
  user_id: string;
  full_name: string;
  phone: string;
  permissions: string[];
};

function TeachersAdmin() {
  const qc = useQueryClient();
  const callList = useServerFn(listTeachers);
  const callSet = useServerFn(setTeacherPermission);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-teachers"],
    queryFn: () => callList(),
  });

  const mutation = useMutation({
    mutationFn: (v: { user_id: string; feature: TeacherFeature; enabled: boolean }) =>
      callSet({ data: v }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-teachers"] });
    },
    onError: (e: any) => toast.error(e?.message ?? "পরিবর্তন ব্যর্থ"),
  });

  const teachers: Teacher[] = (data?.teachers as Teacher[]) ?? [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <UserCog className="size-6 text-academy-navy" />
        <h1 className="text-2xl font-bold text-academy-navy">শিক্ষক ব্যবস্থাপনা</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        প্রতিটি শিক্ষককে কোন কোন ফিচার ব্যবস্থাপনার অনুমতি দেবেন তা নিচে নির্ধারণ করুন। অনুমতি দেওয়া ফিচারগুলো শিক্ষকের ড্যাশবোর্ডে দেখা যাবে।
      </p>

      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="size-8 animate-spin text-academy-navy" />
        </div>
      ) : teachers.length === 0 ? (
        <div className="bg-white rounded-2xl border p-8 text-center text-muted-foreground">
          এখনো কোনো শিক্ষক সাইনআপ করেননি।
        </div>
      ) : (
        <div className="space-y-4">
          {teachers.map((t) => (
            <div key={t.user_id} className="bg-white rounded-2xl border p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-bold text-academy-navy">{t.full_name}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Phone className="size-3" />
                    {t.phone ? "0" + t.phone.replace(/^\+?880/, "") : "—"}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {FEATURES.map((f) => {
                  const enabled = t.permissions.includes(f.key);
                  return (
                    <label
                      key={f.key}
                      className="flex items-center justify-between gap-3 rounded-xl border bg-academy-soft/40 px-4 py-3 cursor-pointer"
                    >
                      <span className="text-sm font-medium text-academy-navy">{f.label}</span>
                      <Switch
                        checked={enabled}
                        disabled={mutation.isPending}
                        onCheckedChange={(checked) =>
                          mutation.mutate({ user_id: t.user_id, feature: f.key, enabled: checked })
                        }
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
