<script lang="ts">
	import { onMount } from 'svelte';

	/**
	 * url of the image
	 */
	export let url: string;

	/**
	 * width of the image, used for resizing the image (preserving aspect ratio)
	 */
	export let width: number;

	/**
	 * width of the placeholder image (preserving aspect ratio)
	 * @default 10
	 */
	export let placeholderWidth: number = 10;

	/**
	 * style of image tag (preserving aspect ratio)
	 * @default ""
	 */
	export let style = '';

	/**
	 * used to blur the placeholder image while the orginal loads,
	 * can take values that can be added to `filter: blur(<blur>);`
	 * @example 14px
	 * @default ""
	 */
	export let blur = '';

	/**
	 * used to animate between the placeholder and the original image
	 * can take values that can be added to `transform: all <transation>;`
	 * @example 1s
	 * @default ""
	 */
	export let transition = '';

	/**
	 * image alt
	 */
	export let alt: string;

	let src = `/api/_image/webp?url=${encodeURIComponent(url)}&w=${placeholderWidth}`;

	let transitionStyle = `transition: all ${transition};`;
	let blurStlye = `filter: blur(${blur});`;

	onMount(() => {
		const fullImage = new Image();
		fullImage.src = `/api/_image/webp?url=${encodeURIComponent(url)}&w=${width}`;
		fullImage.onload = function () {
			src = fullImage.src;
			blurStlye = '';
		};
	});
</script>

<img {src} style={`${style}${transitionStyle}${blurStlye}`} {alt} />
