<script>
	export let page;
</script>

<div class="header">
	<div class="div-header">
		<p>Todo</p>
	</div>
	<nav>
		{#if page === 'home'}
			<a href="/">Home</a>
			<a href="/auth">Signup</a>
			<a href="/signin">Signin</a>
		{:else if page === 'auth'}
			<a href="/">Home</a>
			<a href="/signin">Signin</a>
		{:else if page === 'todo'}
			<a href="/signout">Signout</a>
		{:else if page === 'signin'}
			<a href="/">Home</a>
			<a href="/auth">Signup</a>
		{/if}
	</nav>
</div>

<style>
	.header {
		background-color: #151413;
		padding: 10px;
		display: flex;
	}
	.div-header {
		color: azure;
		flex: 4;
	}
	.div-header p {
		padding: 10px;
	}
	nav {
		flex: 1;
		padding: 20px;
	}
	a {
		padding: 10px;
		text-decoration: none;
		justify-content: space-between;
		align-items: flex-end;
	}
	a:hover {
		background-color: #24b47e;
		transition: 2s;
	}
	a:visited {
		color: azure;
	}
	a:active {
		color: azure;
	}
	a:link {
		color: azure;
	}
</style>
