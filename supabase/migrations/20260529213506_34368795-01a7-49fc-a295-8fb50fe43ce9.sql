-- Allow teachers with 'newsfeed' permission to upload/manage feed media
CREATE POLICY "feed-media teacher insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'feed-media' AND has_teacher_permission(auth.uid(), 'newsfeed'::teacher_feature));

CREATE POLICY "feed-media teacher update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'feed-media' AND has_teacher_permission(auth.uid(), 'newsfeed'::teacher_feature));

CREATE POLICY "feed-media teacher delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'feed-media' AND has_teacher_permission(auth.uid(), 'newsfeed'::teacher_feature));