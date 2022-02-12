<script>
	import { fade } from 'svelte/transition';
	import { todos } from './stores';
	import { supabase } from './supabaseClient';
	async function markDone(primeId, doneMark) {
		const { data, error } = await supabase
			.from('tasks')
			.update({ done: doneMark })
			.eq('id', primeId);
		if (error) console.log(error);
	}
	async function removeTodo(primeId) {
		const { data, error } = await supabase.from('tasks').delete().eq('id', primeId);
		if (error) console.log(error);
	}
</script>

<main class="todo-done">
	<div class="todo">
		<h3>Todo</h3>
		{#each $todos as item}
			{#if !item.done && !item.remove}
				<br />
				<div class="list1">
					<label
						in:fade={{ x: -20, duration: 1000 }}
						out:fade={{ x: -20, duration: 1000 }}
						class="list"
					>
						<input
							type="checkbox"
							bind:checked={item.done}
							on:change|preventDefault={() => markDone(item.id, item.done)}
						/>
						<span>{item.task_added}</span>
						<button class="remove-todo" on:click|preventDefault={() => removeTodo(item.id)}
							>x</button
						>
					</label>
				</div>
			{/if}
		{/each}
	</div>
	<div class="done">
		<h3>Done</h3>
		{#each $todos as item}
			{#if item.done && !item.remove}
				<br />
				<div class="list2">
					<label
						in:fade={{ x: -20, duration: 1000 }}
						out:fade={{ x: 20, duration: 1000 }}
						class="list"
					>
						<input
							type="checkbox"
							bind:checked={item.done}
							on:change|preventDefault={() => markDone(item.id, item.done)}
						/>
						<strike>{item.task_added}</strike>
						<button class="remove-todo" on:click|preventDefault={() => removeTodo(item.id)}
							>x</button
						>
					</label>
				</div>
			{/if}
		{/each}
	</div>
</main>

<style lang="scss">
	.todo-done {
		display: flex;
		justify-content: space-evenly;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}
	.todo {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: aqua;
		padding: 25px;
	}
	.done {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: lightcoral;
		padding: 25px;
	}
	.list1 {
		padding: 20px;
		display: block;
		background-color: azure;
		width: 200px;
	}
	.list2 {
		display: block;
		padding: 20px;
		width: 200px;
		background-color: azure;
	}
	.list {
		padding: 5px;
	}
	.remove-todo {
		float: right;
		height: 1em;
		box-sizing: border-box;
		padding: 0 0.5em;
		line-height: 1;
		background-color: transparent;
		border: none;
		color: rgb(170, 30, 30);
		opacity: 0;
		transition: opacity 0.2s;
	}
	label:hover .remove-todo {
		opacity: 1;
		cursor: pointer;
	}
	@media (max-width: 700px) {
		.todo-done {
			flex-direction: column;
		}
		label .remove-todo {
			opacity: 1;
		}
	}
</style>
