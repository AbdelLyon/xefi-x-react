import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconTag,
  IconX,
  IconCheck,
  IconStar,
  IconHeart,
  IconUser,
  IconHome,
  IconSettings,
  IconBell,
  IconMail,
  IconPhone,
  IconCamera,
  IconMusic,
  IconVideo,
  IconGamepad,
  IconBook,
} from '@tabler/icons-react';
import { Chip, ChipGroup } from './Chip';
import { Avatar } from '../avatar/Avatar';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Chip** - Composant chip avancé avec sélection, animation et validation. Support des groupes et interactions personnalisées.',
      },
    },
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Contenu du chip',
    },
    variant: {
      control: 'select',
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'dot'],
      description: 'Style du chip',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du chip',
    },
    selectable: {
      control: 'boolean',
      description: 'Chip sélectionnable',
    },
    isSelected: {
      control: 'boolean',
      description: 'État sélectionné',
    },
    animated: {
      control: 'boolean',
      description: 'Animations activées',
    },
    onClose: {
      action: 'closed',
      description: 'Handler de fermeture',
    },
    onClick: {
      action: 'clicked',
      description: 'Handler de clic',
    },
    tooltip: {
      control: 'text',
      description: 'Texte du tooltip',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  args: {
    children: 'Chip par défaut',
    color: 'primary',
    variant: 'solid',
  },
};

// Variantes de style
export const Variants: Story = {
  render: () => (
    <div className="space-y-6">
      {(['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'dot'] as const).map((variant) => (
        <div key={variant} className="space-y-2">
          <h4 className="text-sm font-semibold capitalize">{variant}</h4>
          <div className="flex gap-2 flex-wrap">
            {(['primary', 'secondary', 'success', 'warning', 'danger'] as const).map((color) => (
              <Chip key={color} color={color} variant={variant}>
                {color}
              </Chip>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

// Couleurs disponibles
export const Colors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map((color) => (
        <div key={color} className="text-center space-y-2">
          <Chip color={color}>{color}</Chip>
          <p className="text-xs text-default-500 capitalize">{color}</p>
        </div>
      ))}
    </div>
  ),
};

// Tailles
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div className="text-center">
        <Chip size="sm" color="primary">Small</Chip>
        <p className="text-xs mt-2 text-default-500">Small</p>
      </div>
      <div className="text-center">
        <Chip size="md" color="primary">Medium</Chip>
        <p className="text-xs mt-2 text-default-500">Medium</p>
      </div>
      <div className="text-center">
        <Chip size="lg" color="primary">Large</Chip>
        <p className="text-xs mt-2 text-default-500">Large</p>
      </div>
    </div>
  ),
};

// Chips avec icônes
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Icônes de début</h4>
        <div className="flex gap-2 flex-wrap">
          <Chip
            color="primary"
            startContent={<IconUser size={16} />}
          >
            Utilisateur
          </Chip>
          <Chip
            color="success"
            startContent={<IconCheck size={16} />}
          >
            Validé
          </Chip>
          <Chip
            color="warning"
            startContent={<IconStar size={16} />}
          >
            Favori
          </Chip>
          <Chip
            color="danger"
            startContent={<IconHeart size={16} />}
          >
            Aimé
          </Chip>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Icônes de fin</h4>
        <div className="flex gap-2 flex-wrap">
          <Chip
            color="primary"
            endContent={<IconSettings size={16} />}
          >
            Configuration
          </Chip>
          <Chip
            color="secondary"
            endContent={<IconBell size={16} />}
          >
            Notifications
          </Chip>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Les deux</h4>
        <div className="flex gap-2 flex-wrap">
          <Chip
            color="success"
            startContent={<IconHome size={16} />}
            endContent={<IconCheck size={16} />}
          >
            Accueil vérifié
          </Chip>
        </div>
      </div>
    </div>
  ),
};

// Chips avec avatars
export const WithAvatars: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip
        variant="flat"
        avatar={
          <Avatar
            name="JD"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
          />
        }
      >
        John Doe
      </Chip>
      <Chip
        variant="flat"
        color="secondary"
        avatar={
          <Avatar
            name="JS"
            size="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />
        }
      >
        Jane Smith
      </Chip>
      <Chip
        variant="flat"
        color="success"
        avatar={<Avatar name="BW" size="sm" color="success" />}
      >
        Bob Wilson
      </Chip>
    </div>
  ),
};

// Chips sélectionnables
export const Selectable: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Sélection simple</h4>
        <div className="flex gap-2 flex-wrap">
          <Chip
            selectable
            color="primary"
            startContent={<IconTag size={16} />}
          >
            React
          </Chip>
          <Chip
            selectable
            color="secondary"
            startContent={<IconTag size={16} />}
          >
            TypeScript
          </Chip>
          <Chip
            selectable
            color="success"
            startContent={<IconTag size={16} />}
          >
            Vite
          </Chip>
          <Chip
            selectable
            color="warning"
            startContent={<IconTag size={16} />}
          >
            Storybook
          </Chip>
        </div>
        <p className="text-xs text-default-500 mt-2">Cliquez pour sélectionner/désélectionner</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Pré-sélectionnés</h4>
        <div className="flex gap-2 flex-wrap">
          <Chip
            selectable
            isSelected
            color="primary"
            variant="bordered"
          >
            Frontend
          </Chip>
          <Chip
            selectable
            isSelected
            color="success"
            variant="bordered"
          >
            Backend
          </Chip>
          <Chip
            selectable
            color="secondary"
            variant="bordered"
          >
            Mobile
          </Chip>
        </div>
      </div>
    </div>
  ),
};

// Chips avec fermeture
export const Closable: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Chips fermables</h4>
        <div className="flex gap-2 flex-wrap">
          <Chip
            color="primary"
            onClose={() => console.log('Fermé: JavaScript')}
          >
            JavaScript
          </Chip>
          <Chip
            color="secondary"
            onClose={() => console.log('Fermé: Python')}
          >
            Python
          </Chip>
          <Chip
            color="success"
            onClose={() => console.log('Fermé: Java')}
          >
            Java
          </Chip>
          <Chip
            color="warning"
            onClose={() => console.log('Fermé: C++')}
          >
            C++
          </Chip>
        </div>
        <p className="text-xs text-default-500 mt-2">Cliquez sur le X pour fermer</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-3">Avec avatars et fermeture</h4>
        <div className="flex gap-2 flex-wrap">
          <Chip
            variant="flat"
            avatar={<Avatar name="AL" size="sm" color="primary" />}
            onClose={() => console.log('Retiré: Alice')}
          >
            Alice Martin
          </Chip>
          <Chip
            variant="flat"
            color="secondary"
            avatar={<Avatar name="BJ" size="sm" color="secondary" />}
            onClose={() => console.log('Retiré: Bob')}
          >
            Bob Johnson
          </Chip>
        </div>
      </div>
    </div>
  ),
};

// Chips avec tooltips
export const WithTooltips: Story = {
  render: () => (
    <div className="flex gap-2 flex-wrap">
      <Chip
        color="primary"
        tooltip="Framework JavaScript moderne"
        startContent={<IconTag size={16} />}
      >
        React
      </Chip>
      <Chip
        color="secondary"
        tooltip="Superset typé de JavaScript"
        startContent={<IconTag size={16} />}
      >
        TypeScript
      </Chip>
      <Chip
        color="success"
        tooltip="Build tool rapide"
        startContent={<IconTag size={16} />}
      >
        Vite
      </Chip>
    </div>
  ),
};

// ChipGroup - Groupes de chips
export const ChipGroups: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h4 className="text-sm font-semibold mb-4">Groupe basique</h4>
        <ChipGroup
          chips={[
            { children: 'React', color: 'primary', startContent: <IconTag size={16} /> },
            { children: 'Vue', color: 'success', startContent: <IconTag size={16} /> },
            { children: 'Angular', color: 'danger', startContent: <IconTag size={16} /> },
            { children: 'Svelte', color: 'warning', startContent: <IconTag size={16} /> },
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Sélection multiple</h4>
        <ChipGroup
          selectable
          selectionMode="multiple"
          chips={[
            { children: 'HTML', color: 'primary', key: 'html' },
            { children: 'CSS', color: 'secondary', key: 'css' },
            { children: 'JavaScript', color: 'warning', key: 'js' },
            { children: 'TypeScript', color: 'success', key: 'ts' },
            { children: 'React', color: 'primary', key: 'react' },
            { children: 'Node.js', color: 'success', key: 'node' },
          ]}
          wrap
        />
        <p className="text-xs text-default-500 mt-2">Sélection multiple autorisée</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Sélection unique</h4>
        <ChipGroup
          selectable
          selectionMode="single"
          chips={[
            { children: 'Facile', color: 'success', key: 'easy' },
            { children: 'Moyen', color: 'warning', key: 'medium' },
            { children: 'Difficile', color: 'danger', key: 'hard' },
            { children: 'Expert', color: 'secondary', key: 'expert' },
          ]}
        />
        <p className="text-xs text-default-500 mt-2">Un seul choix possible</p>
      </div>

      <div>
        <h4 className="text-sm font-semibold mb-4">Orientations et espacements</h4>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-default-500 mb-2">Horizontal - Espacement large</p>
            <ChipGroup
              orientation="horizontal"
              spacing="lg"
              chips={[
                { children: 'Large', color: 'primary' },
                { children: 'Spacing', color: 'secondary' },
                { children: 'Horizontal', color: 'success' },
              ]}
            />
          </div>
          
          <div>
            <p className="text-xs text-default-500 mb-2">Vertical</p>
            <ChipGroup
              orientation="vertical"
              spacing="md"
              chips={[
                { children: 'Vertical', color: 'primary' },
                { children: 'Layout', color: 'secondary' },
                { children: 'Mode', color: 'success' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Showcase d'utilisation pratique
export const PracticalShowcase: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Chips en Action
        </h2>
        <p className="text-default-500">
          Exemples d'utilisation dans des interfaces réelles
        </p>
      </div>

      {/* Filtres de recherche */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Filtres de Recherche</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-default-600 mb-2">Catégories:</p>
            <ChipGroup
              selectable
              selectionMode="multiple"
              spacing="sm"
              chips={[
                { children: 'Électronique', color: 'primary', startContent: <IconCamera size={14} /> },
                { children: 'Mode', color: 'secondary', startContent: <IconHeart size={14} /> },
                { children: 'Maison', color: 'success', startContent: <IconHome size={14} /> },
                { children: 'Sport', color: 'warning', startContent: <IconGamepad size={14} /> },
                { children: 'Livres', color: 'danger', startContent: <IconBook size={14} /> },
              ]}
            />
          </div>
          
          <div>
            <p className="text-sm text-default-600 mb-2">Prix:</p>
            <ChipGroup
              selectable
              selectionMode="single"
              spacing="sm"
              chips={[
                { children: '< 50€', color: 'success', variant: 'bordered' },
                { children: '50€ - 100€', color: 'warning', variant: 'bordered' },
                { children: '100€ - 200€', color: 'danger', variant: 'bordered' },
                { children: '> 200€', color: 'secondary', variant: 'bordered' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Tags d'article */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Tags d'Article</h3>
        <div className="space-y-2">
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" color="primary" variant="flat">React</Chip>
            <Chip size="sm" color="secondary" variant="flat">TypeScript</Chip>
            <Chip size="sm" color="success" variant="flat">Tutorial</Chip>
            <Chip size="sm" color="warning" variant="flat">Débutant</Chip>
            <Chip size="sm" color="danger" variant="flat">Populaire</Chip>
          </div>
          <p className="text-xs text-default-500">
            Tags automatiques basés sur le contenu
          </p>
        </div>
      </div>

      {/* Équipe projet */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Équipe Projet</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-default-600 mb-2">Membres assignés:</p>
            <div className="flex gap-2 flex-wrap">
              <Chip
                variant="flat"
                avatar={<Avatar name="AM" size="sm" src="https://i.pravatar.cc/150?u=alice" />}
                onClose={() => console.log('Retiré Alice')}
              >
                Alice Martin
              </Chip>
              <Chip
                variant="flat"
                color="secondary"
                avatar={<Avatar name="BJ" size="sm" src="https://i.pravatar.cc/150?u=bob" />}
                onClose={() => console.log('Retiré Bob')}
              >
                Bob Johnson
              </Chip>
              <Chip
                variant="flat"
                color="success"
                avatar={<Avatar name="CD" size="sm" color="success" />}
              >
                Charlie Davis
              </Chip>
            </div>
          </div>

          <div>
            <p className="text-sm text-default-600 mb-2">Rôles:</p>
            <div className="flex gap-2 flex-wrap">
              <Chip color="primary" size="sm" startContent={<IconUser size={14} />}>
                Lead Dev
              </Chip>
              <Chip color="secondary" size="sm" startContent={<IconSettings size={14} />}>
                DevOps
              </Chip>
              <Chip color="success" size="sm" startContent={<IconCheck size={14} />}>
                QA
              </Chip>
            </div>
          </div>
        </div>
      </div>

      {/* Préférences utilisateur */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Préférences</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-default-600 mb-2">Notifications:</p>
            <ChipGroup
              selectable
              selectionMode="multiple"
              spacing="sm"
              chips={[
                { children: 'Email', color: 'primary', startContent: <IconMail size={14} />, key: 'email' },
                { children: 'Push', color: 'success', startContent: <IconBell size={14} />, key: 'push' },
                { children: 'SMS', color: 'warning', startContent: <IconPhone size={14} />, key: 'sms' },
              ]}
              selectedKeys={new Set(['email', 'push'])}
            />
          </div>

          <div>
            <p className="text-sm text-default-600 mb-2">Centres d'intérêt:</p>
            <div className="flex gap-2 flex-wrap">
              <Chip
                selectable
                color="primary"
                size="sm"
                startContent={<IconMusic size={14} />}
              >
                Musique
              </Chip>
              <Chip
                selectable
                color="secondary"
                size="sm"
                startContent={<IconVideo size={14} />}
              >
                Vidéos
              </Chip>
              <Chip
                selectable
                color="success"
                size="sm"
                startContent={<IconGamepad size={14} />}
              >
                Gaming
              </Chip>
              <Chip
                selectable
                color="warning"
                size="sm"
                startContent={<IconBook size={14} />}
              >
                Lecture
              </Chip>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};