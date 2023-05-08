import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import sharp from 'sharp';

export const GET = (async ({ params, url, fetch, setHeaders }) => {
	const imageUrl = url.searchParams.get('url');
	if (!imageUrl) {
		throw error(400, 'url query param not provided');
	}
	const width = url.searchParams.get('w');
	if (!width) {
		throw error(400, 'w query param not provided');
	}
	const widthNumber = parseInt(width);
	if (!widthNumber) {
		throw error(400, 'w query param must be a number');
	}
	const isPlaceholder = url.searchParams.get('placeholder') == 'true';

	const img = await fetch(imageUrl);
	const imgBuffer = await img.arrayBuffer();

	let base = sharp(imgBuffer).resize(widthNumber);
	if (isPlaceholder) {
		base = base.blur();
	}

	let out: any;
	switch (params.ext) {
		case 'webp':
			out = await base.webp({ quality: 70 }).toBuffer();
			break;
		case 'jpeg':
			out = await base.jpeg({ quality: 70 }).toBuffer();
			break;
		default:
			throw error(400, 'invalid format');
	}

	setHeaders({
		'Cache-Control': 'max-age=31536000, s-maxage=31536000'
	});

	return new Response(out);
}) satisfies RequestHandler;
