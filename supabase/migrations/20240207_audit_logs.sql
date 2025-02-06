-- Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    action text NOT NULL,
    table_name text NOT NULL,
    record_id text NOT NULL,
    user_id uuid REFERENCES auth.users(id),
    changes jsonb,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Audit logs are viewable by admins" ON public.audit_logs
    FOR SELECT
    TO authenticated
    USING (EXISTS (
        SELECT 1 FROM public.profiles
        WHERE profiles.id = auth.uid()
        AND profiles.role = 'admin'
    ));

-- Create function to handle audit logging
CREATE OR REPLACE FUNCTION public.handle_audit_log()
RETURNS TRIGGER AS $$
DECLARE
    changes_json jsonb;
BEGIN
    -- For INSERT, store all new values
    IF (TG_OP = 'INSERT') THEN
        changes_json = to_jsonb(NEW.*);
    -- For UPDATE, store only changed values
    ELSIF (TG_OP = 'UPDATE') THEN
        changes_json = jsonb_object_agg(key, value)
        FROM (
            SELECT key, value
            FROM jsonb_each(to_jsonb(NEW.*)) new_values(key, value)
            INNER JOIN jsonb_each(to_jsonb(OLD.*)) old_values(key, value)
            USING (key)
            WHERE new_values.value IS DISTINCT FROM old_values.value
        ) changes;
    -- For DELETE, store all old values
    ELSE
        changes_json = to_jsonb(OLD.*);
    END IF;

    -- Insert audit log
    INSERT INTO public.audit_logs (
        action,
        table_name,
        record_id,
        user_id,
        changes
    ) VALUES (
        TG_OP,
        TG_TABLE_NAME,
        CASE
            WHEN TG_OP = 'DELETE' THEN OLD.id::text
            ELSE NEW.id::text
        END,
        auth.uid(),
        changes_json
    );

    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit triggers for news table
DROP TRIGGER IF EXISTS audit_news_changes ON public.news;
CREATE TRIGGER audit_news_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.news
    FOR EACH ROW EXECUTE FUNCTION public.handle_audit_log();

-- Create audit triggers for vendors table
DROP TRIGGER IF EXISTS audit_vendor_changes ON public.vendors;
CREATE TRIGGER audit_vendor_changes
    AFTER INSERT OR UPDATE OR DELETE ON public.vendors
    FOR EACH ROW EXECUTE FUNCTION public.handle_audit_log();
