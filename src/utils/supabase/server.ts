import type { RequestEvent } from '@sveltejs/kit';

export function createClient(event: RequestEvent) {
  return event.locals.supabase;
}
