<script>
	import Header from '$lib/Header.svelte';
	const page = 'home';
</script>

<main class='home'>
	<Header {page} />

	<p>Home</p>
</main>


<style>
	p{
		padding: 10px;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}
</style>
