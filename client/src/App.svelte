<script>
	import axios from 'axios';
	import { onMount } from 'svelte';

	let users = {};
	onMount(async() => {
		users =  await axios.get("http://localhost:5000/users/")

	})
</script>

<h1>Hello!</h1>
{JSON.stringify(users)}

