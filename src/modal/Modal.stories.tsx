import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from './Modal';
import { Button } from '../button/Button';
import { Avatar } from '../avatar/Avatar';
import { 
  IconTrash, 
  IconEdit, 
  IconAlertTriangle, 
  IconCheck, 
  IconX,
  IconUser,
  IconSettings,
  IconShield,
  IconCreditCard,
  IconBell,
  IconPhoto,
  IconUpload,
  IconDownload,
  IconShare,
  IconHeart,
  IconStar,
  IconEye
} from '@tabler/icons-react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '**Modal** - Composant modal élégant avec support complet dark/light mode, animations fluides et layouts personnalisables.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'],
      description: 'Taille du modal',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Rayon des bordures',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Ombre du modal',
    },
    backdrop: {
      control: 'select',
      options: ['transparent', 'opaque', 'blur'],
      description: 'Style de l\'arrière-plan',
    },
    placement: {
      control: 'select',
      options: ['center', 'top', 'top-center', 'bottom', 'bottom-center'],
      description: 'Position du modal',
    },
    scrollBehavior: {
      control: 'select',
      options: ['normal', 'inside', 'outside'],
      description: 'Comportement du scroll',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Container de démonstration
const DemoContainer = ({ children, title, description }: { 
  children: React.ReactNode, 
  title: string, 
  description?: string
}) => (
  <div className="w-full max-w-6xl mx-auto p-8">
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
    trigger: <Button color="primary">Ouvrir Modal</Button>,
    title: 'Modal par Défaut',
    children: 'Contenu du modal par défaut avec un texte d\'exemple.',
  },
};

export const ModernShowcase: Story = {
  render: () => (
    <DemoContainer title="Showcase Moderne" description="Collection de modals élégants pour différents cas d'usage">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Confirmation de Suppression */}
        <Modal
          trigger={
            <Button 
              color="danger" 
              variant="flat"
              leftIcon={<IconTrash size={16} />}
              className="w-full"
            >
              Supprimer un élément
            </Button>
          }
          title={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-danger-100 dark:bg-danger-900 rounded-full flex items-center justify-center">
                <IconAlertTriangle size={20} className="text-danger-600 dark:text-danger-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Confirmer la suppression</h3>
              </div>
            </div>
          }
          size="sm"
          buttonCloseLabel="Annuler"
          buttonActionLabel="Supprimer"
          buttonActionProps={{
            color: 'danger',
            leftIcon: <IconTrash size={16} />,
          }}
          onAction={() => {
            alert('Élément supprimé avec succès !');
          }}
        >
          <div className="py-4">
            <p className="text-default-600 mb-4">
              Cette action est irréversible. Toutes les données associées à cet élément seront définitivement perdues.
            </p>
            <div className="p-4 bg-danger-50 dark:bg-danger-950 rounded-lg border border-danger-200 dark:border-danger-800">
              <p className="text-sm text-danger-700 dark:text-danger-300 font-medium">
                ⚠️ Attention : Cette opération ne peut pas être annulée
              </p>
            </div>
          </div>
        </Modal>

        {/* Profil Utilisateur */}
        <Modal
          trigger={
            <Button 
              color="primary" 
              variant="bordered"
              leftIcon={<IconUser size={16} />}
              className="w-full"
            >
              Voir le profil
            </Button>
          }
          title="Profil Utilisateur"
          size="md"
          hideCloseButton={false}
          backdrop="blur"
        >
          <div className="py-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar 
                size="xl" 
                src="https://i.pravatar.cc/150?u=modal-user"
                className="ring-4 ring-primary-100 dark:ring-primary-900"
              />
              <div className="flex-1">
                <h4 className="text-xl font-bold text-foreground">Marie Dupont</h4>
                <p className="text-default-500 mb-2">Développeuse Full Stack</p>
                <div className="flex gap-2">
                  <div className="px-2 py-1 bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300 rounded-full text-xs font-medium">
                    En ligne
                  </div>
                  <div className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium">
                    Pro
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-default-50 dark:bg-default-800">
                  <div className="text-lg font-bold text-foreground">127</div>
                  <div className="text-sm text-default-500">Projets</div>
                </div>
                <div className="p-3 rounded-lg bg-default-50 dark:bg-default-800">
                  <div className="text-lg font-bold text-foreground">2.4k</div>
                  <div className="text-sm text-default-500">Followers</div>
                </div>
                <div className="p-3 rounded-lg bg-default-50 dark:bg-default-800">
                  <div className="text-lg font-bold text-foreground">98%</div>
                  <div className="text-sm text-default-500">Satisfaction</div>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" color="primary" leftIcon={<IconHeart size={14} />} className="flex-1">
                  Suivre
                </Button>
                <Button size="sm" variant="bordered" leftIcon={<IconShare size={14} />} className="flex-1">
                  Partager
                </Button>
              </div>
            </div>
          </div>
        </Modal>

        {/* Paramètres Avancés */}
        <Modal
          trigger={
            <Button 
              color="default" 
              variant="flat"
              leftIcon={<IconSettings size={16} />}
              className="w-full"
            >
              Paramètres
            </Button>
          }
          title={
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <IconSettings size={16} className="text-white" />
              </div>
              <span>Paramètres Avancés</span>
            </div>
          }
          size="lg"
          scrollBehavior="inside"
        >
          <div className="py-4 space-y-6">
            {/* Section Sécurité */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <IconShield size={18} />
                Sécurité
              </h4>
              <div className="space-y-3 pl-6">
                <div className="flex justify-between items-center p-3 rounded-lg bg-default-50 dark:bg-default-800">
                  <div>
                    <p className="font-medium text-foreground">Authentification à deux facteurs</p>
                    <p className="text-sm text-default-500">Protection supplémentaire de votre compte</p>
                  </div>
                  <Button size="sm" color="success" variant="flat">Activée</Button>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-default-50 dark:bg-default-800">
                  <div>
                    <p className="font-medium text-foreground">Sessions actives</p>
                    <p className="text-sm text-default-500">Gérer vos connexions</p>
                  </div>
                  <Button size="sm" variant="bordered">3 actives</Button>
                </div>
              </div>
            </div>

            {/* Section Notifications */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <IconBell size={18} />
                Notifications
              </h4>
              <div className="space-y-3 pl-6">
                {['Email', 'Push', 'SMS'].map((type) => (
                  <div key={type} className="flex justify-between items-center p-3 rounded-lg bg-default-50 dark:bg-default-800">
                    <div>
                      <p className="font-medium text-foreground">Notifications {type}</p>
                      <p className="text-sm text-default-500">Recevoir des alertes par {type.toLowerCase()}</p>
                    </div>
                    <Button size="sm" color="primary" variant="light">
                      {type === 'Email' ? 'Activées' : 'Désactivées'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Section Facturation */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <IconCreditCard size={18} />
                Facturation
              </h4>
              <div className="p-4 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-950 dark:to-secondary-950 border border-primary-200 dark:border-primary-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">Plan Premium</span>
                  <span className="text-sm text-primary-600 dark:text-primary-400 font-medium">€29/mois</span>
                </div>
                <p className="text-sm text-default-600 mb-3">Prochaine facturation le 15 avril 2024</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="flat" color="primary">Gérer</Button>
                  <Button size="sm" variant="light">Historique</Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SizeVariations: Story = {
  render: () => (
    <DemoContainer title="Variations de Taille" description="Différentes tailles de modals pour tous les besoins">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <Modal
            key={size}
            trigger={
              <Button size="sm" variant="bordered" className="w-full">
                {size.toUpperCase()}
              </Button>
            }
            title={`Modal ${size.toUpperCase()}`}
            size={size}
          >
            <div className="py-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-lg">{size.toUpperCase()}</span>
              </div>
              <p className="text-default-600">
                Modal de taille <strong>{size}</strong> avec contenu adapté à cette dimension.
              </p>
            </div>
          </Modal>
        ))}
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const BackdropStyles: Story = {
  render: () => (
    <DemoContainer title="Styles d'Arrière-plan" description="Différents effets d'arrière-plan pour les modals">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['transparent', 'opaque', 'blur'] as const).map((backdrop) => (
          <Modal
            key={backdrop}
            trigger={
              <Button 
                variant="flat" 
                className="w-full p-6 h-auto flex-col gap-2"
                color={backdrop === 'blur' ? 'primary' : backdrop === 'opaque' ? 'secondary' : 'default'}
              >
                <div className="text-lg font-semibold capitalize">{backdrop}</div>
                <div className="text-sm opacity-70">
                  {backdrop === 'blur' ? 'Effet de flou' : backdrop === 'opaque' ? 'Fond opaque' : 'Arrière-plan transparent'}
                </div>
              </Button>
            }
            title={`Backdrop ${backdrop}`}
            backdrop={backdrop}
            size="md"
          >
            <div className="py-4 text-center">
              <p className="text-default-600 mb-4">
                Ce modal utilise un arrière-plan de type <strong>{backdrop}</strong>.
              </p>
              <p className="text-sm text-default-500">
                {backdrop === 'blur' && "L'arrière-plan est flouté pour un effet moderne."}
                {backdrop === 'opaque' && "L'arrière-plan est complètement opaque."}
                {backdrop === 'transparent' && "L'arrière-plan reste transparent."}
              </p>
            </div>
          </Modal>
        ))}
      </div>
    </DemoContainer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const FormExample = () => {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [bio, setBio] = useState('');

      return (
        <Modal
          trigger={
            <Button 
              color="primary" 
              variant="shadow"
              leftIcon={<IconEdit size={16} />}
              size="lg"
            >
              Éditer le Profil
            </Button>
          }
          title={
            <div className="flex items-center gap-3">
              <Avatar size="md" src="https://i.pravatar.cc/60?u=edit-profile" />
              <div>
                <h3 className="font-semibold text-foreground">Éditer le Profil</h3>
                <p className="text-sm text-default-500">Modifiez vos informations personnelles</p>
              </div>
            </div>
          }
          size="md"
          buttonCloseLabel="Annuler"
          buttonActionLabel="Sauvegarder les modifications"
          buttonActionProps={{
            color: 'primary',
            leftIcon: <IconCheck size={16} />,
          }}
          onAction={() => {
            alert(`Profil sauvegardé !\nNom: ${name || 'Non défini'}\nEmail: ${email || 'Non défini'}\nBio: ${bio || 'Non définie'}`);
          }}
        >
          <div className="py-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Nom complet
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-default-300 dark:border-default-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background dark:bg-default-50 text-foreground"
                placeholder="Votre nom complet"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-default-300 dark:border-default-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background dark:bg-default-50 text-foreground"
                placeholder="votre@email.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Biographie
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-default-300 dark:border-default-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background dark:bg-default-50 text-foreground resize-none"
                placeholder="Parlez-nous de vous..."
              />
            </div>

            <div className="p-3 bg-primary-50 dark:bg-primary-950 rounded-lg border border-primary-200 dark:border-primary-800">
              <p className="text-sm text-primary-700 dark:text-primary-300">
                💡 <strong>Astuce :</strong> Une biographie bien rédigée augmente votre visibilité de 60%.
              </p>
            </div>
          </div>
        </Modal>
      );
    };

    return (
      <DemoContainer title="Démonstration Interactive" description="Modal avec formulaire interactif et validation">
        <div className="text-center">
          <FormExample />
        </div>
      </DemoContainer>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};