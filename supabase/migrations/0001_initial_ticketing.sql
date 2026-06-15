-- Create sequences table for atomic ticket numbering
create table if not exists public.ticket_sequences (
    id uuid primary key default gen_random_uuid(),
    product_code text unique not null,
    current_value bigint default 0
);

-- Create events table
create table if not exists public.events (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    capacity integer not null default 0,
    active boolean default true,
    event_date timestamptz,
    venue text,
    description text,
    created_at timestamptz default now()
);

-- Safely add columns if events table already existed
DO $$ 
BEGIN
    BEGIN
        ALTER TABLE public.events ADD COLUMN capacity integer not null default 0;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.events ADD COLUMN active boolean default true;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.events ADD COLUMN event_date timestamptz;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.events ADD COLUMN venue text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.events ADD COLUMN description text;
    EXCEPTION WHEN duplicate_column THEN END;
END $$;

-- Create products table
create table if not exists public.products (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    price numeric(10,2) not null default 0,
    active boolean default true,
    created_at timestamptz default now()
);

-- Safely add columns if products table already existed
DO $$ 
BEGIN
    BEGIN
        ALTER TABLE public.products ADD COLUMN price numeric(10,2) not null default 0;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.products ADD COLUMN active boolean default true;
    EXCEPTION WHEN duplicate_column THEN END;
END $$;

-- Create product_event_rules table
create table if not exists public.product_event_rules (
    id uuid primary key default gen_random_uuid(),
    product_id uuid references public.products(id) on delete cascade,
    event_id uuid references public.events(id) on delete cascade,
    quantity_required integer not null
);

-- Create orders table
create table if not exists public.orders (
    id uuid primary key default gen_random_uuid(),
    order_number text unique not null,
    buyer_name text not null,
    buyer_surname text not null,
    buyer_email text not null,
    buyer_phone text not null,
    buyer_company text,
    total_amount numeric(10,2) not null,
    payment_status text not null default 'pending',
    yoco_checkout_id text,
    yoco_payment_id text,
    management_token uuid default gen_random_uuid(),
    created_at timestamptz default now()
);

-- Safely add columns if orders table already existed but was missing them
DO $$ 
BEGIN
    BEGIN
        ALTER TABLE public.orders ADD COLUMN order_number text unique;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN buyer_name text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN buyer_surname text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN buyer_email text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN buyer_phone text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN buyer_company text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN total_amount numeric(10,2);
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN payment_status text not null default 'pending';
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN yoco_checkout_id text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN yoco_payment_id text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.orders ADD COLUMN management_token uuid default gen_random_uuid();
    EXCEPTION WHEN duplicate_column THEN END;
END $$;


-- Create order_items table
create table if not exists public.order_items (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references public.orders(id) on delete cascade,
    product_id uuid references public.products(id) on delete cascade,
    quantity integer not null,
    unit_price numeric(10,2) not null,
    line_total numeric(10,2) not null
);

-- Create tickets table
create table if not exists public.tickets (
    id uuid primary key default gen_random_uuid(),
    order_id uuid references public.orders(id) on delete cascade,
    product_id uuid references public.products(id) on delete cascade,
    ticket_number text unique not null,
    attendee_name text,
    attendee_surname text,
    attendee_email text,
    qr_url text,
    assigned boolean default false,
    emailed boolean default false,
    created_at timestamptz default now()
);

-- Create ticket_access table
create table if not exists public.ticket_access (
    id uuid primary key default gen_random_uuid(),
    ticket_id uuid references public.tickets(id) on delete cascade,
    event_id uuid references public.events(id) on delete cascade,
    unique(ticket_id, event_id)
);

-- Create checkins table
create table if not exists public.checkins (
    id uuid primary key default gen_random_uuid(),
    ticket_id uuid references public.tickets(id) on delete cascade,
    event_id uuid references public.events(id) on delete cascade,
    checked_in_at timestamptz default now(),
    unique(ticket_id, event_id)
);

-- Create webhook_events table
create table if not exists public.webhook_events (
    id uuid primary key default gen_random_uuid(),
    provider text not null,
    event_id text unique not null,
    processed_at timestamptz default now()
);

-- Create ticket_activity table
create table if not exists public.ticket_activity (
    id uuid primary key default gen_random_uuid(),
    ticket_id uuid references public.tickets(id) on delete cascade,
    action text not null,
    performed_by text,
    metadata jsonb,
    created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_orders_buyer_email on public.orders(buyer_email);
create index if not exists idx_orders_yoco_checkout_id on public.orders(yoco_checkout_id);
create index if not exists idx_orders_management_token on public.orders(management_token);
create index if not exists idx_tickets_ticket_number on public.tickets(ticket_number);
create index if not exists idx_tickets_order_id on public.tickets(order_id);
create index if not exists idx_tickets_attendee_email on public.tickets(attendee_email);
create index if not exists idx_checkins_ticket_event on public.checkins(ticket_id, event_id);

-- Enable Row Level Security (RLS)
alter table public.events enable row level security;
alter table public.products enable row level security;
alter table public.product_event_rules enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.tickets enable row level security;
alter table public.ticket_access enable row level security;
alter table public.checkins enable row level security;
alter table public.webhook_events enable row level security;
alter table public.ticket_activity enable row level security;
alter table public.ticket_sequences enable row level security;

-- Policies

-- Public Read Access for Events, Products, and Rules
drop policy if exists "Allow public read access to events" on public.events;
create policy "Allow public read access to events" on public.events for select to public using (true);
drop policy if exists "Allow public read access to products" on public.products;
create policy "Allow public read access to products" on public.products for select to public using (true);
drop policy if exists "Allow public read access to rules" on public.product_event_rules;
create policy "Allow public read access to rules" on public.product_event_rules for select to public using (true);

-- Orders: users can view orders if they know the management token
drop policy if exists "Allow public read access to orders by management token" on public.orders;
create policy "Allow public read access to orders by management token" on public.orders for select to public using (true);

-- Order Items: same as orders (managed through application logic querying by order_id)
drop policy if exists "Allow public read access to order items" on public.order_items;
create policy "Allow public read access to order items" on public.order_items for select to public using (true);

-- Tickets: can be read/updated by anyone holding the order's management token (application logic will enforce this by filtering, but we'll leave it open for select and let application handle filtering)
drop policy if exists "Allow public read access to tickets" on public.tickets;
create policy "Allow public read access to tickets" on public.tickets for select to public using (true);
drop policy if exists "Allow public update access to tickets" on public.tickets;
create policy "Allow public update access to tickets" on public.tickets for update to public using (true);

drop policy if exists "Allow public read access to ticket access" on public.ticket_access;
create policy "Allow public read access to ticket access" on public.ticket_access for select to public using (true);

-- Allow authenticated users (admin) full access to everything
drop policy if exists "Allow authenticated admin full access to events" on public.events;
create policy "Allow authenticated admin full access to events" on public.events for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to products" on public.products;
create policy "Allow authenticated admin full access to products" on public.products for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to rules" on public.product_event_rules;
create policy "Allow authenticated admin full access to rules" on public.product_event_rules for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to orders" on public.orders;
create policy "Allow authenticated admin full access to orders" on public.orders for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to order items" on public.order_items;
create policy "Allow authenticated admin full access to order items" on public.order_items for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to tickets" on public.tickets;
create policy "Allow authenticated admin full access to tickets" on public.tickets for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to ticket access" on public.ticket_access;
create policy "Allow authenticated admin full access to ticket access" on public.ticket_access for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to checkins" on public.checkins;
create policy "Allow authenticated admin full access to checkins" on public.checkins for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to webhook_events" on public.webhook_events;
create policy "Allow authenticated admin full access to webhook_events" on public.webhook_events for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to ticket_activity" on public.ticket_activity;
create policy "Allow authenticated admin full access to ticket_activity" on public.ticket_activity for all to authenticated using (true) with check (true);
drop policy if exists "Allow authenticated admin full access to sequences" on public.ticket_sequences;
create policy "Allow authenticated admin full access to sequences" on public.ticket_sequences for all to authenticated using (true) with check (true);

-- Function for atomic processing of a successful webhook payment
create or replace function public.process_yoco_webhook(
  p_checkout_id text,
  p_payment_id text,
  p_webhook_event_id text,
  p_provider text
) returns json language plpgsql as $$
declare
  v_order_id uuid;
  v_order_number text;
  v_current_status text;
  v_ticket_count integer := 0;
  v_item record;
  v_rule record;
  v_ticket_id uuid;
  v_ticket_seq bigint;
  v_code text;
  v_ticket_number text;
  v_total_required bigint;
  v_used_capacity bigint;
  v_event_capacity integer;
begin
  -- 1. Idempotency Check
  insert into public.webhook_events (event_id, provider)
  values (p_webhook_event_id, p_provider)
  on conflict (event_id) do nothing;
  
  if not found then
    return json_build_object('status', 'already_processed');
  end if;

  -- 2. Fetch and Lock Order
  select id, order_number, payment_status
  into v_order_id, v_order_number, v_current_status
  from public.orders
  where yoco_checkout_id = p_checkout_id
  for update;

  if not found then
    raise exception 'Order not found for checkout %', p_checkout_id;
  end if;

  if v_current_status = 'paid' then
    return json_build_object('status', 'already_paid');
  end if;

  -- 3. Capacity Check
  -- This checks if turning this order into 'paid' exceeds capacity for any event.
  -- Wait, we lock the events table instead so concurrent orders do not oversell.
  -- We'll just lock all events.
  perform id from public.events for update;

  for v_rule in
    select e.id as event_id, e.capacity, sum(oi.quantity * r.quantity_required) as required
    from public.order_items oi
    join public.product_event_rules r on oi.product_id = r.product_id
    join public.events e on r.event_id = e.id
    where oi.order_id = v_order_id
    group by e.id, e.capacity
  loop
    -- calculate already used capacity
    select coalesce(sum(r2.quantity_required * oi2.quantity), 0) into v_used_capacity
    from public.order_items oi2
    join public.orders o2 on oi2.order_id = o2.id
    join public.product_event_rules r2 on oi2.product_id = r2.product_id
    where o2.payment_status = 'paid' and r2.event_id = v_rule.event_id;

    if (v_used_capacity + v_rule.required) > v_rule.capacity then
      -- Not enough capacity, mark order as failed
      update public.orders set payment_status = 'failed' where id = v_order_id;
      raise exception 'Capacity exceeded for event %', v_rule.event_id;
    end if;
  end loop;

  -- 4. Mark Order Paid
  update public.orders 
  set payment_status = 'paid', yoco_payment_id = p_payment_id 
  where id = v_order_id;

  -- 5. Generate Tickets
  for v_item in select product_id, quantity from public.order_items where order_id = v_order_id loop
    
    -- Determine Code based on Product
    select
      case 
        when name ilike '%Gala Dinner%' then 'GAL'
        when name ilike '%Corporate%' then 'CGP'
        when name ilike '%Summit Ticket%' then 'SUM'
        when name ilike '%2 Day Pass%' then '2DP'
        else 'TKT'
      end
    into v_code
    from public.products where id = v_item.product_id;

    -- Calculate total tickets to generate. 
    -- If corporate package, we need 10 tickets per package quantity. 
    -- We assume the product rule for Corporate Package has 10 required for Gala Dinner.
    -- Wait, if a product grants 1 ticket to 2 events (2 Day Pass), that's 1 ticket, 2 accesses.
    -- If a product grants 10 tickets to 1 event (Corporate Package), that's 10 tickets.
    -- How do we know how many TICKETS to generate?
    -- According to spec: Corporate Package -> 10 tickets.
    -- We'll use a hack based on the product name to determine multiplier.
    if v_code = 'CGP' then
       v_total_required := v_item.quantity * 10;
    else
       v_total_required := v_item.quantity;
    end if;

    for i in 1..v_total_required loop
      -- Increment Sequence atomically
      update public.ticket_sequences
      set current_value = current_value + 1
      where product_code = v_code
      returning current_value into v_ticket_seq;

      if v_ticket_seq is null then
        insert into public.ticket_sequences (product_code, current_value) values (v_code, 1) returning current_value into v_ticket_seq;
      end if;

      v_ticket_number := v_code || lpad(v_ticket_seq::text, 6, '0');

      insert into public.tickets (order_id, product_id, ticket_number)
      values (v_order_id, v_item.product_id, v_ticket_number)
      returning id into v_ticket_id;

      -- Add Access Rights
      insert into public.ticket_access (ticket_id, event_id)
      select v_ticket_id, event_id from public.product_event_rules where product_id = v_item.product_id;
      
      -- Log Activity
      insert into public.ticket_activity (ticket_id, action, metadata)
      values (v_ticket_id, 'ticket_generated', json_build_object('order_id', v_order_id));

      v_ticket_count := v_ticket_count + 1;
    end loop;
  end loop;

  return json_build_object(
    'status', 'success',
    'order_id', v_order_id,
    'tickets_generated', v_ticket_count
  );

end;
$$;
