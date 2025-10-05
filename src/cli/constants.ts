export const TEMPLATES = {
	config: `import { Seox } from "seox/next";

export const seoConfig = new Seox({
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
