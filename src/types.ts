import type { TemplateString } from 'next/dist/lib/metadata/types/metadata-types';
import type { OpenGraphType } from 'next/dist/lib/metadata/types/opengraph-types';

export interface SEOAuthor {
	name: string;
	url?: string;
}

export interface SEOImage {
	url: string;
	width?: number;
	height?: number;
	alt?: string;
}

export interface SEORobots {
	index?: boolean;
	follow?: boolean;
	googleBot?: {
		index?: boolean;
		follow?: boolean;
		'max-video-preview'?: number;
		'max-image-preview'?: 'none' | 'standard' | 'large';
		'max-snippet'?: number;
	};
}

export interface SEOTwitter {
	card?: 'summary' | 'summary_large_image' | 'app' | 'player';
	title?: string;
	description?: string;
	images?: string[];
	creator?: string;
}

export interface SEOOpenGraph {
	type: OpenGraphType;
	locale?: string;
	url?: string;
	title?: string;
	description?: string;
	siteName?: string;
	images?: SEOImage[];
}

export interface SEOFormatDetection {
	email?: boolean;
	address?: boolean;
	telephone?: boolean;
}

export interface SEOIcons {
	icon?: { url: string; sizes?: string }[];
	apple?: { url: string; sizes?: string }[];
	shortcut?: { url: string; sizes?: string }[];
}

export interface SEOJsonLd {
	'@context': string;
	'@type': string;
	[key: string]: any;
}

/**
 * Main SEO structure for site or page-level configuration
 */
export interface SEOConfig {
	name: string;
	url: string;
	title?: TemplateString | string;
	description?: string;
	keywords?: string[];
	creator?: string;
	publisher?: string;
	authors?: SEOAuthor[];
	manifest?: string;
	icons?: SEOIcons;
	formatDetection?: SEOFormatDetection;
	openGraph?: SEOOpenGraph;
	twitter?: SEOTwitter;
	robots?: SEORobots;
	jsonld?: SEOJsonLd[];
	locale?: string;
}
