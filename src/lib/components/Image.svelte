<script lang="ts">
	import { onMount } from 'svelte';

	export let url: string;
	export let width: number;
	export let style = '';
	export let blur = '';
	export let transition = '';

	let src = `/api/_image/webp?url=${encodeURIComponent(url)}&w=${10}`;

	$: transitionStyle = `transition: all 0.5s;`;
	$: blurStlye = `filter: blur(${blur});`;

	onMount(() => {
		const fullImage = new Image();
		fullImage.src = `/api/_image/webp?url=${encodeURIComponent(url)}&w=${width}`;
		fullImage.onload = function () {
			src = fullImage.src;
			blur = '';
		};
	});
</script>

<img {src} style={`${style}${transitionStyle}${blurStlye}`} alt="" />
