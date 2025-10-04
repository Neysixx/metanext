export const SEO_CONFIG_DIR = 'lib';
export const SEO_CONFIG_FILENAME = 'seo.ts';
export const SEO_DATA_FILENAME = 'seo-data.json';
export const SEO_COMPONENT_FILENAME = 'seo.tsx';

export const TEMPLATES = {
	config: `import type { SEOConfig } from "metanext";

export const seoConfig: SEOConfig = {
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
};`
};
