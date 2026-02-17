import { createBrowserClient } from '@supabase/ssr';
import { env } from '$env/dynamic/public';
import type { Database } from '$lib/supabase';

const required = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
};

export function createClient() {
  const supabaseUrl = required(env.PUBLIC_SUPABASE_URL, 'PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = required(env.PUBLIC_SUPABASE_ANON_KEY, 'PUBLIC_SUPABASE_ANON_KEY');
  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
