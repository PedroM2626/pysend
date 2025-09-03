-- Create companies table
CREATE TABLE public.companies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create clients table
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  company_id UUID REFERENCES public.companies(id),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create processes table (for tracking business processes/sales)
CREATE TABLE public.processes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  process_type TEXT NOT NULL,
  value DECIMAL(10,2),
  status TEXT DEFAULT 'active',
  received_date DATE NOT NULL DEFAULT CURRENT_DATE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create AI queries history table
CREATE TABLE public.ai_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  sql_query TEXT NOT NULL,
  results JSONB,
  insights TEXT,
  chart_config JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_queries ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies (accessible to all authenticated users)
CREATE POLICY "Companies are viewable by authenticated users"
ON public.companies FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Companies are insertable by authenticated users"
ON public.companies FOR INSERT
TO authenticated
WITH CHECK (true);

-- RLS Policies for clients
CREATE POLICY "Users can view their own clients"
ON public.clients FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own clients"
ON public.clients FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own clients"
ON public.clients FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own clients"
ON public.clients FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for processes
CREATE POLICY "Users can view their own processes"
ON public.processes FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own processes"
ON public.processes FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own processes"
ON public.processes FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own processes"
ON public.processes FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- RLS Policies for AI queries
CREATE POLICY "Users can view their own AI queries"
ON public.ai_queries FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI queries"
ON public.ai_queries FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_clients_user_id ON public.clients(user_id);
CREATE INDEX idx_processes_client_id ON public.processes(client_id);
CREATE INDEX idx_processes_user_id ON public.processes(user_id);
CREATE INDEX idx_processes_received_date ON public.processes(received_date);
CREATE INDEX idx_ai_queries_user_id ON public.ai_queries(user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON public.companies
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON public.clients
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_processes_updated_at
  BEFORE UPDATE ON public.processes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$;

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data
INSERT INTO public.companies (name) VALUES
  ('Ribeiro Solutions'),
  ('TransMov'),
  ('GlobalWay'),
  ('LogiMax'),
  ('Prime Consulting'),
  ('TradePoint'),
  ('Delta Cargo'),
  ('NovaLog'),
  ('FastLine'),
  ('MultiCargo');

-- Get company IDs for sample clients and processes
DO $$
DECLARE
  company_ids UUID[];
BEGIN
  -- Get all company IDs
  SELECT ARRAY_AGG(id) INTO company_ids FROM public.companies;
  
  -- Insert sample clients (without user_id for now - will be set when users register)
  INSERT INTO public.clients (name, email, company_id) VALUES
    ('João Silva', 'joao@ribeirosolutions.com', company_ids[1]),
    ('Maria Santos', 'maria@transmov.com', company_ids[2]),
    ('Pedro Costa', 'pedro@globalway.com', company_ids[3]),
    ('Ana Oliveira', 'ana@logimax.com', company_ids[4]),
    ('Carlos Lima', 'carlos@primeconsulting.com', company_ids[5]);
    
  -- Insert sample processes for each company
  INSERT INTO public.processes (client_id, process_type, value, received_date) 
  SELECT 
    c.id,
    'Vendas',
    (random() * 10000 + 1000)::decimal(10,2),
    CURRENT_DATE - (random() * 365)::integer
  FROM public.clients c, generate_series(1, 
    CASE 
      WHEN c.company_id = company_ids[1] THEN 55
      WHEN c.company_id = company_ids[2] THEN 52  
      WHEN c.company_id = company_ids[3] THEN 39
      WHEN c.company_id = company_ids[4] THEN 28
      WHEN c.company_id = company_ids[5] THEN 19
      ELSE 10
    END) s;
END $$;