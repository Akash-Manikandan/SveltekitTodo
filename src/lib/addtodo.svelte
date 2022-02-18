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
				<br />
				<div class="list1">
					<label
						in:fade={{ x: -20, duration: 500 }}
						out:fade={{ x: -20, duration: 500 }}
						class="list"
					>
						<input
							type="checkbox"
							bind:checked={item.done}
							on:change|preventDefault={() => markDone(item.id, item.done)}
						/>
						<span title={"Created at :  "+item.updated_at}>{item.task_added}</span>
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
				<br />
				<div class="list1">
					<label
						in:fade={{ x: -20, duration: 500 }}
						out:fade={{ x: 20, duration: 500 }}
						class="list"
					>
						<input
							type="checkbox"
							bind:checked={item.done}
							on:change|preventDefault={() => markDone(item.id, item.done)}
						/>
						<strike><i title={"Created at :  "+item.updated_at}>{item.task_added}</i></strike>
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
		color: white;
		box-sizing: border-box;
		border-top: 2px solid #24b47e;
		border-bottom: 2px solid #24b47e;
	}
	.todo {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #222121;
		padding: 25px;
		box-sizing: border-box;
		border-right: 2px solid #24b47e;
		h3{
			color: red;
		}
	}
	.done {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #222121;
		padding: 25px;
		box-sizing: border-box;
		border-left: 2px solid #24b47e;
		h3{
			color: blue;
		}
	}
	.list1 {
		padding: 20px;
		display: block;
		background-color: 222121;
		width: 250px;
		box-sizing: border-box;
		border-radius: 10px;
		border: 1px solid #24b47e;
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
		display: block;
		height: 20px;
		font-size: larger;
		background-color: transparent;
		border: none;
		color: rgb(190, 30, 30);
		opacity: 0;
		transition: opacity 0.2s;
	}
	label:hover .remove-todo {
		opacity: 1;
		cursor: pointer;
	}
	.list1:hover {
		animation: rainbow 5s infinite;
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
	@media (max-width: 700px) {
		.todo-done {
			flex-direction: column;
		}
		label .remove-todo {
			opacity: 1;
		}
		.todo{
			border: 0px;
		}
		.done{
			border-top: 2px solid #24b47e;
		}
		.list1{
			animation: rainbow 5s infinite;
		}
	}
</style>
