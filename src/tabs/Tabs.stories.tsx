import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconPhoto,
  IconVideo,
  IconMusic,
  IconFile,
  IconSettings,
  IconUser,
  IconBell,
  IconShield,
  IconCreditCard,
  IconChart,
  IconCalendar,
  IconMail,
  IconPhone,
  IconMapPin,
  IconStar,
  IconHeart,
  IconBookmark,
  IconDownload,
  IconUpload,
  IconSearch,
} from '@tabler/icons-react';
import { Tabs } from './Tabs';
import type { TabItem } from './Tabs';
import { Card } from '../card/Card';
import { Button } from '../button/Button';
import { Avatar } from '../avatar/Avatar';
import { Badge } from '../badge/Badge';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Tabs** - Composant d\'onglets élégant avec support complet dark/light mode, configurations flexibles et rendu personnalisé.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'underlined', 'bordered', 'light'],
      description: 'Style visuel des onglets',
    },
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
      description: 'Couleur thématique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille des onglets',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Radius des coins',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
      description: 'Position des onglets',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Onglets désactivés',
    },
    disabledKeys: {
      control: 'object',
      description: 'Clés des onglets désactivés',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tab items
const basicTabItems: TabItem[] = [
  {
    key: 'photos',
    title: 'Photos',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Galerie Photos</h3>
        <p className="text-default-600 mb-4">
          Parcourez votre collection de photos et souvenirs.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center"
            >
              <IconPhoto size={24} className="text-default-500" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: 'videos',
    title: 'Vidéos',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Mes Vidéos</h3>
        <p className="text-default-600 mb-4">
          Accédez à votre bibliothèque vidéo personnelle.
        </p>
        <div className="space-y-3">
          {['Vacances été 2024', 'Présentation projet', 'Tutoriel React'].map((title) => (
            <div key={title} className="flex items-center gap-3 p-3 bg-default-100 dark:bg-default-800 rounded-lg">
              <IconVideo size={20} className="text-primary" />
              <span className="font-medium text-foreground">{title}</span>
              <Button size="sm" variant="light">Voir</Button>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    key: 'music',
    title: 'Musique',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-3 text-foreground">Playlist</h3>
        <p className="text-default-600 mb-4">
          Découvrez votre collection musicale.
        </p>
        <div className="space-y-2">
          {['Rock Classics', 'Chill Vibes', 'Workout Mix'].map((playlist) => (
            <div key={playlist} className="flex items-center gap-3 p-2 hover:bg-default-100 dark:hover:bg-default-800 rounded-lg cursor-pointer">
              <IconMusic size={18} className="text-success" />
              <span className="text-foreground">{playlist}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export const Default: Story = {
  args: {
    items: basicTabItems,
    variant: 'solid',
    color: 'primary',
    size: 'md',
  },
};

export const VariantsShowcase: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Variantes d'Onglets
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Solid</h4>
          <Tabs
            items={[
              {
                key: '1',
                title: 'Onglet 1',
                content: <div className="p-4 text-center">Contenu de l'onglet solid</div>,
              },
              {
                key: '2',
                title: 'Onglet 2',
                content: <div className="p-4 text-center">Style avec fond plein</div>,
              },
            ]}
            variant="solid"
            color="primary"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Underlined</h4>
          <Tabs
            items={[
              {
                key: '1',
                title: 'Onglet 1',
                content: <div className="p-4 text-center">Contenu de l'onglet underlined</div>,
              },
              {
                key: '2',
                title: 'Onglet 2',
                content: <div className="p-4 text-center">Style avec soulignement</div>,
              },
            ]}
            variant="underlined"
            color="secondary"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Bordered</h4>
          <Tabs
            items={[
              {
                key: '1',
                title: 'Onglet 1',
                content: <div className="p-4 text-center">Contenu de l'onglet bordered</div>,
              },
              {
                key: '2',
                title: 'Onglet 2',
                content: <div className="p-4 text-center">Style avec bordures</div>,
              },
            ]}
            variant="bordered"
            color="success"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Light</h4>
          <Tabs
            items={[
              {
                key: '1',
                title: 'Onglet 1',
                content: <div className="p-4 text-center">Contenu de l'onglet light</div>,
              },
              {
                key: '2',
                title: 'Onglet 2',
                content: <div className="p-4 text-center">Style léger et subtil</div>,
              },
            ]}
            variant="light"
            color="warning"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Onglets avec Icônes
      </h3>
      
      <Tabs
        items={[
          {
            key: 'profile',
            title: (
              <div className="flex items-center gap-2">
                <IconUser size={18} />
                <span>Profil</span>
              </div>
            ),
            content: (
              <Card className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar size="lg" src="https://i.pravatar.cc/80?u=profile1" />
                  <div>
                    <h4 className="text-xl font-bold text-foreground">Marie Dubois</h4>
                    <p className="text-default-500">Développeuse Frontend</p>
                  </div>
                </div>
                <p className="text-default-600">
                  Passionnée de technologie et de design, je crée des expériences utilisateur
                  exceptionnelles avec React et TypeScript.
                </p>
              </Card>
            ),
          },
          {
            key: 'settings',
            title: (
              <div className="flex items-center gap-2">
                <IconSettings size={18} />
                <span>Paramètres</span>
              </div>
            ),
            content: (
              <Card className="p-6 space-y-4">
                <h4 className="text-lg font-semibold text-foreground">Préférences</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Notifications par email</span>
                    <Button size="sm" variant="bordered">Activer</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Mode sombre</span>
                    <Button size="sm" variant="bordered">Basculer</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Langue</span>
                    <Button size="sm" variant="bordered">Français</Button>
                  </div>
                </div>
              </Card>
            ),
          },
          {
            key: 'notifications',
            title: (
              <div className="flex items-center gap-2">
                <IconBell size={18} />
                <span>Notifications</span>
                <Badge content="3" color="danger" size="sm" />
              </div>
            ),
            content: (
              <Card className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Notifications récentes</h4>
                <div className="space-y-3">
                  {[
                    { title: 'Nouveau message', time: 'Il y a 2 min', icon: IconMail },
                    { title: 'Mise à jour disponible', time: 'Il y a 1h', icon: IconDownload },
                    { title: 'Rappel de réunion', time: 'Il y a 3h', icon: IconCalendar },
                  ].map((notif, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-default-100 dark:bg-default-800 rounded-lg">
                      <notif.icon size={18} className="text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{notif.title}</p>
                        <p className="text-sm text-default-500">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ),
          },
        ]}
        variant="underlined"
        color="primary"
        size="md"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const DashboardTabs: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Tableau de Bord
      </h3>
      
      <Tabs
        items={[
          {
            key: 'overview',
            title: (
              <div className="flex items-center gap-2">
                <IconChart size={18} />
                <span>Vue d'ensemble</span>
              </div>
            ),
            content: (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Ventes', value: '€12,450', icon: IconChart, color: 'success' },
                    { title: 'Utilisateurs', value: '2,340', icon: IconUser, color: 'primary' },
                    { title: 'Commandes', value: '156', icon: IconShield, color: 'warning' },
                  ].map((stat, i) => (
                    <Card key={i} className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900 rounded-lg flex items-center justify-center`}>
                          <stat.icon size={20} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} />
                        </div>
                        <div>
                          <p className="text-sm text-default-500">{stat.title}</p>
                          <p className="text-xl font-bold text-foreground">{stat.value}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <Card className="p-6">
                  <h4 className="text-lg font-semibold text-foreground mb-4">Graphique des ventes</h4>
                  <div className="h-32 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 rounded-lg flex items-center justify-center">
                    <p className="text-default-500">Graphique interactif ici</p>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: 'analytics',
            title: (
              <div className="flex items-center gap-2">
                <IconStar size={18} />
                <span>Analytiques</span>
              </div>
            ),
            content: (
              <Card className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Rapports détaillés</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-default-100 dark:bg-default-800 rounded-lg">
                    <span className="text-foreground">Taux de conversion</span>
                    <span className="font-bold text-success">+12.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-default-100 dark:bg-default-800 rounded-lg">
                    <span className="text-foreground">Temps moyen sur site</span>
                    <span className="font-bold text-primary">3m 42s</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-default-100 dark:bg-default-800 rounded-lg">
                    <span className="text-foreground">Pages vues</span>
                    <span className="font-bold text-warning">8,920</span>
                  </div>
                </div>
              </Card>
            ),
          },
          {
            key: 'users',
            title: (
              <div className="flex items-center gap-2">
                <IconUser size={18} />
                <span>Utilisateurs</span>
              </div>
            ),
            content: (
              <Card className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-4">Utilisateurs actifs</h4>
                <div className="space-y-3">
                  {[
                    { name: 'Alice Martin', email: 'alice@example.com', status: 'En ligne' },
                    { name: 'Bob Dupont', email: 'bob@example.com', status: 'Absent' },
                    { name: 'Clara Rousseau', email: 'clara@example.com', status: 'En ligne' },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 border border-divider rounded-lg">
                      <Avatar size="sm" src={`https://i.pravatar.cc/40?u=user${i}`} />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{user.name}</p>
                        <p className="text-sm text-default-500">{user.email}</p>
                      </div>
                      <Badge
                        content={user.status}
                        color={user.status === 'En ligne' ? 'success' : 'default'}
                        size="sm"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            ),
          },
        ]}
        variant="solid"
        color="primary"
        size="lg"
        defaultActiveTab="overview"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const VerticalTabs: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Onglets Verticaux
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Placement Start</h4>
          <Tabs
            items={[
              {
                key: 'home',
                title: (
                  <div className="flex items-center gap-2">
                    <IconPhoto size={16} />
                    <span>Accueil</span>
                  </div>
                ),
                content: <div className="p-4">Contenu de l'accueil avec placement à gauche</div>,
              },
              {
                key: 'profile',
                title: (
                  <div className="flex items-center gap-2">
                    <IconUser size={16} />
                    <span>Profil</span>
                  </div>
                ),
                content: <div className="p-4">Informations du profil utilisateur</div>,
              },
              {
                key: 'settings',
                title: (
                  <div className="flex items-center gap-2">
                    <IconSettings size={16} />
                    <span>Paramètres</span>
                  </div>
                ),
                content: <div className="p-4">Configuration et préférences</div>,
              },
            ]}
            placement="start"
            variant="bordered"
            color="secondary"
            size="sm"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Placement End</h4>
          <Tabs
            items={[
              {
                key: 'docs',
                title: (
                  <div className="flex items-center gap-2">
                    <IconFile size={16} />
                    <span>Docs</span>
                  </div>
                ),
                content: <div className="p-4">Documentation avec placement à droite</div>,
              },
              {
                key: 'help',
                title: (
                  <div className="flex items-center gap-2">
                    <IconSearch size={16} />
                    <span>Aide</span>
                  </div>
                ),
                content: <div className="p-4">Centre d'aide et support</div>,
              },
              {
                key: 'contact',
                title: (
                  <div className="flex items-center gap-2">
                    <IconMail size={16} />
                    <span>Contact</span>
                  </div>
                ),
                content: <div className="p-4">Formulaire de contact</div>,
              },
            ]}
            placement="end"
            variant="light"
            color="success"
            size="sm"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const DisabledTabs: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Onglets avec États
      </h3>
      
      <Tabs
        items={[
          {
            key: 'available',
            title: 'Disponible',
            content: (
              <div className="p-4">
                <p className="text-foreground">Ce contenu est accessible.</p>
              </div>
            ),
          },
          {
            key: 'premium',
            title: (
              <div className="flex items-center gap-2">
                <IconStar size={16} />
                <span>Premium</span>
                <Badge content="Pro" color="warning" size="sm" />
              </div>
            ),
            content: (
              <div className="p-4">
                <p className="text-foreground">Contenu premium disponible.</p>
              </div>
            ),
            disabled: true,
          },
          {
            key: 'coming-soon',
            title: 'Bientôt disponible',
            content: (
              <div className="p-4">
                <p className="text-default-500">Cette fonctionnalité arrive bientôt.</p>
              </div>
            ),
            disabled: true,
          },
          {
            key: 'accessible',
            title: 'Accessible',
            content: (
              <div className="p-4">
                <p className="text-foreground">Contenu entièrement accessible.</p>
              </div>
            ),
          },
        ]}
        variant="underlined"
        color="primary"
        size="md"
        defaultActiveTab="available"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SizesComparison: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Comparaison des Tailles
      </h3>
      
      <div className="space-y-8">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size} className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground capitalize">
              Taille {size}
            </h4>
            <Tabs
              items={[
                {
                  key: 'tab1',
                  title: `Onglet 1 (${size})`,
                  content: (
                    <div className="p-4">
                      <p className="text-foreground">
                        Contenu adapté à la taille {size}. Le padding et la typographie
                        s'ajustent automatiquement.
                      </p>
                    </div>
                  ),
                },
                {
                  key: 'tab2',
                  title: `Onglet 2 (${size})`,
                  content: (
                    <div className="p-4">
                      <p className="text-foreground">
                        Deuxième onglet montrant l'adaptation responsive.
                      </p>
                    </div>
                  ),
                },
              ]}
              variant="solid"
              color="primary"
              size={size}
            />
          </div>
        ))}
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};