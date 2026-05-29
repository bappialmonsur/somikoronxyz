import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Loader2, Newspaper, Trash2, ImagePlus, Video, Music, X, Send,
} from "lucide-react";
import { CLASS_LEVELS, bnClass } from "@/lib/grading";

export const Route = createFileRoute("/admin/feed")({
  component: FeedAdmin,
});

type MediaType = "text" | "image" | "video" | "audio";

function mediaUrl(path: string) {
  return supabase.storage.from("feed-media").getPublicUrl(path).data.publicUrl;
}

function FeedAdmin() {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [body, setBody] = useState("");
  const [classLevel, setClassLevel] = useState<string>("all");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);

  const mediaType: MediaType = !file
    ? "text"
    : file.type.startsWith("image/")
      ? "image"
      : file.type.startsWith("video/")
        ? "video"
        : file.type.startsWith("audio/")
          ? "audio"
          : "text";

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-feed"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feed_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const pickFile = (f: File | null) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : null);
  };

  const clearFile = () => {
    pickFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const submit = async () => {
    if (!body.trim() && !file) {
      toast.error("কিছু লিখুন অথবা একটি মিডিয়া যোগ করুন");
      return;
    }
    setPosting(true);
    try {
      let media_path: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop() ?? "bin";
        const path = `posts/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: upErr } = await supabase.storage
          .from("feed-media")
          .upload(path, file, { cacheControl: "3600", upsert: false });
        if (upErr) throw upErr;
        media_path = path;
      }

      const { error } = await supabase.from("feed_posts").insert({
        body: body.trim() || null,
        media_type: mediaType,
        media_path,
        class_level: classLevel === "all" ? null : (classLevel as any),
      });
      if (error) throw error;

      toast.success("পোস্ট প্রকাশিত হয়েছে");
      setBody("");
      setClassLevel("all");
      clearFile();
      qc.invalidateQueries({ queryKey: ["admin-feed"] });
    } catch (e: any) {
      toast.error(e.message ?? "পোস্ট ব্যর্থ হয়েছে");
    } finally {
      setPosting(false);
    }
  };

  const toggleActive = async (id: string, val: boolean) => {
    await supabase.from("feed_posts").update({ is_active: val }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-feed"] });
  };

  const handleDelete = async (id: string, path: string | null) => {
    if (!confirm("পোস্টটি মুছবেন?")) return;
    if (path) await supabase.storage.from("feed-media").remove([path]);
    const { error } = await supabase.from("feed_posts").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("মুছে ফেলা হয়েছে");
    qc.invalidateQueries({ queryKey: ["admin-feed"] });
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center gap-3 flex-wrap">
        <div className="size-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center">
          <Newspaper />
        </div>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-academy-navy">নিউজফিড পোস্ট</h1>
          <p className="text-sm text-muted-foreground">ছবি, ভিডিও, অডিও বা লেখা পোস্ট করুন — শিক্ষার্থীরা ফিডে দেখবে</p>
        </div>
      </div>

      {/* Composer */}
      <div className="bg-white rounded-2xl border p-4 space-y-3">
        <Textarea
          rows={3}
          placeholder="কিছু লিখুন..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {preview && (
          <div className="relative rounded-xl overflow-hidden border bg-academy-soft">
            <button
              onClick={clearFile}
              className="absolute top-2 right-2 z-10 size-7 rounded-full bg-black/60 text-white flex items-center justify-center"
            >
              <X className="size-4" />
            </button>
            {mediaType === "image" && <img src={preview} alt="preview" className="w-full max-h-80 object-contain" />}
            {mediaType === "video" && <video src={preview} controls className="w-full max-h-80" />}
            {mediaType === "audio" && <audio src={preview} controls className="w-full p-3" />}
          </div>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*,audio/*"
          className="hidden"
          onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
        />

        <div className="flex flex-wrap items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
            <ImagePlus className="size-4 mr-1" /> মিডিয়া যোগ
          </Button>
          <span className="text-xs text-muted-foreground hidden sm:flex items-center gap-2">
            <Video className="size-3.5" /> <Music className="size-3.5" /> ছবি/ভিডিও/অডিও
          </span>

          <div className="ml-auto flex items-center gap-2">
            <Select value={classLevel} onValueChange={setClassLevel}>
              <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সবার জন্য</SelectItem>
                {CLASS_LEVELS.map((c) => <SelectItem key={c} value={c}>{bnClass(c)} শ্রেণি</SelectItem>)}
              </SelectContent>
            </Select>
            <Button onClick={submit} disabled={posting} className="bg-academy-navy text-white">
              {posting ? <Loader2 className="size-4 mr-1 animate-spin" /> : <Send className="size-4 mr-1" />}
              পোস্ট
            </Button>
          </div>
        </div>
      </div>

      {/* Existing posts */}
      <div className="bg-white rounded-2xl border overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center"><Loader2 className="animate-spin" /></div>
        ) : (posts?.length ?? 0) === 0 ? (
          <div className="p-12 text-center text-muted-foreground">কোনো পোস্ট নেই</div>
        ) : (
          <ul className="divide-y">
            {posts!.map((p) => (
              <li key={p.id} className="p-4 flex gap-3 items-start">
                <div className="flex-1 min-w-0">
                  {p.body && <div className="text-sm text-academy-navy whitespace-pre-wrap line-clamp-3">{p.body}</div>}
                  {p.media_type === "image" && p.media_path && (
                    <img src={mediaUrl(p.media_path)} alt="" className="mt-2 rounded-lg max-h-32 border" />
                  )}
                  {p.media_type === "video" && p.media_path && (
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1"><Video className="size-3.5" /> ভিডিও পোস্ট</div>
                  )}
                  {p.media_type === "audio" && p.media_path && (
                    <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1"><Music className="size-3.5" /> অডিও পোস্ট</div>
                  )}
                  <div className="text-xs text-muted-foreground mt-2 flex gap-2 flex-wrap">
                    <span className="px-2 py-0.5 bg-academy-soft rounded-full">
                      {p.class_level ? `${bnClass(p.class_level)} শ্রেণি` : "সবার জন্য"}
                    </span>
                    <span>{new Date(p.created_at).toLocaleString("bn-BD")}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Switch checked={p.is_active} onCheckedChange={(v) => toggleActive(p.id, v)} />
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id, p.media_path)}>
                    <Trash2 className="size-4 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
