import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Loader2, MessageSquare, ShieldCheck } from "lucide-react";
import { bnClass, bnNum } from "@/lib/grading";

export const Route = createFileRoute("/student/messages")({
  component: StudentMessages,
});

type Msg = {
  id: string;
  sender_role: string;
  body: string;
  created_at: string;
};

function StudentMessages() {
  const { user } = useSession();
  const qc = useQueryClient();
  const endRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  const { data: student } = useQuery({
    queryKey: ["my-student", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("students").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
  });

  const { data: msgs, isLoading } = useQuery({
    queryKey: ["my-messages", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("id, sender_role, body, created_at")
        .eq("student_user_id", user!.id)
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as Msg[];
    },
  });

  useEffect(() => {
    if (!user) return;
    const channel = supabase
      .channel("student-msg-rt")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages", filter: `student_user_id=eq.${user.id}` },
        () => qc.invalidateQueries({ queryKey: ["my-messages", user.id] }),
      )
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user, qc]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
    // mark admin messages read
    if (user && (msgs ?? []).some((m) => m.sender_role === "admin")) {
      supabase.from("messages").update({ is_read: true })
        .eq("student_user_id", user.id).eq("sender_role", "admin").eq("is_read", false)
        .then(() => {});
    }
  }, [msgs, user]);

  const send = async () => {
    if (!text.trim() || !student) return;
    setSending(true);
    try {
      const meta = `${bnClass(student.class_level)} শ্রেণি · রোল ${bnNum(student.roll ?? "")}`;
      const { error } = await supabase.from("messages").insert({
        student_user_id: user!.id,
        sender_role: "student",
        sender_name: student.full_name,
        sender_meta: meta,
        body: text.trim(),
      });
      if (error) throw error;
      setText("");
      qc.invalidateQueries({ queryKey: ["my-messages", user!.id] });
    } catch (e: any) {
      toast.error(e.message ?? "মেসেজ পাঠানো যায়নি");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto flex flex-col" style={{ height: "calc(100vh - 8rem)" }}>
      <div className="flex items-center gap-2 mb-3">
        <div className="size-9 rounded-xl bg-academy-navy/10 text-academy-navy flex items-center justify-center">
          <MessageSquare className="size-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-academy-navy leading-tight">এডমিনকে মেসেজ</h1>
          <p className="text-xs text-muted-foreground">যেকোনো প্রশ্ন বা সমস্যা সরাসরি জানান</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 rounded-2xl border bg-academy-soft/40 p-3">
        {isLoading ? (
          <div className="flex justify-center py-10"><Loader2 className="animate-spin text-academy-gold" /></div>
        ) : (msgs ?? []).length === 0 ? (
          <div className="text-center text-sm text-muted-foreground py-10">
            এখনো কোনো মেসেজ নেই। নিচে লিখে এডমিনকে পাঠান।
          </div>
        ) : (
          (msgs ?? []).map((m) => {
            const mine = m.sender_role === "student";
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-wrap ${
                  mine ? "bg-academy-navy text-white rounded-br-sm" : "bg-white border rounded-bl-sm text-academy-navy"
                }`}>
                  {!mine && (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-academy-gold mb-0.5">
                      <ShieldCheck className="size-3" /> এডমিন
                    </div>
                  )}
                  {m.body}
                  <div className={`text-[10px] mt-1 ${mine ? "text-white/60" : "text-muted-foreground"}`}>
                    {new Date(m.created_at).toLocaleString("bn-BD")}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={endRef} />
      </div>

      <div className="flex items-end gap-2 mt-3">
        <Textarea
          rows={1}
          placeholder="মেসেজ লিখুন..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          className="resize-none min-h-10"
        />
        <Button onClick={send} disabled={sending || !text.trim()} className="bg-academy-navy text-white shrink-0">
          {sending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
