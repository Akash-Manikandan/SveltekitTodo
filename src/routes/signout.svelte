<script>
	const page = 'signout';
	import { goto } from '$app/navigation';
	import Header from '$lib/Header.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { session } from '$app/stores';
	let sesh = JSON.stringify($session, null, 2);
	async function logOut() {
		const { error } = await supabase.auth.signOut();
		if (error) alert(error.message);
		else {
			goto('/');
		}
	}
	function noLogout(){
		if(sesh.length===2 || sesh.length===4){
			goto('/auth');
		}
		else{
			goto('/todo');
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
					<div class="but">
						<button
							on:click|preventDefault={noLogout}
							>No</button
						>
						<button on:click|preventDefault={logOut}>Yes</button>
					</div>
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
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}
	.container .card {
		height: 120px;
		width: 300px;
		background-color: #fff;
		position: relative;
		box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
		padding-top: 10px;
	}
	.but{
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 8px;
	}
	button{
		padding:8px 12px 8px 12px;
	}
</style>
