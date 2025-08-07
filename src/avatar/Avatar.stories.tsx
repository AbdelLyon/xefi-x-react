import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconUser,
  IconUsers,
  IconStar,
  IconHeart,
  IconBell,
  IconSettings,
  IconCrown,
  IconShield,
} from '@tabler/icons-react';
import { Avatar, AvatarGroup, UserAvatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Avatar** - Composant avatar avec support de groupes, statuts utilisateur et interactions avancées. Basé sur HeroUI avec personnalisations.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Nom affiché dans l\'avatar (génère initiales)',
    },
    src: {
      control: 'text',
      description: 'URL de l\'image avatar',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'avatar',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Arrondi des coins',
    },
    isBordered: {
      control: 'boolean',
      description: 'Bordure autour de l\'avatar',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Avatar désactivé',
    },
    showFallback: {
      control: 'boolean',
      description: 'Afficher le fallback si image manquante',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
    color: 'primary',
  },
};

// Tailles d'avatars
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <div className="text-center">
        <Avatar name="Small" size="sm" color="primary" />
        <p className="text-xs mt-2 text-default-500">Small</p>
      </div>
      <div className="text-center">
        <Avatar name="Medium" size="md" color="secondary" />
        <p className="text-xs mt-2 text-default-500">Medium</p>
      </div>
      <div className="text-center">
        <Avatar name="Large" size="lg" color="success" />
        <p className="text-xs mt-2 text-default-500">Large</p>
      </div>
    </div>
  ),
};

// Couleurs disponibles
export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 max-w-sm">
      {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map((color) => (
        <div key={color} className="text-center">
          <Avatar name={color} color={color} size="md" />
          <p className="text-xs mt-2 text-default-500 capitalize">{color}</p>
        </div>
      ))}
    </div>
  ),
};

// Avec images
export const WithImages: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
        name="Jane Cooper"
        size="lg"
        isBordered
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
        name="John Smith"
        size="md"
        color="secondary"
      />
      <Avatar
        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        name="Sarah Wilson"
        size="sm"
        color="success"
        isBordered
      />
    </div>
  ),
};

// États et variantes
export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Bordures</h4>
        <div className="flex gap-4">
          <Avatar name="Sans bordure" color="primary" />
          <Avatar name="Avec bordure" color="primary" isBordered />
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-semibold mb-3">États</h4>
        <div className="flex gap-4">
          <Avatar name="Normal" color="secondary" />
          <Avatar name="Désactivé" color="secondary" isDisabled />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Radius</h4>
        <div className="flex gap-4">
          <Avatar name="Carré" color="warning" radius="none" />
          <Avatar name="Petit" color="warning" radius="sm" />
          <Avatar name="Moyen" color="warning" radius="md" />
          <Avatar name="Grand" color="warning" radius="lg" />
          <Avatar name="Cercle" color="warning" radius="full" />
        </div>
      </div>
    </div>
  ),
};

// Avec icônes de fallback
export const WithFallbackIcons: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Avatar 
        fallback={<IconUser size={20} />}
        color="primary" 
        size="lg"
      />
      <Avatar 
        fallback={<IconStar size={18} />}
        color="warning" 
        size="md"
      />
      <Avatar 
        fallback={<IconHeart size={16} />}
        color="danger" 
        size="sm"
      />
      <Avatar 
        fallback={<IconShield size={20} />}
        color="success" 
        size="lg"
        isBordered
      />
    </div>
  ),
};

// AvatarGroup - Groupes d'avatars
export const AvatarGroups: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-sm font-semibold mb-4">Groupe basique</h4>
        <AvatarGroup max={4}>
          <Avatar name="John Doe" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar name="Bob Johnson" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar name="Alice Brown" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar name="Charlie Wilson" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          <Avatar name="Diana Davis" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        </AvatarGroup>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Différents espacements</h4>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-default-500 mb-2">Espacement small</p>
            <AvatarGroup max={3} spacing="sm">
              <Avatar name="User 1" color="primary" />
              <Avatar name="User 2" color="secondary" />
              <Avatar name="User 3" color="success" />
              <Avatar name="User 4" color="warning" />
            </AvatarGroup>
          </div>
          
          <div>
            <p className="text-xs text-default-500 mb-2">Espacement medium</p>
            <AvatarGroup max={3} spacing="md">
              <Avatar name="User 1" color="primary" />
              <Avatar name="User 2" color="secondary" />
              <Avatar name="User 3" color="success" />
              <Avatar name="User 4" color="warning" />
            </AvatarGroup>
          </div>
          
          <div>
            <p className="text-xs text-default-500 mb-2">Espacement large</p>
            <AvatarGroup max={3} spacing="lg">
              <Avatar name="User 1" color="primary" />
              <Avatar name="User 2" color="secondary" />
              <Avatar name="User 3" color="success" />
              <Avatar name="User 4" color="warning" />
            </AvatarGroup>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Avec animation</h4>
        <AvatarGroup max={4} spacing="md" animated>
          <Avatar name="Team Lead" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar name="Developer" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          <Avatar name="Designer" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar name="Product Manager" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
          <Avatar name="QA Engineer" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        </AvatarGroup>
        <p className="text-xs text-default-500 mt-2">Survolez le groupe pour voir l'animation</p>
      </div>
    </div>
  ),
};

// UserAvatar - Avatar avec informations utilisateur
export const UserAvatars: Story = {
  render: () => (
    <div className="space-y-8 max-w-md">
      <div>
        <h4 className="text-sm font-semibold mb-4">UserAvatar basique</h4>
        <div className="space-y-4">
          <UserAvatar
            name="John Doe"
            description="Software Engineer"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
              size: "lg",
            }}
          />
          <UserAvatar
            name="Jane Smith"
            description="UX Designer"
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258a2462d826712d",
              color: "secondary",
            }}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Avec statuts</h4>
        <div className="space-y-4">
          <UserAvatar
            name="Alex Johnson"
            description="En ligne"
            status="online"
            showStatus
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
            }}
          />
          <UserAvatar
            name="Sarah Wilson"
            description="Absent"
            status="away"
            showStatus
            avatarProps={{
              name: "SW",
              color: "warning",
            }}
          />
          <UserAvatar
            name="Mike Brown"
            description="Occupé"
            status="busy"
            showStatus
            avatarProps={{
              name: "MB",
              color: "danger",
            }}
          />
          <UserAvatar
            name="Lisa Davis"
            description="Hors ligne"
            status="offline"
            showStatus
            avatarProps={{
              name: "LD",
              color: "default",
            }}
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Interactifs</h4>
        <div className="space-y-4">
          <UserAvatar
            name="Emma Wilson"
            description="Cliquez pour voir le profil"
            clickable
            onClick={() => alert('Profil d\'Emma Wilson')}
            avatarProps={{
              src: "https://i.pravatar.cc/150?u=a04258114e29026302d",
              color: "primary",
            }}
          />
          <UserAvatar
            name="Tom Anderson"
            description="Admin • En ligne"
            status="online"
            showStatus
            clickable
            onClick={() => alert('Profil administrateur')}
            avatarProps={{
              fallback: <IconCrown size={20} />,
              color: "warning",
              size: "lg",
            }}
          />
        </div>
      </div>
    </div>
  ),
};

// Showcase moderne
export const ModernShowcase: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Collection d'Avatars Modernes
        </h2>
        <p className="text-default-500">
          Avatars élégants avec statuts, groupes et interactions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Équipe de Direction */}
        <div className="space-y-4 p-6 bg-content1 rounded-lg">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
            <IconCrown size={16} />
            Direction
          </h4>
          <div className="space-y-3">
            <UserAvatar
              name="Sarah Chen"
              description="CEO"
              status="online"
              showStatus
              clickable
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=ceo",
                size: "lg",
                color: "primary",
                isBordered: true,
              }}
            />
            <UserAvatar
              name="Marcus Johnson"
              description="CTO"
              status="busy"
              showStatus
              clickable
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=cto",
                color: "secondary",
              }}
            />
            <UserAvatar
              name="Emily Rodriguez"
              description="CFO"
              status="away"
              showStatus
              clickable
              avatarProps={{
                name: "ER",
                color: "success",
              }}
            />
          </div>
        </div>

        {/* Équipe Technique */}
        <div className="space-y-4 p-6 bg-content1 rounded-lg">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
            <IconUsers size={16} />
            Équipe Dev
          </h4>
          <AvatarGroup max={4} spacing="md" animated>
            <Avatar
              name="Alex Kim"
              src="https://i.pravatar.cc/150?u=dev1"
              size="md"
              color="primary"
            />
            <Avatar
              name="Jordan Lee"
              src="https://i.pravatar.cc/150?u=dev2"
              size="md"
              color="secondary"
            />
            <Avatar
              name="Taylor Brown"
              name="TB"
              size="md"
              color="success"
            />
            <Avatar
              name="Casey Wilson"
              name="CW"
              size="md"
              color="warning"
            />
            <Avatar
              name="River Johnson"
              name="RJ"
              size="md"
              color="danger"
            />
            <Avatar
              name="Sage Davis"
              name="SD"
              size="md"
              color="default"
            />
          </AvatarGroup>
          <p className="text-xs text-default-500">
            6 développeurs • Survolez pour animation
          </p>
        </div>

        {/* Support Client */}
        <div className="space-y-4 p-6 bg-content1 rounded-lg">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground flex items-center gap-2">
            <IconHeart size={16} />
            Support
          </h4>
          <div className="space-y-3">
            <UserAvatar
              name="Luna Martinez"
              description="Support Manager • En ligne"
              status="online"
              showStatus
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=support1",
                color: "success",
              }}
            />
            <div className="flex gap-2">
              <Avatar
                name="Ryan Adams"
                src="https://i.pravatar.cc/150?u=support2"
                size="sm"
                color="primary"
              />
              <Avatar
                name="Maya Patel"
                name="MP"
                size="sm"
                color="secondary"
              />
              <Avatar
                name="Jamie Wilson"
                name="JW"
                size="sm"
                color="warning"
              />
            </div>
            <p className="text-xs text-default-500">
              4 agents disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Section spéciale */}
      <div className="mt-12 p-8 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl dark:from-primary-950/20 dark:to-secondary-950/20">
        <h3 className="text-xl font-bold text-foreground mb-4">
          Avatars Spéciaux
        </h3>
        <div className="flex gap-6 items-center flex-wrap">
          <Avatar
            fallback={<IconShield size={24} />}
            color="success"
            size="lg"
            isBordered
            className="shadow-lg"
          />
          <Avatar
            fallback={<IconStar size={24} />}
            color="warning"
            size="lg"
            isBordered
            className="shadow-lg"
          />
          <Avatar
            fallback={<IconSettings size={24} />}
            color="default"
            size="lg"
            isBordered
            className="shadow-lg"
          />
          <Avatar
            fallback={<IconBell size={24} />}
            color="danger"
            size="lg"
            isBordered
            className="shadow-lg"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};