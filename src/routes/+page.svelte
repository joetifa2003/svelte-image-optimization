<script lang="ts">
	import Image from '../lib/components/Image.svelte';

	let cats = [
		'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg',
		'https://cdn.britannica.com/39/7139-050-A88818BB/Himalayan-chocolate-point.jpg',
		'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg',
		'https://cdn.pixabay.com/photo/2015/11/16/14/43/cat-1045782__340.jpg'
	];
</script>

{#each cats as cat}
	<div class="img-container">
		<Image
			url={cat}
			width={500}
			alt="a cat!"
			style="width: 100%; height: 100%; object-fit: cover;"
			sources={[
				{
					viewPortWidth: 480,
					imageWidth: 250
				},
				{
					viewPortWidth: 580,
					imageWidth: 350
				},
				{
					viewPortWidth: 680,
					imageWidth: 450
				}
			]}
		/>
	</div>
{/each}

<style>
	.img-container {
		display: flex;
		aspect-ratio: 16/9;
	}

	@media (min-width: 500px) {
		.img-container {
			max-width: 50vw;
		}
	}

	@media (min-width: 800px) {
		.img-container {
			max-width: 30vw;
		}
	}
</style>
