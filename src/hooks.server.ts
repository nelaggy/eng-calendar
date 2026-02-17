import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { redirect, type Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const required = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
};

export const handle: Handle = async ({ event, resolve }) => {
  const supabaseUrl = required(env.PUBLIC_SUPABASE_URL, 'PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = required(env.PUBLIC_SUPABASE_ANON_KEY, 'PUBLIC_SUPABASE_ANON_KEY');

  event.locals.supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return event.cookies.get(name);
      },
      set(name: string, value: string, options: CookieOptions) {
        event.cookies.set(name, value, { ...options, path: '/' });
      },
      remove(name: string, options: CookieOptions) {
        event.cookies.set(name, '', { ...options, path: '/' });
      }
    }
  });

  event.locals.safeGetSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();

    if (!session) {
      return { session: null, user: null };
    }

    const {
      data: { user },
      error
    } = await event.locals.supabase.auth.getUser();

    if (error) {
      return { session: null, user: null };
    }

    return { session, user };
  };

  const { user } = await event.locals.safeGetSession();

  if (user && event.url.pathname.startsWith('/login')) {
    throw redirect(303, '/calendar');
  }

  if (!user && event.url.pathname === '/calendar') {
    throw redirect(303, '/login');
  }

  return resolve(event);
};
