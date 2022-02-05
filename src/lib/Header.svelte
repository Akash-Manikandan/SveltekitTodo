<script>
	export let page;
</script>

<nav>
	{#if page === 'home'}
		<a href="/">Home</a>
		<a href="/auth">Signup</a>
        <a href="/signin">Signin</a>
	{:else if page === 'auth'}
		<a href="/">Home</a>
		<a href="/signout">Signout</a>
        <a href="/signin">Signin</a>
	{:else if page === 'todo'}
        <div class='a-todo-div'>
		    <a href="/signout" class="a-todo-signout">Signout</a>
        </div>
    {:else if page === 'signin'}
		<a href="/">Home</a>
        <a href="/auth">Signup</a>
	{/if}
</nav>


<style>
    .a-todo-signout{
        
        padding :10px;
        text-decoration: none;
        background-color:crimson;
    }
    .a-todo-div{
        display: block;
        padding: 20px;
    }
</style>