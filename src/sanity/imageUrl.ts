import imageUrlBuilder from '@sanity/image-url';
import { sanityClient } from 'sanity:client';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = imageUrlBuilder(sanityClient);

/**
 * Build a Sanity CDN image URL with format negotiation.
 * Usage: urlFor(image).width(800).auto('format').quality(75).url()
 *
 * NOTE: Use this for ALL Sanity-hosted images.
 * Do NOT pass Sanity image objects to Astro's <Image /> component.
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
