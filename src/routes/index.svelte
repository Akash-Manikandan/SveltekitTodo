<script>
	import { session } from '$app/stores';
	//import { browser } from '$app/env';
	import { supabase } from '$lib/supabaseClient';
	import Header from '$lib/Header.svelte';
	const page = 'home';
</script>

<main>
	<Header {page} />

	<p>Home</p>
</main>
