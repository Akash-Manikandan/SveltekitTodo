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
	<div class="center">
		<div class="property-card">
			<center>
				<h3>SignIn</h3>
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
									<button on:click|preventDefault={connect} class="glow-on-hover">SignIn</button>
								</div></center
							></td
						>
					</tr>
				</table>
				<small>*New user ? <a href="/auth">SignUp</a></small>
			</center>
		</div>
	</div>
</main>

<style lang="scss">
	h3 {
		color: red;
	}
	table,
	tr,
	td {
		border: 0px solid black;
		padding: 10px;
		border-collapse: collapse;
		color: #fff;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}
	small {
		color: red;
		font-weight: bold;
		a {
			color: red;
			text-decoration: none;
		}
	}
	.but-div {
		padding: 10px;
	}

	* {
		box-sizing: border-box;
	}
	.center {
		height: 90vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #1e1e1e;
	}
	.property-card {
		height: 15em;
		width: 20em;
		display: flex;
		flex-direction: column;
		position: relative;
		transition: all 0.4s cubic-bezier(0.645, 0.045, 0.355, 1);
		border-radius: 16px;
		overflow-x: hidden;
		overflow-y: hidden;
		box-shadow: 2px 2px 5px #24b47e, -2px -2px 5px #24b47e;
	}
	.property-card:hover {
		animation: rainbow 5s infinite;
		border: 0px;
	}
	.glow-on-hover {
		width: 80px;
		height: 40px;
		border: none;
		outline: none;
		color: #fff;
		background: #111;
		cursor: pointer;
		position: relative;
		z-index: 0;
		border-radius: 10px;
	}

	.glow-on-hover:before {
		content: '';
		background: linear-gradient(
			45deg,
			#ff0000,
			#ff7300,
			#fffb00,
			#48ff00,
			#00ffd5,
			#002bff,
			#7a00ff,
			#ff00c8,
			#ff0000
		);
		position: absolute;
		top: -2px;
		left: -2px;
		background-size: 400%;
		z-index: -1;
		filter: blur(5px);
		width: calc(100% + 4px);
		height: calc(100% + 4px);
		animation: glowing 20s linear infinite;
		opacity: 0;
		transition: opacity 0.3s ease-in-out;
		border-radius: 10px;
	}

	.glow-on-hover:active {
		color: #000;
	}

	.glow-on-hover:active:after {
		background: transparent;
	}

	.glow-on-hover:hover:before {
		opacity: 1;
	}

	.glow-on-hover:after {
		z-index: -1;
		content: '';
		position: absolute;
		width: 100%;
		height: 100%;
		background: #111;
		left: 0;
		top: 0;
		border-radius: 10px;
	}

	@keyframes glowing {
		0% {
			background-position: 0 0;
		}
		50% {
			background-position: 400% 0;
		}
		100% {
			background-position: 0 0;
		}
	}
	@keyframes rainbow {
		from,
		to {
			box-shadow: 0 0 25px 0 red;
		}
		16% {
			box-shadow: 0 0 25px 0 yellow;
		}
		32% {
			box-shadow: 0 0 25px 0 green;
		}
		48% {
			box-shadow: 0 0 25px 0 aqua;
		}
		64% {
			box-shadow: 0 0 25px 0 blue;
		}
		80% {
			box-shadow: 0 0 25px 0 fuchsia;
		}
	}

	@media only screen and (max-width: 400px) {
		.property-card {
			overflow-y: hidden;
			overflow-x: scroll;
		}
	}
</style>
