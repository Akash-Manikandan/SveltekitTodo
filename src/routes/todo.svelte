<script>
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import { onMount } from 'svelte';
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

	onMount(async () => {
		let { data, error } = await supabase.from('tasks').select('*');
		$todos = [...data];
	});
	
	
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
</script>

<div class="gettodo">
	<Gettodo />
</div>
<div class="to-do">
	<Addtodo />
</div>
<div class="header">
    <Header {page} />
</div>
<!--<pre>{JSON.stringify($session, null, 2)}</pre>-->
<style>
	
    .gettodo{
        padding: 20px;
    }
    .header{
       padding: 10px; 
    }
	
</style>
