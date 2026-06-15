DO $$ 
BEGIN
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN order_id uuid references public.orders(id) on delete cascade;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN product_id uuid references public.products(id) on delete cascade;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN ticket_number text unique;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN attendee_name text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN attendee_surname text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN attendee_email text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN qr_url text;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN assigned boolean default false;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.tickets ADD COLUMN emailed boolean default false;
    EXCEPTION WHEN duplicate_column THEN END;
END $$;
