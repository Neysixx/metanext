import type { Metadata } from 'next';
import type { SEOAuthor, SEOConfig } from '../../types';

export class MetaNext {
	private config: SEOConfig;

	constructor(config: SEOConfig) {
		this.config = config;
	}

	configToMetadata(overrides?: Partial<SEOConfig>): Metadata {
		const merged: SEOConfig = { ...this.config, ...overrides };

		const metadata: Metadata = {
			title: merged.title,
			description: merged.description,
			keywords: merged.keywords,
			creator: merged.creator,
			publisher: merged.publisher,
			authors: merged.authors?.map((author: SEOAuthor) => ({ name: author.name, url: author.url })),
			manifest: merged.manifest,
			icons: merged.icons ? { ...this.config.icons, ...overrides?.icons } : undefined,
			formatDetection: merged.formatDetection
				? { ...this.config.formatDetection, ...overrides?.formatDetection }
				: undefined,
			openGraph: merged.openGraph
				? {
						...this.config.openGraph,
						...overrides?.openGraph,
						url: overrides?.openGraph?.url ?? this.config.openGraph?.url ?? this.config.url,
						siteName: overrides?.openGraph?.siteName ?? this.config.openGraph?.siteName ?? this.config.name,
					}
				: undefined,
			twitter: merged.twitter ? { ...this.config.twitter, ...overrides?.twitter } : undefined,
			robots: merged.robots
				? {
						...this.config.robots,
						...overrides?.robots,
						googleBot:
							overrides?.robots?.googleBot || this.config.robots?.googleBot
								? { ...this.config.robots?.googleBot, ...overrides?.robots?.googleBot }
								: undefined,
					}
				: undefined,
		};

		return Object.fromEntries(Object.entries(metadata).filter(([_, v]) => v !== undefined)) as Metadata;
	}

	generatePageMetadata(overrides?: Partial<SEOConfig>): Metadata {
		return this.configToMetadata(overrides);
	}
}
