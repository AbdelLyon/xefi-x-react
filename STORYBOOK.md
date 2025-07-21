# Documentation Storybook pour @xefi/x-react

Ce projet inclut maintenant une documentation interactive complète avec **Storybook** ! 🎉

## 🚀 Démarrer Storybook

```bash
# Démarrer en mode développement
pnpm storybook

# Construire pour la production
pnpm build-storybook
```

Storybook sera disponible sur : **http://localhost:6006**

## 📚 Contenu de la Documentation

### 🏠 Introduction
- Vue d'ensemble de la bibliothèque
- Guide d'installation rapide
- Exemples de base

### 🧩 Composants
Chaque composant dispose de stories complètes incluant :

#### **Button** (`/button`)
- Variantes : solid, bordered, light, flat, faded, shadow, ghost
- Couleurs : primary, secondary, success, warning, danger, default
- États : normal, loading, disabled
- Avec icônes et personnalisations

#### **Card** (`/card`)
- Différentes ombres et radius
- Avec header/footer
- États interactifs (hoverable, pressable)
- Effets de flou et exemples de produits

#### **Modal** (`/modal`)
- Tailles variées (xs à 5xl)
- Styles de backdrop (transparent, opaque, blur)
- Comportements de scroll
- Exemples de confirmation et formulaires

#### **Hooks** (`/hooks`)
Démonstrations interactives de :
- `useToggle` - Gestion d'état booléen
- `useCounter` - Compteur avec actions
- `useDebouncedValue` - Valeurs debouncées
- `useLocalStorage` - Persistance locale
- `useClipboard` - Copie vers le presse-papiers
- `useDisclosure` - États d'ouverture/fermeture

## 🛠️ Configuration Technique

### Structure des fichiers
```
.storybook/
├── main.ts          # Configuration principale
└── preview.tsx      # Configuration globale des stories

src/
├── stories/          # Stories de documentation
│   └── Introduction.stories.tsx
├── button/
│   └── Button.stories.tsx
├── card/
│   └── Card.stories.tsx
├── modal/
│   └── Modal.stories.tsx
└── hooks/
    └── hooks.stories.tsx
```

### Addons Configurés
- **@storybook/addon-docs** - Documentation automatique
- **@storybook/addon-onboarding** - Guide d'introduction

### Provider Setup
Chaque story est automatiquement wrappée avec :
- `ThemeProvider` (next-themes) pour le support des thèmes
- `HeroUIProvider` pour les composants Hero UI
- Styles Tailwind CSS inclus

## 📖 Utilisation des Stories

### Contrôles Interactifs
Chaque composant dispose de contrôles permettant de :
- Modifier les props en temps réel
- Tester différents états
- Copier le code généré

### Documentation Auto-générée
- Props TypeScript documentées automatiquement
- Exemples de code pour chaque variant
- Descriptions des cas d'usage

### Tests Visuels
- Snapshots des différents états
- Tests de régression visuelle
- Validation des variantes

## 🎨 Thèmes et Styles

La documentation supporte :
- **Mode sombre/clair** - Basculement automatique
- **Thèmes Hero UI** - Configuration complète
- **Variables CSS** - Personnalisation avancée
- **Responsive** - Adaptation mobile/desktop

## 📱 Navigation

### Structure organisée
```
📁 Introduction
📁 Components/
  ├── Button
  ├── Card  
  ├── Modal
  └── ...
📁 Hooks/
  └── Overview
```

### Recherche
- Recherche par nom de composant
- Filtres par catégorie
- Navigation par raccourcis clavier

## 🚀 Déploiement

Pour déployer la documentation :

```bash
# Construire Storybook
pnpm build-storybook

# Les fichiers sont générés dans /storybook-static
# Servir avec n'importe quel serveur statique
npx serve storybook-static
```

## 🤝 Contribution

### Ajouter une nouvelle story

1. Créer le fichier `Component.stories.tsx` :
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  // ... configuration
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // props par défaut
  },
};
```

2. La story apparaîtra automatiquement dans Storybook

### Bonnes pratiques
- **Titre descriptif** - Catégorie claire
- **Args types** - Documentation des props
- **Variants multiples** - Couvrir tous les cas
- **Descriptions** - Expliquer les cas d'usage
- **Tags autodocs** - Génération automatique

---

**La documentation Storybook est maintenant prête ! Explorez tous les composants et leurs variations. 🎉**