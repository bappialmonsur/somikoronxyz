import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

type ParsedVideo = {
  videoId: string;
  title: string;
  author: string;
  published: string;
};

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

function parseFeed(xml: string): ParsedVideo[] {
  const out: ParsedVideo[] = [];
  const entries = xml.split("<entry>").slice(1);
  for (const entry of entries) {
    const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
    const author = entry.match(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>/)?.[1];
    const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
    if (videoId && title) {
      out.push({
        videoId: videoId.trim(),
        title: decodeEntities(title.trim()),
        author: decodeEntities((author ?? "").trim()),
        published: published ?? new Date().toISOString(),
      });
    }
  }
  return out;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function postRandomVideo(forcedChannelId?: string) {
  // 1. fetch active channels
  let query = supabaseAdmin
    .from("video_sources")
    .select("channel_id, name")
    .eq("is_active", true);
  if (forcedChannelId) query = query.eq("channel_id", forcedChannelId);

  const { data: sources, error: srcErr } = await query;
  if (srcErr) throw new Error(srcErr.message);
  if (!sources || sources.length === 0) {
    return { ok: false, reason: "no_active_channels" };
  }

  // Try up to 5 random channels to find a fresh (not-yet-posted) video
  const shuffled = [...sources].sort(() => Math.random() - 0.5);
  for (const source of shuffled.slice(0, 5)) {
    try {
      const res = await fetch(
        `https://www.youtube.com/feeds/videos.xml?channel_id=${source.channel_id}`,
        { headers: { "User-Agent": "Mozilla/5.0" } },
      );
      if (!res.ok) continue;
      const xml = await res.text();
      const videos = parseFeed(xml).slice(0, 15);
      if (videos.length === 0) continue;

      // shuffle candidate videos and find one we haven't posted yet
      const candidates = [...videos].sort(() => Math.random() - 0.5);
      for (const v of candidates) {
        const link = `https://www.youtube.com/watch?v=${v.videoId}`;
        const { data: existing } = await supabaseAdmin
          .from("feed_posts")
          .select("id")
          .eq("link_url", link)
          .maybeSingle();
        if (existing) continue;

        const channelName = source.name || v.author || "শিক্ষামূলক ভিডিও";
        const { error: insErr } = await supabaseAdmin.from("feed_posts").insert({
          body: `🎬 ${v.title}\n\n${channelName} চ্যানেল থেকে নির্বাচিত শিক্ষামূলক ভিডিও।`,
          media_type: "video",
          media_path: null,
          link_url: link,
          class_level: null,
          author_id: null,
          author_name: channelName,
          author_role: "admin",
          author_meta: "শিক্ষামূলক ভিডিও",
          status: "approved",
          is_active: true,
        });
        if (insErr) throw new Error(insErr.message);
        return { ok: true, posted: { title: v.title, channel: channelName, link } };
      }
    } catch {
      // try next channel
      continue;
    }
  }

  return { ok: false, reason: "no_fresh_video" };
}

export const Route = createFileRoute("/api/public/hooks/youtube-feed")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let forcedChannelId: string | undefined;
        try {
          const body = (await request.json()) as { channel_id?: string };
          forcedChannelId = body?.channel_id;
        } catch {
          /* empty body is fine */
        }
        try {
          const result = await postRandomVideo(forcedChannelId);
          return Response.json(result, { status: result.ok ? 200 : 200 });
        } catch (e: any) {
          return Response.json(
            { ok: false, error: e?.message ?? "unknown error" },
            { status: 500 },
          );
        }
      },
    },
  },
});
