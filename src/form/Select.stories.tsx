import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconUser,
  IconWorld,
  IconFlag,
  IconSettings,
  IconStar,
  IconHeart,
  IconHome,
  IconBriefcase,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCreditCard,
  IconShield,
  IconPalette,
  IconBell,
  IconMoon,
  IconSun,
} from '@tabler/icons-react';
import { Select, type SelectOption } from './Select';
import { Button } from '../button/Button';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Select** - Composant de sélection avancé avec support des icônes, descriptions et options personnalisées.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['flat', 'bordered', 'faded', 'underlined'],
      description: 'Style visuel du select',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du select',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Radius des coins',
    },
    labelPlacement: {
      control: 'select',
      options: ['inside', 'outside', 'outside-left'],
      description: 'Position du label',
    },
    selectionMode: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Mode de sélection',
    },
    isRequired: {
      control: 'boolean',
      description: 'Champ requis',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Select désactivé',
    },
    isInvalid: {
      control: 'boolean',
      description: 'État d\'erreur',
    },
    label: {
      control: 'text',
      description: 'Texte du label',
    },
    placeholder: {
      control: 'text',
      description: 'Texte de placeholder',
    },
    description: {
      control: 'text',
      description: 'Texte d\'aide',
    },
    errorMessage: {
      control: 'text',
      description: 'Message d\'erreur',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicOptions: SelectOption[] = [
  { key: 'option1', label: 'Option 1' },
  { key: 'option2', label: 'Option 2' },
  { key: 'option3', label: 'Option 3' },
  { key: 'option4', label: 'Option 4' },
];

export const Default: Story = {
  args: {
    label: 'Choisissez une option',
    placeholder: 'Sélectionnez...',
    options: basicOptions,
    color: 'primary',
  },
};

export const WithIcons: Story = {
  render: () => {
    const optionsWithIcons: SelectOption[] = [
      {
        key: 'profile',
        label: 'Profil utilisateur',
        description: 'Gérer vos informations personnelles',
        icon: <IconUser size={18} />,
      },
      {
        key: 'settings',
        label: 'Paramètres',
        description: 'Configuration de l\'application',
        icon: <IconSettings size={18} />,
      },
      {
        key: 'notifications',
        label: 'Notifications',
        description: 'Gérer vos alertes et notifications',
        icon: <IconBell size={18} />,
      },
      {
        key: 'security',
        label: 'Sécurité',
        description: 'Paramètres de sécurité et confidentialité',
        icon: <IconShield size={18} />,
      },
    ];

    return (
      <div className="w-full max-w-md">
        <Select
          label="Section"
          placeholder="Choisissez une section"
          options={optionsWithIcons}
          color="primary"
          description="Sélectionnez la section à configurer"
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Countries: Story = {
  render: () => {
    const countries: SelectOption[] = [
      {
        key: 'fr',
        label: 'France',
        description: 'République française',
        icon: <IconFlag size={18} />,
      },
      {
        key: 'de',
        label: 'Allemagne',
        description: 'République fédérale d\'Allemagne',
        icon: <IconFlag size={18} />,
      },
      {
        key: 'es',
        label: 'Espagne',
        description: 'Royaume d\'Espagne',
        icon: <IconFlag size={18} />,
      },
      {
        key: 'it',
        label: 'Italie',
        description: 'République italienne',
        icon: <IconFlag size={18} />,
      },
      {
        key: 'uk',
        label: 'Royaume-Uni',
        description: 'Royaume-Uni de Grande-Bretagne',
        icon: <IconFlag size={18} />,
      },
      {
        key: 'us',
        label: 'États-Unis',
        description: 'États-Unis d\'Amérique',
        icon: <IconFlag size={18} />,
      },
    ];

    return (
      <div className="w-full max-w-md">
        <Select
          label="Pays"
          placeholder="Sélectionnez votre pays"
          options={countries}
          color="primary"
          description="Choisissez votre pays de résidence"
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Variants: Story = {
  render: () => {
    const options: SelectOption[] = [
      { key: 'option1', label: 'Première option' },
      { key: 'option2', label: 'Deuxième option' },
      { key: 'option3', label: 'Troisième option' },
    ];

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Variantes de Select
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            variant="bordered"
            label="Bordered"
            placeholder="Style bordered"
            options={options}
            color="primary"
          />
          <Select
            variant="flat"
            label="Flat"
            placeholder="Style flat"
            options={options}
            color="primary"
          />
          <Select
            variant="faded"
            label="Faded"
            placeholder="Style faded"
            options={options}
            color="primary"
          />
          <Select
            variant="underlined"
            label="Underlined"
            placeholder="Style underlined"
            options={options}
            color="primary"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Colors: Story = {
  render: () => {
    const options: SelectOption[] = [
      { key: 'option1', label: 'Option 1' },
      { key: 'option2', label: 'Option 2' },
    ];

    return (
      <div className="w-full max-w-4xl space-y-6 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Couleurs Disponibles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            color="default"
            label="Default"
            placeholder="Couleur par défaut"
            options={options}
            variant="bordered"
          />
          <Select
            color="primary"
            label="Primary"
            placeholder="Couleur primaire"
            options={options}
            variant="bordered"
          />
          <Select
            color="secondary"
            label="Secondary"
            placeholder="Couleur secondaire"
            options={options}
            variant="bordered"
          />
          <Select
            color="success"
            label="Success"
            placeholder="Couleur succès"
            options={options}
            variant="bordered"
          />
          <Select
            color="warning"
            label="Warning"
            placeholder="Couleur attention"
            options={options}
            variant="bordered"
          />
          <Select
            color="danger"
            label="Danger"
            placeholder="Couleur danger"
            options={options}
            variant="bordered"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Sizes: Story = {
  render: () => {
    const options: SelectOption[] = [
      { key: 'small', label: 'Petite option' },
      { key: 'medium', label: 'Option moyenne' },
      { key: 'large', label: 'Grande option' },
    ];

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Tailles de Select
        </h3>
        <div className="space-y-4">
          <Select
            size="sm"
            label="Small"
            placeholder="Taille small"
            options={options}
            color="primary"
          />
          <Select
            size="md"
            label="Medium"
            placeholder="Taille medium (défaut)"
            options={options}
            color="primary"
          />
          <Select
            size="lg"
            label="Large"
            placeholder="Taille large"
            options={options}
            color="primary"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const MultipleSelection: Story = {
  render: () => {
    const skills: SelectOption[] = [
      {
        key: 'react',
        label: 'React',
        description: 'Bibliothèque JavaScript pour interfaces utilisateur',
        icon: <IconStar size={18} />,
      },
      {
        key: 'typescript',
        label: 'TypeScript',
        description: 'JavaScript avec typage statique',
        icon: <IconStar size={18} />,
      },
      {
        key: 'nodejs',
        label: 'Node.js',
        description: 'Runtime JavaScript côté serveur',
        icon: <IconStar size={18} />,
      },
      {
        key: 'python',
        label: 'Python',
        description: 'Langage de programmation polyvalent',
        icon: <IconStar size={18} />,
      },
      {
        key: 'design',
        label: 'UI/UX Design',
        description: 'Conception d\'interfaces utilisateur',
        icon: <IconPalette size={18} />,
      },
    ];

    return (
      <div className="w-full max-w-md">
        <Select
          label="Compétences"
          placeholder="Sélectionnez vos compétences"
          options={skills}
          selectionMode="multiple"
          color="primary"
          description="Vous pouvez sélectionner plusieurs compétences"
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const States: Story = {
  render: () => {
    const options: SelectOption[] = [
      { key: 'option1', label: 'Option 1' },
      { key: 'option2', label: 'Option 2' },
      { key: 'option3', label: 'Option 3' },
    ];

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          États du Select
        </h3>
        <div className="space-y-4">
          <Select
            label="Select normal"
            placeholder="État normal"
            options={options}
            color="primary"
          />
          <Select
            label="Select requis"
            placeholder="Champ obligatoire"
            options={options}
            isRequired
            color="primary"
            description="Ce champ est obligatoire"
          />
          <Select
            label="Select désactivé"
            placeholder="Champ désactivé"
            options={options}
            isDisabled
            color="primary"
          />
          <Select
            label="Select avec erreur"
            placeholder="Champ invalide"
            options={options}
            isInvalid
            errorMessage="Veuillez sélectionner une option valide"
            color="danger"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      category: new Set<string>(),
      priority: new Set<string>(),
      assignee: new Set<string>(),
      tags: new Set<string>(),
      theme: new Set<string>(),
    });

    const categories: SelectOption[] = [
      {
        key: 'bug',
        label: 'Bug',
        description: 'Problème technique à résoudre',
        icon: <IconShield size={18} />,
      },
      {
        key: 'feature',
        label: 'Nouvelle fonctionnalité',
        description: 'Demande d\'amélioration',
        icon: <IconStar size={18} />,
      },
      {
        key: 'documentation',
        label: 'Documentation',
        description: 'Mise à jour de la documentation',
        icon: <IconHome size={18} />,
      },
      {
        key: 'maintenance',
        label: 'Maintenance',
        description: 'Tâche de maintenance',
        icon: <IconSettings size={18} />,
      },
    ];

    const priorities: SelectOption[] = [
      { key: 'low', label: 'Basse', description: 'Peut attendre' },
      { key: 'medium', label: 'Moyenne', description: 'Traitement standard' },
      { key: 'high', label: 'Haute', description: 'À traiter rapidement' },
      { key: 'critical', label: 'Critique', description: 'Urgent' },
    ];

    const assignees: SelectOption[] = [
      {
        key: 'alice',
        label: 'Alice Martin',
        description: 'Développeuse frontend',
        icon: <IconUser size={18} />,
      },
      {
        key: 'bob',
        label: 'Bob Dupont',
        description: 'Développeur backend',
        icon: <IconUser size={18} />,
      },
      {
        key: 'claire',
        label: 'Claire Bernard',
        description: 'Designer UX/UI',
        icon: <IconUser size={18} />,
      },
    ];

    const tags: SelectOption[] = [
      { key: 'frontend', label: 'Frontend' },
      { key: 'backend', label: 'Backend' },
      { key: 'ui', label: 'Interface' },
      { key: 'api', label: 'API' },
      { key: 'database', label: 'Base de données' },
      { key: 'security', label: 'Sécurité' },
    ];

    const themes: SelectOption[] = [
      {
        key: 'light',
        label: 'Clair',
        description: 'Thème clair',
        icon: <IconSun size={18} />,
      },
      {
        key: 'dark',
        label: 'Sombre',
        description: 'Thème sombre',
        icon: <IconMoon size={18} />,
      },
      {
        key: 'auto',
        label: 'Automatique',
        description: 'Suit les préférences système',
        icon: <IconSettings size={18} />,
      },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Création de Ticket
          </h2>
          <p className="text-default-500">
            Formulaire avec différents types de sélection
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Catégorie"
              placeholder="Type de ticket"
              options={categories}
              value={formData.category}
              onSelectionChange={(keys) =>
                setFormData(prev => ({ ...prev, category: keys as Set<string> }))
              }
              isRequired
              color="primary"
            />
            <Select
              label="Priorité"
              placeholder="Niveau de priorité"
              options={priorities}
              value={formData.priority}
              onSelectionChange={(keys) =>
                setFormData(prev => ({ ...prev, priority: keys as Set<string> }))
              }
              isRequired
              color="primary"
            />
          </div>

          <Select
            label="Assigné à"
            placeholder="Choisir un responsable"
            options={assignees}
            value={formData.assignee}
            onSelectionChange={(keys) =>
              setFormData(prev => ({ ...prev, assignee: keys as Set<string> }))
            }
            color="primary"
            description="Personne responsable du ticket"
          />

          <Select
            label="Tags"
            placeholder="Sélectionner des tags"
            options={tags}
            value={formData.tags}
            onSelectionChange={(keys) =>
              setFormData(prev => ({ ...prev, tags: keys as Set<string> }))
            }
            selectionMode="multiple"
            color="primary"
            description="Vous pouvez sélectionner plusieurs tags"
          />

          <Select
            label="Thème préféré"
            placeholder="Choix du thème"
            options={themes}
            value={formData.theme}
            onSelectionChange={(keys) =>
              setFormData(prev => ({ ...prev, theme: keys as Set<string> }))
            }
            color="primary"
            variant="faded"
          />

          <div className="flex gap-4 pt-4">
            <Button color="primary" size="lg" className="flex-1">
              Créer le ticket
            </Button>
            <Button variant="bordered" size="lg" className="flex-1">
              Annuler
            </Button>
          </div>
        </form>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const LabelPlacements: Story = {
  render: () => {
    const options: SelectOption[] = [
      { key: 'option1', label: 'Option 1' },
      { key: 'option2', label: 'Option 2' },
    ];

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Positions du Label
        </h3>
        <div className="space-y-6">
          <Select
            label="Label Inside (défaut)"
            labelPlacement="inside"
            placeholder="Label à l'intérieur"
            options={options}
            color="primary"
          />
          <Select
            label="Label Outside"
            labelPlacement="outside"
            placeholder="Label à l'extérieur"
            options={options}
            color="primary"
          />
          <Select
            label="Label Outside Left"
            labelPlacement="outside-left"
            placeholder="Label à gauche"
            options={options}
            color="primary"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};