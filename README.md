# 🧠 MetaNext

> **Simplified SEO management for Next.js App Router**

MetaNext is an **open source tool** that centralizes and automates **SEO management** (meta tags, Open Graph, JSON-LD...) in **Next.js** projects using the **App Router**.  
It combines **TypeScript-typed configuration**, **automatic metadata injection**, and an **intuitive CLI** to guide developers.

[![npm version](https://img.shields.io/npm/v/metanext.svg)](https://www.npmjs.com/package/metanext)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## 🎯 Project Goal

In a typical Next.js project, each page manually repeats its `<Head>` tags, metadata, and JSON-LD.  
👉 This creates **duplication**, **inconsistencies**, and complicates maintenance.

MetaNext provides:
- **TypeScript-typed configuration** (`lib/seo.ts`)
- **Automatic metadata injection** into your Next.js files
- **Simple API**: `seoConfig.configToMetadata()`
- **Complete CLI** to initialize and configure your project

---

## 🚀 Quick Start

### 1. Installation

```bash
# Using Bun (recommended)
bun i metanext

# Using npm
npm i metanext

# Using pnpm
pnpm i metanext
```

### 2. Initialize Configuration

```bash
# Using Bun (recommended)
bunx metanext init

# Using npx
npx metanext init
```

This creates a `lib/seo.ts` file with interactive setup.

### 3. Configure Your Project

```bash
# Scan and inject metadata into your Next.js files
bunx metanext configure
```

### 4. Verify Configuration (In progress)

```bash
# Check your SEO configuration
bunx metanext doctor
```

---

## ⚙️ How It Works

### 1. Configuration File: `lib/seo.ts`

Created via the `init` command:

```ts
import { MetaNext } from "metanext/next";

export const seoConfig = new MetaNext({
  name: "My Awesome Site",
  url: "https://mysite.com",
  title: {
    default: "My Awesome Site",
    template: "%s | My Awesome Site",
  },
  description: "Welcome to my modern Next.js site",
  keywords: ["nextjs", "seo", "typescript"],
  creator: "Your Name",
  publisher: "Your Company",
  authors: [
    {
      name: "Your Name",
      url: "https://mysite.com/about",
    },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mysite.com",
    siteName: "My Awesome Site",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@yourhandle",
  },
});
```

🧠 TypeScript typing guides you through field completion.  
Configuration is **centralized** and **reusable**.

### 2. Automatic Configuration & Injection

Once the file is completed:

```bash
bunx metanext configure
```

This command:
- **Scans** your Next.js files (`app/` and `pages/`)
- **Injects** metadata into your `layout.tsx` and `page.tsx`
- **Handles** conflicts with existing metadata
- **Validates** SEO consistency of your configuration

### 3. Usage in Your Pages

After running `bunx metanext configure`, your files are automatically updated:

```tsx
// app/layout.tsx (automatically generated)
import { seoConfig } from "@/lib/seo";

export const metadata = seoConfig.configToMetadata();
```

#### Page-specific Customization

```tsx
// app/page.tsx
import { seoConfig } from "@/lib/seo";

export const metadata = seoConfig.configToMetadata({
  title: "Home | My Awesome Site",
  description: "Welcome to our homepage",
  openGraph: {
    title: "Home - My Awesome Site",
    description: "Discover our modern website",
  },
});
```

💡 **Why this approach?**
- ✅ **Compatible** with all environments (AWS Amplify, Vercel, etc.)
- ✅ **Predictable** and explicit
- ✅ **Performant** (direct injection into Next.js metadata)
- ✅ **Type-safe** with TypeScript
- ✅ **Automatic** (no need to manually manage each page)

💡 The `configToMetadata()` method:
- Automatically generates:
  - `<title>` and title templates
  - `<meta name="description">`
  - **OpenGraph** tags
  - **Twitter Card** tags
  - **robots** metadata
  - **JSON-LD** (if configured)
- Server-side rendering (SSR/SSG) for optimal performance

### 4. Local Overrides

Need to modify certain values on the fly?

```tsx
// app/page.tsx
import { seoConfig } from "@/lib/seo";

export const metadata = seoConfig.configToMetadata({
  title: "Home | Promo 2025",
  description: "New offer available!",
  openGraph: {
    title: "Promo 2025 - My Awesome Site",
    description: "Discover our exceptional offers",
  },
});
```

MetaNext merges these fields with the global configuration.

---

## 🧰 Built-in CLI

MetaNext provides an intuitive CLI:

| Command | Description |
|---------|-------------|
| `metanext init` | Creates `lib/seo.ts` with interactive setup |
| `metanext configure` | Scans and injects metadata into your Next.js files |
| `metanext doctor` (soon)  | Validates your SEO configuration | 

### Advanced Options

```bash
# Force overwrite existing metadata
bunx metanext configure --force

# Validation only (no generation)
bunx metanext configure --validate
```

---

## 🧠 Technical Architecture

```
[ lib/seo.ts ]  ← TypeScript-typed configuration
       ↓ (configure)
[ Scan Next.js files ] ← automatic detection
       ↓
[ Inject metadata ] ← into layout.tsx/page.tsx
       ↓
[ Server-side rendering ] ← Next.js App Router
```

✅ **Centralized configuration** in TypeScript  
✅ **Automatic injection** into your files  
✅ **Type-safe** with autocompletion  
✅ **Optimized SEO** server-side  
✅ **Simplified maintenance**

---

## 📘 API & Helpers

### `MetaNext` (main class)
Centralized SEO configuration with complete TypeScript typing.

### `configToMetadata(overrides?)`
Method that generates Next.js metadata from your configuration.  
Accepts optional overrides to customize per page.

### `seoConfig.configToMetadata()`
Direct usage in your Next.js files to generate metadata.

---

## 🧭 Roadmap

| Feature | Status |
|---------|--------|
| TypeScript-typed configuration | ✅ |
| CLI `init` / `configure` | ✅ |
| Automatic metadata injection | ✅ |
| OpenGraph and Twitter Cards support | ✅ |
| Local overrides per page | ✅ |
| SEO validation with `doctor` | ✅ |
| CLI `doctor` | 🔜 |
| Multilingual support (`hreflang`) | 🔜 |
| Automatic OG image generation | 🔜 |
| Predefined templates (`--template blog`) | 🔜 |
| Advanced JSON-LD support | 🔜 |

---

## 📦 Installation

### Requirements

- **Node.js** >= 18.0.0
- **Next.js** >= 14.0.0
- **React** >= 18.0.0
- **TypeScript** >= 5.9.3

### Package Managers

```bash
# Bun (recommended)
bun add metanext

# npm
npm install metanext

# pnpm
pnpm add metanext

# yarn
yarn add metanext
```

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Clone the repository
git clone https://github.com/neysixx/metanext.git
cd metanext

# Install dependencies
bun install

# Build the project
bun run build
```

---

## 📜 License

MIT © 2025 — Designed for modern Next.js developers 🧑‍💻

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Powered by [TypeScript](https://www.typescriptlang.org/)
- CLI built with [Commander.js](https://github.com/tj/commander.js)
- Styling with [Chalk](https://github.com/chalk/chalk)

---

## 📞 Support

- 📖 [Documentation](https://github.com/neysixx/metanext#readme)
- 🐛 [Report Issues](https://github.com/neysixx/metanext/issues)
- 💬 [Discussions](https://github.com/neysixx/metanext/discussions)
- 📧 [Email](mailto:kylliansenrens3004@gmail.com)

---

<div align="center">

**Made with ❤️ for the Next.js community**

[⭐ Star us on GitHub](https://github.com/neysixx/metanext) • [🐦 Follow on X](https://x.com/ks_nsx) • [📧 Contact](mailto:kylliansenrens3004@gmail.com)

</div>