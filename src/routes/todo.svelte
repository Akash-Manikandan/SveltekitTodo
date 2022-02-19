<script>
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import { onDestroy, onMount } from 'svelte';
	import { todos } from '$lib/stores';
	import { supabase } from '$lib/supabaseClient';
	import Header from '$lib/Header.svelte';
	import Gettodo from '$lib/gettodo.svelte';
	import Addtodo from '$lib/addtodo.svelte';

	let user;
	if (browser) {
		$session = supabase.auth.session();
		user = $session.user.id;
		supabase.auth.onAuthStateChange((event, sesh) => {
			$session = sesh;
		});
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
	const page = 'todo';
	let noneExist = '';
	onMount(async () => {
		let { data, error } = await supabase.from('tasks').select('*');
		$todos = [...data];
		if (error) console.log(error.message)
	});
	$: if ($todos.length === 0) {
		noneExist = 'No todos';
	} else {
		noneExist = '';
	}
	onDestroy(() => {
		supabase.removeSubscription(tasks);
	});
</script>

<div class="header">
	<Header {page} />
</div>
<div class="user-div">
	<p>user-id : <span>{user}</span></p>
</div>
<div class="gettodo">
	<Gettodo />
	<center>
		<p style="color: #fff;">{noneExist}</p>
	</center>
</div>

<div class="to-do">
	<Addtodo />
</div>

<!--<pre>{JSON.stringify($session, null, 2)}</pre>-->
<style lang="scss">
	.user-div {
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
		text-align: right;
		padding: 8px;
		font-size: smaller;
		background-color: #222121;
		color: #fff;
		span {
			color: #24b47e;
		}
	}
	.header {
		padding: 0;
		margin: 0;
	}
	.gettodo {
		padding: 20px;
		background-color: #222121;
	}
	@media only screen and (max-width: 400px) {
		.user-div {
			font-size: 10px;
			padding: 2px;
		}
	}
</style>
