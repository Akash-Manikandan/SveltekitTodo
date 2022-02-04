<script>
	const page = 'signout';
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';
	import { supabase } from '$lib/supabaseClient';
    import {session} from '$app/stores';
	async function logOut() {
		const { error } = await supabase.auth.signOut();
		goto('/');
	}
</script>
<div>
<Header {page} />
<div>
    <h2>Are you sure to signout?</h2>
    <button on:click={()=>($session===null)?goto('/auth'):goto('/todo')}>No</button>
    <button on:click={logOut}>Yes</button>
</div>
</div>