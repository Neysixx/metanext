export const TEMPLATES = {
	config: `import { MetaNext } from "metanext/next";

export const seoConfig = new MetaNext({
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
})`,
};
