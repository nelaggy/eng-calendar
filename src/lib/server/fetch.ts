import type { CalEvent } from '$lib/cal/generator';
import type { RequestEvent } from '@sveltejs/kit';

export const getUser = async (event: RequestEvent) => {
  const userId = (await event.locals.supabase.auth.getUser()).data.user?.id;
  if (!userId) {
    throw Error('not logged in');
  }
  return userId;
};

export const getCalendar = async (event: RequestEvent, userId: string): Promise<CalEvent[]> => {
  const { data, error } = await (event.locals.supabase as any).rpc('assemble_calendar', { userid: userId });
  if (error) {
    console.log(error);
    throw Error('h');
  }
  return data as unknown as CalEvent[];
};

export const getGroups = async (event: RequestEvent) => {
  const userId = (await event.locals.supabase.auth.getUser()).data.user?.id;
  if (!userId) {
    throw Error('not logged in');
  }
  const { data, error } = await (event.locals.supabase as any).rpc('get_groups', { userid: userId });
  if (error) {
    console.log(error);
    throw Error('h');
  }
  return data as { name: string; url: string[]; group_id: string }[];
};
