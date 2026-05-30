CREATE POLICY "feed delete own post"
ON public.feed_posts
FOR DELETE
TO authenticated
USING (author_id = auth.uid());