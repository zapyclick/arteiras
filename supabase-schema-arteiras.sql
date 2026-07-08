create table if not exists public.arteiras_posts (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  caption text not null,
  category text not null default 'Novidades',
  image_url text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

alter table public.arteiras_posts enable row level security;

create policy "Anyone can read posts"
  on public.arteiras_posts
  for select
  using (true);

create policy "Owners can read their posts"
  on public.arteiras_posts
  for select
  using (auth.uid() = owner_id);

create policy "Owners can insert their posts"
  on public.arteiras_posts
  for insert
  with check (auth.uid() = owner_id);

create policy "Owners can update their posts"
  on public.arteiras_posts
  for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Owners can delete their posts"
  on public.arteiras_posts
  for delete
  using (auth.uid() = owner_id);

insert into storage.buckets (id, name, public)
values ('arteiras-posts', 'arteiras-posts', true)
on conflict (id) do nothing;

create policy "Public read access for arteiras-posts"
  on storage.objects
  for select
  using (bucket_id = 'arteiras-posts');

create policy "Owner can delete their own images"
  on storage.objects
  for delete
  using (
    bucket_id = 'arteiras-posts'
    and auth.uid() = (storage.foldername(name))[1]::uuid
  );
