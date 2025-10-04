import type { SEOConfig } from 'metanext';
import type { Metadata } from 'next';

export function configToMetadata(config: SEOConfig, overrides?: Partial<SEOConfig>): Metadata {
	const merged: SEOConfig = { ...config, ...overrides };

	const metadata: Metadata = {
		title: merged.title,
		description: merged.description,
		keywords: merged.keywords,
		creator: merged.creator,
		publisher: merged.publisher,
		authors: merged.authors?.map((author) => ({ name: author.name, url: author.url })),
		manifest: merged.manifest,
		icons: merged.icons ? { ...config.icons, ...overrides?.icons } : undefined,
		formatDetection: merged.formatDetection ? { ...config.formatDetection, ...overrides?.formatDetection } : undefined,
		openGraph: merged.openGraph
			? {
					...config.openGraph,
					...overrides?.openGraph,
					url: overrides?.openGraph?.url ?? config.openGraph?.url ?? config.url,
					siteName: overrides?.openGraph?.siteName ?? config.openGraph?.siteName ?? config.name,
				}
			: undefined,
		twitter: merged.twitter ? { ...config.twitter, ...overrides?.twitter } : undefined,
		robots: merged.robots
			? {
					...config.robots,
					...overrides?.robots,
					googleBot:
						overrides?.robots?.googleBot || config.robots?.googleBot
							? { ...config.robots?.googleBot, ...overrides?.robots?.googleBot }
							: undefined,
				}
			: undefined,
	};

	return Object.fromEntries(Object.entries(metadata).filter(([_, v]) => v !== undefined)) as Metadata;
}

export function generatePageMetadata(config: SEOConfig, overrides?: Partial<SEOConfig>): Metadata {
	return configToMetadata(config, overrides);
}
