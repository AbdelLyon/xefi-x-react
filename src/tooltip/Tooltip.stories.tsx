import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  IconHelp,
  IconInfo,
  IconSettings,
  IconUser,
  IconBell,
  IconHeart,
  IconStar,
  IconShare,
  IconDownload,
  IconCopy,
  IconEdit,
  IconTrash,
  IconEye,
  IconLock,
  IconUnlock,
  IconRefresh,
} from "@tabler/icons-react"
import { Tooltip } from "./Tooltip"
import { Button } from "../button/Button"
import { Avatar } from "../avatar/Avatar"
import { Badge } from "../badge/Badge"

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "**Tooltip** - Composant tooltip flexible avec support de positionnement, délais et animations. Basé sur HeroUI avec personnalisations avancées.",
      },
    },
  },
  argTypes: {
    content: {
      control: "text",
      description: "Contenu du tooltip",
    },
    trigger: {
      description: "Élément qui déclenche le tooltip",
    },
    placement: {
      control: "select",
      options: [
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
        "right",
        "right-start",
        "right-end",
      ],
      description: "Position du tooltip",
    },
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "foreground",
      ],
      description: "Couleur thématique",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Taille du tooltip",
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "full"],
      description: "Arrondi des coins",
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg"],
      description: "Ombre portée",
    },
    delay: {
      control: "number",
      description: "Délai avant affichage (ms)",
    },
    closeDelay: {
      control: "number",
      description: "Délai avant fermeture (ms)",
    },
    showArrow: {
      control: "boolean",
      description: "Afficher la flèche",
    },
    isDisabled: {
      control: "boolean",
      description: "Désactiver le tooltip",
    },
  },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof meta>

// Story par défaut
export const Default: Story = {
  args: {
    content: "Tooltip par défaut",
    trigger: <Button>Survolez-moi</Button>,
  },
}

// Positions du tooltip
export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-8 p-12">
      {/* Ligne du haut */}
      <Tooltip content="Tooltip en haut à gauche" placement="top-start">
        <Button size="sm">Top Start</Button>
      </Tooltip>
      <Tooltip content="Tooltip en haut au centre" placement="top">
        <Button size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Tooltip en haut à droite" placement="top-end">
        <Button size="sm">Top End</Button>
      </Tooltip>

      {/* Ligne du milieu */}
      <Tooltip content="Tooltip à gauche en haut" placement="left-start">
        <Button size="sm">Left Start</Button>
      </Tooltip>
      <div className="flex justify-center">
        <Button size="sm" variant="bordered">
          Centre
        </Button>
      </div>
      <Tooltip content="Tooltip à droite en haut" placement="right-start">
        <Button size="sm">Right Start</Button>
      </Tooltip>

      <Tooltip content="Tooltip à gauche au centre" placement="left">
        <Button size="sm">Left</Button>
      </Tooltip>
      <div></div>
      <Tooltip content="Tooltip à droite au centre" placement="right">
        <Button size="sm">Right</Button>
      </Tooltip>

      <Tooltip content="Tooltip à gauche en bas" placement="left-end">
        <Button size="sm">Left End</Button>
      </Tooltip>
      <div></div>
      <Tooltip content="Tooltip à droite en bas" placement="right-end">
        <Button size="sm">Right End</Button>
      </Tooltip>

      {/* Ligne du bas */}
      <Tooltip content="Tooltip en bas à gauche" placement="bottom-start">
        <Button size="sm">Bottom Start</Button>
      </Tooltip>
      <Tooltip content="Tooltip en bas au centre" placement="bottom">
        <Button size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Tooltip en bas à droite" placement="bottom-end">
        <Button size="sm">Bottom End</Button>
      </Tooltip>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}

// Couleurs disponibles
export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(
        [
          "default",
          "primary",
          "secondary",
          "success",
          "warning",
          "danger",
          "foreground",
        ] as const
      ).map((color) => (
        <Tooltip
          key={color}
          content={`Tooltip ${color}`}
          color={color}
          showArrow
        >
          <Button variant="bordered" size="sm" className="capitalize">
            {color}
          </Button>
        </Tooltip>
      ))}
    </div>
  ),
}

// Tailles
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Tooltip
        content="Petit tooltip avec du contenu court"
        size="sm"
        showArrow
      >
        <Button size="sm">Small</Button>
      </Tooltip>
      <Tooltip
        content="Tooltip moyen avec un contenu de taille normale"
        size="md"
        showArrow
      >
        <Button>Medium</Button>
      </Tooltip>
      <Tooltip
        content="Grand tooltip qui peut contenir plus de texte et des informations détaillées"
        size="lg"
        showArrow
      >
        <Button size="lg">Large</Button>
      </Tooltip>
    </div>
  ),
}

// Avec flèches
export const WithArrows: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Sans flèche</h4>
        <div className="flex gap-4">
          <Tooltip content="Tooltip sans flèche" placement="top">
            <Button size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip sans flèche" placement="bottom">
            <Button size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip sans flèche" placement="left">
            <Button size="sm">Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip sans flèche" placement="right">
            <Button size="sm">Right</Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-semibold">Avec flèche</h4>
        <div className="flex gap-4">
          <Tooltip content="Tooltip avec flèche" placement="top" showArrow>
            <Button size="sm">Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip avec flèche" placement="bottom" showArrow>
            <Button size="sm">Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip avec flèche" placement="left" showArrow>
            <Button size="sm">Left</Button>
          </Tooltip>
          <Tooltip content="Tooltip avec flèche" placement="right" showArrow>
            <Button size="sm">Right</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

// Délais et animations
export const DelaysAndAnimations: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">Délais personnalisés</h4>
        <div className="flex gap-4">
          <Tooltip content="Apparition immédiate" delay={0} showArrow>
            <Button size="sm">Immédiat</Button>
          </Tooltip>
          <Tooltip content="Délai court (500ms)" delay={500} showArrow>
            <Button size="sm">Court</Button>
          </Tooltip>
          <Tooltip content="Délai long (1000ms)" delay={1000} showArrow>
            <Button size="sm">Long</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Délais de fermeture</h4>
        <div className="flex gap-4">
          <Tooltip content="Fermeture rapide" closeDelay={100} showArrow>
            <Button size="sm">Rapide</Button>
          </Tooltip>
          <Tooltip content="Fermeture normale" closeDelay={500} showArrow>
            <Button size="sm">Normal</Button>
          </Tooltip>
          <Tooltip content="Fermeture lente" closeDelay={1000} showArrow>
            <Button size="sm">Lent</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Animations</h4>
        <div className="flex gap-4">
          <Tooltip content="Avec animation" showArrow>
            <Button size="sm">Animé</Button>
          </Tooltip>
          <Tooltip content="Sans animation" disableAnimation showArrow>
            <Button size="sm">Statique</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

// Tooltips avec contenu riche
export const RichContent: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {/* Tooltip avec icône */}
      <Tooltip
        content={
          <div className="flex items-center gap-2">
            <IconInfo size={16} />
            <span>Information importante</span>
          </div>
        }
        color="primary"
        showArrow
      >
        <Button leftIcon={<IconInfo size={16} />} variant="light">
          Info
        </Button>
      </Tooltip>

      {/* Tooltip avec contenu structuré */}
      <Tooltip
        content={
          <div className="space-y-1">
            <div className="font-semibold">John Doe</div>
            <div className="text-xs opacity-80">Développeur Frontend</div>
            <div className="text-xs opacity-60">En ligne</div>
          </div>
        }
        size="lg"
        showArrow
      >
        <Avatar name="JD" src="https://i.pravatar.cc/150?u=john" />
      </Tooltip>

      {/* Tooltip avec actions */}
      <Tooltip
        content={
          <div className="space-y-2">
            <div className="font-medium">Actions disponibles:</div>
            <div className="flex gap-1">
              <button className="rounded p-1 hover:bg-white/20">
                <IconEdit size={12} />
              </button>
              <button className="rounded p-1 hover:bg-white/20">
                <IconCopy size={12} />
              </button>
              <button className="rounded p-1 hover:bg-white/20">
                <IconTrash size={12} />
              </button>
            </div>
          </div>
        }
        color="foreground"
        size="lg"
        showArrow
      >
        <Button leftIcon={<IconSettings size={16} />} variant="bordered">
          Actions
        </Button>
      </Tooltip>
    </div>
  ),
}

// Tooltips sur différents éléments
export const DifferentTriggers: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="mb-4 text-sm font-semibold">Boutons</h4>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Sauvegarder le document" showArrow>
            <Button color="primary" leftIcon={<IconDownload size={16} />}>
              Sauvegarder
            </Button>
          </Tooltip>
          <Tooltip content="Partager avec l'équipe" showArrow>
            <Button color="secondary" leftIcon={<IconShare size={16} />}>
              Partager
            </Button>
          </Tooltip>
          <Tooltip content="Ajouter aux favoris" showArrow>
            <Button
              color="danger"
              variant="light"
              leftIcon={<IconHeart size={16} />}
            >
              Favoris
            </Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold">Icônes d'aide</h4>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span>Nom d'utilisateur</span>
            <Tooltip
              content="Votre nom d'utilisateur est unique et ne peut pas être modifié"
              placement="top"
            >
              <IconHelp size={16} className="cursor-help text-gray-400" />
            </Tooltip>
          </div>

          <div className="flex items-center gap-2">
            <span>Mot de passe</span>
            <Tooltip
              content="Le mot de passe doit contenir au moins 8 caractères, incluant majuscules, minuscules et chiffres"
              placement="top"
            >
              <IconInfo size={16} className="cursor-help text-blue-400" />
            </Tooltip>
          </div>
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold">Avatars et badges</h4>
        <div className="flex items-center gap-6">
          <Tooltip
            content="Alice Martin - Développeuse Frontend - En ligne"
            placement="bottom"
          >
            <Avatar name="AM" src="https://i.pravatar.cc/150?u=alice" />
          </Tooltip>

          <Tooltip content="5 nouvelles notifications" placement="bottom">
            <Badge content={<IconBell size={24} />} color="danger">
              5
            </Badge>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 className="mb-4 text-sm font-semibold">Éléments de navigation</h4>
        <div className="flex gap-4">
          <Tooltip content="Retour à l'accueil" placement="bottom">
            <button className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <IconUser size={20} />
            </button>
          </Tooltip>

          <Tooltip content="Notifications (3 non lues)" placement="bottom">
            <button className="relative rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <IconBell size={20} />
              <span className="absolute -right-1 -top-1 size-3 rounded-full bg-red-500"></span>
            </button>
          </Tooltip>

          <Tooltip content="Paramètres du compte" placement="bottom">
            <button className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
              <IconSettings size={20} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

// États et interactions
export const StatesAndInteractions: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold">État normal vs désactivé</h4>
        <div className="flex gap-4">
          <Tooltip content="Tooltip normal" showArrow>
            <Button>Normal</Button>
          </Tooltip>
          <Tooltip content="Ce tooltip est désactivé" isDisabled showArrow>
            <Button>Désactivé</Button>
          </Tooltip>
        </div>
      </div>

      <div>
        <h4 className="mb-3 text-sm font-semibold">Interactions complexes</h4>
        <div className="flex gap-4">
          <Tooltip content="Clique pour verrouiller" placement="top" showArrow>
            <Button
              leftIcon={<IconLock size={16} />}
              color="warning"
              variant="light"
            >
              Verrouiller
            </Button>
          </Tooltip>

          <Tooltip
            content="Clique pour déverrouiller"
            placement="top"
            showArrow
          >
            <Button
              leftIcon={<IconUnlock size={16} />}
              color="success"
              variant="light"
            >
              Déverrouiller
            </Button>
          </Tooltip>

          <Tooltip content="Actualiser les données" placement="top" showArrow>
            <Button leftIcon={<IconRefresh size={16} />} variant="bordered">
              Actualiser
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
}

// Showcase d'interface utilisateur
export const InterfaceShowcase: Story = {
  render: () => (
    <div className="mx-auto max-w-6xl space-y-8 p-8">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-foreground">
          Interface avec Tooltips
        </h2>
        <p className="text-default-500">
          Exemples d'utilisation dans une interface complète
        </p>
      </div>

      {/* Barre d'outils */}
      <div className="rounded-lg bg-content1 p-4">
        <h3 className="mb-4 text-lg font-semibold">Barre d'Outils</h3>
        <div className="flex flex-wrap gap-2">
          <Tooltip
            content="Nouveau document (Ctrl+N)"
            placement="bottom"
            showArrow
          >
            <Button size="sm" variant="light" className="p-2">
              <IconEdit size={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Sauvegarder (Ctrl+S)" placement="bottom" showArrow>
            <Button size="sm" variant="light" className="p-2">
              <IconDownload size={18} />
            </Button>
          </Tooltip>

          <Tooltip
            content="Copier la sélection (Ctrl+C)"
            placement="bottom"
            showArrow
          >
            <Button size="sm" variant="light" className="p-2">
              <IconCopy size={18} />
            </Button>
          </Tooltip>

          <div className="mx-2 h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

          <Tooltip content="Aperçu du document" placement="bottom" showArrow>
            <Button size="sm" variant="light" className="p-2">
              <IconEye size={18} />
            </Button>
          </Tooltip>

          <Tooltip content="Partager le document" placement="bottom" showArrow>
            <Button size="sm" variant="light" className="p-2">
              <IconShare size={18} />
            </Button>
          </Tooltip>

          <div className="mx-2 h-8 w-px bg-gray-300 dark:bg-gray-600"></div>

          <Tooltip
            content="Supprimer définitivement"
            placement="bottom"
            showArrow
            color="danger"
          >
            <Button size="sm" variant="light" className="p-2 text-danger">
              <IconTrash size={18} />
            </Button>
          </Tooltip>
        </div>
      </div>

      {/* Tableau avec tooltips */}
      <div className="rounded-lg bg-content1 p-6">
        <h3 className="mb-4 text-lg font-semibold">Liste des Utilisateurs</h3>
        <div className="space-y-4">
          {[
            {
              name: "Alice Martin",
              role: "Frontend Dev",
              status: "online",
              avatar: "alice",
            },
            {
              name: "Bob Johnson",
              role: "Backend Dev",
              status: "busy",
              avatar: "bob",
            },
            {
              name: "Charlie Wilson",
              role: "Designer",
              status: "away",
              avatar: "charlie",
            },
          ].map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <Tooltip
                  content={
                    <div className="space-y-1">
                      <div className="font-semibold">{user.name}</div>
                      <div className="text-xs opacity-80">{user.role}</div>
                      <div className="text-xs opacity-60">
                        Statut: {user.status}
                      </div>
                    </div>
                  }
                  placement="right"
                  showArrow
                >
                  <Avatar
                    name={user.name}
                    src={`https://i.pravatar.cc/150?u=${user.avatar}`}
                  />
                </Tooltip>

                <div>
                  <h4 className="font-medium">{user.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user.role}
                  </p>
                </div>

                <Tooltip content={`Statut: ${user.status}`} placement="top">
                  <span
                    className={`size-3 rounded-full ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "busy"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                    }`}
                  />
                </Tooltip>
              </div>

              <div className="flex gap-2">
                <Tooltip content="Envoyer un message" placement="top">
                  <Button size="sm" variant="light" className="p-2">
                    <IconBell size={16} />
                  </Button>
                </Tooltip>

                <Tooltip content="Voir le profil" placement="top">
                  <Button size="sm" variant="light" className="p-2">
                    <IconUser size={16} />
                  </Button>
                </Tooltip>

                <Tooltip content="Plus d'options" placement="top">
                  <Button size="sm" variant="light" className="p-2">
                    <IconSettings size={16} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statistiques avec tooltips */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Tooltip
          content="Nombre total d'utilisateurs actifs ce mois-ci"
          placement="top"
          showArrow
        >
          <div className="dark:bg-primary-950/20 cursor-help rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-800">
            <div className="flex items-center gap-3">
              <IconUser size={24} className="text-primary-600" />
              <div>
                <h4 className="text-2xl font-bold text-primary-900 dark:text-primary-100">
                  1,247
                </h4>
                <p className="text-sm text-primary-700 dark:text-primary-300">
                  Utilisateurs Actifs
                </p>
              </div>
            </div>
          </div>
        </Tooltip>

        <Tooltip
          content="Évaluations moyennes reçues ce trimestre"
          placement="top"
          showArrow
        >
          <div className="dark:bg-warning-950/20 cursor-help rounded-lg border border-warning-200 bg-warning-50 p-6 dark:border-warning-800">
            <div className="flex items-center gap-3">
              <IconStar size={24} className="text-warning-600" />
              <div>
                <h4 className="text-2xl font-bold text-warning-900 dark:text-warning-100">
                  4.8
                </h4>
                <p className="text-sm text-warning-700 dark:text-warning-300">
                  Note Moyenne
                </p>
              </div>
            </div>
          </div>
        </Tooltip>

        <Tooltip
          content="Nombre total de likes reçus sur la plateforme"
          placement="top"
          showArrow
        >
          <div className="dark:bg-danger-950/20 cursor-help rounded-lg border border-danger-200 bg-danger-50 p-6 dark:border-danger-800">
            <div className="flex items-center gap-3">
              <IconHeart size={24} className="text-danger-600" />
              <div>
                <h4 className="text-2xl font-bold text-danger-900 dark:text-danger-100">
                  5,432
                </h4>
                <p className="text-sm text-danger-700 dark:text-danger-300">
                  Likes Totaux
                </p>
              </div>
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
  },
}
