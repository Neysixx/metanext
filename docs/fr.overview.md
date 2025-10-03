# 🧠 MetaNext  
### Simplifiez la gestion du SEO dans vos applications **Next.js (App Router)**

MetaNext est un **outil open source** qui vise à **centraliser et automatiser** la gestion du **SEO** (balises meta, Open Graph, JSON-LD…) dans les projets **Next.js** utilisant l’**App Router**.  
Il combine une **configuration unique**, une **injection côté serveur** pour les performances, et une **CLI intuitive** pour guider le développeur.

---

## 🎯 Objectif du projet

Aujourd’hui, dans un projet Next.js, chaque page répète manuellement ses balises `<Head>`, ses métadonnées, et son JSON-LD.  
👉 Cela crée de la **duplication**, des **incohérences**, et complique la maintenance.

MetaNext propose :
- Une **configuration unique** (`lib/seo.ts`)
- Une **génération automatique** des balises SEO
- Une **injection côté serveur** pour une **meilleure performance et indexation**
- Une **API déclarative simple** : `<SEO name="home" />`

---

## 🚀 Vision globale

### 🔹 Pattern de développement

MetaNext suit une logique moderne **DX-first** (Developer Experience) :

```bash
# 1. Installation du package
bun i metanext

# 2. Initialisation de la configuration
bunx metanext init

# 3. Configuration et génération des fichiers
bunx metanext configure

# 4. Utilisation dans vos pages
<SEO name="home" />
```

Ce pattern permet :
- De **centraliser** toutes les données SEO dans un seul fichier
- De **typer** fortement les champs pour éviter les erreurs
- D’**inférer** automatiquement les balises selon la page
- De **rendre côté serveur** pour un SEO optimal

---

## ⚙️ Fonctionnement

### 1. Fichier de configuration unique : `lib/seo.ts`
Créé via la commande :
```bash
bunx metanext init
```

Exemple :
```ts
import { defineSEOConfig } from "metanext";

export default defineSEOConfig({
  site: {
    name: "Mon Super Site",
    baseUrl: "https://monsite.com",
    defaultImage: "/og.png",
  },
  pages: {
    home: {
      title: "Accueil - Mon Super Site",
      description: "Bienvenue sur mon site",
      jsonld: [
        {
          "@type": "WebSite",
          name: "Mon Super Site",
          url: "https://monsite.com",
        },
      ],
    },
  },
});
```

🧠 Le typage TypeScript vous guide dans la complétion des champs.  
Les pages non configurées utilisent un **fallback global**.

---

### 2. Configuration & génération
Une fois le fichier complété :

```bash
bunx metanext configure
```

Cette commande :
- Compile la config (`lib/seo.ts` → `lib/seo-data.json`)
- Génère les **helpers** (`getSEO()`, composant `<SEO />`)
- Ajoute automatiquement les balises côté serveur
- Valide la cohérence SEO (titre, description, OG image…)

---

### 3. Utilisation dans vos pages

```tsx
// app/page.tsx
import { SEO } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <SEO name="home" />
      <main>
        <h1>Bienvenue !</h1>
      </main>
    </>
  );
}
```

💡 Le composant `<SEO />` :
- Injecte automatiquement :
  - `<title>`
  - `<meta name="description">`
  - Balises **OpenGraph**
  - Balises **Twitter Card**
  - Balises **canonical**
  - Script **JSON-LD**
- Rendu **serveur-side** (SSR/SSG) pour des performances optimales

---

### 4. Surcharge locale

Besoin de modifier certaines valeurs à la volée ?

```tsx
<SEO
  name="home"
  overrides={{
    title: "Accueil | Promo 2025",
    description: "Nouvelle offre disponible !",
  }}
/>
```

MetaNext fusionne ces champs avec la configuration globale.

---

## 🧰 CLI intégrée

MetaNext propose une CLI intuitive :

| Commande | Description |
|----------|--------------|
| `metanext init` | Crée le fichier `lib/seo.ts` |
| `metanext configure` | Compile la config et génère les fichiers |
| `metanext doctor` | Vérifie la validité SEO de la configuration |

---

## 🧠 Architecture technique

```
[ lib/seo.ts ]  ← fichier source typé
       ↓ (configure)
[ lib/seo-data.json ] ← config compilée (runtime)
       ↓
[ Composant SEO + helper getSEO() ]
       ↓
[ Injection côté serveur dans App Router ]
```

✅ Lecture rapide  
✅ Aucun parsing TypeScript au runtime  
✅ SEO rendu côté serveur  
✅ Maintenance centralisée

---

## 📘 API & Helpers

### `<SEO name="page" />`
Composant à insérer dans les pages Next.js.  
Injecte toutes les balises automatiquement selon la config.

### `getSEO(name: string)`
Helper qui retourne la config SEO d’une page, utilisable dans vos composants serveur.

---

## 🧭 Roadmap

| Fonctionnalité | Statut |
|----------------|--------|
| Config TS typée | ✅ |
| CLI `init` / `configure` / `doctor` | ✅ |
| JSON-LD support | ✅ |
| Surcharge locale | ✅ |
| Support multilingue (`hreflang`) | 🔜 |
| Génération OG image | 🔜 |
| Validation SEO poussée | 🔜 |
| Templates (`--template blog`) | 🔜 |

---

## 📜 Licence

MIT © 2025 — Conçu pour les développeurs Next.js modernes 🧑‍💻
