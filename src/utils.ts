import fs from 'fs-extra';
import type { Metadata } from 'next';
import path from 'path';
import { SEO_COMPONENT_FILENAME, SEO_CONFIG_DIR } from './constants';
import type { GlobalWebsiteConfiguration } from './types';

export function validateConfig(config: any): string[] {
	const errors: string[] = [];

	if (!config.site) {
		errors.push('Property "site" missing');
	} else {
		if (!config.site.name) errors.push('site.name is required');
		if (!config.site.baseUrl) errors.push('site.baseUrl is required');
		if (config.site.baseUrl?.endsWith('/')) {
			errors.push('site.baseUrl must not end with "/"');
		}
	}

	return errors;
}

export function getPath(filename: string): string {
	// Check if we are in a src based codebase
	if (fs.existsSync(process.cwd() + '/src')) {
		return path.join(process.cwd(), 'src', SEO_CONFIG_DIR, filename);
	}
	return path.join(process.cwd(), SEO_CONFIG_DIR, filename);
}

export async function generateSEOComponent(config: any) {
	const componentCode = `"use client";
  
  import seoData from "./seo-data.json";
  
  interface SEOProps {
    name: string;
    overrides?: Partial<{
      title: string;
      description: string;
      image: string;
      url: string;
    }>;
  }
  
  export function SEO({ name, overrides = {} }: SEOProps) {
    const pageConfig = seoData.pages[name];
    
    if (!pageConfig) {
      console.warn(\`[MetaNext] Page "\${name}" not found in SEO config\`);
      return null;
    }
  
    const config = { ...pageConfig, ...overrides };
    const siteConfig = seoData.site;
  
    return (
      <>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
        
        {config.keywords && (
          <meta name="keywords" content={config.keywords.join(", ")} />
        )}
        
        {/* Open Graph */}
        <meta property="og:title" content={config.title} />
        <meta property="og:description" content={config.description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={config.image || siteConfig.defaultImage} />
        <meta property="og:url" content={\`\${siteConfig.baseUrl}\${config.path || ""}\`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={config.title} />
        <meta name="twitter:description" content={config.description} />
        <meta name="twitter:image" content={config.image || siteConfig.defaultImage} />
        
        {/* Canonical */}
        <link rel="canonical" href={\`\${siteConfig.baseUrl}\${config.path || ""}\`} />
        
        {/* JSON-LD */}
        {config.jsonld && config.jsonld.map((schema: any, i: number) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </>
    );
  }
  
  export function getSEO(name: string) {
    return seoData.pages[name] || null;
  }
  `;

	await fs.writeFile(getPath(SEO_COMPONENT_FILENAME), componentCode, 'utf8');
}

export function runDoctorChecks(config: any) {
	const issues = { errors: [] as string[], warnings: [] as string[], suggestions: [] as string[] };

	// Check the titles
	Object.entries(config.pages || {}).forEach(([name, page]: [string, any]) => {
		if (!page.title) {
			(issues.errors as string[]).push(`Page "${name}" : title missing`);
		} else if (page.title.length > 60) {
			(issues.warnings as string[]).push(`Page "${name}" : title too long (${page.title.length} > 60)`);
		}
		if (!page.description) {
			(issues.errors as string[]).push(`Page "${name}" : description missing`);
		} else if (page.description.length > 160) {
			(issues.warnings as string[]).push(`Page "${name}" : description too long (${page.description.length} > 160)`);
		}

		if (!page.jsonld || page.jsonld.length === 0) {
			(issues.suggestions as string[]).push(`Page "${name}" : add JSON-LD to improve indexing`);
		}
	});

	return issues;
}

/**
 * Converts GlobalWebsiteConfiguration to Next.js Metadata format
 * Can be used for specific pages or global metadata
 */
export function configToMetadata(config: GlobalWebsiteConfiguration, pagePath?: string): Metadata {
	// Get page-specific config if path is provided
	const pageConfig = pagePath && config.pages?.[pagePath] ? { ...config, ...config.pages[pagePath] } : config;

	const metadata: Metadata = {};

	// Title
	if (pageConfig.title) {
		if (typeof pageConfig.title === 'string') {
			metadata.title = pageConfig.title;
		} else if (pageConfig.title.template) {
			// If template is provided, use the template structure
			metadata.title = {
				default: pageConfig.title.default || config.name,
				template: pageConfig.title.template,
			};
		} else if (pageConfig.title.default) {
			// If only default is provided, use it as a string
			metadata.title = pageConfig.title.default;
		} else {
			metadata.title = config.name;
		}
	} else {
		metadata.title = config.name;
	}

	// Description
	if (pageConfig.description) {
		metadata.description = pageConfig.description;
	}

	// Keywords
	if (pageConfig.keywords && pageConfig.keywords.length > 0) {
		metadata.keywords = pageConfig.keywords;
	}

	// Creator
	if (pageConfig.creator) {
		metadata.creator = pageConfig.creator;
	}

	// Publisher
	if (pageConfig.publisher) {
		metadata.publisher = pageConfig.publisher;
	}

	// Authors
	if (pageConfig.authors && pageConfig.authors.length > 0) {
		metadata.authors = pageConfig.authors.map((author) => ({
			name: author.name,
			url: author.url,
		}));
	}

	// Manifest
	if (pageConfig.manifest) {
		metadata.manifest = pageConfig.manifest;
	}

	// Icons
	if (pageConfig.icons) {
		metadata.icons = {
			icon: pageConfig.icons.icon,
			apple: pageConfig.icons.apple,
			shortcut: pageConfig.icons.shortcut,
		};
	}

	// Format Detection
	if (pageConfig.formatDetection) {
		metadata.formatDetection = {
			email: pageConfig.formatDetection.email,
			address: pageConfig.formatDetection.address,
			telephone: pageConfig.formatDetection.telephone,
		};
	}

	// Open Graph
	if (pageConfig.openGraph) {
		metadata.openGraph = {
			type: pageConfig.openGraph.type,
			locale: pageConfig.openGraph.locale,
			url: pageConfig.openGraph.url || config.url,
			title: pageConfig.openGraph.title,
			description: pageConfig.openGraph.description,
			siteName: pageConfig.openGraph.siteName || config.name,
			images: pageConfig.openGraph.images,
		};
	}

	// Twitter
	if (pageConfig.twitter) {
		metadata.twitter = {
			card: pageConfig.twitter.card,
			title: pageConfig.twitter.title,
			description: pageConfig.twitter.description,
			images: pageConfig.twitter.images,
			creator: pageConfig.twitter.creator,
		};
	}

	// Robots
	if (pageConfig.robots) {
		metadata.robots = {
			index: pageConfig.robots.index,
			follow: pageConfig.robots.follow,
			googleBot: pageConfig.robots.googleBot
				? {
						index: pageConfig.robots.googleBot.index,
						follow: pageConfig.robots.googleBot.follow,
						'max-video-preview': pageConfig.robots.googleBot['max-video-preview'],
						'max-image-preview': pageConfig.robots.googleBot['max-image-preview'],
						'max-snippet': pageConfig.robots.googleBot['max-snippet'],
					}
				: undefined,
		};
	}

	return metadata;
}

/**
 * Generates a metadata object for a specific page
 * @param config - The global website configuration
 * @param pagePath - The page path/slug (e.g., "/about", "/blog/post-1")
 */
export function generatePageMetadata(config: GlobalWebsiteConfiguration, pagePath: string): Metadata {
	return configToMetadata(config, pagePath);
}
