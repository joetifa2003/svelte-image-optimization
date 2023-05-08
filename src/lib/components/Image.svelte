<script lang="ts">
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
	 * image alt
	 */
	export let alt: string;

	export let sources: {
		imageWidth: number;
		viewPortWidth: number;
	}[] = [];

	function generateApiUrl(width: number, format: string, placeholder = false) {
		let res = `/api/_image/${format}?url=${encodeURIComponent(url)}&w=${width}`;
		if (placeholder) {
			res += '&placeholder=true';
		}

		return res;
	}
</script>

<picture style={`background-image: url(${generateApiUrl(placeholderWidth, 'jpeg', true)});`}>
	{#each sources as source}
		<source
			srcset={generateApiUrl(source.imageWidth, 'webp')}
			type="image/webp"
			media={`(max-width: ${source.viewPortWidth}px)`}
		/>
		<source
			srcset={generateApiUrl(source.imageWidth, 'jpeg')}
			type="image/jpeg"
			media={`(max-width: ${source.viewPortWidth}px)`}
		/>
	{/each}
	<source srcset={generateApiUrl(width, 'webp')} type="image/webp" />
	<source srcset={generateApiUrl(width, 'jpeg')} type="image/jpeg" />

	<img src={generateApiUrl(width, 'jpeg')} style={`${style}`} {alt} loading="lazy" />
</picture>

<style>
	img {
		color: transparent;
	}

	picture {
		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size: cover;
	}
</style>
