# 🧠 Seox  
### Simplifiez la gestion du SEO dans vos applications **Next.js (App Router)**

Seox est un **outil open source** qui vise à **centraliser et automatiser** la gestion du **SEO** (balises meta, Open Graph, JSON-LD…) dans les projets **Next.js** utilisant l'**App Router**.  
Il combine une **configuration TypeScript typée**, une **injection automatique** des métadonnées, et une **CLI intuitive** pour guider le développeur.

---

## 🎯 Objectif du projet

Aujourd’hui, dans un projet Next.js, chaque page répète manuellement ses balises `<Head>`, ses métadonnées, et son JSON-LD.  
👉 Cela crée de la **duplication**, des **incohérences**, et complique la maintenance.

Seox propose :
- Une **configuration TypeScript typée** (`lib/seo.ts`)
- Une **injection automatique** des métadonnées dans vos fichiers Next.js
- Une **API simple** : `seoConfig.configToMetadata()`
- Une **CLI complète** pour initialiser et configurer votre projet

---

## 🚀 Vision globale

### 🔹 Pattern de développement

Seox suit une logique moderne **DX-first** (Developer Experience) :

```bash
# 1. Installation du package
bun i seox

# 2. Initialisation de la configuration
bunx seox init

# 3. Configuration et injection automatique
bunx seox configure

# 4. Vérification de la configuration
bunx seox doctor
```

Ce pattern permet :
- De **centraliser** toutes les données SEO dans un seul fichier TypeScript
- De **typer** fortement les champs pour éviter les erreurs
- D'**injecter automatiquement** les métadonnées dans vos fichiers Next.js
- De **valider** votre configuration avec des outils de diagnostic

---

## ⚙️ Fonctionnement

### 1. Fichier de configuration unique : `lib/seo.ts`
Créé via la commande :
```bash
bunx seox init
```

Exemple (src/lib/seo.ts):
```ts
import { Seox } from "seox/next";

export const seoConfig = new Seox({
  name: "Mon Super Site",
  url: "https://monsite.com",
  title: {
    default: "Mon Super Site",
    template: "%s | Mon Super Site",
  },
  description: "Bienvenue sur mon site moderne",
  keywords: ["nextjs", "seo", "typescript"],
  creator: "Votre Nom",
  publisher: "Votre Entreprise",
  authors: [
    {
      name: "Votre Nom",
      url: "https://monsite.com/about",
    },
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://monsite.com",
    siteName: "Mon Super Site",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@votrecompte",
  },
});
```

🧠 Le typage TypeScript vous guide dans la complétion des champs.  
La configuration est **centralisée** et **réutilisable**.

---

### 2. Configuration & injection automatique
Une fois le fichier complété :

```bash
bunx seox configure
```

Cette commande :
- **Scanne** automatiquement vos fichiers Next.js (`app/` et `pages/`)
- **Injecte** les métadonnées dans vos `layout.tsx` et `page.tsx`
- **Gère** les conflits avec les métadonnées existantes
- **Valide** la cohérence SEO de votre configuration

---

### 3. Utilisation dans vos pages

Après l'exécution de `bunx seox configure`, vos fichiers sont automatiquement mis à jour :

```tsx
// app/layout.tsx (généré automatiquement)
import { seoConfig } from "@/lib/seo";

export const metadata = seoConfig.configToMetadata();
```

#### Personnalisation par page

```tsx
// app/page.tsx
import { seoConfig } from "@/lib/seo";

export const metadata = seoConfig.configToMetadata({
  title: "Accueil | Mon Super Site",
  description: "Bienvenue sur la page d'accueil",
  openGraph: {
    title: "Accueil - Mon Super Site",
    description: "Découvrez notre site moderne",
  },
});
```

💡 **Pourquoi cette approche ?**
- ✅ **Compatible** avec tous les environnements (AWS Amplify, Vercel, etc.)
- ✅ **Prévisible** et explicite
- ✅ **Performant** (injection directe dans les métadonnées Next.js)
- ✅ **Type-safe** avec TypeScript
- ✅ **Automatique** (pas besoin de gérer manuellement chaque page)

💡 La méthode `configToMetadata()` :
- Génère automatiquement :
  - `<title>` et templates de titre
  - `<meta name="description">`
  - Balises **OpenGraph**
  - Balises **Twitter Card**
  - Métadonnées **robots**
  - **JSON-LD** (si configuré)
- Rendu **serveur-side** (SSR/SSG) pour des performances optimales

---

### 4. Surcharge locale

Besoin de modifier certaines valeurs à la volée ?

```tsx
// app/page.tsx
import { seoConfig } from "@/lib/seo";

export const metadata = seoConfig.configToMetadata({
  title: "Accueil | Promo 2025",
  description: "Nouvelle offre disponible !",
  openGraph: {
    title: "Promo 2025 - Mon Super Site",
    description: "Découvrez nos offres exceptionnelles",
  },
});
```

Seox fusionne ces champs avec la configuration globale.

---

## 🧰 CLI intégrée

Seox propose une CLI intuitive :

| Commande | Description |
|----------|--------------|
| `seox init` | Crée le fichier `lib/seo.ts` avec configuration interactive |
| `seox configure` | Scanne et injecte les métadonnées dans vos fichiers Next.js |
| `seox doctor` | Vérifie la validité SEO de votre configuration |

### Options avancées

```bash
# Forcer l'écrasement des métadonnées existantes
bunx seox configure --force

# Validation uniquement (sans génération)
bunx seox configure --validate
```

---

## 🧠 Architecture technique

```
[ lib/seo.ts ]  ← configuration TypeScript typée
       ↓ (configure)
[ Scan des fichiers Next.js ] ← détection automatique
       ↓
[ Injection des métadonnées ] ← dans layout.tsx/page.tsx
       ↓
[ Rendu côté serveur ] ← App Router Next.js
```

✅ **Configuration centralisée** en TypeScript  
✅ **Injection automatique** dans vos fichiers  
✅ **Type-safe** avec autocomplétion  
✅ **SEO optimisé** côté serveur  
✅ **Maintenance simplifiée**

---

## 📘 API & Helpers

### `Seox` (classe principale)
Configuration centralisée de votre SEO avec typage TypeScript complet.

### `configToMetadata(overrides?)`
Méthode qui génère les métadonnées Next.js à partir de votre configuration.  
Accepte des surcharges optionnelles pour personnaliser par page.

### `seoConfig.configToMetadata()`
Utilisation directe dans vos fichiers Next.js pour générer les métadonnées.

---

## 🧭 Roadmap

| Fonctionnalité | Statut |
|----------------|--------|
| Configuration TypeScript typée | ✅ |
| CLI `init` / `configure` | ✅ |
| Injection automatique des métadonnées | ✅ |
| Support OpenGraph et Twitter Cards | ✅ |
| Surcharge locale par page | ✅ |
| Validation SEO avec `doctor` | ✅ |
| CLI `doctor` | 🔜 |
| Support multilingue (`hreflang`) | 🔜 |
| Génération automatique d'images OG | 🔜 |
| Templates prédéfinis (`--template blog`) | 🔜 |
| Support JSON-LD avancé | 🔜 |

---

## 📜 Licence

MIT © 2025 — Conçu pour les développeurs Next.js
