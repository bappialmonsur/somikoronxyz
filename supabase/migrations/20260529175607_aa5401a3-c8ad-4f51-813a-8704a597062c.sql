-- Add photo_path column to students
ALTER TABLE public.students ADD COLUMN IF NOT EXISTS photo_path text;

-- Create a private bucket for student profile photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('student-photos', 'student-photos', false)
ON CONFLICT (id) DO NOTHING;

-- Students can upload to their own folder (named by their auth uid)
CREATE POLICY "student upload own photo"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'student-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Students can update (overwrite) their own photo
CREATE POLICY "student update own photo"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'student-photos' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = 'student-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Students can read their own photo
CREATE POLICY "student read own photo"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'student-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Students can delete their own photo
CREATE POLICY "student delete own photo"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'student-photos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Admins can read every student photo
CREATE POLICY "admin read all student photos"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'student-photos' AND has_role(auth.uid(), 'admin'::app_role));