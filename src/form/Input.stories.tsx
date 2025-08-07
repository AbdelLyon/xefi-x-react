import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconSearch,
  IconLock,
  IconEye,
  IconEyeOff,
  IconCheck,
  IconX,
  IconAlertCircle,
  IconAt,
  IconCreditCard,
  IconMapPin,
  IconCalendar,
} from '@tabler/icons-react';
import { Input } from './Input';
import { Button } from '../button/Button';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'Form/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Input** - Composant de saisie polyvalent avec support de validation, masquage de mot de passe, et personnalisations avancées.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['bordered', 'flat', 'faded', 'underlined'],
      description: 'Style visuel de l\'input',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de l\'input',
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Type d\'input HTML',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Pleine largeur',
    },
    isRequired: {
      control: 'boolean',
      description: 'Champ requis',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Input désactivé',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Lecture seule',
    },
    isClearable: {
      control: 'boolean',
      description: 'Bouton de suppression',
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

export const Default: Story = {
  args: {
    label: 'Nom d\'utilisateur',
    placeholder: 'Saisissez votre nom',
    color: 'primary',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Variantes d'Input
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          variant="bordered"
          label="Bordered"
          placeholder="Style bordered"
          color="primary"
        />
        <Input
          variant="flat"
          label="Flat"
          placeholder="Style flat"
          color="primary"
        />
        <Input
          variant="faded"
          label="Faded"
          placeholder="Style faded"
          color="primary"
        />
        <Input
          variant="underlined"
          label="Underlined"
          placeholder="Style underlined"
          color="primary"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Couleurs Disponibles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          color="default"
          label="Default"
          placeholder="Couleur par défaut"
          variant="bordered"
        />
        <Input
          color="primary"
          label="Primary"
          placeholder="Couleur primaire"
          variant="bordered"
        />
        <Input
          color="secondary"
          label="Secondary"
          placeholder="Couleur secondaire"
          variant="bordered"
        />
        <Input
          color="success"
          label="Success"
          placeholder="Couleur succès"
          variant="bordered"
        />
        <Input
          color="warning"
          label="Warning"
          placeholder="Couleur attention"
          variant="bordered"
        />
        <Input
          color="danger"
          label="Danger"
          placeholder="Couleur danger"
          variant="bordered"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Tailles d'Input
      </h3>
      <div className="space-y-4">
        <Input
          size="sm"
          label="Small"
          placeholder="Taille small"
          color="primary"
        />
        <Input
          size="md"
          label="Medium"
          placeholder="Taille medium (défaut)"
          color="primary"
        />
        <Input
          size="lg"
          label="Large"
          placeholder="Taille large"
          color="primary"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Inputs avec Icônes
      </h3>
      <div className="space-y-4">
        <Input
          label="Utilisateur"
          placeholder="Nom d'utilisateur"
          startContent={<IconUser className="text-default-400" size={18} />}
          color="primary"
        />
        <Input
          label="Email"
          type="email"
          placeholder="votre@email.com"
          startContent={<IconMail className="text-default-400" size={18} />}
          color="primary"
        />
        <Input
          label="Téléphone"
          type="tel"
          placeholder="06 12 34 56 78"
          startContent={<IconPhone className="text-default-400" size={18} />}
          color="primary"
        />
        <Input
          label="Recherche"
          placeholder="Rechercher..."
          startContent={<IconSearch className="text-default-400" size={18} />}
          endContent={
            <Button
              isIconOnly
              size="sm"
              variant="light"
              className="text-default-400"
            >
              <IconX size={16} />
            </Button>
          }
          color="primary"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const PasswordInput: Story = {
  render: () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
      <div className="w-full max-w-md space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Input Mot de Passe
        </h3>
        <div className="space-y-4">
          <Input
            label="Mot de passe"
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onValueChange={setPassword}
            description="Le mot de passe doit contenir au moins 8 caractères"
            color="primary"
          />
          <Input
            label="Confirmer le mot de passe"
            type="password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onValueChange={setConfirmPassword}
            isInvalid={confirmPassword !== '' && password !== confirmPassword}
            errorMessage={
              confirmPassword !== '' && password !== confirmPassword
                ? 'Les mots de passe ne correspondent pas'
                : ''
            }
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

export const Validation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');

    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) ? true : 'Format d\'email invalide';
    };

    const validatePhone = (value: string) => {
      const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
      return phoneRegex.test(value) ? true : 'Format de téléphone invalide';
    };

    const validateWebsite = (value: string) => {
      try {
        new URL(value);
        return true;
      } catch {
        return 'URL invalide';
      }
    };

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Validation en Temps Réel
        </h3>
        <div className="space-y-4">
          <Input
            label="Adresse email"
            type="email"
            placeholder="exemple@email.com"
            value={email}
            onValueChange={setEmail}
            customValidation={validateEmail}
            startContent={<IconAt className="text-default-400" size={18} />}
            color="primary"
            description="Saisissez une adresse email valide"
          />
          <Input
            label="Numéro de téléphone"
            type="tel"
            placeholder="06 12 34 56 78"
            value={phone}
            onValueChange={setPhone}
            customValidation={validatePhone}
            startContent={<IconPhone className="text-default-400" size={18} />}
            color="primary"
            description="Format français attendu"
          />
          <Input
            label="Site web"
            type="url"
            placeholder="https://exemple.com"
            value={website}
            onValueChange={setWebsite}
            customValidation={validateWebsite}
            color="primary"
            description="URL complète avec protocole"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const States: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        États de l'Input
      </h3>
      <div className="space-y-4">
        <Input
          label="Input normal"
          placeholder="État normal"
          color="primary"
        />
        <Input
          label="Input requis"
          placeholder="Champ obligatoire"
          isRequired
          color="primary"
          description="Ce champ est obligatoire"
        />
        <Input
          label="Input désactivé"
          placeholder="Champ désactivé"
          isDisabled
          value="Valeur désactivée"
          color="primary"
        />
        <Input
          label="Lecture seule"
          placeholder="Champ en lecture seule"
          isReadOnly
          value="Valeur en lecture seule"
          color="primary"
        />
        <Input
          label="Input avec erreur"
          placeholder="Champ invalide"
          isInvalid
          errorMessage="Ce champ contient une erreur"
          color="danger"
        />
        <Input
          label="Input avec succès"
          placeholder="Champ valide"
          value="Valeur correcte"
          color="success"
          endContent={<IconCheck className="text-success" size={18} />}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
      cardNumber: '',
    });

    const handleInputChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateEmail = (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value) || value === '' ? true : 'Email invalide';
    };

    const validateZipCode = (value: string) => {
      const zipRegex = /^\d{5}$/;
      return zipRegex.test(value) || value === '' ? true : 'Code postal invalide (5 chiffres)';
    };

    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Formulaire d'Inscription
          </h2>
          <p className="text-default-500">
            Exemple complet avec différents types d'inputs et validation
          </p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Prénom"
              placeholder="Votre prénom"
              value={formData.firstName}
              onValueChange={handleInputChange('firstName')}
              isRequired
              startContent={<IconUser className="text-default-400" size={18} />}
              color="primary"
            />
            <Input
              label="Nom"
              placeholder="Votre nom"
              value={formData.lastName}
              onValueChange={handleInputChange('lastName')}
              isRequired
              color="primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Adresse email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onValueChange={handleInputChange('email')}
              customValidation={validateEmail}
              isRequired
              startContent={<IconMail className="text-default-400" size={18} />}
              color="primary"
            />
            <Input
              label="Téléphone"
              type="tel"
              placeholder="06 12 34 56 78"
              value={formData.phone}
              onValueChange={handleInputChange('phone')}
              startContent={<IconPhone className="text-default-400" size={18} />}
              color="primary"
            />
          </div>

          <Input
            label="Adresse"
            placeholder="123 Rue de la Paix"
            value={formData.address}
            onValueChange={handleInputChange('address')}
            startContent={<IconMapPin className="text-default-400" size={18} />}
            color="primary"
            fullWidth
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Ville"
              placeholder="Paris"
              value={formData.city}
              onValueChange={handleInputChange('city')}
              color="primary"
              className="md:col-span-2"
            />
            <Input
              label="Code postal"
              placeholder="75001"
              value={formData.zipCode}
              onValueChange={handleInputChange('zipCode')}
              customValidation={validateZipCode}
              color="primary"
            />
          </div>

          <Input
            label="Numéro de carte"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onValueChange={handleInputChange('cardNumber')}
            startContent={<IconCreditCard className="text-default-400" size={18} />}
            color="primary"
            description="Votre numéro de carte sera crypté"
          />

          <div className="flex gap-4 pt-4">
            <Button color="primary" size="lg" className="flex-1">
              S'inscrire
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
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Positions du Label
      </h3>
      <div className="space-y-6">
        <Input
          label="Label Inside (défaut)"
          labelPlacement="inside"
          placeholder="Label à l'intérieur"
          color="primary"
        />
        <Input
          label="Label Outside"
          labelPlacement="outside"
          placeholder="Label à l'extérieur"
          color="primary"
        />
        <Input
          label="Label Outside Left"
          labelPlacement="outside-left"
          placeholder="Label à gauche"
          color="primary"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};