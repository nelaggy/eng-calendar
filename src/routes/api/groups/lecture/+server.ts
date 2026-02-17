import { getLectureGroups } from '$lib/server/cal_pickers';

export const GET = async (event) => {
  const data = await getLectureGroups(event);
  return new Response(JSON.stringify(data), {
    headers: { 'content-type': 'application/json' }
  });
};
