<script>
	import copy from "$data/copy.json";
	import Section from "$components/Section.svelte";
</script>

{#each copy.sections as section}
	<Section {...section} />
{/each}
