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

	const img = await fetch(imageUrl);
	const imgBuffer = await img.arrayBuffer();
	const out = await sharp(imgBuffer).rotate().resize(widthNumber).webp({ quality: 70 }).toBuffer();

	setHeaders({
		'Cache-Control': 'max-age=31536000, s-maxage=31536000'
	});

	return new Response(out);
}) satisfies RequestHandler;
