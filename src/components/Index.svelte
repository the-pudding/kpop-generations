<script>
	import copy from "$data/copy.json";
	import Section from "$components/Section.svelte";
</script>

<article>
	{#each copy.sections as section}
		<Section {...section} />
	{/each}
</article>

<style>
	article {
	}
</style>
