import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  IconPlus,
  IconDownload,
  IconHeart,
  IconStar,
  IconShare,
  IconSettings,
  IconBell,
  IconUser,
  IconShoppingCart,
  IconSearch,
  IconArrowRight,
  IconCheck,
} from "@tabler/icons-react"
import { Button } from "./Button"

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "**Button** - Composant bouton élégant avec support complet dark/light mode, animations fluides et personnalisations avancées.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "solid",
        "bordered",
        "light",
        "flat",
        "faded",
        "shadow",
        "ghost",
      ],
      description: "Style visuel du bouton",
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "default",
      ],
      description: "Couleur thématique",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Taille du bouton",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "Radius des coins (défaut: md)",
    },
    loading: {
      control: "boolean",
      description: "État de chargement",
    },
    disabled: {
      control: "boolean",
      description: "Bouton désactivé",
    },
    fullWidth: {
      control: "boolean",
      description: "Pleine largeur",
    },
    children: {
      control: "text",
      description: "Contenu du bouton",
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

// Story par défaut - utilise le radius par défaut (md)
export const Default: Story = {
  args: {
    children: "Bouton par défaut",
    color: "primary",
  },
}

// Test spécifique du radius par défaut
export const RadiusComparison: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8 p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Test du radius par défaut
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary">Sans radius explicite (défaut: md)</Button>
          <Button color="primary" radius="md">
            Avec radius="md" explicite
          </Button>
        </div>
        <p className="mt-2 text-sm text-default-500">
          ↑ Ces deux boutons devraient avoir exactement la même apparence
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Tous les radius disponibles avec style inline forcé
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button color="primary" radius="none">
            none (0px)
          </Button>
          <Button color="primary" radius="sm">
            sm (4px)
          </Button>
          <Button color="primary" radius="md">
            md (6px) - défaut
          </Button>
          <Button color="primary" radius="lg">
            lg (8px)
          </Button>
          <Button color="primary" radius="full">
            full (9999px)
          </Button>
        </div>
        <div className="mt-4 rounded-lg bg-default-100 p-4">
          <p className="text-sm text-default-600">
            <strong>Debug :</strong> Chaque bouton a maintenant un style inline
            qui force le border-radius. Ouvrez les outils de développement pour
            voir <code>style="border-radius: Xpx"</code> sur chaque bouton.
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-foreground">
          Test avec différentes variantes
        </h3>
        <div className="grid grid-cols-5 gap-4">
          {(["none", "sm", "md", "lg", "full"] as const).map((radiusValue) => (
            <div key={radiusValue} className="space-y-2">
              <h4 className="text-center text-sm font-medium">{radiusValue}</h4>
              <Button
                color="primary"
                radius={radiusValue}
                size="sm"
                className="w-full"
              >
                Solid
              </Button>
              <Button
                color="primary"
                radius={radiusValue}
                variant="bordered"
                size="sm"
                className="w-full"
              >
                Bordered
              </Button>
              <Button
                color="primary"
                radius={radiusValue}
                variant="light"
                size="sm"
                className="w-full"
              >
                Light
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}

// Showcase moderne
export const ModernShowcase: Story = {
  render: () => (
    <div className="mx-auto max-w-6xl p-8">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          Collection de Boutons Modernes
        </h2>
        <p className="text-default-500">
          Boutons élégants avec design contemporain et radius par défaut
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Actions Principales */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Actions Principales
          </h4>
          <Button
            color="primary"
            variant="shadow"
            size="lg"
            leftIcon={<IconPlus size={18} />}
            className="w-full font-medium"
          >
            Créer
          </Button>
          <Button
            color="success"
            variant="solid"
            leftIcon={<IconDownload size={16} />}
            className="w-full"
          >
            Télécharger
          </Button>
          <Button
            color="secondary"
            variant="flat"
            leftIcon={<IconShare size={16} />}
            className="w-full"
          >
            Partager
          </Button>
        </div>

        {/* Interactifs */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Interactifs
          </h4>
          <Button
            color="danger"
            variant="bordered"
            leftIcon={<IconHeart size={16} />}
            className="w-full"
          >
            Favoris
          </Button>
          <Button
            color="warning"
            variant="light"
            leftIcon={<IconStar size={16} />}
            className="w-full"
          >
            Évaluer
          </Button>
          <Button
            color="primary"
            variant="ghost"
            leftIcon={<IconBell size={16} />}
            className="w-full"
          >
            Notifications
          </Button>
        </div>

        {/* Utilitaires */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            Utilitaires
          </h4>
          <Button
            color="default"
            variant="bordered"
            leftIcon={<IconSettings size={16} />}
            className="w-full"
          >
            Paramètres
          </Button>
          <Button
            color="primary"
            variant="flat"
            leftIcon={<IconUser size={16} />}
            className="w-full"
          >
            Profil
          </Button>
          <Button
            color="success"
            variant="light"
            leftIcon={<IconCheck size={16} />}
            className="w-full"
          >
            Valider
          </Button>
        </div>

        {/* E-commerce */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            E-commerce
          </h4>
          <Button
            color="primary"
            variant="shadow"
            leftIcon={<IconShoppingCart size={16} />}
            className="w-full font-medium"
          >
            Ajouter au panier
          </Button>
          <Button
            color="default"
            variant="bordered"
            leftIcon={<IconSearch size={16} />}
            className="w-full"
          >
            Rechercher
          </Button>
          <Button
            color="secondary"
            variant="solid"
            rightIcon={<IconArrowRight size={16} />}
            className="w-full"
          >
            Continuer
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}

// États de chargement
export const LoadingStates: Story = {
  render: () => (
    <div className="mx-auto max-w-4xl p-8">
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        États de Chargement
      </h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Chargement Simple</h4>
          <div className="space-y-3">
            <Button loading color="primary" size="lg" className="w-full">
              Chargement...
            </Button>
            <Button loading color="secondary" className="w-full">
              En cours
            </Button>
            <Button loading color="success" size="sm" className="w-full">
              Traitement
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">
            Avec Texte Personnalisé
          </h4>
          <div className="space-y-3">
            <Button
              loading
              loadingText="Sauvegarde..."
              color="primary"
              variant="shadow"
              className="w-full"
            >
              Sauvegarder
            </Button>
            <Button
              loading
              loadingText="Envoi..."
              color="success"
              variant="bordered"
              className="w-full"
            >
              Envoyer
            </Button>
            <Button
              loading
              loadingText="Connexion..."
              color="warning"
              variant="flat"
              className="w-full"
            >
              Se connecter
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Avec Icônes</h4>
          <div className="space-y-3">
            <Button
              loading
              loadingText="Téléchargement..."
              leftIcon={<IconDownload size={16} />}
              color="primary"
              className="w-full"
            >
              Télécharger
            </Button>
            <Button
              loading
              loadingText="Partage..."
              leftIcon={<IconShare size={16} />}
              color="secondary"
              variant="bordered"
              className="w-full"
            >
              Partager
            </Button>
            <Button
              loading
              loadingText="Validation..."
              color="success"
              variant="light"
              className="w-full"
            >
              Valider
            </Button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}
