-- Add avatar path to profiles for teacher/admin profile photos
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_path text;

-- Private bucket for teacher/admin profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('teacher-photos', 'teacher-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Users can manage files inside their own uid folder
CREATE POLICY "teacher photos read own"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'teacher-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "teacher photos insert own"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'teacher-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "teacher photos update own"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'teacher-photos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "teacher photos delete own"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'teacher-photos' AND (storage.foldername(name))[1] = auth.uid()::text);