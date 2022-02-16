<script>
	import Header from '$lib/Header.svelte';
	import Animation from '$lib/animation.svelte';
	import Card from '$lib/card.svelte';
	const page = 'home';
</script>

<div class="home">
	<div>
		<Header {page} />
	</div>
	<div class="home-div">
		<div>
			<Animation />
		</div>
		<div style="background-color: #222121;">
			<center>
				<Card />
			</center>
		</div>
	</div>
</div>

<style lang="scss">
	.home {
		background-color: #222121;
		height: 100vh;
		width: 100%;
		color: #fff;
	}
</style>
