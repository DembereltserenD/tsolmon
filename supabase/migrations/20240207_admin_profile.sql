-- Insert admin profile if it doesn't exist
INSERT INTO public.profiles (id, email, role)
SELECT 
  '7ac49bd8-aa7f-495b-99ef-1713034248fa',
  'admin@gmail.com',
  'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = '7ac49bd8-aa7f-495b-99ef-1713034248fa'
);
