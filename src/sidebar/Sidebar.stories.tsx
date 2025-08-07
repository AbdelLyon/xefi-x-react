import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconHome,
  IconUser,
  IconSettings,
  IconBell,
  IconMail,
  IconChart,
  IconCalendar,
  IconFile,
  IconShoppingCart,
  IconCreditCard,
  IconLogout,
  IconPlus,
  IconSearch,
  IconHeart,
  IconBookmark,
  IconDownload,
  IconUpload,
  IconShare,
  IconEdit,
  IconTrash,
  IconFolder,
  IconPhoto,
  IconVideo,
  IconMusic,
} from '@tabler/icons-react';
import { Sidebar } from './Sidebar';
import type { Item } from '@/types/navigation';
import { Badge } from '../badge/Badge';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '**Sidebar** - Composant de barre latérale responsive avec navigation modulaire et actions personnalisées.',
      },
    },
  },
  argTypes: {
    actionLabel: {
      control: 'text',
      description: 'Texte du bouton d\'action',
    },
    actionColor: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
        'default',
      ],
      description: 'Couleur du bouton d\'action',
    },
    showDivider: {
      control: 'boolean',
      description: 'Afficher le diviseur après le bouton d\'action',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Navigation items for examples
const basicNavItems: Item[] = [
  {
    key: 'dashboard',
    label: 'Tableau de bord',
    startContent: <IconHome size={20} />,
    isActive: true,
  },
  {
    key: 'profile',
    label: 'Profil',
    startContent: <IconUser size={20} />,
  },
  {
    key: 'settings',
    label: 'Paramètres',
    startContent: <IconSettings size={20} />,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    startContent: <IconBell size={20} />,
    endContent: <Badge content="3" color="danger" size="sm" />,
  },
];

export const Default: Story = {
  args: {
    items: basicNavItems,
    actionLabel: 'Nouveau',
    actionColor: 'primary',
    actionClick: () => console.log('Action clicked'),
  },
  render: (args) => (
    <div className="flex h-screen bg-background">
      <Sidebar {...args} />
      <main className="flex-1 p-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Contenu Principal
          </h2>
          <p className="text-default-600">
            Cette sidebar par défaut montre les fonctionnalités de base avec
            navigation et bouton d'action.
          </p>
        </div>
      </main>
    </div>
  ),
};

export const DashboardSidebar: Story = {
  render: () => {
    const dashboardItems: Item[] = [
      {
        key: 'overview',
        label: 'Vue d\'ensemble',
        startContent: <IconChart size={20} />,
        isActive: true,
      },
      {
        key: 'analytics',
        label: 'Analytiques',
        startContent: <IconChart size={20} />,
      },
      {
        key: 'users',
        label: 'Utilisateurs',
        startContent: <IconUser size={20} />,
        endContent: <Badge content="1.2k" color="primary" size="sm" />,
      },
      {
        key: 'calendar',
        label: 'Calendrier',
        startContent: <IconCalendar size={20} />,
      },
      {
        key: 'files',
        label: 'Fichiers',
        startContent: <IconFile size={20} />,
      },
      {
        key: 'settings',
        label: 'Paramètres',
        startContent: <IconSettings size={20} />,
      },
    ];

    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          items={dashboardItems}
          actionLabel="Nouveau Projet"
          actionIcon={<IconPlus />}
          actionColor="primary"
          actionClick={() => console.log('New project')}
          onItemClick={(item) => console.log('Clicked:', item.label)}
        />
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Dashboard Admin
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                { title: 'Ventes totales', value: '€45,200', color: 'success' },
                { title: 'Nouveaux clients', value: '234', color: 'primary' },
                { title: 'Commandes', value: '1,340', color: 'warning' },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-default-100 dark:bg-default-800 rounded-lg">
                  <h3 className="text-sm font-medium text-default-600 mb-2">{stat.title}</h3>
                  <p className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-default-50 dark:bg-default-900 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Activité récente
              </h3>
              <p className="text-default-600">
                Sidebar dashboard avec navigation complète et métriques en temps réel.
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const EcommerceSidebar: Story = {
  render: () => {
    const ecommerceItems: Item[] = [
      {
        key: 'products',
        label: 'Produits',
        startContent: <IconShoppingCart size={20} />,
        isActive: true,
      },
      {
        key: 'orders',
        label: 'Commandes',
        startContent: <IconCreditCard size={20} />,
        endContent: <Badge content="12" color="warning" size="sm" />,
      },
      {
        key: 'customers',
        label: 'Clients',
        startContent: <IconUser size={20} />,
      },
      {
        key: 'inventory',
        label: 'Inventaire',
        startContent: <IconFolder size={20} />,
      },
      {
        key: 'analytics',
        label: 'Rapports',
        startContent: <IconChart size={20} />,
      },
      {
        key: 'settings',
        label: 'Paramètres',
        startContent: <IconSettings size={20} />,
      },
    ];

    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          items={ecommerceItems}
          actionLabel="Ajouter Produit"
          actionIcon={<IconPlus />}
          actionColor="success"
          actionClick={() => console.log('Add product')}
          onItemClick={(item) => console.log('Navigate to:', item.label)}
        />
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Gestion E-commerce
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { title: 'Produits actifs', value: '1,429', icon: IconShoppingCart },
                { title: 'Commandes aujourd\'hui', value: '87', icon: IconCreditCard },
                { title: 'Revenus', value: '€8,940', icon: IconChart },
                { title: 'Clients', value: '2,341', icon: IconUser },
              ].map((metric, i) => (
                <div key={i} className="p-4 bg-white dark:bg-default-800 rounded-lg shadow-sm border border-divider">
                  <div className="flex items-center gap-3 mb-2">
                    <metric.icon size={20} className="text-primary" />
                    <span className="text-sm font-medium text-default-600">{metric.title}</span>
                  </div>
                  <p className="text-xl font-bold text-foreground">{metric.value}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-default-800 rounded-lg p-6 border border-divider">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Produits populaires
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'MacBook Pro M3', sales: '234 ventes', revenue: '€2,340' },
                  { name: 'iPhone 15 Pro', sales: '189 ventes', revenue: '€1,890' },
                  { name: 'AirPods Pro', sales: '156 ventes', revenue: '€780' },
                ].map((product, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-default-50 dark:bg-default-700 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{product.name}</p>
                      <p className="text-sm text-default-500">{product.sales}</p>
                    </div>
                    <p className="font-bold text-success">{product.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const MediaSidebar: Story = {
  render: () => {
    const mediaItems: Item[] = [
      {
        key: 'library',
        label: 'Ma Bibliothèque',
        startContent: <IconFolder size={20} />,
        isActive: true,
      },
      {
        key: 'photos',
        label: 'Photos',
        startContent: <IconPhoto size={20} />,
        endContent: <Badge content="1.2k" color="primary" size="sm" />,
      },
      {
        key: 'videos',
        label: 'Vidéos',
        startContent: <IconVideo size={20} />,
        endContent: <Badge content="89" color="secondary" size="sm" />,
      },
      {
        key: 'music',
        label: 'Musique',
        startContent: <IconMusic size={20} />,
        endContent: <Badge content="567" color="success" size="sm" />,
      },
      {
        key: 'favorites',
        label: 'Favoris',
        startContent: <IconHeart size={20} />,
      },
      {
        key: 'downloads',
        label: 'Téléchargements',
        startContent: <IconDownload size={20} />,
      },
    ];

    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          items={mediaItems}
          actionLabel="Importer"
          actionIcon={<IconUpload />}
          actionColor="secondary"
          actionClick={() => console.log('Import media')}
          onItemClick={(item) => console.log('Browse:', item.label)}
        />
        <main className="flex-1 p-8">
          <div className="max-w-6xl">
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Gestionnaire de Médias
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {Array.from({ length: 8 }, (_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <IconPhoto size={32} className="text-default-500" />
                </div>
              ))}
            </div>
            
            <div className="bg-white dark:bg-default-800 rounded-lg p-6 border border-divider">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Actions rapides
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Partager', icon: IconShare },
                  { label: 'Éditer', icon: IconEdit },
                  { label: 'Supprimer', icon: IconTrash },
                  { label: 'Marquer', icon: IconBookmark },
                ].map((action, i) => (
                  <button
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 bg-default-100 dark:bg-default-700 hover:bg-default-200 dark:hover:bg-default-600 rounded-lg transition-colors"
                  >
                    <action.icon size={16} />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const ProjectSidebar: Story = {
  render: () => {
    const projectItems: Item[] = [
      {
        key: 'overview',
        label: 'Vue d\'ensemble',
        startContent: <IconHome size={20} />,
        isActive: true,
      },
      {
        key: 'tasks',
        label: 'Tâches',
        startContent: <IconFile size={20} />,
        endContent: <Badge content="8" color="danger" size="sm" />,
      },
      {
        key: 'calendar',
        label: 'Planning',
        startContent: <IconCalendar size={20} />,
      },
      {
        key: 'team',
        label: 'Équipe',
        startContent: <IconUser size={20} />,
        endContent: <Badge content="12" color="success" size="sm" />,
      },
      {
        key: 'messages',
        label: 'Messages',
        startContent: <IconMail size={20} />,
        endContent: <Badge content="3" color="primary" size="sm" />,
      },
      {
        key: 'files',
        label: 'Fichiers',
        startContent: <IconFolder size={20} />,
      },
    ];

    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          items={projectItems}
          actionLabel="Nouvelle Tâche"
          actionIcon={<IconPlus />}
          actionColor="primary"
          actionClick={() => console.log('New task')}
          onItemClick={(item) => console.log('Navigate:', item.label)}
        />
        <main className="flex-1 p-8 overflow-auto">
          <div className="max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground">
                  Projet React Dashboard
                </h2>
                <p className="text-default-600">
                  Application de gestion avec interface moderne
                </p>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium">
                  Publier
                </button>
                <button className="px-4 py-2 bg-default-100 dark:bg-default-800 text-foreground rounded-lg font-medium">
                  Brouillon
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="p-6 bg-white dark:bg-default-800 rounded-lg border border-divider">
                <h3 className="text-lg font-semibold text-foreground mb-4">Progression</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Tâches terminées</span>
                    <span className="font-medium">12/20</span>
                  </div>
                  <div className="w-full bg-default-200 dark:bg-default-700 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-white dark:bg-default-800 rounded-lg border border-divider">
                <h3 className="text-lg font-semibold text-foreground mb-4">Deadline</h3>
                <p className="text-2xl font-bold text-warning">15 jours</p>
                <p className="text-sm text-default-500">Temps restant</p>
              </div>
              
              <div className="p-6 bg-white dark:bg-default-800 rounded-lg border border-divider">
                <h3 className="text-lg font-semibold text-foreground mb-4">Budget</h3>
                <p className="text-2xl font-bold text-success">€25,000</p>
                <p className="text-sm text-default-500">sur €30,000</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-default-800 rounded-lg border border-divider p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Tâches récentes
              </h3>
              <div className="space-y-3">
                {[
                  { task: 'Conception interface utilisateur', status: 'En cours', priority: 'Haute' },
                  { task: 'Intégration API REST', status: 'Terminé', priority: 'Moyenne' },
                  { task: 'Tests unitaires', status: 'À faire', priority: 'Basse' },
                  { task: 'Documentation', status: 'En cours', priority: 'Moyenne' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-default-50 dark:bg-default-700 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">{item.task}</p>
                      <p className="text-sm text-default-500">Priorité: {item.priority}</p>
                    </div>
                    <Badge
                      content={item.status}
                      color={
                        item.status === 'Terminé' ? 'success' :
                        item.status === 'En cours' ? 'warning' : 'default'
                      }
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const MinimalSidebar: Story = {
  render: () => {
    const minimalItems: Item[] = [
      {
        key: 'home',
        label: 'Accueil',
        startContent: <IconHome size={20} />,
        isActive: true,
      },
      {
        key: 'search',
        label: 'Recherche',
        startContent: <IconSearch size={20} />,
      },
      {
        key: 'profile',
        label: 'Profil',
        startContent: <IconUser size={20} />,
      },
      {
        key: 'settings',
        label: 'Paramètres',
        startContent: <IconSettings size={20} />,
      },
    ];

    return (
      <div className="flex h-screen bg-background">
        <Sidebar
          items={minimalItems}
          onItemClick={(item) => console.log('Selected:', item.label)}
        />
        <main className="flex-1 p-8">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Sidebar Minimaliste
            </h2>
            <p className="text-default-600">
              Version simplifiée sans bouton d'action, parfaite pour des interfaces épurées.
            </p>
          </div>
        </main>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};