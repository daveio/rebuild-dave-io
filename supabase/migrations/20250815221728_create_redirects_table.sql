create table public.redirects (
  slug text not null,
  destination text not null,
  hits bigint not null default 0,
  last_hit timestamp with time zone null,
  constraint redirects_primary_key primary key (slug)
) TABLESPACE pg_default;
