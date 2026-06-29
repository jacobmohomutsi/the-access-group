-- Migration: 0004_randomize_ticket_numbers.sql
-- Description: Update process_yoco_webhook and process_shared_fulfillment to append 6 random alphanumeric characters to ticket numbers.

CREATE OR REPLACE FUNCTION public.process_yoco_webhook(
  p_checkout_id text,
  p_payment_id text,
  p_webhook_event_id text,
  p_provider text
) RETURNS json LANGUAGE plpgsql AS $$
DECLARE
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
BEGIN
  IF p_webhook_event_id IS NOT NULL AND p_webhook_event_id <> '' THEN
    INSERT INTO public.webhook_events (event_id, provider)
    VALUES (p_webhook_event_id, p_provider)
    ON CONFLICT (event_id) DO NOTHING;
    
    IF NOT FOUND THEN
      RETURN json_build_object('status', 'already_processed');
    END IF;
  END IF;

  IF p_checkout_id IS NOT NULL THEN
    SELECT id, order_number, payment_status
    INTO v_order_id, v_order_number, v_current_status
    FROM public.orders
    WHERE yoco_checkout_id = p_checkout_id
    FOR UPDATE;
  ELSE
    SELECT id, order_number, payment_status
    INTO v_order_id, v_order_number, v_current_status
    FROM public.orders
    WHERE yoco_payment_id = p_payment_id
    FOR UPDATE;
  END IF;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found for checkout_id % / payment_id %', p_checkout_id, p_payment_id;
  END IF;

  IF v_current_status = 'paid' THEN
    RETURN json_build_object('status', 'already_paid', 'order_id', v_order_id);
  END IF;

  PERFORM id FROM public.events FOR UPDATE;

  FOR v_rule IN
    SELECT e.id as event_id, e.capacity, sum(oi.quantity * r.quantity_required) as required
    FROM public.order_items oi
    JOIN public.product_event_rules r ON oi.product_id = r.product_id
    JOIN public.events e ON r.event_id = e.id
    WHERE oi.order_id = v_order_id
    GROUP BY e.id, e.capacity
  LOOP
    SELECT coalesce(sum(r2.quantity_required * oi2.quantity), 0) INTO v_used_capacity
    FROM public.order_items oi2
    JOIN public.orders o2 ON oi2.order_id = o2.id
    JOIN public.product_event_rules r2 ON oi2.product_id = r2.product_id
    WHERE o2.payment_status = 'paid' AND r2.event_id = v_rule.event_id;

    IF (v_used_capacity + v_rule.required) > v_rule.capacity THEN
      UPDATE public.orders SET payment_status = 'failed' WHERE id = v_order_id;
      RAISE EXCEPTION 'Capacity exceeded for event %', v_rule.event_id;
    END IF;
  END LOOP;

  UPDATE public.orders 
  SET payment_status = 'paid', yoco_payment_id = p_payment_id 
  WHERE id = v_order_id;

  FOR v_item IN SELECT product_id, quantity FROM public.order_items WHERE order_id = v_order_id LOOP
    SELECT
      case 
        when name ilike '%Gala Dinner%' then 'GAL'
        when name ilike '%Corporate%' then 'CGP'
        when name ilike '%Summit Ticket%' then 'SUM'
        when name ilike '%2 Day Pass%' then '2DP'
        else 'TKT'
      end
    INTO v_code
    FROM public.products WHERE id = v_item.product_id;

    IF v_code = 'CGP' THEN
       v_total_required := v_item.quantity * 10;
    ELSE
       v_total_required := v_item.quantity;
    END IF;

    FOR i IN 1..v_total_required LOOP
      UPDATE public.ticket_sequences
      SET current_value = current_value + 1
      WHERE product_code = v_code
      RETURNING current_value INTO v_ticket_seq;

      IF v_ticket_seq IS NULL THEN
        INSERT INTO public.ticket_sequences (product_code, current_value) VALUES (v_code, 1) RETURNING current_value INTO v_ticket_seq;
      END IF;

      v_ticket_number := v_code || lpad(v_ticket_seq::text, 6, '0') || '-' || upper(substr(md5(random()::text), 1, 6));

      INSERT INTO public.tickets (order_id, product_id, ticket_number)
      VALUES (v_order_id, v_item.product_id, v_ticket_number)
      RETURNING id INTO v_ticket_id;

      INSERT INTO public.ticket_access (ticket_id, event_id)
      SELECT v_ticket_id, event_id FROM public.product_event_rules WHERE product_id = v_item.product_id;
      
      INSERT INTO public.ticket_activity (ticket_id, action, metadata)
      VALUES (v_ticket_id, 'ticket_generated', json_build_object('order_id', v_order_id));

      v_ticket_count := v_ticket_count + 1;
    END LOOP;
  END LOOP;

  RETURN json_build_object('status', 'success', 'order_id', v_order_id);
END;
$$;


CREATE OR REPLACE FUNCTION public.process_shared_fulfillment(
  p_order_id uuid,
  p_payment_reference text,
  p_gateway_reference text,
  p_event_id text,
  p_provider text
) RETURNS json LANGUAGE plpgsql AS $$
DECLARE
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
BEGIN
  IF p_event_id IS NOT NULL AND p_event_id <> '' THEN
    INSERT INTO public.webhook_events (event_id, provider)
    VALUES (p_event_id, p_provider)
    ON CONFLICT (event_id) DO NOTHING;
    
    IF NOT FOUND THEN
      RETURN json_build_object('status', 'already_processed');
    END IF;
  END IF;

  IF p_order_id IS NOT NULL THEN
    SELECT id, order_number, payment_status
    INTO v_order_id, v_order_number, v_current_status
    FROM public.orders
    WHERE id = p_order_id
    FOR UPDATE;
  ELSE
    SELECT id, order_number, payment_status
    INTO v_order_id, v_order_number, v_current_status
    FROM public.orders
    WHERE payment_reference = p_payment_reference OR order_number = p_payment_reference
    FOR UPDATE;
  END IF;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found for reference % / id %', p_payment_reference, p_order_id;
  END IF;

  IF v_current_status = 'paid' THEN
    RETURN json_build_object('status', 'already_paid', 'order_id', v_order_id);
  END IF;

  PERFORM id FROM public.events FOR UPDATE;

  FOR v_rule IN
    SELECT e.id as event_id, e.capacity, sum(oi.quantity * r.quantity_required) as required
    FROM public.order_items oi
    JOIN public.product_event_rules r ON oi.product_id = r.product_id
    JOIN public.events e ON r.event_id = e.id
    WHERE oi.order_id = v_order_id
    GROUP BY e.id, e.capacity
  LOOP
    SELECT coalesce(sum(r2.quantity_required * oi2.quantity), 0) INTO v_used_capacity
    FROM public.order_items oi2
    JOIN public.orders o2 ON oi2.order_id = o2.id
    JOIN public.product_event_rules r2 ON oi2.product_id = r2.product_id
    WHERE o2.payment_status = 'paid' AND r2.event_id = v_rule.event_id;

    IF (v_used_capacity + v_rule.required) > v_rule.capacity THEN
      UPDATE public.orders SET payment_status = 'failed', status = 'failed' WHERE id = v_order_id;
      RAISE EXCEPTION 'Capacity exceeded for event %', v_rule.event_id;
    END IF;
  END LOOP;

  UPDATE public.orders 
  SET payment_status = 'paid', 
      status = 'paid', 
      paid_at = now(),
      gateway_reference = coalesce(p_gateway_reference, gateway_reference)
  WHERE id = v_order_id;

  FOR v_item IN SELECT product_id, quantity FROM public.order_items WHERE order_id = v_order_id LOOP
    SELECT
      case 
        when name ilike '%Gala Dinner%' then 'GAL'
        when name ilike '%Corporate%' then 'CGP'
        when name ilike '%Summit Ticket%' then 'SUM'
        when name ilike '%2 Day Pass%' then '2DP'
        else 'TKT'
      end
    INTO v_code
    FROM public.products WHERE id = v_item.product_id;

    IF v_code = 'CGP' THEN
       v_total_required := v_item.quantity * 10;
    ELSE
       v_total_required := v_item.quantity;
    END IF;

    FOR i IN 1..v_total_required LOOP
      UPDATE public.ticket_sequences
      SET current_value = current_value + 1
      WHERE product_code = v_code
      RETURNING current_value INTO v_ticket_seq;

      IF v_ticket_seq IS NULL THEN
        INSERT INTO public.ticket_sequences (product_code, current_value) VALUES (v_code, 1) RETURNING current_value INTO v_ticket_seq;
      END IF;

      v_ticket_number := v_code || lpad(v_ticket_seq::text, 6, '0') || '-' || upper(substr(md5(random()::text), 1, 6));

      INSERT INTO public.tickets (order_id, product_id, ticket_number)
      VALUES (v_order_id, v_item.product_id, v_ticket_number)
      RETURNING id INTO v_ticket_id;

      INSERT INTO public.ticket_access (ticket_id, event_id)
      SELECT v_ticket_id, event_id FROM public.product_event_rules WHERE product_id = v_item.product_id;
      
      INSERT INTO public.ticket_activity (ticket_id, action, metadata)
      VALUES (v_ticket_id, 'ticket_generated', json_build_object('order_id', v_order_id, 'provider', p_provider));

      v_ticket_count := v_ticket_count + 1;
    END LOOP;
  END LOOP;

  RETURN json_build_object(
    'status', 'success',
    'order_id', v_order_id,
    'tickets_generated', v_ticket_count
  );
END;
$$;
