-- Create Events
INSERT INTO public.events (id, name, capacity, active, event_date, venue) VALUES
  ('e0000000-0000-0000-0000-000000000001', 'Gala Dinner', 150, true, '2026-10-15 18:00:00+00', 'Grand Ballroom'),
  ('e0000000-0000-0000-0000-000000000002', 'Summit', 350, true, '2026-10-16 09:00:00+00', 'Main Conference Hall')
ON CONFLICT DO NOTHING;

-- Create Products
INSERT INTO public.products (id, name, price, active) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Gala Dinner', 2500.00, true),
  ('d0000000-0000-0000-0000-000000000002', 'Corporate Gala Package', 22500.00, true),
  ('d0000000-0000-0000-0000-000000000003', 'Summit Ticket', 1500.00, true),
  ('d0000000-0000-0000-0000-000000000004', '2 Day Pass', 3500.00, true)
ON CONFLICT DO NOTHING;

-- Create Product Event Rules
-- Gala Dinner -> Gala Dinner (1)
INSERT INTO public.product_event_rules (product_id, event_id, quantity_required) VALUES
  ('d0000000-0000-0000-0000-000000000001', 'e0000000-0000-0000-0000-000000000001', 1)
ON CONFLICT DO NOTHING;

-- Corporate Gala Package -> Gala Dinner (10)
INSERT INTO public.product_event_rules (product_id, event_id, quantity_required) VALUES
  ('d0000000-0000-0000-0000-000000000002', 'e0000000-0000-0000-0000-000000000001', 10)
ON CONFLICT DO NOTHING;

-- Summit Ticket -> Summit (1)
INSERT INTO public.product_event_rules (product_id, event_id, quantity_required) VALUES
  ('d0000000-0000-0000-0000-000000000003', 'e0000000-0000-0000-0000-000000000002', 1)
ON CONFLICT DO NOTHING;

-- 2 Day Pass -> Gala Dinner (1)
INSERT INTO public.product_event_rules (product_id, event_id, quantity_required) VALUES
  ('d0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000001', 1)
ON CONFLICT DO NOTHING;

-- 2 Day Pass -> Summit (1)
INSERT INTO public.product_event_rules (product_id, event_id, quantity_required) VALUES
  ('d0000000-0000-0000-0000-000000000004', 'e0000000-0000-0000-0000-000000000002', 1)
ON CONFLICT DO NOTHING;

-- Seed Sequences
INSERT INTO public.ticket_sequences (product_code, current_value) VALUES
  ('GAL', 0),
  ('CGP', 0),
  ('SUM', 0),
  ('2DP', 0)
ON CONFLICT DO NOTHING;
