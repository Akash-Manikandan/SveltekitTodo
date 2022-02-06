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
	<div class="form">
		<center>
			<h1>SignIn</h1>
			<table>
				<tr>
					<td>Enter mail-id :</td>
					<td><input type="email" bind:value={mail} /></td>
				</tr>
				<tr>
					<td>Enter password :</td>
					<td><input type="password" bind:value={pass} /></td>
				</tr>
				<tr>
					<td><button on:click|preventDefault={connect}>Submit</button></td>
				</tr>
			</table>
			<small>*New user SignUp</small>
		</center>
	</div>
</main>

<style lang="scss">
	input {
		font: inherit;
		padding: 5px 12px;
	}
	.form {
		color: #000;
		padding: 20px;
	}
	table,
	tr,
	td {
		border: 0px solid black;
		padding: 10px;
		border-collapse: collapse;
	}
	small {
		color: red;
	}
</style>
