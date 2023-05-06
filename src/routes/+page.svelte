<script lang="ts">
	import Image from '../lib/components/Image.svelte';

	let cats = [
		'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg',
		'https://cdn.britannica.com/39/7139-050-A88818BB/Himalayan-chocolate-point.jpg',
		'https://static01.nyt.com/images/2021/09/14/science/07CAT-STRIPES/07CAT-STRIPES-mediumSquareAt3X-v2.jpg',
		'https://upload.wikimedia.org/wikipedia/commons/1/15/Cat_August_2010-4.jpg'
	];
</script>

{#each cats as cat}
	<Image url={cat} width={500} style="width: 500px;" blur={'7px'} transition="0.5s" alt="a cat!" />
{/each}
