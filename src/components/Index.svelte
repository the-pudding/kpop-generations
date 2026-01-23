<script>
	import copy from "$data/copy.json";
	import Title from "$components/Title.svelte";
	import Section from "$components/Section.svelte";
</script>

<article>
	<Title />

	{#each copy.sections as section}
		<Section {...section} />
	{/each}
</article>

<style>
	article {
	}
</style>
