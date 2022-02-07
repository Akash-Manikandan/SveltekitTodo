<script>
	const page = 'signout';
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { session } from '$app/stores';
	async function logOut() {
		const { error } = await supabase.auth.signOut();
		if (error) alert(error.message);
		else {
			goto('/');
		}
	}
</script>

<div>
	<Header {page} />
	<div>
		<div class="container">
			<center>
				<div class="card">
					<h2>Are you sure to signout?</h2>
					<button
						on:click|preventDefault={() => ($session === null ? goto('/auth') : goto('/todo'))}
						>No</button
					>
					<button on:click|preventDefault={logOut}>Yes</button>
				</div>
			</center>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		min-height: 90vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eee;
	}
	.container .card {
		height: 120px;
		width: 300px;
		background-color: #fff;
		position: relative;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
		padding-top: 10px;
	}
</style>
