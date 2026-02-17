import { redirect } from '@sveltejs/kit';

export const GET = async (event) => {
  const code = event.url.searchParams.get('token');

  if (code) {
    const { error } = await event.locals.supabase.auth.verifyOtp({
      type: 'magiclink',
      token_hash: code
    });

    if (error) {
      const signupResult = await event.locals.supabase.auth.verifyOtp({
        type: 'signup',
        token_hash: code
      });

      if (signupResult.error) {
        return new Response(JSON.stringify('error has occurred, please try again'), {
          status: 500,
          headers: { 'content-type': 'application/json' }
        });
      }
    }
  }

  throw redirect(303, event.url.origin);
};
