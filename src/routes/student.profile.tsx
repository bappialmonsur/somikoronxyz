import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useSession } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Camera, Upload, Loader2, Trash2, UserRound } from "lucide-react";
import { setMyPhoto, getMyPhotoUrl } from "@/lib/student-photo.functions";
import { bnClass } from "@/lib/grading";

export const Route = createFileRoute("/student/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useSession();
  const qc = useQueryClient();
  const saveFn = useServerFn(setMyPhoto);
  const urlFn = useServerFn(getMyPhotoUrl);
  const uploadRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const { data: student } = useQuery({
    queryKey: ["my-student", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("students").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
  });

  const { data: photo } = useQuery({
    queryKey: ["my-photo-url", user?.id, student?.photo_path],
    enabled: !!user,
    queryFn: () => urlFn(),
  });

  const handleFile = async (file: File) => {
    if (!user) return;
    if (!file.type.startsWith("image/")) return toast.error("শুধু ছবি আপলোড করুন");
    if (file.size > 5 * 1024 * 1024) return toast.error("ছবির সাইজ ৫MB এর কম হতে হবে");

    setBusy(true);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${user.id}/avatar.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("student-photos")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;

      await saveFn({ data: { photoPath: path } });
      await qc.invalidateQueries({ queryKey: ["my-student"] });
      await qc.invalidateQueries({ queryKey: ["my-photo-url"] });
      toast.success("ছবি সংরক্ষণ করা হয়েছে");
    } catch (e: any) {
      toast.error(e.message ?? "ছবি আপলোড ব্যর্থ হয়েছে");
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    if (!user || !student?.photo_path) return;
    if (!confirm("ছবিটি মুছে ফেলবেন?")) return;
    setBusy(true);
    try {
      await supabase.storage.from("student-photos").remove([student.photo_path]);
      await saveFn({ data: { photoPath: null } });
      await qc.invalidateQueries({ queryKey: ["my-student"] });
      await qc.invalidateQueries({ queryKey: ["my-photo-url"] });
      toast.success("ছবি মুছে ফেলা হয়েছে");
    } catch (e: any) {
      toast.error(e.message ?? "মুছতে ব্যর্থ হয়েছে");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-academy-navy">আমার প্রোফাইল</h1>
        <p className="text-sm text-muted-foreground">প্রোফাইল ছবি তুলুন বা আপলোড করুন</p>
      </div>

      <div className="bg-white rounded-2xl border p-6 flex flex-col items-center gap-5">
        <div className="relative">
          <div className="size-36 rounded-full overflow-hidden bg-academy-soft border-4 border-academy-gold/30 flex items-center justify-center">
            {photo?.url ? (
              <img src={photo.url} alt="প্রোফাইল ছবি" className="w-full h-full object-cover" />
            ) : (
              <UserRound className="size-16 text-academy-navy/40" />
            )}
          </div>
          {busy && (
            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
              <Loader2 className="size-7 text-white animate-spin" />
            </div>
          )}
        </div>

        {student && (
          <div className="text-center">
            <div className="font-bold text-academy-navy text-lg">{student.full_name}</div>
            <div className="text-sm text-muted-foreground">{bnClass(student.class_level)} শ্রেণি</div>
          </div>
        )}

        <input
          ref={uploadRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
        />
        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="user"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
        />

        <div className="grid grid-cols-2 gap-3 w-full">
          <Button
            type="button"
            disabled={busy}
            onClick={() => cameraRef.current?.click()}
            className="bg-academy-navy text-white"
          >
            <Camera className="size-4" /> ছবি তুলুন
          </Button>
          <Button
            type="button"
            disabled={busy}
            variant="outline"
            onClick={() => uploadRef.current?.click()}
          >
            <Upload className="size-4" /> আপলোড করুন
          </Button>
        </div>

        {student?.photo_path && (
          <Button
            type="button"
            disabled={busy}
            variant="ghost"
            onClick={handleRemove}
            className="text-red-500 hover:text-red-600"
          >
            <Trash2 className="size-4" /> ছবি মুছে ফেলুন
          </Button>
        )}
      </div>
    </div>
  );
}
