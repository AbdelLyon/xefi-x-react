import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconHome,
  IconUser,
  IconSettings,
  IconBell,
  IconMail,
  IconSearch,
  IconMenu2,
  IconChevronDown,
  IconStar,
  IconHeart,
  IconBookmark,
  IconShoppingCart,
  IconCreditCard,
  IconLogout,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { Navbar } from './Navbar';
import { Avatar } from '../avatar/Avatar';
import { Button } from '../button/Button';
import { Badge } from '../badge/Badge';
import { Dropdown } from '../dropdown/Dropdown';
import type { Item } from '@/types/navigation';
import { useState } from 'react';

const meta: Meta<typeof Navbar> = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '**Navbar** - Composant de navigation principal avec support responsive, menu mobile et personnalisation complète.',
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: ['static', 'sticky', 'fixed'],
      description: 'Position de la navbar',
    },
    isBordered: {
      control: 'boolean',
      description: 'Bordure en bas de la navbar',
    },
    isBlurred: {
      control: 'boolean',
      description: 'Effet de flou en arrière-plan',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Largeur maximale du contenu',
    },
    height: {
      control: 'text',
      description: 'Hauteur personnalisée',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Navigation items for examples
const mainNavItems: Item[] = [
  {
    key: 'dashboard',
    label: 'Tableau de bord',
    startContent: <IconHome size={18} />,
    isActive: true,
  },
  {
    key: 'profile',
    label: 'Profil',
    startContent: <IconUser size={18} />,
  },
  {
    key: 'settings',
    label: 'Paramètres',
    startContent: <IconSettings size={18} />,
  },
];

const mobileMenuItems: Item[] = [
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
    key: 'notifications',
    label: 'Notifications',
    startContent: <IconBell size={20} />,
    endContent: <Badge content="3" color="danger" size="sm" />,
  },
  {
    key: 'messages',
    label: 'Messages',
    startContent: <IconMail size={20} />,
    endContent: <Badge content="12" color="primary" size="sm" />,
  },
  {
    key: 'settings',
    label: 'Paramètres',
    startContent: <IconSettings size={20} />,
  },
];

export const Default: Story = {
  args: {
    appName: 'Mon App',
    navigationItems: mainNavItems,
    menuItems: mobileMenuItems,
    profile: (
      <Avatar
        size="sm"
        src="https://i.pravatar.cc/40?u=user1"
        className="cursor-pointer"
      />
    ),
  },
};

export const WithLogo: Story = {
  render: () => (
    <Navbar
      appLogo={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">X</span>
          </div>
          <span className="font-bold text-foreground">Xefi React</span>
        </div>
      }
      navigationItems={mainNavItems}
      menuItems={mobileMenuItems}
      profile={
        <div className="flex items-center gap-2">
          <Button variant="light" isIconOnly>
            <IconBell size={18} />
          </Button>
          <Avatar
            size="sm"
            src="https://i.pravatar.cc/40?u=user2"
            className="cursor-pointer"
          />
        </div>
      }
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const EcommerceNavbar: Story = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const ecommerceNavItems: Item[] = [
      {
        key: 'home',
        label: 'Accueil',
        startContent: <IconHome size={18} />,
        isActive: true,
      },
      {
        key: 'products',
        label: 'Produits',
        startContent: <IconShoppingCart size={18} />,
      },
      {
        key: 'favorites',
        label: 'Favoris',
        startContent: <IconHeart size={18} />,
        endContent: <Badge content="5" color="danger" size="sm" />,
      },
    ];

    const ecommerceMobileItems: Item[] = [
      {
        key: 'home',
        label: 'Accueil',
        startContent: <IconHome size={20} />,
        isActive: true,
      },
      {
        key: 'products',
        label: 'Produits',
        startContent: <IconShoppingCart size={20} />,
      },
      {
        key: 'favorites',
        label: 'Favoris',
        startContent: <IconHeart size={20} />,
        endContent: <Badge content="5" color="danger" size="sm" />,
      },
      {
        key: 'orders',
        label: 'Mes Commandes',
        startContent: <IconCreditCard size={20} />,
      },
      {
        key: 'profile',
        label: 'Mon Profil',
        startContent: <IconUser size={20} />,
      },
    ];

    return (
      <Navbar
        appLogo={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <IconShoppingCart size={16} className="text-white" />
            </div>
            <span className="font-bold text-foreground">Shop</span>
          </div>
        }
        navigationItems={ecommerceNavItems}
        menuItems={ecommerceMobileItems}
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        profile={
          <div className="flex items-center gap-2">
            <Button variant="light" isIconOnly>
              <IconSearch size={18} />
            </Button>
            <Button variant="light" isIconOnly className="relative">
              <IconShoppingCart size={18} />
              <Badge
                content="3"
                color="danger"
                size="sm"
                className="absolute -top-1 -right-1"
              />
            </Button>
            <Avatar
              size="sm"
              src="https://i.pravatar.cc/40?u=customer1"
              className="cursor-pointer"
            />
          </div>
        }
        isBordered
      />
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const DashboardNavbar: Story = {
  render: () => {
    const dashboardNavItems: Item[] = [
      {
        key: 'overview',
        label: 'Vue d\'ensemble',
        startContent: <IconHome size={18} />,
        isActive: true,
      },
      {
        key: 'analytics',
        label: 'Analytiques',
        startContent: <IconStar size={18} />,
      },
      {
        key: 'settings',
        label: 'Paramètres',
        startContent: <IconSettings size={18} />,
      },
    ];

    const dashboardMobileItems: Item[] = [
      {
        key: 'overview',
        label: 'Vue d\'ensemble',
        startContent: <IconHome size={20} />,
        isActive: true,
      },
      {
        key: 'analytics',
        label: 'Analytiques',
        startContent: <IconStar size={20} />,
      },
      {
        key: 'users',
        label: 'Utilisateurs',
        startContent: <IconUser size={20} />,
      },
      {
        key: 'notifications',
        label: 'Notifications',
        startContent: <IconBell size={20} />,
        endContent: <Badge content="7" color="warning" size="sm" />,
      },
      {
        key: 'settings',
        label: 'Paramètres',
        startContent: <IconSettings size={20} />,
      },
    ];

    return (
      <Navbar
        appName="Admin Dashboard"
        navigationItems={dashboardNavItems}
        menuItems={dashboardMobileItems}
        profile={
          <div className="flex items-center gap-3">
            <Button variant="light" isIconOnly>
              <IconBell size={18} />
            </Button>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar
                size="sm"
                src="https://i.pravatar.cc/40?u=admin1"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-default-500">admin@example.com</p>
              </div>
              <IconChevronDown size={16} className="text-default-400" />
            </div>
          </div>
        }
        isBlurred
        position="sticky"
      />
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const BlogNavbar: Story = {
  render: () => {
    const blogNavItems: Item[] = [
      {
        key: 'home',
        label: 'Accueil',
        startContent: <IconHome size={18} />,
        isActive: true,
      },
      {
        key: 'articles',
        label: 'Articles',
        startContent: <IconBookmark size={18} />,
      },
      {
        key: 'about',
        label: 'À propos',
        startContent: <IconUser size={18} />,
      },
    ];

    const blogMobileItems: Item[] = [
      {
        key: 'home',
        label: 'Accueil',
        startContent: <IconHome size={20} />,
        isActive: true,
      },
      {
        key: 'articles',
        label: 'Articles',
        startContent: <IconBookmark size={20} />,
      },
      {
        key: 'favorites',
        label: 'Favoris',
        startContent: <IconHeart size={20} />,
      },
      {
        key: 'about',
        label: 'À propos',
        startContent: <IconUser size={20} />,
      },
      {
        key: 'contact',
        label: 'Contact',
        startContent: <IconMail size={20} />,
      },
    ];

    return (
      <Navbar
        appLogo={
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold text-foreground">Mon Blog</span>
          </div>
        }
        navigationItems={blogNavItems}
        menuItems={blogMobileItems}
        profile={
          <div className="flex items-center gap-2">
            <Button variant="light" isIconOnly>
              <IconSearch size={18} />
            </Button>
            <Button variant="light" isIconOnly>
              <IconSun size={18} />
            </Button>
          </div>
        }
        maxWidth="lg"
      />
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const CompleteNavbar: Story = {
  render: () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const completeNavItems: Item[] = [
      {
        key: 'dashboard',
        label: 'Tableau de bord',
        startContent: <IconHome size={18} />,
        isActive: true,
      },
      {
        key: 'projects',
        label: 'Projets',
        startContent: <IconBookmark size={18} />,
      },
      {
        key: 'team',
        label: 'Équipe',
        startContent: <IconUser size={18} />,
      },
    ];

    const completeMobileItems: Item[] = [
      {
        key: 'dashboard',
        label: 'Tableau de bord',
        startContent: <IconHome size={20} />,
        isActive: true,
      },
      {
        key: 'projects',
        label: 'Projets',
        startContent: <IconBookmark size={20} />,
      },
      {
        key: 'team',
        label: 'Équipe',
        startContent: <IconUser size={20} />,
      },
      {
        key: 'notifications',
        label: 'Notifications',
        startContent: <IconBell size={20} />,
        endContent: <Badge content="12" color="danger" size="sm" />,
      },
      {
        key: 'messages',
        label: 'Messages',
        startContent: <IconMail size={20} />,
        endContent: <Badge content="5" color="primary" size="sm" />,
      },
      {
        key: 'settings',
        label: 'Paramètres',
        startContent: <IconSettings size={20} />,
      },
    ];

    return (
      <div className="min-h-screen bg-background">
        <Navbar
          appLogo={
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-success rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">X</span>
              </div>
              <div className="hidden lg:block">
                <h1 className="font-bold text-lg text-foreground">Xefi Platform</h1>
                <p className="text-xs text-default-500">Solutions d'entreprise</p>
              </div>
            </div>
          }
          navigationItems={completeNavItems}
          menuItems={completeMobileItems}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          onItemClick={(item) => console.log('Clicked:', item.label)}
          profile={
            <div className="flex items-center gap-3">
              <Button variant="light" isIconOnly className="relative">
                <IconBell size={18} />
                <Badge
                  content="3"
                  color="danger"
                  size="sm"
                  className="absolute -top-1 -right-1"
                />
              </Button>
              <Button variant="light" isIconOnly className="relative">
                <IconMail size={18} />
                <Badge
                  content="5"
                  color="primary"
                  size="sm"
                  className="absolute -top-1 -right-1"
                />
              </Button>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  size="sm"
                  src="https://i.pravatar.cc/40?u=complete1"
                  className="ring-2 ring-primary/20"
                />
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-foreground">Marie Dubois</p>
                  <p className="text-xs text-default-500">Administrateur</p>
                </div>
                <IconChevronDown size={16} className="text-default-400 hidden lg:block" />
              </div>
            </div>
          }
          isBordered
          isBlurred
          position="sticky"
          maxWidth="full"
          className="backdrop-blur-md bg-background/80"
        />
        
        {/* Content example */}
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Contenu de l'application
            </h2>
            <p className="text-default-600">
              Cette navbar complète montre toutes les fonctionnalités disponibles :
              logo avec informations, navigation responsive, notifications,
              profil utilisateur et menu mobile.
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const MinimalNavbar: Story = {
  render: () => (
    <Navbar
      appName="Simple App"
      navigationItems={[
        {
          key: 'home',
          label: 'Accueil',
          isActive: true,
        },
        {
          key: 'about',
          label: 'À propos',
        },
        {
          key: 'contact',
          label: 'Contact',
        },
      ]}
      menuItems={[
        {
          key: 'home',
          label: 'Accueil',
          isActive: true,
        },
        {
          key: 'about',
          label: 'À propos',
        },
        {
          key: 'contact',
          label: 'Contact',
        },
      ]}
      profile={
        <Button variant="bordered" size="sm">
          Connexion
        </Button>
      }
    />
  ),
  parameters: {
    layout: 'fullscreen',
  },
};