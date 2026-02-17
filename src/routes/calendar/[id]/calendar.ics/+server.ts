import { generate_cal } from '$lib/cal/generator';
import { getCalendar } from '$lib/server/fetch';

export const GET = async (event) => {
  const events = await getCalendar(event, event.params.id);
  return new Response(generate_cal(events).toString(), {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="calendar.ics"'
    }
  });
};
