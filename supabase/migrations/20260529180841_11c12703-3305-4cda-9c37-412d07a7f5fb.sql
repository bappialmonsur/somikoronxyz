-- Ensure timestamp helper exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Media type enum for feed posts
CREATE TYPE public.feed_media_type AS ENUM ('text', 'image', 'video', 'audio');

-- Feed posts table
CREATE TABLE public.feed_posts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  body text,
  media_type public.feed_media_type NOT NULL DEFAULT 'text',
  media_path text,
  class_level public.class_level,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.feed_posts TO authenticated;
GRANT ALL ON public.feed_posts TO service_role;

ALTER TABLE public.feed_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "feed admin all"
ON public.feed_posts
FOR ALL
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "feed read own class or broadcast"
ON public.feed_posts
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'admin'::app_role)
  OR (
    is_active = true
    AND (
      class_level IS NULL
      OR EXISTS (
        SELECT 1 FROM public.students s
        WHERE s.user_id = auth.uid()
          AND s.is_active = true
          AND s.class_level = feed_posts.class_level
      )
    )
  )
);

CREATE TRIGGER update_feed_posts_updated_at
BEFORE UPDATE ON public.feed_posts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Public storage bucket for feed media
INSERT INTO storage.buckets (id, name, public) VALUES ('feed-media', 'feed-media', true);

CREATE POLICY "feed-media public read"
ON storage.objects
FOR SELECT
USING (bucket_id = 'feed-media');

CREATE POLICY "feed-media admin insert"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'feed-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "feed-media admin update"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'feed-media' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "feed-media admin delete"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'feed-media' AND has_role(auth.uid(), 'admin'::app_role));