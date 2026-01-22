<script>
	import "$styles/app.css";
	import Header from "$components/Header.svelte";
	import { setContext } from "svelte";

	let { children } = $props();

	let current = $state({ section: undefined });

	setContext("current", current);
</script>

<Header />
<main id="content">
	{@render children?.()}
</main>
