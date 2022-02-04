<script>
	import { supabase } from '$lib/supabaseClient';
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import Header from '$lib/Header.svelte';
	import { goto } from '$app/navigation';
	const page ='auth';
	let mail;
	let pass;
	async function connect() {
		//const session = supabase.auth.session()
		const {
			user,
			session,
			error
		} = await supabase.auth.signUp({
			email: mail,
			password: pass
		});
		if (error) alert(error.message);
		else goto('/confirm');
	}
	if (browser) {
		$session = supabase.auth.session();

		supabase.auth.onAuthStateChange((event, sesh) => {
			$session = sesh;
		});
	}
</script>

<main>
	<Header {page} />
	<input type="email" bind:value={mail} />
	<input type="password" bind:value={pass} />
	<button on:click={connect}>Submit</button>
	<pre>{JSON.stringify($session, null, 2)}</pre>
</main>

<style>
</style>
