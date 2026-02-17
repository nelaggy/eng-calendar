import { getCalendar, getGroups, getUser } from '$lib/server/fetch';

export const load = async (event) => {
  const groups = await getGroups(event);
  const user = await getUser(event);
  const events = await getCalendar(event, user);
  return { groups, user, events };
};
