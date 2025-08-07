import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCheck,
  IconX,
  IconMinus,
  IconStar,
  IconHeart,
  IconBookmark,
  IconThumbUp,
  IconThumbDown,
  IconBell,
  IconMail,
  IconSettings,
  IconUser,
  IconShield,
  IconLock,
  IconEye,
  IconCamera,
  IconMicrophone,
  IconLocation,
  IconWifi,
  IconBluetooth,
  IconDeviceMobile,
  IconDesktop,
  IconTablet,
} from '@tabler/icons-react';
import { CheckboxGroup, Checkbox } from './Checkbox';
import type { CheckboxItemConfig } from './checkboxConfig';
import { Button } from '../button/Button';
import { useState } from 'react';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Form/Checkbox',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Checkbox** - Composant de cases à cocher avancé avec support de groupes, validation, sélection multiple et personnalisations.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille des checkboxes',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation du groupe',
    },
    spacing: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Espacement entre les éléments',
    },
    isRequired: {
      control: 'boolean',
      description: 'Groupe requis',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Groupe désactivé',
    },
    showSelectAll: {
      control: 'boolean',
      description: 'Afficher "Tout sélectionner"',
    },
    maxSelections: {
      control: 'number',
      description: 'Nombre maximum de sélections',
    },
    minSelections: {
      control: 'number',
      description: 'Nombre minimum de sélections',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const basicItems: CheckboxItemConfig[] = [
  { value: 'option1', label: 'Première option' },
  { value: 'option2', label: 'Deuxième option' },
  { value: 'option3', label: 'Troisième option' },
  { value: 'option4', label: 'Quatrième option' },
];

export const Default: Story = {
  args: {
    items: basicItems,
    label: 'Choisissez vos options',
    description: 'Vous pouvez sélectionner plusieurs options',
    color: 'primary',
  },
};

export const SingleCheckbox: Story = {
  render: () => {
    const [isChecked, setIsChecked] = useState(false);
    const [isNewsletterChecked, setIsNewsletterChecked] = useState(true);
    const [isTermsChecked, setIsTermsChecked] = useState(false);

    return (
      <div className="w-full max-w-md space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Checkboxes Individuelles
        </h3>
        <div className="space-y-4">
          <Checkbox
            isSelected={isChecked}
            onValueChange={setIsChecked}
            color="primary"
          >
            Case à cocher simple
          </Checkbox>

          <Checkbox
            isSelected={isNewsletterChecked}
            onValueChange={setIsNewsletterChecked}
            color="success"
          >
            S'abonner à la newsletter
          </Checkbox>

          <Checkbox
            isSelected={isTermsChecked}
            onValueChange={setIsTermsChecked}
            color="danger"
            isRequired
          >
            J'accepte les conditions d'utilisation *
          </Checkbox>

          <Checkbox isDisabled color="primary">
            Option désactivée
          </Checkbox>

          <Checkbox isDisabled isSelected color="primary">
            Option désactivée (cochée)
          </Checkbox>
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
    const items: CheckboxItemConfig[] = [
      { value: 'small1', label: 'Option small 1' },
      { value: 'small2', label: 'Option small 2' },
    ];

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Tailles de Checkbox
        </h3>
        <div className="space-y-6">
          <CheckboxGroup
            items={items}
            label="Small Checkboxes"
            size="sm"
            color="primary"
          />
          <CheckboxGroup
            items={[
              { value: 'medium1', label: 'Option medium 1' },
              { value: 'medium2', label: 'Option medium 2' },
            ]}
            label="Medium Checkboxes (défaut)"
            size="md"
            color="primary"
          />
          <CheckboxGroup
            items={[
              { value: 'large1', label: 'Option large 1' },
              { value: 'large2', label: 'Option large 2' },
            ]}
            label="Large Checkboxes"
            size="lg"
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
  render: () => (
    <div className="w-full max-w-4xl space-y-6 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Couleurs Disponibles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CheckboxGroup
          items={[
            { value: 'default1', label: 'Option 1', checked: true },
            { value: 'default2', label: 'Option 2' },
          ]}
          label="Default"
          color="default"
        />
        <CheckboxGroup
          items={[
            { value: 'primary1', label: 'Option 1', checked: true },
            { value: 'primary2', label: 'Option 2' },
          ]}
          label="Primary"
          color="primary"
        />
        <CheckboxGroup
          items={[
            { value: 'secondary1', label: 'Option 1', checked: true },
            { value: 'secondary2', label: 'Option 2' },
          ]}
          label="Secondary"
          color="secondary"
        />
        <CheckboxGroup
          items={[
            { value: 'success1', label: 'Option 1', checked: true },
            { value: 'success2', label: 'Option 2' },
          ]}
          label="Success"
          color="success"
        />
        <CheckboxGroup
          items={[
            { value: 'warning1', label: 'Option 1', checked: true },
            { value: 'warning2', label: 'Option 2' },
          ]}
          label="Warning"
          color="warning"
        />
        <CheckboxGroup
          items={[
            { value: 'danger1', label: 'Option 1', checked: true },
            { value: 'danger2', label: 'Option 2' },
          ]}
          label="Danger"
          color="danger"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithIcons: Story = {
  render: () => {
    const itemsWithIcons: CheckboxItemConfig[] = [
      {
        value: 'favorite',
        label: 'Ajouter aux favoris',
        icon: <IconHeart size={16} />,
      },
      {
        value: 'bookmark',
        label: 'Marquer cette page',
        icon: <IconBookmark size={16} />,
      },
      {
        value: 'like',
        label: 'J\'aime ce contenu',
        icon: <IconThumbUp size={16} />,
      },
      {
        value: 'star',
        label: 'Donner une étoile',
        icon: <IconStar size={16} />,
      },
    ];

    return (
      <div className="w-full max-w-md">
        <CheckboxGroup
          items={itemsWithIcons}
          label="Actions"
          description="Sélectionnez les actions à effectuer"
          color="primary"
          showSelectAll
          selectAllLabel="Toutes les actions"
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Orientations: Story = {
  render: () => {
    const items: CheckboxItemConfig[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
    ];

    return (
      <div className="w-full max-w-4xl space-y-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Orientations et Espacement
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Vertical (défaut)</h4>
            <CheckboxGroup
              items={items}
              label="Options verticales"
              orientation="vertical"
              spacing="md"
              color="primary"
            />
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Horizontal</h4>
            <CheckboxGroup
              items={items}
              label="Options horizontales"
              orientation="horizontal"
              spacing="lg"
              color="primary"
            />
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Horizontal avec espacement réduit</h4>
            <CheckboxGroup
              items={items}
              label="Options compactes"
              orientation="horizontal"
              spacing="sm"
              color="primary"
            />
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithValidation: Story = {
  render: () => {
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedPreferences, setSelectedPreferences] = useState<string[]>(['email']);

    const skills: CheckboxItemConfig[] = [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue.js' },
      { value: 'angular', label: 'Angular' },
      { value: 'nodejs', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
    ];

    const preferences: CheckboxItemConfig[] = [
      { value: 'email', label: 'Notifications par email' },
      { value: 'sms', label: 'Notifications SMS' },
      { value: 'push', label: 'Notifications push' },
      { value: 'newsletter', label: 'Newsletter hebdomadaire' },
    ];

    const validateSkills = (values: string[]) => {
      if (values.length < 2) {
        return 'Veuillez sélectionner au moins 2 compétences';
      }
      if (values.length > 4) {
        return 'Veuillez sélectionner au maximum 4 compétences';
      }
      return true;
    };

    return (
      <div className="w-full max-w-2xl space-y-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Validation Avancée
        </h3>
        
        <CheckboxGroup
          items={skills}
          label="Compétences techniques"
          description="Sélectionnez entre 2 et 4 compétences"
          value={selectedSkills}
          onValueChange={setSelectedSkills}
          minSelections={2}
          maxSelections={4}
          customValidate={validateSkills}
          color="primary"
          isRequired
          showSelectAll
          selectAllLabel="Toutes les compétences"
        />

        <CheckboxGroup
          items={preferences}
          label="Préférences de notification"
          description="Comment souhaitez-vous être notifié ?"
          value={selectedPreferences}
          onValueChange={setSelectedPreferences}
          minSelections={1}
          color="secondary"
          isRequired
        />

        <div className="p-4 bg-default-50 rounded-lg">
          <h4 className="font-medium mb-2">Sélections actuelles :</h4>
          <p className="text-sm text-default-600">
            <strong>Compétences :</strong> {selectedSkills.length > 0 ? selectedSkills.join(', ') : 'Aucune'}
          </p>
          <p className="text-sm text-default-600">
            <strong>Notifications :</strong> {selectedPreferences.length > 0 ? selectedPreferences.join(', ') : 'Aucune'}
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const PermissionsPanel: Story = {
  render: () => {
    const [appPermissions, setAppPermissions] = useState<string[]>(['notifications']);
    const [privacySettings, setPrivacySettings] = useState<string[]>(['analytics']);
    const [deviceAccess, setDeviceAccess] = useState<string[]>([]);

    const appPermissionItems: CheckboxItemConfig[] = [
      {
        value: 'notifications',
        label: 'Notifications',
        icon: <IconBell size={16} />,
      },
      {
        value: 'location',
        label: 'Géolocalisation',
        icon: <IconLocation size={16} />,
      },
      {
        value: 'camera',
        label: 'Accès à la caméra',
        icon: <IconCamera size={16} />,
      },
      {
        value: 'microphone',
        label: 'Accès au microphone',
        icon: <IconMicrophone size={16} />,
      },
      {
        value: 'contacts',
        label: 'Accès aux contacts',
        icon: <IconUser size={16} />,
      },
    ];

    const privacyItems: CheckboxItemConfig[] = [
      {
        value: 'analytics',
        label: 'Données d\'utilisation',
        icon: <IconSettings size={16} />,
      },
      {
        value: 'crash-reports',
        label: 'Rapports de plantage',
        icon: <IconShield size={16} />,
      },
      {
        value: 'personalization',
        label: 'Personnalisation',
        icon: <IconUser size={16} />,
      },
      {
        value: 'marketing',
        label: 'Communications marketing',
        icon: <IconMail size={16} />,
      },
    ];

    const deviceItems: CheckboxItemConfig[] = [
      {
        value: 'wifi',
        label: 'Connexion Wi-Fi',
        icon: <IconWifi size={16} />,
      },
      {
        value: 'bluetooth',
        label: 'Bluetooth',
        icon: <IconBluetooth size={16} />,
      },
      {
        value: 'mobile-data',
        label: 'Données mobiles',
        icon: <IconDeviceMobile size={16} />,
      },
      {
        value: 'storage',
        label: 'Stockage local',
        icon: <IconDesktop size={16} />,
      },
    ];

    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Paramètres de Confidentialité
          </h2>
          <p className="text-default-500">
            Gérez vos permissions et préférences de confidentialité
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <IconShield size={20} />
              Permissions d'application
            </h3>
            <CheckboxGroup
              items={appPermissionItems}
              label="Accès système"
              description="Autorisations système requises"
              value={appPermissions}
              onValueChange={setAppPermissions}
              color="primary"
              spacing="md"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <IconLock size={20} />
              Confidentialité
            </h3>
            <CheckboxGroup
              items={privacyItems}
              label="Partage de données"
              description="Données partagées avec nous"
              value={privacySettings}
              onValueChange={setPrivacySettings}
              color="warning"
              spacing="md"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <IconDeviceMobile size={20} />
              Accès périphérique
            </h3>
            <CheckboxGroup
              items={deviceItems}
              label="Connectivité"
              description="Accès aux fonctionnalités appareil"
              value={deviceAccess}
              onValueChange={setDeviceAccess}
              color="success"
              spacing="md"
            />
          </div>
        </div>

        <div className="mt-8 p-6 bg-default-50 rounded-lg">
          <h4 className="font-semibold mb-4">Résumé des permissions :</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Application ({appPermissions.length})</strong>
              <div className="text-default-600 mt-1">
                {appPermissions.length > 0 ? appPermissions.join(', ') : 'Aucune permission'}
              </div>
            </div>
            <div>
              <strong>Confidentialité ({privacySettings.length})</strong>
              <div className="text-default-600 mt-1">
                {privacySettings.length > 0 ? privacySettings.join(', ') : 'Aucun partage'}
              </div>
            </div>
            <div>
              <strong>Périphérique ({deviceAccess.length})</strong>
              <div className="text-default-600 mt-1">
                {deviceAccess.length > 0 ? deviceAccess.join(', ') : 'Aucun accès'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button color="primary" size="lg" className="flex-1">
            Sauvegarder les paramètres
          </Button>
          <Button variant="bordered" size="lg" className="flex-1">
            Réinitialiser
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const States: Story = {
  render: () => {
    const normalItems: CheckboxItemConfig[] = [
      { value: 'normal1', label: 'Option normale 1' },
      { value: 'normal2', label: 'Option normale 2' },
    ];

    const disabledItems: CheckboxItemConfig[] = [
      { value: 'disabled1', label: 'Option désactivée 1', disabled: true },
      { value: 'disabled2', label: 'Option désactivée 2', disabled: true, checked: true },
    ];

    return (
      <div className="w-full max-w-2xl space-y-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          États des Checkboxes
        </h3>
        
        <div className="space-y-6">
          <CheckboxGroup
            items={normalItems}
            label="Groupe normal"
            description="État normal du groupe"
            color="primary"
          />

          <CheckboxGroup
            items={normalItems}
            label="Groupe requis"
            description="Ce groupe est obligatoire"
            color="primary"
            isRequired
          />

          <CheckboxGroup
            items={disabledItems}
            label="Groupe désactivé"
            description="Groupe non interactif"
            color="default"
            isDisabled
          />

          <CheckboxGroup
            items={[
              { value: 'invalid1', label: 'Option avec erreur 1' },
              { value: 'invalid2', label: 'Option avec erreur 2' },
            ]}
            label="Groupe avec erreur"
            description="Veuillez corriger les erreurs"
            color="danger"
            state="invalid"
            errorMessage="Au moins une option doit être sélectionnée"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};