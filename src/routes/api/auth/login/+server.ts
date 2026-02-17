import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

const required = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
};

export const GET = async () => {
  const auth0Domain = required(env.AUTH0_DOMAIN, 'AUTH0_DOMAIN');
  const auth0ClientId = required(env.AUTH0_CLIENT_ID, 'AUTH0_CLIENT_ID');
  const auth0BaseUrl = required(env.AUTH0_BASE_URL, 'AUTH0_BASE_URL');

  const url = new URL(`https://${auth0Domain}/authorize`);
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('client_id', auth0ClientId);
  url.searchParams.set('redirect_uri', `${auth0BaseUrl}/api/auth/callback`);
  url.searchParams.set('connection', 'raven');
  url.searchParams.set('scope', 'openid profile email');
  throw redirect(302, url.toString());
};
