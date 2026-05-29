import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-auth";
import { useMyAccess } from "@/hooks/use-access";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Camera, Upload, Loader2, Trash2, UserRound } from "lucide-react";

export const Route = createFileRoute("/admin/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user } = useSession();
  const { data: access } = useMyAccess(user);
  const qc = useQueryClient();
  const uploadRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ["my-profile", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, avatar_path")
        .eq("id", user!.id)
        .maybeSingle();
      return data;
    },
  });

  const { data: photoUrl } = useQuery({
    queryKey: ["my-avatar-url", user?.id, profile?.avatar_path],
    enabled: !!user && !!profile?.avatar_path,
    queryFn: async () => {
      if (!profile?.avatar_path) return null;
      const { data } = await supabase.storage
        .from("teacher-photos")
        .createSignedUrl(profile.avatar_path, 60 * 60);
      return data?.signedUrl ?? null;
    },
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
        .from("teacher-photos")
        .upload(path, file, { upsert: true, contentType: file.type });
      if (upErr) throw upErr;

      const { error: pErr } = await supabase
        .from("profiles")
        .update({ avatar_path: path })
        .eq("id", user.id);
      if (pErr) throw pErr;

      await qc.invalidateQueries({ queryKey: ["my-profile"] });
      await qc.invalidateQueries({ queryKey: ["my-avatar-url"] });
      toast.success("ছবি সংরক্ষণ করা হয়েছে");
    } catch (e: any) {
      toast.error(e.message ?? "ছবি আপলোড ব্যর্থ হয়েছে");
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    if (!user || !profile?.avatar_path) return;
    if (!confirm("ছবিটি মুছে ফেলবেন?")) return;
    setBusy(true);
    try {
      await supabase.storage.from("teacher-photos").remove([profile.avatar_path]);
      await supabase.from("profiles").update({ avatar_path: null }).eq("id", user.id);
      await qc.invalidateQueries({ queryKey: ["my-profile"] });
      await qc.invalidateQueries({ queryKey: ["my-avatar-url"] });
      toast.success("ছবি মুছে ফেলা হয়েছে");
    } catch (e: any) {
      toast.error(e.message ?? "মুছতে ব্যর্থ হয়েছে");
    } finally {
      setBusy(false);
    }
  };

  const roleLabel = access?.isAdmin ? "এডমিন" : "শিক্ষক";

  return (
    <div className="space-y-5 max-w-lg">
      <div>
        <h1 className="text-2xl font-bold text-academy-navy">আমার প্রোফাইল</h1>
        <p className="text-sm text-muted-foreground">প্রোফাইল ছবি তুলুন বা আপলোড করুন</p>
      </div>

      <div className="bg-white rounded-2xl border p-6 flex flex-col items-center gap-5">
        <div className="relative">
          <div className="size-36 rounded-full overflow-hidden bg-academy-soft border-4 border-academy-gold/30 flex items-center justify-center">
            {photoUrl ? (
              <img src={photoUrl} alt="প্রোফাইল ছবি" className="w-full h-full object-cover" />
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

        {profile && (
          <div className="text-center">
            <div className="font-bold text-academy-navy text-lg">{profile.full_name || "নামহীন"}</div>
            <div className="text-sm text-muted-foreground">{roleLabel}</div>
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

        {profile?.avatar_path && (
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
