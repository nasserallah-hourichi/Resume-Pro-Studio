create extension if not exists pgcrypto;

create table if not exists public.resumes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    title text not null default 'Untitled Resume',
    template_id text not null default 'classic',
    lang text not null default 'en',
    data jsonb not null default '{}'::jsonb,
    section_visibility jsonb not null default '{}'::jsonb,
    theme_settings jsonb not null default '{}'::jsonb,
    ats_mode boolean not null default false,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = timezone('utc', now());
    return new;
end;
$$;

drop trigger if exists resumes_set_updated_at on public.resumes;
create trigger resumes_set_updated_at
before update on public.resumes
for each row
execute procedure public.set_updated_at();

alter table public.resumes enable row level security;

drop policy if exists "Users can view their own resumes" on public.resumes;
create policy "Users can view their own resumes"
on public.resumes
for select
to authenticated
using (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Users can create their own resumes" on public.resumes;
create policy "Users can create their own resumes"
on public.resumes
for insert
to authenticated
with check (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Users can update their own resumes" on public.resumes;
create policy "Users can update their own resumes"
on public.resumes
for update
to authenticated
using (auth.uid() is not null and auth.uid() = user_id)
with check (auth.uid() is not null and auth.uid() = user_id);

drop policy if exists "Users can delete their own resumes" on public.resumes;
create policy "Users can delete their own resumes"
on public.resumes
for delete
to authenticated
using (auth.uid() is not null and auth.uid() = user_id);
