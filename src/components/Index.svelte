<script>
	import copy from "$data/copy.json";
	import Title from "$components/Title.svelte";
	import Section from "$components/Section.svelte";
	import Footer from "$components/Footer.svelte";
</script>

<article>
	<Title />

	{#each copy.sections as section}
		<Section {...section} />
	{/each}

	<Footer recirc={true} />
</article>

<style>
	article {
	}
</style>
