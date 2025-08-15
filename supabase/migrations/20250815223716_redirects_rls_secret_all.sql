CREATE POLICY "Allow secret key holders to write redirects" 
ON public.redirects 
FOR ALL 
TO service_role 
USING (true);
