import { delGroups } from '$lib/server/cal_pickers';

export const POST = async (event) => {
  const body = (await event.request.json()) as { groupIds: string[] };
  await delGroups(event, body.groupIds);
  return new Response(null, { status: 204 });
};
