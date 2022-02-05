<script>
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';
	let mail;
	let pass;
	async function connect() {
		//const session = supabase.auth.session()
		const { user, session, error } = await supabase.auth.signIn({
			email: mail,
			password: pass
		});
		if (error) alert(error.message);
		else goto('/todo');
	}
	if (browser) {
		$session = supabase.auth.session();

		supabase.auth.onAuthStateChange((event, sesh) => {
			$session = sesh;
		});
	}
	const page = 'signin';
</script>

<main>
	<Header {page} />
	<br />
	<div>
		Enter mail-id :
		<input type="email" bind:value={mail} /><br /><br />
		Enter password :
		<input type="password" bind:value={pass} /><br /><br />
		<button on:click={connect}>Submit</button>
	</div>
</main>
