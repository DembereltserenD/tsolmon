-- Create categories table if it doesn't exist
create table if not exists public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create news table if it doesn't exist
create table if not exists public.news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  featured_image text not null,
  is_featured boolean default false,
  category_id uuid references public.categories(id),
  published_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.categories enable row level security;
alter table public.news enable row level security;

-- Policies for categories
create policy "Categories are viewable by everyone"
  on public.categories for select
  using (true);

create policy "Categories are insertable by authenticated users only"
  on public.categories for insert
  with check (auth.role() = 'authenticated');

create policy "Categories are updatable by authenticated users only"
  on public.categories for update
  using (auth.role() = 'authenticated');

create policy "Categories are deletable by authenticated users only"
  on public.categories for delete
  using (auth.role() = 'authenticated');

-- Policies for news
create policy "News are viewable by everyone"
  on public.news for select
  using (true);

create policy "News are insertable by authenticated users only"
  on public.news for insert
  with check (auth.role() = 'authenticated');

create policy "News are updatable by authenticated users only"
  on public.news for update
  using (auth.role() = 'authenticated');

create policy "News are deletable by authenticated users only"
  on public.news for delete
  using (auth.role() = 'authenticated');

-- Insert default categories if they don't exist
insert into public.categories (name, slug)
values 
  ('Мэдээ', 'news'),
  ('Зарлал', 'announcement'),
  ('Тендер', 'tender')
on conflict (slug) do nothing;
