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

	<div class="center">
		<div class="property-card">
			<div class="property-image">
				<div class="property-image-title">
					<center>
						<table>
							<tr>
								<td>Enter mail-id :</td>
								<td><input type="email" bind:value={mail} /></td>
							</tr>
							<tr>
								<td>Enter password:</td>
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
						<small>*Already an user ? SignIn</small>
					</center>
				</div>
			</div>
			<div class="property-description">
				<h5>SignUp</h5>
			</div>
		</div>
	</div>
</main>

<style lang="scss">
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

	* {
		box-sizing: border-box;
	}

	h5 {
		margin: 0px;
		font-size: 1.4em;
		font-weight: 700;
	}
	.center {
		height: 90vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: grey;
	}
	.property-card {
		height: 15em;
		width: 20em;
		display: flex;
		flex-direction: column;
		position: relative;
		transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 15px 15px 27px grey, -15px -15px 27px grey;
	}
	.property-image {
		height: 30em;
		width: 20em;
		padding: 1em 2em;
		position: absolute;
		top: 0px;
		transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
		background-image: linear-gradient(rgba(240, 0, 0, 0.6), rgba(245, 0, 230, 0.4));
		background-size: cover;
		background-repeat: no-repeat;
	}
	.property-description {
		background-color: #fafafc;
		height: 10em;
		width: 20em;
		position: absolute;
		bottom: 0em;
		transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
		padding: 0.5em 1em;
		text-align: center;
	}
	.property-card:hover {
		box-shadow: 15px 15px 27px #121212, -15px -15px 27px grey;
	}
	.property-card:hover .property-description {
		height: 0em;
		padding: 0px 1em;
	}
	.property-card:hover .property-image {
		height: 15em;
	}
</style>
