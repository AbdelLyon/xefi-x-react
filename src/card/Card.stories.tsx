import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../button/Button';
import { Avatar } from '../avatar/Avatar';
import { 
  IconHeart, 
  IconShare, 
  IconBookmark, 
  IconEye, 
  IconStar,
  IconShoppingCart,
  IconClock,
  IconMapPin,
  IconUser,
  IconCamera,
  IconMessage,
  IconThumbUp,
  IconTrendingUp,
  IconShield,
  IconCreditCard,
  IconGift
} from '@tabler/icons-react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '**Card** - Composant carte élégant avec support complet dark/light mode, layouts flexibles et contenu riche.',
      },
    },
  },
  argTypes: {
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Ombre de la carte',
    },
    radius: {
      control: 'select', 
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Rayon des bordures',
    },
    isHoverable: {
      control: 'boolean',
      description: 'Effets au survol',
    },
    isPressable: {
      control: 'boolean',
      description: 'Carte cliquable',
    },
    isBlurred: {
      control: 'boolean',
      description: 'Effet de flou',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Container de démonstration avec fond adaptatif
const DemoContainer = ({ children, title, description, className = "" }: { 
  children: React.ReactNode, 
  title: string, 
  description?: string,
  className?: string
}) => (
  <div className={`w-full max-w-7xl mx-auto p-8 ${className}`}>
    <div className="mb-8">
      <h3 className="text-3xl font-bold text-foreground mb-3">{title}</h3>
      {description && <p className="text-default-500 text-lg">{description}</p>}
    </div>
    <div className="p-8 rounded-3xl bg-gradient-to-br from-background via-default-50/50 to-default-100 dark:from-background dark:via-default-950/50 dark:to-default-900 border border-divider shadow-xl backdrop-blur-sm">
      {children}
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: 'Contenu de la carte par défaut',
    shadow: 'sm',
  },
};

export const ModernShowcase: Story = {
  render: () => (
    <DemoContainer title="Showcase Moderne" description="Collection de cartes élégantes avec différents styles et contenus">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Carte Profil Utilisateur */}
        <Card
          isHoverable
          isPressable
          shadow="lg"
          radius="lg"
          className="max-w-[400px]"
          header={
            <div className="relative overflow-hidden">
              <div className="h-32 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500"></div>
              <div className="absolute bottom-4 left-4">
                <Avatar 
                  size="lg"
                  src="https://i.pravatar.cc/150?u=profile1"
                  className="ring-4 ring-white dark:ring-background"
                />
              </div>
            </div>
          }
          footer={
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button size="sm" variant="light" color="primary" leftIcon={<IconMessage size={14} />}>
                  Message
                </Button>
                <Button size="sm" variant="flat" color="primary" leftIcon={<IconUser size={14} />}>
                  Suivre
                </Button>
              </div>
              <Button size="sm" variant="light" leftIcon={<IconShare size={14} />}>
                <span className="sr-only">Partager</span>
              </Button>
            </div>
          }
        >
          <div className="px-4 py-2">
            <h4 className="text-xl font-bold text-foreground">Sophie Martin</h4>
            <p className="text-default-500 mb-3">Designer UI/UX</p>
            <p className="text-sm text-default-600">Passionnée par la création d'expériences utilisateur exceptionnelles.</p>
            <div className="flex items-center gap-4 mt-4 text-sm text-default-500">
              <span className="flex items-center gap-1">
                <IconMapPin size={14} />
                Paris, France
              </span>
              <span className="flex items-center gap-1">
                <IconUser size={14} />
                2.1k suiveurs
              </span>
            </div>
          </div>
        </Card>

        {/* Carte Produit E-commerce */}
        <Card
          isHoverable
          isPressable
          shadow="md"
          radius="lg"
          className="max-w-[400px]"
          header={
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=250&fit=crop&crop=center"
                alt="Sneakers"
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <Button size="sm" variant="flat" color="danger" isIconOnly leftIcon={<IconHeart size={16} />}>
                  <span className="sr-only">Ajouter aux favoris</span>
                </Button>
              </div>
              <div className="absolute top-3 left-3">
                <div className="bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                  -20%
                </div>
              </div>
            </div>
          }
          footer={
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <IconStar 
                        key={i} 
                        size={14} 
                        className={`${i < 4 ? 'text-warning fill-warning' : 'text-default-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-default-500">(124)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-foreground">€79</span>
                  <span className="text-sm text-default-400 line-through">€99</span>
                </div>
              </div>
              <Button color="primary" variant="shadow" leftIcon={<IconShoppingCart size={16} />}>
                Ajouter
              </Button>
            </div>
          }
        >
          <div className="px-4 py-2">
            <h4 className="font-semibold text-foreground mb-1">Sneakers Premium</h4>
            <p className="text-sm text-default-500">Chaussures de sport haut de gamme avec technologie avancée.</p>
          </div>
        </Card>

        {/* Carte Article/Blog */}
        <Card
          isHoverable
          isPressable
          shadow="sm"
          radius="lg"
          className="max-w-[400px]"
          header={
            <div className="relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop&crop=center"
                alt="Article"
                className="w-full h-40 object-cover"
              />
              <div className="absolute bottom-3 left-3">
                <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                  Technologie
                </div>
              </div>
            </div>
          }
          footer={
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 text-sm text-default-500">
                <span className="flex items-center gap-1">
                  <IconEye size={14} />
                  1.2k vues
                </span>
                <span className="flex items-center gap-1">
                  <IconThumbUp size={14} />
                  89 likes
                </span>
              </div>
              <div className="flex gap-1">
                <Button size="sm" variant="light" leftIcon={<IconBookmark size={14} />}>
                  <span className="sr-only">Sauvegarder</span>
                </Button>
                <Button size="sm" variant="light" leftIcon={<IconShare size={14} />}>
                  <span className="sr-only">Partager</span>
                </Button>
              </div>
            </div>
          }
        >
          <div className="px-4 py-2">
            <h4 className="text-lg font-semibold text-foreground mb-2">L'avenir de l'IA en 2024</h4>
            <p className="text-sm text-default-600 mb-3">
              Découvrez les tendances et innovations qui vont révolutionner l'intelligence artificielle cette année.
            </p>
            <div className="flex items-center gap-2">
              <Avatar size="sm" src="https://i.pravatar.cc/40?u=author1" />
              <div>
                <p className="text-sm font-medium text-foreground">Alex Chen</p>
                <p className="text-xs text-default-400">Il y a 2 heures</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const StyleVariations: Story = {
  render: () => (
    <DemoContainer title="Variations de Style" description="Différentes ombres, rayons et effets visuels">
      <div className="space-y-12">
        {/* Ombres */}
        <div>
          <h4 className="text-xl font-semibold text-foreground mb-6">Ombres</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
              <Card
                key={shadow}
                shadow={shadow}
                className="p-6 text-center"
                isHoverable
              >
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground capitalize">{shadow}</h5>
                  <p className="text-sm text-default-500">Shadow {shadow}</p>
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Rayons */}
        <div>
          <h4 className="text-xl font-semibold text-foreground mb-6">Rayons de Bordure</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {(['none', 'sm', 'md', 'lg'] as const).map((radius) => (
              <Card
                key={radius}
                radius={radius}
                shadow="md"
                className="p-6 text-center"
                isHoverable
              >
                <div className="space-y-2">
                  <h5 className="font-semibold text-foreground capitalize">{radius}</h5>
                  <p className="text-sm text-default-500">Radius {radius}</p>
                  <div className="w-12 h-12 bg-gradient-to-br from-success to-warning rounded-lg mx-auto"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const InteractiveStates: Story = {
  render: () => (
    <DemoContainer title="États Interactifs" description="Cartes avec différents états d'interaction">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card className="p-6 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gradient-to-br from-default-200 to-default-300 dark:from-default-700 dark:to-default-800 rounded-2xl mx-auto flex items-center justify-center">
              <IconShield size={24} className="text-default-600 dark:text-default-400" />
            </div>
            <h5 className="font-semibold text-foreground">Statique</h5>
            <p className="text-sm text-default-500">Carte standard sans interactions</p>
          </div>
        </Card>

        <Card isHoverable className="p-6 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-800 dark:to-primary-600 rounded-2xl mx-auto flex items-center justify-center">
              <IconCursor size={24} className="text-primary-700 dark:text-primary-300" />
            </div>
            <h5 className="font-semibold text-foreground">Hoverable</h5>
            <p className="text-sm text-default-500">Effet au survol activé</p>
          </div>
        </Card>

        <Card isPressable className="p-6 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary-200 to-secondary-400 dark:from-secondary-800 dark:to-secondary-600 rounded-2xl mx-auto flex items-center justify-center">
              <IconClick size={24} className="text-secondary-700 dark:text-secondary-300" />
            </div>
            <h5 className="font-semibold text-foreground">Pressable</h5>
            <p className="text-sm text-default-500">Cliquable avec effet de pression</p>
          </div>
        </Card>

        <Card isHoverable isPressable className="p-6 text-center">
          <div className="space-y-3">
            <div className="w-16 h-16 bg-gradient-to-br from-success-200 to-success-400 dark:from-success-800 dark:to-success-600 rounded-2xl mx-auto flex items-center justify-center">
              <IconTrendingUp size={24} className="text-success-700 dark:text-success-300" />
            </div>
            <h5 className="font-semibold text-foreground">Interactif</h5>
            <p className="text-sm text-default-500">Combinaison hover + press</p>
          </div>
        </Card>
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const BusinessCards: Story = {
  render: () => (
    <DemoContainer title="Cartes Business" description="Exemples d'utilisation professionnelle avec données réelles">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Dashboard Analytics */}
        <Card
          shadow="lg"
          radius="lg"
          className="p-6"
          isHoverable
        >
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold text-foreground">Revenus Mensuels</h4>
                <p className="text-sm text-default-500">Mars 2024</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-success-100 to-success-200 dark:from-success-900 dark:to-success-800 rounded-xl flex items-center justify-center">
                <IconTrendingUp size={20} className="text-success-600 dark:text-success-400" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground mb-1">€24,750</div>
              <div className="flex items-center gap-2">
                <span className="text-success text-sm font-medium">+12.5%</span>
                <span className="text-default-400 text-sm">vs mois précédent</span>
              </div>
            </div>
            <div className="w-full bg-default-200 dark:bg-default-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-success-400 to-success-600 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </Card>

        {/* Carte de Notification */}
        <Card
          shadow="md"
          radius="lg"
          className="border-l-4 border-l-warning"
          isHoverable
        >
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-warning-100 dark:bg-warning-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <IconClock size={18} className="text-warning-600 dark:text-warning-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Maintenance Programmée</h4>
                <p className="text-sm text-default-600">Une maintenance système est prévue dimanche de 2h à 6h du matin.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="flat" color="warning">
                En savoir plus
              </Button>
              <Button size="sm" variant="light">
                Ignorer
              </Button>
            </div>
          </div>
        </Card>

        {/* Carte Équipe */}
        <Card
          shadow="lg"
          radius="lg"
          className="overflow-hidden"
          isHoverable
          isPressable
        >
          <div className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <IconUser size={20} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Équipe Design</h4>
                <p className="text-sm text-default-500">8 membres actifs</p>
              </div>
            </div>
            <div className="flex -space-x-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Avatar
                  key={i}
                  size="sm"
                  src={`https://i.pravatar.cc/40?u=team${i}`}
                  className="ring-2 ring-background"
                />
              ))}
              <div className="w-8 h-8 bg-default-200 dark:bg-default-700 rounded-full flex items-center justify-center ring-2 ring-background text-xs font-medium text-default-600">
                +3
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-default-600">Progression</span>
                <span className="font-medium text-foreground">68%</span>
              </div>
              <div className="w-full bg-default-200 dark:bg-default-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Fix pour les icônes manquantes
const IconCursor = ({ size, className }: { size: number; className?: string }) => (
  <IconUser size={size} className={className} />
);

const IconClick = ({ size, className }: { size: number; className?: string }) => (
  <IconCamera size={size} className={className} />
);