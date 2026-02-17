import { addLabGroup } from '$lib/server/cal_pickers';

export const POST = async (event) => {
  const body = (await event.request.json()) as { yearGroup: 'IA' | 'IB' | 'IIA' | 'IIB'; groupNo: number };
  await addLabGroup(event, body.yearGroup, body.groupNo);
  return new Response(null, { status: 204 });
};
