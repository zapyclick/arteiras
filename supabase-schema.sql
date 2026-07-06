create table if not exists public.atletica_posts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  caption text not null,
  category text not null default 'Novidades',
  image_url text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

alter table public.atletica_posts enable row level security;

create policy "Owners can read their posts"
  on public.atletica_posts
  for select
  using (auth.uid() = owner_id);

create policy "Owners can insert their posts"
  on public.atletica_posts
  for insert
  with check (auth.uid() = owner_id);

create policy "Owners can update their posts"
  on public.atletica_posts
  for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Owners can delete their posts"
  on public.atletica_posts
  for delete
  using (auth.uid() = owner_id);

insert into storage.buckets (id, name, public)
values ('atletica-posts', 'atletica-posts', true)
on conflict (id) do nothing;

create policy "Public read access for atletica-posts"
  on storage.objects
  for select
  using (bucket_id = 'atletica-posts');

create policy "Owner can delete their own images"
  on storage.objects
  for delete
  using (
    bucket_id = 'atletica-posts'
    and auth.uid() = (storage.foldername(name))[1]::uuid
  );
