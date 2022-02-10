<script>
	import { supabase } from './supabaseClient';
	import { session } from '$app/stores';
	let enteredValue = '';
	async function addTasks() {
		if (enteredValue) {
			try {
				const { data, error } = await supabase.from('tasks').insert({
					done: false,
					remove: false,
					task_added: enteredValue,
					user_id: $session.user.id
				});
				if (error) throw error;
				enteredValue = '';
			} catch (error) {
				console.log(error.message);
			}
		}
	}
</script>

<div class="get-add">
	<div class="get-todo">
		<label>
			<input placeholder="Enter todo" bind:value={enteredValue} />
		</label>
	</div>
	<div class="add-todo">
		<button on:click|preventDefault={addTasks}>Add</button>
	</div>
</div>

<style lang="scss">
	.get-todo {
		display: inline-flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 8px;
		font-family: 'Open Sans', sans-serif;
		font-size: 14px;
	}
	.get-todo {
		flex: 1;
		display: flex;
		justify-content: center;
	}
	.add-todo {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	input {
		font: inherit;
		padding: 6px 18px;
	}
	button {
		padding: 6px;
	}
</style>
