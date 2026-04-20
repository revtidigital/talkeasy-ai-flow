-- Create public storage bucket for case study images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'case-study-images',
  'case-study-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
)
on conflict (id) do nothing;

-- Authenticated users can upload new images
create policy "Authenticated users can upload case study images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'case-study-images');

-- Authenticated users can replace / update existing images
create policy "Authenticated users can update case study images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'case-study-images');

-- Authenticated users can delete images
create policy "Authenticated users can delete case study images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'case-study-images');

-- Public read access (bucket is already public, but explicit policy is cleaner)
create policy "Public can view case study images"
  on storage.objects for select
  using (bucket_id = 'case-study-images');
