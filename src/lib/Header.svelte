<script>
	export let page;
	let src = 'todo.gif';
</script>

<div class="header">
	<div class="div-header">
		<img {src} alt="todo" width="25" height="25" />
		<span>Todo</span>
	</div>
	<div class="div-nav">
		<nav class="nav">
			{#if page === 'home'}
				<a href="/">Home</a>
				<a href="/auth">SignUp</a>
				<a href="/signin">SignIn</a>
			{:else if page === 'auth'}
				<a href="/">Home</a>
				<a href="/signin">SignIn</a>
			{:else if page === 'todo'}
				<a href="/signout">SignOut</a>
			{:else if page === 'signin'}
				<a href="/">Home</a>
				<a href="/auth">SignUp</a>
			{/if}
		</nav>
	</div>
</div>

<style lang="scss">
	.header {
		background-color: #1f1f1f;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: 'Open Sans', sans-serif;
		font-size: 15px;
		padding: 10px;
		.div-header {
			color: #fff;
			display: inline-flex;
			justify-content: space-around;
			align-items: center;
			span {
				padding: 5px 5px 5px 10px;
			}
			margin-left: 10px;
		}
		.div-nav {
			padding: 10px;
			a {
				padding: 5px 10px 5px 10px;
				text-decoration: none;
				text-shadow: 0 0 4px rgba(38, 111, 78, 0.5);
				background-color: #24b47e;
				border-radius: 10px;
				margin-left: 15px;
				opacity: 1;
			}
			a:hover {
				opacity: 0.8;
				transition: 0.5s;
			}
			a:visited {
				color: #fff;
			}
			a:active {
				color: #fff;
			}
			a:link {
				color: #fff;
			}
		}
	}
	@media (max-width: 700px) {
		.header {
			overflow: hidden;
			padding: 8px;
			font-size: small;
			.div-header {
				margin-left: 5px;
				span {
					padding: 3px 3px 3px 5px;
				}
			}
			.div-nav {
				padding: 8px;
				overflow: scroll;
				a {
					padding: 5px;
					margin-left: 10px;
				}
			}
		}
	}
</style>
