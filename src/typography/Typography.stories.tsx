import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconQuote,
  IconBulb,
  IconAlertTriangle,
  IconInfoCircle,
  IconCheckCircle,
  IconX,
  IconStar,
  IconHeart,
  IconCode,
  IconLink,
} from '@tabler/icons-react';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Typography** - Composant de typographie flexible avec variantes de taille, poids et alignement. Support de truncature et couleurs personnalisées.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Contenu textuel',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'strong', 'em'],
      description: 'Élément HTML à rendre',
    },
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'base', 'small', 'caption', 'overline'],
      description: 'Variante de style typographique',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Poids de la police',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Alignement du texte',
    },
    color: {
      control: 'text',
      description: 'Couleur Tailwind (ex: "primary-500", "gray-600")',
    },
    truncate: {
      control: 'boolean',
      description: 'Tronquer le texte avec "..."',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  args: {
    children: 'Texte par défaut',
    variant: 'base',
  },
};

// Hiérarchie des titres
export const Headings: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="h1" as="h1">
        Titre Principal (H1)
      </Typography>
      <Typography variant="h2" as="h2">
        Titre Secondaire (H2)
      </Typography>
      <Typography variant="h3" as="h3">
        Titre de Section (H3)
      </Typography>
      <Typography variant="h4" as="h4">
        Sous-titre Important (H4)
      </Typography>
      <Typography variant="h5" as="h5">
        Sous-titre Moyen (H5)
      </Typography>
      <Typography variant="h6" as="h6">
        Sous-titre Petit (H6)
      </Typography>
    </div>
  ),
};

// Variantes de texte
export const TextVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography variant="base">
        Texte de base - Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>
      <Typography variant="small">
        Texte petit - Ut enim ad minim veniam, quis nostrud exercitation ullamco 
        laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
      <Typography variant="caption">
        Texte caption - Duis aute irure dolor in reprehenderit in voluptate velit 
        esse cillum dolore eu fugiat nulla pariatur.
      </Typography>
      <Typography variant="overline">
        Texte Overline - Excepteur sint occaecat cupidatat non proident
      </Typography>
    </div>
  ),
};

// Poids de police
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Typography weight="light">
        Police légère - Ce texte utilise un poids de police light
      </Typography>
      <Typography weight="normal">
        Police normale - Ce texte utilise un poids de police normal
      </Typography>
      <Typography weight="medium">
        Police medium - Ce texte utilise un poids de police medium
      </Typography>
      <Typography weight="semibold">
        Police semi-bold - Ce texte utilise un poids de police semibold
      </Typography>
      <Typography weight="bold">
        Police bold - Ce texte utilise un poids de police bold
      </Typography>
    </div>
  ),
};

// Alignements
export const TextAlignments: Story = {
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Typography variant="h6" className="mb-2">Alignement à gauche (défaut)</Typography>
        <Typography align="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
        </Typography>
      </div>
      
      <div>
        <Typography variant="h6" className="mb-2">Alignement centré</Typography>
        <Typography align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </div>
      
      <div>
        <Typography variant="h6" className="mb-2">Alignement à droite</Typography>
        <Typography align="right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </div>
      
      <div>
        <Typography variant="h6" className="mb-2">Alignement justifié</Typography>
        <Typography align="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.
        </Typography>
      </div>
    </div>
  ),
};

// Couleurs
export const Colors: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Typography color="primary-600">
        Texte en couleur primaire
      </Typography>
      <Typography color="secondary-600">
        Texte en couleur secondaire
      </Typography>
      <Typography color="success-600">
        Texte en couleur de succès
      </Typography>
      <Typography color="warning-600">
        Texte en couleur d'avertissement
      </Typography>
      <Typography color="danger-600">
        Texte en couleur de danger
      </Typography>
      <Typography color="gray-500">
        Texte en gris neutre
      </Typography>
      <Typography color="slate-600">
        Texte en gris ardoise
      </Typography>
    </div>
  ),
};

// Truncature
export const Truncation: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <Typography variant="h6" className="mb-2">Texte normal</Typography>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris.
        </Typography>
      </div>
      
      <div>
        <Typography variant="h6" className="mb-2">Texte tronqué</Typography>
        <Typography truncate>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
          quis nostrud exercitation ullamco laboris.
        </Typography>
      </div>
    </div>
  ),
};

// Éléments sémantiques
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Typography as="h2" variant="h2">
        Article Principal
      </Typography>
      
      <Typography as="p" variant="base">
        Ceci est un paragraphe normal avec du texte {' '}
        <Typography as="strong" variant="base" weight="bold">
          en gras
        </Typography>
        {' '} et du texte {' '}
        <Typography as="em" variant="base" className="italic">
          en italique
        </Typography>
        . Voici aussi un {' '}
        <Typography as="span" variant="base" color="primary-600" className="underline cursor-pointer">
          lien
        </Typography>
        .
      </Typography>
      
      <Typography as="blockquote" variant="base" className="border-l-4 border-primary-200 pl-4 italic">
        "Ceci est une citation importante qui illustre l'utilisation du composant Typography 
        pour différents éléments sémantiques."
      </Typography>
      
      <Typography as="code" variant="small" className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono">
        const exemple = "Code inline";
      </Typography>
    </div>
  ),
};

// Interface d'article
export const ArticleInterface: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* En-tête d'article */}
      <header className="space-y-4 text-center">
        <Typography variant="overline" color="primary-600">
          GUIDE TECHNIQUE
        </Typography>
        <Typography variant="h1" as="h1">
          Guide Complet du Composant Typography
        </Typography>
        <Typography variant="base" color="gray-600">
          Publié le 15 mars 2024 • 8 min de lecture
        </Typography>
      </header>

      {/* Contenu principal */}
      <article className="space-y-6">
        <Typography variant="h2" as="h2">
          Introduction
        </Typography>
        
        <Typography variant="base">
          Le composant Typography est un élément fondamental de notre système de design. 
          Il permet de créer une hiérarchie visuelle claire et d'assurer la cohérence 
          typographique à travers toute l'application.
        </Typography>

        {/* Encadré d'information */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <IconInfoCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <Typography variant="h6" weight="semibold" color="blue-800">
                Information importante
              </Typography>
              <Typography variant="small" color="blue-700">
                Ce composant hérite automatiquement des styles du thème dark/light mode.
              </Typography>
            </div>
          </div>
        </div>

        <Typography variant="h3" as="h3">
          Variantes Disponibles
        </Typography>
        
        <Typography variant="base">
          Le composant propose plusieurs variantes pour s'adapter à tous vos besoins :
        </Typography>

        {/* Liste avec typographie */}
        <ul className="space-y-2 ml-6">
          <li>
            <Typography variant="base">
              <Typography as="strong" weight="semibold">Titres (h1-h6)</Typography> : 
              Pour la hiérarchie des contenus
            </Typography>
          </li>
          <li>
            <Typography variant="base">
              <Typography as="strong" weight="semibold">Corps de texte</Typography> : 
              Pour le contenu principal
            </Typography>
          </li>
          <li>
            <Typography variant="base">
              <Typography as="strong" weight="semibold">Texte secondaire</Typography> : 
              Pour les métadonnées et descriptions
            </Typography>
          </li>
        </ul>

        {/* Citation */}
        <blockquote className="border-l-4 border-primary-200 pl-6 my-6">
          <Typography variant="base" className="italic" color="gray-700">
            "Une typographie soignée est la base d'une excellente expérience utilisateur. 
            Elle guide l'œil et facilite la compréhension du contenu."
          </Typography>
          <Typography variant="small" color="gray-500" className="mt-2">
            — Expert en UX Design
          </Typography>
        </blockquote>

        <Typography variant="h3" as="h3">
          Cas d'Usage Pratiques
        </Typography>

        {/* Grille d'exemples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Alerte de succès */}
          <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex gap-3">
              <IconCheckCircle size={20} className="text-green-600 flex-shrink-0" />
              <div>
                <Typography variant="h6" weight="semibold" color="green-800">
                  Succès
                </Typography>
                <Typography variant="small" color="green-700">
                  Opération terminée avec succès
                </Typography>
              </div>
            </div>
          </div>

          {/* Alerte d'avertissement */}
          <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex gap-3">
              <IconAlertTriangle size={20} className="text-yellow-600 flex-shrink-0" />
              <div>
                <Typography variant="h6" weight="semibold" color="yellow-800">
                  Attention
                </Typography>
                <Typography variant="small" color="yellow-700">
                  Action requise avant de continuer
                </Typography>
              </div>
            </div>
          </div>
        </div>

        {/* Section de code */}
        <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
          <Typography variant="small" color="gray-300" className="font-mono">
            <span className="text-blue-400">import</span> {`{ Typography }`} <span className="text-blue-400">from</span> <span className="text-green-400">'@xefi/x-react'</span><br/>
            <br/>
            <span className="text-purple-400">const</span> <span className="text-yellow-300">MyComponent</span> = () => {`{`}<br/>
            &nbsp;&nbsp;<span className="text-blue-400">return</span> (<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-red-400">Typography</span> <span className="text-green-400">variant</span>=<span className="text-yellow-300">"h1"</span>&gt;<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mon Titre<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-red-400">Typography</span>&gt;<br/>
            &nbsp;&nbsp;)<br/>
            {`}`}
          </Typography>
        </div>

        <Typography variant="h3" as="h3">
          Bonnes Pratiques
        </Typography>

        <div className="space-y-4">
          <div className="flex gap-3">
            <IconCheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <Typography variant="base">
              Utilisez une hiérarchie cohérente avec les variantes h1-h6
            </Typography>
          </div>
          
          <div className="flex gap-3">
            <IconCheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <Typography variant="base">
              Respectez les conventions sémantiques HTML
            </Typography>
          </div>
          
          <div className="flex gap-3">
            <IconCheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <Typography variant="base">
              Testez la lisibilité en mode sombre et clair
            </Typography>
          </div>
        </div>
      </article>

      {/* Pied d'article */}
      <footer className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
            <IconTag size={14} />
            Typography
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 rounded-full text-sm">
            <IconCode size={14} />
            React
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 rounded-full text-sm">
            <IconBulb size={14} />
            Design System
          </span>
        </div>
        
        <Typography variant="small" color="gray-500" align="center">
          Cet article vous a été utile ? Partagez vos retours avec l'équipe design.
        </Typography>
      </footer>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};