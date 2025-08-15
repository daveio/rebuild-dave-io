CREATE POLICY "Allow public to view redirects" 
ON public.redirects
FOR SELECT 
TO authenticated, anon
USING (true);
