<script>
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import { onDestroy, onMount } from 'svelte';
	import { todos } from '$lib/stores';
	import { supabase } from '$lib/supabaseClient';
	import Header from '$lib/Header.svelte';
	import Gettodo from '$lib/gettodo.svelte';
	import Addtodo from '$lib/addtodo.svelte';
	if (browser) {
		$session = supabase.auth.session();

		supabase.auth.onAuthStateChange((event, sesh) => {
			$session = sesh;
		});
	}
	const page = 'todo';
	let noneExist = '';
	onMount(async () => {
		console.log('Mounted');
		let { data, error } = await supabase.from('tasks').select('*');
		$todos = [...data];
		if (error) console.log(error.message);
	});
	$: if ($todos.length === 0) {
		noneExist = 'No todos';
	} else {
		noneExist = '';
	}
	const tasks = supabase
		.from('tasks')
		.on('INSERT', (payload) => {
			$todos = [...$todos, payload.new];
		})
		.on('UPDATE', (payload) => {
			for (let i = 0; i < $todos.length; i++) {
				if ($todos[i].id === payload.new.id) {
					$todos[i] = payload.new;
				}
			}
		})
		.on('DELETE', (payload) => {
			for (let i = 0; i < $todos.length; i++) {
				if ($todos[i].id === payload.old.id) {
					$todos.splice(i, 1);
					$todos = [...$todos];
				}
			}
		})
		.subscribe();
	onDestroy(() => {
		supabase.removeSubscription(tasks);
	});
</script>

<div class="header">
	<Header {page} />
</div>
<div class="gettodo">
	<Gettodo />
</div>
<div>
	<center>
		<p>{noneExist}</p>
	</center>
</div>
<div class="to-do">
	<Addtodo />
</div>

<!--<pre>{JSON.stringify($session, null, 2)}</pre>-->
<style lang="scss">
	.header {
		padding: 0;
		margin: 0;
	}
	.gettodo {
		padding: 20px;
	}
</style>
