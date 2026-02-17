import { addGroups } from '$lib/server/cal_pickers';

export const POST = async (event) => {
  const body = (await event.request.json()) as { groupIds: string[] };
  await addGroups(event, body.groupIds);
  return new Response(null, { status: 204 });
};
