import type { Meta, StoryObj } from '@storybook/react';
import { IconPlus, IconDownload, IconHeart, IconStar, IconShare, IconSettings, IconBell, IconUser, IconShoppingCart, IconSearch, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '**Button** - Composant bouton élégant avec support complet dark/light mode, animations fluides et personnalisations avancées.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'],
      description: 'Style visuel du bouton',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'default'],
      description: 'Couleur thématique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du bouton',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    disabled: {
      control: 'boolean',
      description: 'Bouton désactivé',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Pleine largeur',
    },
    children: {
      control: 'text',
      description: 'Contenu du bouton',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Container de démonstration avec fond adaptatif
const DemoContainer = ({ children, title, description }: { children: React.ReactNode, title: string, description?: string }) => (
  <div className="w-full max-w-6xl mx-auto p-8">
    <div className="mb-6">
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      {description && <p className="text-default-500">{description}</p>}
    </div>
    <div className="p-8 rounded-2xl bg-gradient-to-br from-background to-default-50 dark:from-background dark:to-default-900 border border-divider shadow-lg">
      {children}
    </div>
  </div>
);

export const Default: Story = {
  args: {
    children: 'Cliquez-moi',
    color: 'primary',
  },
};

export const ModernShowcase: Story = {
  render: () => (
    <DemoContainer title="Collection Moderne" description="Boutons élégants avec design contemporain">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Primary Actions */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Actions Principales</h4>
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

        {/* Interactive */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Interactifs</h4>
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

        {/* Utility */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">Utilitaires</h4>
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
          <h4 className="font-semibold text-foreground text-sm uppercase tracking-wider">E-commerce</h4>
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
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const ColorPalette: Story = {
  render: () => (
    <DemoContainer title="Palette de Couleurs" description="Toutes les couleurs disponibles dans les thèmes light et dark">
      <div className="space-y-8">
        {(['primary', 'secondary', 'success', 'warning', 'danger', 'default'] as const).map((color) => (
          <div key={color} className="space-y-4">
            <h4 className="font-semibold text-foreground capitalize text-lg">{color}</h4>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
              {(['solid', 'bordered', 'light', 'flat', 'faded', 'shadow', 'ghost'] as const).map((variant) => (
                <Button
                  key={`${color}-${variant}`}
                  color={color}
                  variant={variant}
                  size="sm"
                  className="min-w-[100px]"
                >
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const LoadingStates: Story = {
  render: () => (
    <DemoContainer title="États de Chargement" description="Différents styles de chargement avec animations fluides">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
          <h4 className="font-semibold text-foreground">Avec Texte Personnalisé</h4>
          <div className="space-y-3">
            <Button loading loadingText="Sauvegarde..." color="primary" variant="shadow" className="w-full">
              Sauvegarder
            </Button>
            <Button loading loadingText="Envoi..." color="success" variant="bordered" className="w-full">
              Envoyer
            </Button>
            <Button loading loadingText="Connexion..." color="warning" variant="flat" className="w-full">
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
              loadingText="Traitement..."
              color="success"
              variant="light"
              className="w-full"
            >
              Valider
            </Button>
          </div>
        </div>
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SizeComparison: Story = {
  render: () => (
    <DemoContainer title="Tailles et Proportions" description="Comparaison des différentes tailles avec cohérence visuelle">
      <div className="space-y-8">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size} className="space-y-4">
            <h4 className="font-semibold text-foreground text-xl capitalize">Taille {size}</h4>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size={size} color="primary">
                Texte seul
              </Button>
              <Button size={size} color="primary" leftIcon={<IconPlus size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />}>
                Avec icône gauche
              </Button>
              <Button size={size} color="primary" rightIcon={<IconArrowRight size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />}>
                Avec icône droite
              </Button>
              <Button 
                size={size} 
                color="primary" 
                leftIcon={<IconHeart size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />}
                rightIcon={<IconArrowRight size={size === 'sm' ? 14 : size === 'md' ? 16 : 18} />}
              >
                Icônes des deux côtés
              </Button>
              <Button size={size} color="primary" variant="bordered" loading>
                Chargement
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const InteractiveDemo: Story = {
  render: () => (
    <DemoContainer title="Démonstration Interactive" description="Testez les interactions et animations">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h4 className="font-semibold text-foreground text-lg">Actions de Base</h4>
          <div className="space-y-4">
            <Button 
              color="primary" 
              variant="shadow"
              size="lg"
              onClick={() => alert('Bouton Primary cliqué!')}
              leftIcon={<IconCheck size={18} />}
              className="w-full"
            >
              Action Principale
            </Button>
            <Button 
              color="secondary" 
              variant="bordered"
              onClick={() => alert('Action secondaire!')}
              className="w-full"
            >
              Action Secondaire
            </Button>
            <Button 
              color="danger" 
              variant="light"
              onClick={() => confirm('Êtes-vous sûr de vouloir supprimer?')}
              className="w-full"
            >
              Action Dangereuse
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-semibold text-foreground text-lg">États Spéciaux</h4>
          <div className="space-y-4">
            <Button 
              color="success" 
              variant="flat"
              fullWidth
              leftIcon={<IconDownload size={16} />}
            >
              Pleine largeur
            </Button>
            <Button 
              color="warning" 
              variant="bordered"
              disabled
              className="w-full"
            >
              Bouton désactivé
            </Button>
            <Button 
              color="default" 
              variant="ghost"
              className="w-full"
              disableRipple
            >
              Sans effet ripple
            </Button>
          </div>
        </div>
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};