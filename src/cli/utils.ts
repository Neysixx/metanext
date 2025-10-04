import fs from 'fs-extra';
import path from 'path';
import { SEO_CONFIG_DIR, SEO_COMPONENT_FILENAME } from '../constants';

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