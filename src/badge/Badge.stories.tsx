import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBell,
  IconMail,
  IconShoppingCart,
  IconMessage,
  IconHeart,
  IconStar,
  IconNotification,
  IconUser,
  IconSettings,
  IconSearch,
  IconHome,
  IconPhone,
} from '@tabler/icons-react';
import { Badge } from './Badge';
import { Button } from '../button/Button';
import { Avatar } from '../avatar/Avatar';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Badge** - Composant badge flexible pour afficher des notifications, compteurs et indicateurs. Support des dots, compteurs et positionnement personnalisé.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Contenu du badge (texte ou nombre)',
    },
    content: {
      control: 'text',
      description: 'Élément à wrapper avec le badge',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique du badge',
    },
    variant: {
      control: 'select',
      options: ['solid', 'flat', 'bordered', 'light', 'faded'],
      description: 'Style du badge',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du badge',
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'circle'],
      description: 'Forme du badge',
    },
    placement: {
      control: 'select',
      options: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Position du badge relative au contenu',
    },
    dot: {
      control: 'boolean',
      description: 'Afficher un point au lieu du contenu',
    },
    isInvisible: {
      control: 'boolean',
      description: 'Masquer le badge',
    },
    max: {
      control: 'number',
      description: 'Nombre maximum avant affichage "+max"',
    },
    showZero: {
      control: 'boolean',
      description: 'Afficher le badge quand la valeur est 0',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  args: {
    children: 'New',
    color: 'primary',
    variant: 'solid',
  },
};

// Badge avec contenu
export const WithContent: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <Badge content={<Button variant="bordered">Messages</Button>} color="danger">
        5
      </Badge>
      <Badge content={<IconBell size={24} />} color="primary" dot />
      <Badge content={<Avatar name="JD" size="md" />} color="success">
        Online
      </Badge>
    </div>
  ),
};

// Couleurs disponibles
export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map((color) => (
        <div key={color} className="text-center space-y-2">
          <Badge color={color}>New</Badge>
          <p className="text-xs text-default-500 capitalize">{color}</p>
        </div>
      ))}
    </div>
  ),
};

// Variantes de style
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['solid', 'flat', 'bordered', 'light', 'faded'] as const).map((variant) => (
        <div key={variant} className="space-y-2">
          <h4 className="text-sm font-semibold capitalize">{variant}</h4>
          <div className="flex gap-4 flex-wrap">
            {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((color) => (
              <Badge key={color} color={color} variant={variant}>
                {color}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Tailles
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <div className="text-center">
        <Badge size="sm" color="primary">Small</Badge>
        <p className="text-xs mt-2 text-default-500">Small</p>
      </div>
      <div className="text-center">
        <Badge size="md" color="primary">Medium</Badge>
        <p className="text-xs mt-2 text-default-500">Medium</p>
      </div>
      <div className="text-center">
        <Badge size="lg" color="primary">Large</Badge>
        <p className="text-xs mt-2 text-default-500">Large</p>
      </div>
    </div>
  ),
};

// Formes
export const Shapes: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="text-center space-y-2">
        <Badge shape="rectangle" color="primary">Rect</Badge>
        <p className="text-xs text-default-500">Rectangle</p>
      </div>
      <div className="text-center space-y-2">
        <Badge shape="circle" color="secondary">99</Badge>
        <p className="text-xs text-default-500">Circle</p>
      </div>
    </div>
  ),
};

// Badges dots
export const DotBadges: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <Badge content={<IconBell size={28} />} color="danger" dot placement="top-right" />
      <Badge content={<IconMail size={28} />} color="primary" dot placement="top-left" />
      <Badge content={<IconUser size={28} />} color="success" dot placement="bottom-right" />
      <Badge content={<IconSettings size={28} />} color="warning" dot placement="bottom-left" />
    </div>
  ),
};

// Badges avec compteurs
export const CounterBadges: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-4">Compteurs simples</h4>
        <div className="flex gap-6 items-center">
          <Badge content={<IconMail size={24} />} color="primary">3</Badge>
          <Badge content={<IconBell size={24} />} color="danger">12</Badge>
          <Badge content={<IconMessage size={24} />} color="success">0</Badge>
          <Badge content={<IconMessage size={24} />} color="warning" showZero>0</Badge>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Avec maximum</h4>
        <div className="flex gap-6 items-center">
          <Badge content={<IconBell size={24} />} color="danger" max={99}>150</Badge>
          <Badge content={<IconMail size={24} />} color="primary" max={9}>25</Badge>
          <Badge content={<IconShoppingCart size={24} />} color="success" max={999}>1500</Badge>
        </div>
      </div>
    </div>
  ),
};

// Positionnements
export const Placements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8">
      <div className="text-center space-y-4">
        <h4 className="text-sm font-semibold">Top positions</h4>
        <div className="flex gap-8 justify-center">
          <Badge 
            content={<div className="w-16 h-16 bg-content2 rounded-lg flex items-center justify-center">TL</div>}
            color="primary"
            placement="top-left"
          >
            5
          </Badge>
          <Badge 
            content={<div className="w-16 h-16 bg-content2 rounded-lg flex items-center justify-center">TR</div>}
            color="danger"
            placement="top-right"
          >
            12
          </Badge>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h4 className="text-sm font-semibold">Bottom positions</h4>
        <div className="flex gap-8 justify-center">
          <Badge 
            content={<div className="w-16 h-16 bg-content2 rounded-lg flex items-center justify-center">BL</div>}
            color="success"
            placement="bottom-left"
          >
            3
          </Badge>
          <Badge 
            content={<div className="w-16 h-16 bg-content2 rounded-lg flex items-center justify-center">BR</div>}
            color="warning"
            placement="bottom-right"
          >
            7
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// États de visibilité
export const VisibilityStates: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-4">Visibilité normale</h4>
        <div className="flex gap-6 items-center">
          <Badge content={<IconBell size={24} />} color="primary">5</Badge>
          <Badge content={<IconMail size={24} />} color="danger">New</Badge>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Badges masqués</h4>
        <div className="flex gap-6 items-center">
          <Badge content={<IconBell size={24} />} color="primary" isInvisible>5</Badge>
          <Badge content={<IconMail size={24} />} color="danger" isInvisible>New</Badge>
        </div>
        <p className="text-xs text-default-500 mt-2">Les badges sont présents mais invisibles</p>
      </div>
    </div>
  ),
};

// Showcase d'interface utilisateur
export const UIShowcase: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Interface avec Badges
        </h2>
        <p className="text-default-500">
          Exemples d'utilisation dans une vraie interface
        </p>
      </div>

      {/* Navigation avec badges */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Navigation</h3>
        <div className="flex gap-6 items-center flex-wrap">
          <Badge content={<Button variant="light" leftIcon={<IconHome size={16} />}>Accueil</Button>}>
          </Badge>
          
          <Badge 
            content={<Button variant="light" leftIcon={<IconMail size={16} />}>Messages</Button>}
            color="primary"
          >
            12
          </Badge>
          
          <Badge 
            content={<Button variant="light" leftIcon={<IconBell size={16} />}>Notifications</Button>}
            color="danger"
            dot
          />
          
          <Badge 
            content={<Button variant="light" leftIcon={<IconShoppingCart size={16} />}>Panier</Button>}
            color="success"
            max={99}
          >
            150
          </Badge>
        </div>
      </div>

      {/* Profils utilisateur */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Profils Utilisateur</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3">
            <Badge 
              content={<Avatar name="John Doe" src="https://i.pravatar.cc/150?u=john" size="lg" />}
              color="success"
              dot
              placement="bottom-right"
            />
            <div>
              <h4 className="font-medium">John Doe</h4>
              <p className="text-sm text-default-500">En ligne</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge 
              content={<Avatar name="Jane Smith" src="https://i.pravatar.cc/150?u=jane" size="lg" />}
              color="warning"
              dot
              placement="bottom-right"
            />
            <div>
              <h4 className="font-medium">Jane Smith</h4>
              <p className="text-sm text-default-500">Absent</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Badge 
              content={<Avatar name="Bob Wilson" size="lg" />}
              color="danger"
              dot
              placement="bottom-right"
            />
            <div>
              <h4 className="font-medium">Bob Wilson</h4>
              <p className="text-sm text-default-500">Occupé</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Statistiques en Temps Réel</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-primary-50 dark:bg-primary-950/20 rounded-lg">
            <Badge color="primary" size="lg" variant="flat">127</Badge>
            <p className="text-sm mt-2 text-default-600">Ventes aujourd'hui</p>
          </div>
          
          <div className="text-center p-4 bg-success-50 dark:bg-success-950/20 rounded-lg">
            <Badge color="success" size="lg" variant="flat">89%</Badge>
            <p className="text-sm mt-2 text-default-600">Satisfaction client</p>
          </div>
          
          <div className="text-center p-4 bg-warning-50 dark:bg-warning-950/20 rounded-lg">
            <Badge color="warning" size="lg" variant="flat">23</Badge>
            <p className="text-sm mt-2 text-default-600">En attente</p>
          </div>
          
          <div className="text-center p-4 bg-danger-50 dark:bg-danger-950/20 rounded-lg">
            <Badge color="danger" size="lg" variant="flat">3</Badge>
            <p className="text-sm mt-2 text-default-600">Problèmes critiques</p>
          </div>
        </div>
      </div>

      {/* Actions rapides */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Actions Rapides</h3>
        <div className="flex gap-4 flex-wrap">
          <Badge 
            content={
              <Button 
                variant="flat" 
                color="primary"
                leftIcon={<IconPhone size={16} />}
              >
                Appeler
              </Button>
            }
            color="success"
            dot
          />
          
          <Badge 
            content={
              <Button 
                variant="flat" 
                color="secondary"
                leftIcon={<IconMail size={16} />}
              >
                Email
              </Button>
            }
            color="primary"
          >
            5
          </Badge>
          
          <Badge 
            content={
              <Button 
                variant="flat" 
                color="success"
                leftIcon={<IconMessage size={16} />}
              >
                Chat
              </Button>
            }
            color="danger"
            max={9}
          >
            15
          </Badge>
          
          <Badge 
            content={
              <Button 
                variant="flat" 
                color="warning"
                leftIcon={<IconSearch size={16} />}
              >
                Rechercher
              </Button>
            }
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};