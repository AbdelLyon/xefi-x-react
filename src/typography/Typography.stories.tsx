import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  IconBulb,
  IconAlertTriangle,
  IconInfoCircle,
  IconCheck,
  IconTag,
  IconCode,
} from "@tabler/icons-react"
import { Text } from "./Text"

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "**Text** - Composant de typographie flexible avec variantes de taille, poids et alignement. Support de truncature et couleurs personnalisées.",
      },
    },
  },
  argTypes: {
    children: {
      control: "text",
      description: "Contenu textuel",
    },
    as: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "p",
        "span",
        "div",
        "strong",
        "em",
      ],
      description: "Élément HTML à rendre",
    },
    variant: {
      control: "select",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "base",
        "small",
        "caption",
        "overline",
      ],
      description: "Variante de style typographique",
    },
    weight: {
      control: "select",
      options: ["light", "normal", "medium", "semibold", "bold"],
      description: "Poids de la police",
    },
    align: {
      control: "select",
      options: ["left", "center", "right", "justify"],
      description: "Alignement du texte",
    },
    color: {
      control: "text",
      description: 'Couleur Tailwind (ex: "primary-500", "gray-600")',
    },
    truncate: {
      control: "boolean",
      description: 'Tronquer le texte avec "..."',
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

// Story par défaut
export const Default: Story = {
  args: {
    children: "Texte par défaut",
    variant: "base",
  },
}

// Hiérarchie des titres
export const Headings: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text variant="h1" as="h1">
        Titre Principal (H1)
      </Text>
      <Text variant="h2" as="h2">
        Titre Secondaire (H2)
      </Text>
      <Text variant="h3" as="h3">
        Titre de Section (H3)
      </Text>
      <Text variant="h4" as="h4">
        Sous-titre Important (H4)
      </Text>
      <Text variant="h5" as="h5">
        Sous-titre Moyen (H5)
      </Text>
      <Text variant="h6" as="h6">
        Sous-titre Petit (H6)
      </Text>
    </div>
  ),
}

// Variantes de texte
export const TextVariants: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text variant="base">
        Texte de base - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Text>
      <Text variant="small">
        Texte petit - Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </Text>
      <Text variant="caption">
        Texte caption - Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>
      <Text variant="overline">
        Texte Overline - Excepteur sint occaecat cupidatat non proident
      </Text>
    </div>
  ),
}

// Poids de police
export const FontWeights: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <Text weight="light">
        Police légère - Ce texte utilise un poids de police light
      </Text>
      <Text weight="normal">
        Police normale - Ce texte utilise un poids de police normal
      </Text>
      <Text weight="medium">
        Police medium - Ce texte utilise un poids de police medium
      </Text>
      <Text weight="semibold">
        Police semi-bold - Ce texte utilise un poids de police semibold
      </Text>
      <Text weight="bold">
        Police bold - Ce texte utilise un poids de police bold
      </Text>
    </div>
  ),
}

// Alignements
export const TextAlignments: Story = {
  render: () => (
    <div className="max-w-2xl space-y-6">
      <div>
        <Text variant="h6" className="mb-2">
          Alignement à gauche (défaut)
        </Text>
        <Text align="left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </Text>
      </div>

      <div>
        <Text variant="h6" className="mb-2">
          Alignement centré
        </Text>
        <Text align="center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>

      <div>
        <Text variant="h6" className="mb-2">
          Alignement à droite
        </Text>
        <Text align="right">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </div>

      <div>
        <Text variant="h6" className="mb-2">
          Alignement justifié
        </Text>
        <Text align="justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore.
        </Text>
      </div>
    </div>
  ),
}

// Couleurs
export const Colors: Story = {
  render: () => (
    <div className="max-w-2xl space-y-3">
      <Text color="primary-600">Texte en couleur primaire</Text>
      <Text color="secondary-600">Texte en couleur secondaire</Text>
      <Text color="success-600">Texte en couleur de succès</Text>
      <Text color="warning-600">
        Texte en couleur d'avertissement
      </Text>
      <Text color="danger-600">Texte en couleur de danger</Text>
      <Text color="gray-500">Texte en gris neutre</Text>
      <Text color="slate-600">Texte en gris ardoise</Text>
    </div>
  ),
}

// Truncature
export const Truncation: Story = {
  render: () => (
    <div className="max-w-md space-y-6">
      <div>
        <Text variant="h6" className="mb-2">
          Texte normal
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
      </div>

      <div>
        <Text variant="h6" className="mb-2">
          Texte tronqué
        </Text>
        <Text truncate>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
      </div>
    </div>
  ),
}

// Éléments sémantiques
export const SemanticElements: Story = {
  render: () => (
    <div className="max-w-2xl space-y-4">
      <Text as="h2" variant="h2">
        Article Principal
      </Text>

      <Text as="p" variant="base">
        Ceci est un paragraphe normal avec du texte{" "}
        <Text as="strong" variant="base" weight="bold">
          en gras
        </Text>{" "}
        et du texte{" "}
        <Text as="em" variant="base" className="italic">
          en italique
        </Text>
        . Voici aussi un{" "}
        <Text
          as="span"
          variant="base"
          color="primary-600"
          className="cursor-pointer underline"
        >
          lien
        </Text>
        .
      </Text>

      <Text
        as="blockquote"
        variant="base"
        className="border-l-4 border-primary-200 pl-4 italic"
      >
        "Ceci est une citation importante qui illustre l'utilisation du
        composant Text pour différents éléments sémantiques."
      </Text>

      <Text
        as="code"
        variant="small"
        className="rounded bg-gray-100 px-2 py-1 font-mono dark:bg-gray-800"
      >
        const exemple = "Code inline";
      </Text>
    </div>
  ),
}

// Interface d'article
export const ArticleInterface: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl space-y-8 p-8">
      {/* En-tête d'article */}
      <header className="space-y-4 text-center">
        <Text variant="overline" color="primary-600">
          GUIDE TECHNIQUE
        </Text>
        <Text variant="h1" as="h1">
          Guide Complet du Composant Text
        </Text>
        <Text variant="base" color="gray-600">
          Publié le 15 mars 2024 • 8 min de lecture
        </Text>
      </header>

      {/* Contenu principal */}
      <article className="space-y-6">
        <Text variant="h2" as="h2">
          Introduction
        </Text>

        <Text variant="base">
          Le composant Text est un élément fondamental de notre système de
          design. Il permet de créer une hiérarchie visuelle claire et d'assurer
          la cohérence typographique à travers toute l'application.
        </Text>

        {/* Encadré d'information */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/20">
          <div className="flex gap-3">
            <IconInfoCircle
              size={20}
              className="mt-0.5 flex-shrink-0 text-blue-600"
            />
            <div>
              <Text variant="h6" weight="semibold" color="blue-800">
                Information importante
              </Text>
              <Text variant="small" color="blue-700">
                Ce composant hérite automatiquement des styles du thème
                dark/light mode.
              </Text>
            </div>
          </div>
        </div>

        <Text variant="h3" as="h3">
          Variantes Disponibles
        </Text>

        <Text variant="base">
          Le composant propose plusieurs variantes pour s'adapter à tous vos
          besoins :
        </Text>

        {/* Liste avec typographie */}
        <ul className="ml-6 space-y-2">
          <li>
            <Text variant="base">
              <Text as="strong" weight="semibold">
                Titres (h1-h6)
              </Text>{" "}
              : Pour la hiérarchie des contenus
            </Text>
          </li>
          <li>
            <Text variant="base">
              <Text as="strong" weight="semibold">
                Corps de texte
              </Text>{" "}
              : Pour le contenu principal
            </Text>
          </li>
          <li>
            <Text variant="base">
              <Text as="strong" weight="semibold">
                Texte secondaire
              </Text>{" "}
              : Pour les métadonnées et descriptions
            </Text>
          </li>
        </ul>

        {/* Citation */}
        <blockquote className="my-6 border-l-4 border-primary-200 pl-6">
          <Text variant="base" className="italic" color="gray-700">
            "Une typographie soignée est la base d'une excellente expérience
            utilisateur. Elle guide l'œil et facilite la compréhension du
            contenu."
          </Text>
          <Text variant="small" color="gray-500" className="mt-2">
            — Expert en UX Design
          </Text>
        </blockquote>

        <Text variant="h3" as="h3">
          Cas d'Usage Pratiques
        </Text>

        {/* Grille d'exemples */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Alerte de succès */}
          <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/20">
            <div className="flex gap-3">
              <IconCheck size={20} className="flex-shrink-0 text-green-600" />
              <div>
                <Text variant="h6" weight="semibold" color="green-800">
                  Succès
                </Text>
                <Text variant="small" color="green-700">
                  Opération terminée avec succès
                </Text>
              </div>
            </div>
          </div>

          {/* Alerte d'avertissement */}
          <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-950/20">
            <div className="flex gap-3">
              <IconAlertTriangle
                size={20}
                className="flex-shrink-0 text-yellow-600"
              />
              <div>
                <Text variant="h6" weight="semibold" color="yellow-800">
                  Attention
                </Text>
                <Text variant="small" color="yellow-700">
                  Action requise avant de continuer
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Section de code */}
        <div className="overflow-x-auto rounded-lg bg-gray-900 p-6">
          <Text variant="small" color="gray-300" className="font-mono">
            <span className="text-blue-400">import</span> {`{ Text }`}{" "}
            <span className="text-blue-400">from</span>{" "}
            <span className="text-green-400">'@xefi/x-react'</span>
            <br />
            <br />
            <span className="text-purple-400">const</span>{" "}
            <span className="text-yellow-300">MyComponent</span> = () =&gt;{" "}
            {"{"}
            <br />
            &nbsp;&nbsp;<span className="text-blue-400">return</span> (<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;
            <span className="text-red-400">Text</span>{" "}
            <span className="text-green-400">variant</span>=
            <span className="text-yellow-300">"h1"</span>&gt;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mon Titre
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/
            <span className="text-red-400">Text</span>&gt;
            <br />
            &nbsp;&nbsp;)
            <br />
            {`}`}
          </Text>
        </div>

        <Text variant="h3" as="h3">
          Bonnes Pratiques
        </Text>

        <div className="space-y-4">
          <div className="flex gap-3">
            <IconCheck
              size={20}
              className="mt-0.5 flex-shrink-0 text-green-600"
            />
            <Text variant="base">
              Utilisez une hiérarchie cohérente avec les variantes h1-h6
            </Text>
          </div>

          <div className="flex gap-3">
            <IconCheck
              size={20}
              className="mt-0.5 flex-shrink-0 text-green-600"
            />
            <Text variant="base">
              Respectez les conventions sémantiques HTML
            </Text>
          </div>

          <div className="flex gap-3">
            <IconCheck
              size={20}
              className="mt-0.5 flex-shrink-0 text-green-600"
            />
            <Text variant="base">
              Testez la lisibilité en mode sombre et clair
            </Text>
          </div>
        </div>
      </article>

      {/* Pied d'article */}
      <footer className="border-t border-gray-200 pt-6 dark:border-gray-700">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
            <IconTag size={14} />
            Text
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary-100 px-3 py-1 text-sm text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-300">
            <IconCode size={14} />
            React
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-success-100 px-3 py-1 text-sm text-success-700 dark:bg-success-900/30 dark:text-success-300">
            <IconBulb size={14} />
            Design System
          </span>
        </div>

        <Text variant="small" color="gray-500" align="center">
          Cet article vous a été utile ? Partagez vos retours avec l'équipe
          design.
        </Text>
      </footer>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}
