<script lang="ts">
  import { createClient } from '../../utils/supabase/client';
  import { invalidateAll } from '$app/navigation';
  import Button from './ui/Button.svelte';

  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await invalidateAll();
  };
</script>

<Button onClick={handleSignOut}>Logout</Button>
