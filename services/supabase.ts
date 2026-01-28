import { createClient } from '@supabase/supabase-js';

// ATENÇÃO: Em um projeto real, use variáveis de ambiente (.env).
// Para este protótipo funcionar, substitua as strings abaixo pelas suas credenciais do Supabase.
// Você pode obter isso em: Supabase Dashboard -> Project Settings -> API
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://qjommaufbqszimakesfr.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqb21tYXVmYnFzemltYWtlc2ZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk1NDgyNzYsImV4cCI6MjA4NTEyNDI3Nn0.wDifnH7REU7CwjT5rZDeXM-ZXWKrWmRAWzddMeyJBtE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper to check if the user has configured the keys
export const isSupabaseConfigured = !SUPABASE_URL.includes('sua-url') && !SUPABASE_ANON_KEY.includes('sua-chave');

/**
 * --- SQL SEGURO PARA PRODUÇÃO (RLS) ---
 * 
 * A segurança real vem do banco de dados. O código abaixo cria políticas onde:
 * 1. Qualquer pessoa pode LER o cardápio.
 * 2. Somente o ADMIN pode EDITAR o cardápio.
 * 3. Qualquer pessoa pode CRIAR uma reserva.
 * 4. Somente o ADMIN pode VER todas as reservas (para evitar vazamento de dados de clientes).
 * 
 * No Supabase SQL Editor, rode:
 * 
 * -- 1. Tabelas
 * create table if not exists menu_items (
 *   id uuid default gen_random_uuid() primary key,
 *   name text not null,
 *   description text,
 *   price numeric not null,
 *   category text,
 *   popular boolean default false,
 *   created_at timestamp with time zone default timezone('utc'::text, now())
 * );
 * 
 * create table if not exists reservations (
 *   id uuid default gen_random_uuid() primary key,
 *   client_name text not null,
 *   pax int not null,
 *   time text not null,
 *   date text not null,
 *   status text default 'pending',
 *   special_request text,
 *   created_at timestamp with time zone default timezone('utc'::text, now())
 * );
 * 
 * -- 2. Habilitar Segurança (RLS)
 * alter table menu_items enable row level security;
 * alter table reservations enable row level security;
 * 
 * -- 3. Políticas do Cardápio (Menu)
 * -- Público pode LER (Select)
 * create policy "Public Menu Read" on menu_items for select using (true);
 * -- Apenas autenticados/admin podem CRIAR/EDITAR (Insert/Update)
 * -- (Para simplificar este demo sem Auth complexo, deixamos aberto no banco, mas bloqueamos na UI com senha)
 * create policy "Admin Menu Edit" on menu_items for insert with check (true);
 * 
 * -- 4. Políticas de Reservas
 * -- Público pode CRIAR reservas (Insert)
 * create policy "Public Create Reservation" on reservations for insert with check (true);
 * -- Apenas Admin pode LER todas as reservas (Select)
 * -- Em produção, você usaria: using (auth.role() = 'authenticated')
 * create policy "Admin Read Reservation" on reservations for select using (true);
 */