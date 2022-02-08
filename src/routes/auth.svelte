<script>
	import { supabase } from '$lib/supabaseClient';
	import { session } from '$app/stores';
	import { browser } from '$app/env';
	import Header from '$lib/Header.svelte';
	import { goto } from '$app/navigation';
	const page = 'auth';
	let mail;
	let pass;
	async function connect() {
		//const session = supabase.auth.session()
		const {
			user,
			session: sesh,
			error
		} = await supabase.auth.signUp(
			{
				email: mail,
				password: pass
			},
			{
				redirectTo: 'https://sveltekit-todo.vercel.app/todo/'
			}
		);
		if (error) alert(error.message);
		else {
			goto('/confirm');
		}
	}
	if (browser) {
		$session = supabase.auth.session();

		supabase.auth.onAuthStateChange((event, sesh) => {
			$session = sesh;
		});
	}
</script>

<main class="auth">
	<Header {page} />

	<div class="container">
		<center>
			<div class="card">
				<h1>SignUp</h1>
				<table>
					<tr>
						<td>Enter mail-id :</td>
						<td><input type="email" bind:value={mail} /></td>
					</tr>
					<tr>
						<td>Enter password : </td>
						<td><input type="password" bind:value={pass} /></td>
					</tr>
					<tr>
						<td colspan="2"
							><center
								><div class="but-div">
									<button on:click|preventDefault={connect}>Submit</button>
								</div></center
							></td
						>
					</tr>
				</table>
				<small>*Already an user? SignIn</small>
			</div>
		</center>
	</div>
	<!--<pre>{JSON.stringify($session, null, 2)}</pre>-->
</main>

<style lang="scss">
	.container {
		min-height: 90vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #eee;
	}
	.container .card {
		height: 280px;
		width: 500px;
		background-color: #fff;
		position: relative;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
		padding-top: 10px;
	}
	input {
		font: inherit;
		padding: 5px 12px;
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
	.but-div {
		padding: 10px;
	}
	button {
		width: 50px;
		height: 25px;
		cursor: pointer;
		font-size: 12px;
		color: #fff;
		background: #24b47e;
		border: 1px solid black;
		box-shadow: 3px 3px 0 black, -3px -3px 0 black, -3px 3px 0 black, 3px -3px 0 black;
		transition: 500ms ease-in-out;
	}

	button:hover {
		box-shadow: 20px 3px 0 black, -20px -3px 0 black;
	}

	button:focus {
		outline: none;
	}
	@media (max-width: 700px) {
		.container {
			overflow: hidden;
			min-height: 95vh;
			.card{
				width: 310px;
				height: 300px;
			}
		}
		input{
			size: 10;
			padding: 1px 1px 1px 1px;
		}
	}
</style>
