import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconX,
  IconRefresh,
  IconDownload,
  IconSettings,
  IconBell,
  IconShield,
  IconWifi,
  IconBattery,
} from '@tabler/icons-react';
import { Alert } from './Alert';
import { Button } from '../button/Button';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Alert** - Composant d\'alerte élégant avec support complet dark/light mode, auto-dismiss et actions personnalisées.',
      },
    },
  },
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'default',
      ],
      description: 'Couleur thématique de l\'alerte',
    },
    variant: {
      control: 'select',
      options: ['solid', 'bordered', 'flat', 'faded'],
      description: 'Style visuel de l\'alerte',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Radius des coins',
    },
    isClosable: {
      control: 'boolean',
      description: 'Alerte fermable',
    },
    autoCloseDelay: {
      control: 'number',
      description: 'Auto-fermeture après X millisecondes',
    },
    dismissOnEscape: {
      control: 'boolean',
      description: 'Fermeture avec la touche Escape',
    },
    title: {
      control: 'text',
      description: 'Titre de l\'alerte',
    },
    children: {
      control: 'text',
      description: 'Contenu de l\'alerte',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Information',
    children: 'Ceci est une alerte par défaut avec des informations importantes.',
    color: 'primary',
  },
};

export const ColorsShowcase: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Alertes par Couleur
      </h3>
      
      <Alert
        color="success"
        title="Succès"
        icon={<IconCheck size={20} />}
        isClosable
      >
        L'opération s'est terminée avec succès. Vos modifications ont été sauvegardées.
      </Alert>

      <Alert
        color="warning"
        title="Attention"
        icon={<IconAlertTriangle size={20} />}
        isClosable
      >
        Cette action nécessite votre attention. Veuillez vérifier les paramètres avant de continuer.
      </Alert>

      <Alert
        color="danger"
        title="Erreur"
        icon={<IconAlertCircle size={20} />}
        isClosable
      >
        Une erreur s'est produite lors du traitement de votre demande. Veuillez réessayer.
      </Alert>

      <Alert
        color="primary"
        title="Information"
        icon={<IconInfoCircle size={20} />}
        isClosable
      >
        Nouvelle mise à jour disponible. Cliquez ici pour en savoir plus sur les nouvelles fonctionnalités.
      </Alert>

      <Alert
        color="secondary"
        title="Notification"
        icon={<IconBell size={20} />}
        isClosable
      >
        Vous avez 3 nouvelles notifications en attente dans votre boîte de réception.
      </Alert>

      <Alert
        color="default"
        title="Information Générale"
        icon={<IconSettings size={20} />}
        isClosable
      >
        Les paramètres système ont été mis à jour. Redémarrage recommandé.
      </Alert>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const VariantsShowcase: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Variantes de Style
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Solid</h4>
          <Alert
            variant="solid"
            color="primary"
            title="Alerte Solid"
            icon={<IconInfoCircle size={18} />}
          >
            Style solid avec fond plein et couleur contrastée.
          </Alert>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Bordered</h4>
          <Alert
            variant="bordered"
            color="success"
            title="Alerte Bordered"
            icon={<IconCheck size={18} />}
          >
            Style bordered avec bordure colorée et fond transparent.
          </Alert>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Flat</h4>
          <Alert
            variant="flat"
            color="warning"
            title="Alerte Flat"
            icon={<IconAlertTriangle size={18} />}
          >
            Style flat avec fond subtil et bordures discrètes.
          </Alert>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Faded</h4>
          <Alert
            variant="faded"
            color="danger"
            title="Alerte Faded"
            icon={<IconAlertCircle size={18} />}
          >
            Style faded avec effet d'estompage élégant.
          </Alert>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithActions: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Alertes avec Actions
      </h3>
      
      <Alert
        color="primary"
        title="Mise à jour disponible"
        icon={<IconDownload size={20} />}
        isClosable
        actions={
          <div className="flex gap-2">
            <Button size="sm" color="primary" variant="solid">
              Télécharger
            </Button>
            <Button size="sm" color="primary" variant="bordered">
              Plus tard
            </Button>
          </div>
        }
      >
        Une nouvelle version de l'application est disponible avec des améliorations importantes.
      </Alert>

      <Alert
        color="warning"
        title="Confirmer la suppression"
        icon={<IconAlertTriangle size={20} />}
        actions={
          <div className="flex gap-2">
            <Button size="sm" color="danger" variant="solid">
              Supprimer
            </Button>
            <Button size="sm" variant="light">
              Annuler
            </Button>
          </div>
        }
      >
        Cette action est irréversible. Êtes-vous sûr de vouloir supprimer ces éléments ?
      </Alert>

      <Alert
        color="success"
        title="Sauvegarde terminée"
        icon={<IconCheck size={20} />}
        isClosable
        actions={
          <Button size="sm" color="success" variant="bordered" leftIcon={<IconSettings size={14} />}>
            Voir les détails
          </Button>
        }
      >
        Vos données ont été sauvegardées avec succès dans le cloud.
      </Alert>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const AutoDismiss: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Auto-fermeture
      </h3>
      
      <Alert
        color="success"
        title="Message envoyé"
        icon={<IconCheck size={20} />}
        autoCloseDelay={3000}
        onClose={() => console.log('Alert fermée automatiquement')}
      >
        Votre message a été envoyé avec succès. Cette alerte disparaîtra dans 3 secondes.
      </Alert>

      <Alert
        color="primary"
        title="Notification temporaire"
        icon={<IconBell size={20} />}
        autoCloseDelay={5000}
        isClosable
      >
        Cette notification se fermera automatiquement dans 5 secondes, ou vous pouvez la fermer manuellement.
      </Alert>

      <Alert
        color="warning"
        title="Session expirée"
        icon={<IconRefresh size={20} />}
        autoCloseDelay={10000}
        actions={
          <Button size="sm" color="warning" variant="bordered">
            Renouveler
          </Button>
        }
      >
        Votre session expirera dans 10 secondes. Cliquez pour renouveler.
      </Alert>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SystemNotifications: Story = {
  render: () => (
    <div className="w-full max-w-6xl p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Notifications Système
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">États Système</h4>
          
          <Alert
            color="success"
            variant="bordered"
            title="Connexion établie"
            icon={<IconWifi size={18} />}
            autoCloseDelay={4000}
          >
            Connexion Wi-Fi rétablie. Synchronisation en cours...
          </Alert>

          <Alert
            color="warning"
            variant="flat"
            title="Batterie faible"
            icon={<IconBattery size={18} />}
            actions={
              <Button size="sm" color="warning" variant="light">
                Mode économie
              </Button>
            }
          >
            Il reste 15% de batterie. Connectez le chargeur.
          </Alert>

          <Alert
            color="danger"
            variant="bordered"
            title="Erreur de sécurité"
            icon={<IconShield size={18} />}
            isClosable
          >
            Tentative de connexion suspecte détectée. Vérifiez vos paramètres.
          </Alert>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Mises à jour</h4>
          
          <Alert
            color="primary"
            variant="solid"
            title="Maintenance programmée"
            icon={<IconSettings size={18} />}
            actions={
              <div className="flex gap-2">
                <Button size="sm" color="primary" variant="bordered">
                  En savoir plus
                </Button>
                <Button size="sm" variant="light">
                  Rappeler plus tard
                </Button>
              </div>
            }
          >
            Maintenance système prévue dimanche de 2h à 6h du matin.
          </Alert>

          <Alert
            color="secondary"
            variant="flat"
            title="Nouvelles fonctionnalités"
            icon={<IconBell size={18} />}
            isClosable
          >
            Découvrez les nouvelles fonctionnalités dans la dernière mise à jour.
          </Alert>

          <Alert
            color="default"
            variant="faded"
            title="Sauvegarde automatique"
            icon={<IconRefresh size={18} />}
            autoCloseDelay={6000}
          >
            Sauvegarde automatique en cours... Ne fermez pas l'application.
          </Alert>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const CustomStyling: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Styles Personnalisés
      </h3>
      
      <Alert
        color="primary"
        title="Style personnalisé complet"
        icon={<IconInfoCircle size={20} />}
        isClosable
        className="border-l-4 border-l-primary"
        classNames={{
          base: "bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950 dark:to-blue-950",
          mainWrapper: "gap-4",
          description: "text-sm",
          iconWrapper: "bg-primary-100 dark:bg-primary-900 rounded-full p-2",
        }}
      >
        Cette alerte utilise des styles personnalisés pour un rendu unique avec gradient et icône stylisée.
      </Alert>

      <Alert
        color="success"
        title="Bordure gauche accentuée"
        icon={<IconCheck size={20} />}
        className="border-l-4 border-l-success shadow-lg"
        radius="lg"
      >
        Alerte avec bordure gauche colorée et ombre prononcée pour plus d'impact visuel.
      </Alert>

      <Alert
        color="warning"
        title="Style moderne"
        icon={<IconAlertTriangle size={20} />}
        isClosable
        className="backdrop-blur-sm bg-warning-50/80 dark:bg-warning-950/80 border border-warning-200 dark:border-warning-800"
        radius="full"
      >
        Effet de flou moderne avec transparence et bordures arrondies complètes.
      </Alert>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};