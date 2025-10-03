export const SEO_CONFIG_DIR = 'lib';
export const SEO_CONFIG_FILENAME = 'seo.ts';
export const SEO_DATA_FILENAME = 'seo-data.json';
export const SEO_COMPONENT_FILENAME = 'seo.tsx';

export const TEMPLATES = {
	config: `import type { GlobalWebsiteConfiguration } from "metanext";

export const seoConfig: GlobalWebsiteConfiguration = {
  name: "{{siteName}}",
  url: "{{baseUrl}}",
  title: {
    default: "{{siteName}}",
    template: "",
  },
  description: "{{siteDescription}}",
  keywords: [],
  creator: "",
  publisher: "",
	authors: [
		{
			name: "",
			url: "",
		},
	],
	manifest: "",
};`,
	component: `"use client";
  
  import { useEffect } from "react";
  import Head from "next/head";
  
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
    const config = getSEO(name);
    
    if (!config) {
      console.warn(\`[MetaNext] Page "\${name}" not found in SEO config\`);
      return null;
    }
  
    const finalConfig = { ...config, ...overrides };
  
    return (
      <Head>
        <title>{finalConfig.title}</title>
        <meta name="description" content={finalConfig.description} />
        
        {finalConfig.keywords && (
          <meta name="keywords" content={finalConfig.keywords.join(", ")} />
        )}
        
        {/* Open Graph */}
        <meta property="og:title" content={finalConfig.title} />
        <meta property="og:description" content={finalConfig.description} />
        <meta property="og:type" content="website" />
        {finalConfig.image && <meta property="og:image" content={finalConfig.image} />}
        {finalConfig.url && <meta property="og:url" content={finalConfig.url} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={finalConfig.title} />
        <meta name="twitter:description" content={finalConfig.description} />
        {finalConfig.image && <meta name="twitter:image" content={finalConfig.image} />}
        
        {/* Canonical */}
        {finalConfig.url && <link rel="canonical" href={finalConfig.url} />}
        
        {/* JSON-LD */}
        {finalConfig.jsonld && finalConfig.jsonld.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </Head>
    );
  }
  
  export function getSEO(name: string) {
    // This will be replaced by the actual implementation
    return null;
  }
  `,
};
