import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconChevronDown,
  IconQuestionMark,
  IconSettings,
  IconShield,
  IconCreditCard,
  IconUser,
  IconBell,
  IconMail,
  IconPhone,
  IconMapPin,
  IconClock,
  IconStar,
  IconHeart,
  IconBookmark,
  IconCode,
  IconPalette,
  IconDatabase,
} from '@tabler/icons-react';
import { Accordion } from './Accordion';
import type { AccordionItemConfig } from './accordionConfig';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Accordion** - Composant accordéon élégant avec support complet dark/light mode, configurations modulaires et validation.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['light', 'shadow', 'bordered', 'splitted'],
      description: 'Style visuel de l\'accordéon',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'accordéon',
    },
    selectionMode: {
      control: 'select',
      options: ['none', 'single', 'multiple'],
      description: 'Mode de sélection des éléments',
    },
    isCompact: {
      control: 'boolean',
      description: 'Version compacte',
    },
    hideIndicator: {
      control: 'boolean',
      description: 'Masquer les indicateurs',
    },
    disallowEmptySelection: {
      control: 'boolean',
      description: 'Interdire la désélection complète',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Items de base pour les exemples
const basicItems: AccordionItemConfig[] = [
  {
    key: '1',
    title: 'Qu\'est-ce que ce composant ?',
    content: 'Ce composant accordéon permet d\'organiser le contenu de manière pliable et dépliable, idéal pour les FAQ, menus de navigation et sections de contenu.',
  },
  {
    key: '2',
    title: 'Comment l\'utiliser ?',
    content: 'Utilisez la prop "items" pour définir le contenu de chaque section. Chaque item doit avoir une clé unique, un titre et un contenu.',
  },
  {
    key: '3',
    title: 'Personnalisation',
    content: 'Le composant supporte différentes variantes (light, shadow, bordered, splitted) et tailles (sm, md, lg) pour s\'adapter à votre design.',
  },
];

export const Default: Story = {
  args: {
    items: basicItems,
    variant: 'light',
    size: 'md',
    selectionMode: 'single',
  },
};

export const VariantsShowcase: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Variantes d'Accordéon
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Light</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Style Light',
                content: 'Style par défaut avec fond clair et transitions subtiles.',
              },
              {
                key: '2',
                title: 'Navigation simple',
                content: 'Parfait pour des contenus simples et une navigation fluide.',
              },
            ]}
            variant="light"
            size="md"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Shadow</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Style Shadow',
                content: 'Avec ombres pour un effet de profondeur et d\'élégance.',
              },
              {
                key: '2',
                title: 'Impact visuel',
                content: 'Idéal pour mettre en valeur des sections importantes.',
              },
            ]}
            variant="shadow"
            size="md"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Bordered</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Style Bordered',
                content: 'Avec bordures définies pour une séparation claire.',
              },
              {
                key: '2',
                title: 'Structure claire',
                content: 'Parfait pour organiser visuellement le contenu.',
              },
            ]}
            variant="bordered"
            size="md"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Splitted</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Style Splitted',
                content: 'Éléments séparés avec espacement pour un look moderne.',
              },
              {
                key: '2',
                title: 'Design moderne',
                content: 'Style contemporain avec espacement généreux.',
              },
            ]}
            variant="splitted"
            size="md"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SizesShowcase: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Tailles d'Accordéon
      </h3>
      
      <div className="space-y-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Small (sm)</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Taille compacte',
                content: 'Parfait pour les interfaces denses et les espaces restreints.',
              },
            ]}
            variant="bordered"
            size="sm"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Medium (md)</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Taille standard',
                content: 'Taille par défaut, équilibrée entre lisibilité et compacité.',
              },
            ]}
            variant="bordered"
            size="md"
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Large (lg)</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Taille généreuse',
                content: 'Idéal pour mettre en valeur le contenu important avec plus d\'espace.',
              },
            ]}
            variant="bordered"
            size="lg"
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
        Accordéon avec Icônes
      </h3>
      
      <Accordion
        items={[
          {
            key: 'profile',
            title: 'Profil utilisateur',
            startContent: <IconUser size={20} className="text-primary" />,
            content: 'Gérez vos informations personnelles, photo de profil et préférences de compte.',
          },
          {
            key: 'notifications',
            title: 'Notifications',
            startContent: <IconBell size={20} className="text-warning" />,
            content: 'Configurez vos préférences de notification pour emails, push et SMS.',
          },
          {
            key: 'security',
            title: 'Sécurité',
            startContent: <IconShield size={20} className="text-success" />,
            content: 'Paramètres de sécurité, authentification à deux facteurs et mots de passe.',
          },
          {
            key: 'payment',
            title: 'Paiement',
            startContent: <IconCreditCard size={20} className="text-secondary" />,
            content: 'Gérez vos méthodes de paiement, facturation et historique des transactions.',
          },
        ]}
        variant="shadow"
        size="md"
        selectionMode="multiple"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FAQ: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        FAQ - Questions Fréquentes
      </h3>
      
      <Accordion
        items={[
          {
            key: 'what-is',
            title: 'Qu\'est-ce que cette plateforme ?',
            startContent: <IconQuestionMark size={18} className="text-primary" />,
            content: 'Notre plateforme est une solution complète pour gérer vos projets, collaborer avec votre équipe et suivre vos performances en temps réel.',
          },
          {
            key: 'how-to-start',
            title: 'Comment commencer ?',
            startContent: <IconStar size={18} className="text-warning" />,
            content: 'Créez votre compte gratuitement, configurez votre profil et invitez vos collaborateurs. Notre guide de démarrage vous accompagne étape par étape.',
          },
          {
            key: 'pricing',
            title: 'Quels sont les tarifs ?',
            startContent: <IconCreditCard size={18} className="text-success" />,
            content: 'Nous proposons une version gratuite pour les petites équipes et des plans premium à partir de 9€/mois par utilisateur.',
          },
          {
            key: 'support',
            title: 'Comment obtenir de l\'aide ?',
            startContent: <IconHeart size={18} className="text-danger" />,
            content: 'Notre équipe support est disponible 24h/7j via chat, email ou téléphone. Consultez aussi notre centre d\'aide.',
          },
          {
            key: 'security',
            title: 'Mes données sont-elles sécurisées ?',
            startContent: <IconShield size={18} className="text-secondary" />,
            content: 'Absolument ! Nous utilisons un chiffrement de niveau bancaire, des sauvegardes automatiques et sommes conformes RGPD.',
          },
        ]}
        variant="splitted"
        size="md"
        selectionMode="single"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const ContactInfo: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Informations de Contact
      </h3>
      
      <Accordion
        items={[
          {
            key: 'phone',
            title: 'Téléphone',
            startContent: <IconPhone size={18} className="text-primary" />,
            content: (
              <div className="space-y-2">
                <p><strong>Service client :</strong> +33 1 23 45 67 89</p>
                <p><strong>Support technique :</strong> +33 1 23 45 67 90</p>
                <p><strong>Horaires :</strong> Lundi à Vendredi, 9h-18h</p>
              </div>
            ),
          },
          {
            key: 'email',
            title: 'Email',
            startContent: <IconMail size={18} className="text-success" />,
            content: (
              <div className="space-y-2">
                <p><strong>Contact général :</strong> contact@entreprise.com</p>
                <p><strong>Support :</strong> support@entreprise.com</p>
                <p><strong>Commercial :</strong> commercial@entreprise.com</p>
              </div>
            ),
          },
          {
            key: 'address',
            title: 'Adresse',
            startContent: <IconMapPin size={18} className="text-warning" />,
            content: (
              <div className="space-y-2">
                <p><strong>Siège social :</strong></p>
                <p>123 Rue de la Technologie<br />75001 Paris, France</p>
                <p><strong>Métro :</strong> Ligne 1, Station Louvre-Rivoli</p>
              </div>
            ),
          },
          {
            key: 'hours',
            title: 'Horaires d\'ouverture',
            startContent: <IconClock size={18} className="text-secondary" />,
            content: (
              <div className="space-y-2">
                <p><strong>Lundi - Vendredi :</strong> 9h00 - 18h00</p>
                <p><strong>Samedi :</strong> 10h00 - 16h00</p>
                <p><strong>Dimanche :</strong> Fermé</p>
                <p className="text-sm text-default-500">*Horaires susceptibles de changer pendant les jours fériés</p>
              </div>
            ),
          },
        ]}
        variant="bordered"
        size="lg"
        selectionMode="multiple"
        disallowEmptySelection={false}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const TechnicalDocs: Story = {
  render: () => (
    <div className="w-full max-w-5xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Documentation Technique
      </h3>
      
      <Accordion
        items={[
          {
            key: 'setup',
            title: 'Installation et Configuration',
            startContent: <IconCode size={18} className="text-primary" />,
            content: (
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold mb-2">Installation</h5>
                  <code className="bg-default-100 dark:bg-default-800 p-2 rounded block">
                    npm install @xefi/x-react
                  </code>
                </div>
                <div>
                  <h5 className="font-semibold mb-2">Configuration</h5>
                  <p className="text-sm text-default-600">
                    Importez les composants nécessaires et configurez votre thème.
                  </p>
                </div>
              </div>
            ),
          },
          {
            key: 'theming',
            title: 'Thèmes et Personnalisation',
            startContent: <IconPalette size={18} className="text-secondary" />,
            content: (
              <div className="space-y-4">
                <p>Personnalisez l'apparence avec notre système de thèmes flexible :</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Thèmes prédéfinis (light/dark)</li>
                  <li>Variables CSS personnalisables</li>
                  <li>Support Tailwind CSS</li>
                  <li>Tokens de design system</li>
                </ul>
              </div>
            ),
          },
          {
            key: 'api',
            title: 'API et Intégrations',
            startContent: <IconDatabase size={18} className="text-success" />,
            content: (
              <div className="space-y-4">
                <p>Intégrez facilement avec vos APIs existantes :</p>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>REST API support</li>
                  <li>GraphQL compatibility</li>
                  <li>WebSocket connections</li>
                  <li>State management</li>
                </ul>
              </div>
            ),
          },
          {
            key: 'advanced',
            title: 'Fonctionnalités Avancées',
            startContent: <IconSettings size={18} className="text-warning" />,
            content: (
              <div className="space-y-4">
                <p>Explorez les fonctionnalités avancées pour maximiser votre productivité :</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h6 className="font-medium mb-1">Performance</h6>
                    <ul className="list-disc list-inside text-default-600">
                      <li>Lazy loading</li>
                      <li>Tree shaking</li>
                      <li>Code splitting</li>
                    </ul>
                  </div>
                  <div>
                    <h6 className="font-medium mb-1">Accessibilité</h6>
                    <ul className="list-disc list-inside text-default-600">
                      <li>ARIA support</li>
                      <li>Keyboard navigation</li>
                      <li>Screen reader</li>
                    </ul>
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        variant="shadow"
        size="lg"
        selectionMode="multiple"
        isCompact={false}
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const CompactMode: Story = {
  render: () => (
    <div className="w-full max-w-3xl space-y-6 p-6">
      <h3 className="text-2xl font-bold text-foreground mb-6">
        Mode Compact
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Standard</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Élément standard',
                content: 'Espacement normal pour une lecture confortable.',
              },
              {
                key: '2',
                title: 'Deuxième élément',
                content: 'Avec padding généreux et bonne lisibilité.',
              },
            ]}
            variant="bordered"
            isCompact={false}
          />
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-foreground">Compact</h4>
          <Accordion
            items={[
              {
                key: '1',
                title: 'Élément compact',
                content: 'Espacement réduit pour maximiser l\'espace.',
              },
              {
                key: '2',
                title: 'Deuxième élément',
                content: 'Idéal pour les interfaces denses.',
              },
            ]}
            variant="bordered"
            isCompact={true}
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};