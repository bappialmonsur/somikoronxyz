-- 1. Add teacher role to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'teacher';

-- 2. Feature enum for teacher moderation
DO $$ BEGIN
  CREATE TYPE public.teacher_feature AS ENUM ('attendance', 'results', 'newsfeed', 'admission');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 3. teacher_permissions table
CREATE TABLE IF NOT EXISTS public.teacher_permissions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  feature public.teacher_feature NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, feature)
);

GRANT SELECT ON public.teacher_permissions TO authenticated;
GRANT ALL ON public.teacher_permissions TO service_role;

ALTER TABLE public.teacher_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teacher read own permissions"
ON public.teacher_permissions FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "admin manage teacher permissions"
ON public.teacher_permissions FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 4. Security-definer helper
CREATE OR REPLACE FUNCTION public.has_teacher_permission(_user_id uuid, _feature public.teacher_feature)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.teacher_permissions
    WHERE user_id = _user_id AND feature = _feature
  )
$$;

-- 5. Teacher feature policies

-- Attendance
CREATE POLICY "teacher manage attendance"
ON public.attendance FOR ALL TO authenticated
USING (public.has_teacher_permission(auth.uid(), 'attendance'))
WITH CHECK (public.has_teacher_permission(auth.uid(), 'attendance'));

-- Students: read for attendance/results/admission teachers
CREATE POLICY "teacher read students"
ON public.students FOR SELECT TO authenticated
USING (
  public.has_teacher_permission(auth.uid(), 'attendance')
  OR public.has_teacher_permission(auth.uid(), 'results')
  OR public.has_teacher_permission(auth.uid(), 'admission')
);

-- Students: full manage for admission teachers
CREATE POLICY "teacher insert students"
ON public.students FOR INSERT TO authenticated
WITH CHECK (public.has_teacher_permission(auth.uid(), 'admission'));

CREATE POLICY "teacher update students"
ON public.students FOR UPDATE TO authenticated
USING (public.has_teacher_permission(auth.uid(), 'admission'))
WITH CHECK (public.has_teacher_permission(auth.uid(), 'admission'));

CREATE POLICY "teacher delete students"
ON public.students FOR DELETE TO authenticated
USING (public.has_teacher_permission(auth.uid(), 'admission'));

-- Exams & results
CREATE POLICY "teacher manage exams"
ON public.exams FOR ALL TO authenticated
USING (public.has_teacher_permission(auth.uid(), 'results'))
WITH CHECK (public.has_teacher_permission(auth.uid(), 'results'));

CREATE POLICY "teacher manage exam_results"
ON public.exam_results FOR ALL TO authenticated
USING (public.has_teacher_permission(auth.uid(), 'results'))
WITH CHECK (public.has_teacher_permission(auth.uid(), 'results'));

-- Newsfeed: feed posts & notices
CREATE POLICY "teacher manage feed"
ON public.feed_posts FOR ALL TO authenticated
USING (public.has_teacher_permission(auth.uid(), 'newsfeed'))
WITH CHECK (public.has_teacher_permission(auth.uid(), 'newsfeed'));

CREATE POLICY "teacher manage notices"
ON public.notices FOR ALL TO authenticated
USING (public.has_teacher_permission(auth.uid(), 'newsfeed'))
WITH CHECK (public.has_teacher_permission(auth.uid(), 'newsfeed'));