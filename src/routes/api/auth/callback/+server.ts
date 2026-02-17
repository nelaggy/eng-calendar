import { env as privateEnv } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

const required = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`${name} is not set`);
  }
  return value;
};

export const GET = async (event) => {
  const auth0BaseUrl = required(privateEnv.AUTH0_BASE_URL, 'AUTH0_BASE_URL');
  const auth0ClientId = required(privateEnv.AUTH0_CLIENT_ID, 'AUTH0_CLIENT_ID');
  const auth0ClientSecret = required(privateEnv.AUTH0_CLIENT_SECRET, 'AUTH0_CLIENT_SECRET');
  const auth0Domain = required(privateEnv.AUTH0_DOMAIN, 'AUTH0_DOMAIN');
  const supabaseServiceKey = required(privateEnv.SUPABASE_SERVICE_KEY, 'SUPABASE_SERVICE_KEY');
  const supabaseUrl = required(publicEnv.PUBLIC_SUPABASE_URL, 'PUBLIC_SUPABASE_URL');

  const code = event.url.searchParams.get('code');
  if (!code) {
    throw redirect(302, auth0BaseUrl);
  }

  const tokenRes = await fetch(`https://${auth0Domain}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: auth0ClientId,
      client_secret: auth0ClientSecret,
      code,
      redirect_uri: `${auth0BaseUrl}/api/auth/callback`
    })
  });

  if (!tokenRes.ok) {
    throw redirect(302, auth0BaseUrl);
  }

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token as string | undefined;
  if (!accessToken) {
    throw redirect(302, auth0BaseUrl);
  }

  const userRes = await fetch(`https://${auth0Domain}/userinfo`, {
    headers: { 
      'authorization': `Bearer ${accessToken}`, 
      'access_token': accessToken,
      'content-type': 'application/json',
    }
  });
  if (!userRes.ok) {
    throw redirect(302, auth0BaseUrl);
  }
  console.log('User info response from Auth0:', userRes.body);

  const user = await userRes.json();
  console.log('User info from Auth0:', user);
  const userParts = user.sub.split('|');
  const email = userParts[userParts.length - 1];

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  const { data } = await supabase.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      data: {
        given_name: user.given_name,
        family_name: user.family_name,
        display_name: user.given_name
      }
    }
  });

  const hash = data.properties?.hashed_token;
  if (hash) {
    throw redirect(302, `${auth0BaseUrl}/auth/callback?token=${hash}`);
  }

  throw redirect(302, auth0BaseUrl);
};
