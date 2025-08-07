import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCreditCard,
  IconBrandPaypal,
  IconBuildingBank,
  IconCoin,
  IconTruck,
  IconPlane,
  IconCar,
  IconBike,
  IconStar,
  IconThumbUp,
  IconThumbDown,
  IconMoodSad,
  IconMoodHappy,
  IconMoodNeutral,
  IconDeviceMobile,
  IconDesktop,
  IconTablet,
  IconMail,
  IconBell,
  IconMessageCircle,
  IconPhone,
  IconUser,
  IconUserCheck,
  IconUserX,
  IconShield,
  IconEye,
  IconEyeOff,
  IconSun,
  IconMoon,
  IconSettings,
} from '@tabler/icons-react';
import { RadioGroup } from './Radio';
import type { RadioItemProps } from './Radio';
import { Button } from '../button/Button';
import { useState } from 'react';

const meta: Meta<typeof RadioGroup> = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**RadioGroup** - Composant de boutons radio pour sélection unique avec personnalisations avancées et styles élégants.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'Orientation du groupe',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille des boutons radio',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    isRequired: {
      control: 'boolean',
      description: 'Groupe requis',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Groupe désactivé',
    },
    isInvalid: {
      control: 'boolean',
      description: 'État d\'erreur',
    },
    label: {
      control: 'text',
      description: 'Label du groupe',
    },
    description: {
      control: 'text',
      description: 'Description du groupe',
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

const basicItems: RadioItemProps[] = [
  { value: 'option1', label: 'Première option' },
  { value: 'option2', label: 'Deuxième option' },
  { value: 'option3', label: 'Troisième option' },
];

export const Default: Story = {
  args: {
    items: basicItems,
    label: 'Choisissez une option',
    description: 'Sélectionnez une seule option',
    color: 'primary',
  },
};

export const PaymentMethods: Story = {
  render: () => {
    const [selectedPayment, setSelectedPayment] = useState('card');

    const paymentMethods: RadioItemProps[] = [
      {
        value: 'card',
        label: (
          <div className="flex items-center gap-3">
            <IconCreditCard size={20} />
            <div>
              <div className="font-medium">Carte bancaire</div>
              <div className="text-sm text-default-500">Visa, Mastercard, American Express</div>
            </div>
          </div>
        ),
      },
      {
        value: 'paypal',
        label: (
          <div className="flex items-center gap-3">
            <IconBrandPaypal size={20} />
            <div>
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-default-500">Paiement sécurisé via PayPal</div>
            </div>
          </div>
        ),
      },
      {
        value: 'bank',
        label: (
          <div className="flex items-center gap-3">
            <IconBuildingBank size={20} />
            <div>
              <div className="font-medium">Virement bancaire</div>
              <div className="text-sm text-default-500">Paiement par virement SEPA</div>
            </div>
          </div>
        ),
      },
      {
        value: 'cash',
        label: (
          <div className="flex items-center gap-3">
            <IconCoin size={20} />
            <div>
              <div className="font-medium">Espèces</div>
              <div className="text-sm text-default-500">Paiement à la livraison</div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="w-full max-w-md">
        <RadioGroup
          items={paymentMethods}
          label="Méthode de paiement"
          description="Comment souhaitez-vous payer ?"
          value={selectedPayment}
          onValueChange={setSelectedPayment}
          color="primary"
        />
        
        <div className="mt-6 p-4 bg-default-50 rounded-lg">
          <p className="text-sm text-default-600">
            <strong>Méthode sélectionnée :</strong> {selectedPayment}
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const ShippingOptions: Story = {
  render: () => {
    const [selectedShipping, setSelectedShipping] = useState('standard');

    const shippingOptions: RadioItemProps[] = [
      {
        value: 'express',
        label: (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <IconPlane size={20} />
              <div>
                <div className="font-medium">Livraison express</div>
                <div className="text-sm text-default-500">24-48h</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">9.99€</div>
              <div className="text-xs text-success">Le plus rapide</div>
            </div>
          </div>
        ),
      },
      {
        value: 'standard',
        label: (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <IconTruck size={20} />
              <div>
                <div className="font-medium">Livraison standard</div>
                <div className="text-sm text-default-500">3-5 jours ouvrés</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">4.99€</div>
              <div className="text-xs text-primary">Recommandé</div>
            </div>
          </div>
        ),
      },
      {
        value: 'economy',
        label: (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <IconCar size={20} />
              <div>
                <div className="font-medium">Livraison économique</div>
                <div className="text-sm text-default-500">7-10 jours ouvrés</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">1.99€</div>
              <div className="text-xs text-warning">Économique</div>
            </div>
          </div>
        ),
      },
      {
        value: 'pickup',
        label: (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <IconBike size={20} />
              <div>
                <div className="font-medium">Retrait en magasin</div>
                <div className="text-sm text-default-500">Disponible sous 2h</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-success">Gratuit</div>
              <div className="text-xs text-success">0€</div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="w-full max-w-lg">
        <RadioGroup
          items={shippingOptions}
          label="Options de livraison"
          description="Choisissez votre mode de livraison préféré"
          value={selectedShipping}
          onValueChange={setSelectedShipping}
          color="primary"
          groupClasses={{
            base: "w-full",
          }}
          itemClasses={{
            base: "w-full max-w-none data-[selected=true]:bg-primary-50 data-[selected=true]:border-primary-200 border border-default-200 rounded-lg p-4 hover:bg-default-50 transition-colors",
            wrapper: "mr-3",
          }}
        />
        
        <div className="mt-6 p-4 bg-default-50 rounded-lg">
          <p className="text-sm text-default-600">
            <strong>Livraison sélectionnée :</strong> {selectedShipping}
          </p>
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
    const items: RadioItemProps[] = [
      { value: 'option1', label: 'Première option' },
      { value: 'option2', label: 'Deuxième option' },
    ];

    return (
      <div className="w-full max-w-2xl space-y-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Tailles de RadioGroup
        </h3>
        <div className="space-y-6">
          <RadioGroup
            items={items}
            label="Small Radio Group"
            size="sm"
            color="primary"
            defaultValue="option1"
          />
          <RadioGroup
            items={items}
            label="Medium Radio Group (défaut)"
            size="md"
            color="primary"
            defaultValue="option1"
          />
          <RadioGroup
            items={items}
            label="Large Radio Group"
            size="lg"
            color="primary"
            defaultValue="option1"
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
    const items: RadioItemProps[] = [
      { value: 'option1', label: 'Option sélectionnée' },
      { value: 'option2', label: 'Option alternative' },
    ];

    return (
      <div className="w-full max-w-4xl space-y-6 p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Couleurs Disponibles
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RadioGroup
            items={items}
            label="Default"
            color="default"
            defaultValue="option1"
          />
          <RadioGroup
            items={items}
            label="Primary"
            color="primary"
            defaultValue="option1"
          />
          <RadioGroup
            items={items}
            label="Secondary"
            color="secondary"
            defaultValue="option1"
          />
          <RadioGroup
            items={items}
            label="Success"
            color="success"
            defaultValue="option1"
          />
          <RadioGroup
            items={items}
            label="Warning"
            color="warning"
            defaultValue="option1"
          />
          <RadioGroup
            items={items}
            label="Danger"
            color="danger"
            defaultValue="option1"
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Orientations: Story = {
  render: () => {
    const items: RadioItemProps[] = [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' },
    ];

    return (
      <div className="w-full max-w-4xl space-y-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Orientations du RadioGroup
        </h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Vertical (défaut)</h4>
            <RadioGroup
              items={items}
              label="Options verticales"
              orientation="vertical"
              color="primary"
              defaultValue="option1"
            />
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-3">Horizontal</h4>
            <RadioGroup
              items={items}
              label="Options horizontales"
              orientation="horizontal"
              color="primary"
              defaultValue="option2"
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

export const DevicePlatform: Story = {
  render: () => {
    const [selectedDevice, setSelectedDevice] = useState('mobile');

    const devices: RadioItemProps[] = [
      {
        value: 'mobile',
        label: (
          <div className="flex items-center gap-3">
            <IconDeviceMobile size={24} />
            <div>
              <div className="font-medium">Mobile</div>
              <div className="text-sm text-default-500">iOS et Android</div>
            </div>
          </div>
        ),
      },
      {
        value: 'tablet',
        label: (
          <div className="flex items-center gap-3">
            <IconTablet size={24} />
            <div>
              <div className="font-medium">Tablette</div>
              <div className="text-sm text-default-500">iPad et Android tablets</div>
            </div>
          </div>
        ),
      },
      {
        value: 'desktop',
        label: (
          <div className="flex items-center gap-3">
            <IconDesktop size={24} />
            <div>
              <div className="font-medium">Desktop</div>
              <div className="text-sm text-default-500">Windows, macOS, Linux</div>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="w-full max-w-md">
        <RadioGroup
          items={devices}
          label="Plateforme cible"
          description="Sur quelle plateforme développez-vous ?"
          value={selectedDevice}
          onValueChange={setSelectedDevice}
          color="secondary"
          orientation="vertical"
        />
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const SatisfactionSurvey: Story = {
  render: () => {
    const [satisfaction, setSatisfaction] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [contact, setContact] = useState('email');

    const satisfactionLevels: RadioItemProps[] = [
      {
        value: 'very-satisfied',
        label: (
          <div className="flex items-center gap-3">
            <IconMoodHappy size={24} className="text-success" />
            <div>
              <div className="font-medium">Très satisfait</div>
              <div className="text-sm text-default-500">Excellent service</div>
            </div>
          </div>
        ),
      },
      {
        value: 'satisfied',
        label: (
          <div className="flex items-center gap-3">
            <IconThumbUp size={24} className="text-primary" />
            <div>
              <div className="font-medium">Satisfait</div>
              <div className="text-sm text-default-500">Bon service</div>
            </div>
          </div>
        ),
      },
      {
        value: 'neutral',
        label: (
          <div className="flex items-center gap-3">
            <IconMoodNeutral size={24} className="text-warning" />
            <div>
              <div className="font-medium">Neutre</div>
              <div className="text-sm text-default-500">Service acceptable</div>
            </div>
          </div>
        ),
      },
      {
        value: 'dissatisfied',
        label: (
          <div className="flex items-center gap-3">
            <IconThumbDown size={24} className="text-danger" />
            <div>
              <div className="font-medium">Insatisfait</div>
              <div className="text-sm text-default-500">Service décevant</div>
            </div>
          </div>
        ),
      },
      {
        value: 'very-dissatisfied',
        label: (
          <div className="flex items-center gap-3">
            <IconMoodSad size={24} className="text-danger" />
            <div>
              <div className="font-medium">Très insatisfait</div>
              <div className="text-sm text-default-500">Service très décevant</div>
            </div>
          </div>
        ),
      },
    ];

    const recommendationOptions: RadioItemProps[] = [
      { value: 'definitely', label: '10 - Absolument, je recommande vivement' },
      { value: 'probably', label: '8-9 - Probablement' },
      { value: 'maybe', label: '6-7 - Peut-être' },
      { value: 'unlikely', label: '4-5 - Peu probable' },
      { value: 'never', label: '0-3 - Jamais' },
    ];

    const contactMethods: RadioItemProps[] = [
      {
        value: 'email',
        label: (
          <div className="flex items-center gap-2">
            <IconMail size={18} />
            <span>Email</span>
          </div>
        ),
      },
      {
        value: 'phone',
        label: (
          <div className="flex items-center gap-2">
            <IconPhone size={18} />
            <span>Téléphone</span>
          </div>
        ),
      },
      {
        value: 'sms',
        label: (
          <div className="flex items-center gap-2">
            <IconMessageCircle size={18} />
            <span>SMS</span>
          </div>
        ),
      },
      {
        value: 'none',
        label: 'Ne pas me contacter',
      },
    ];

    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Enquête de Satisfaction
          </h2>
          <p className="text-default-500">
            Votre avis nous aide à améliorer nos services
          </p>
        </div>

        <div className="space-y-8">
          <RadioGroup
            items={satisfactionLevels}
            label="Comment évaluez-vous notre service ?"
            description="Sélectionnez votre niveau de satisfaction global"
            value={satisfaction}
            onValueChange={setSatisfaction}
            color="primary"
            isRequired
          />

          <RadioGroup
            items={recommendationOptions}
            label="Recommanderiez-vous nos services ? (0-10)"
            description="0 = Jamais, 10 = Absolument"
            value={recommendation}
            onValueChange={setRecommendation}
            color="success"
            isRequired
          />

          <RadioGroup
            items={contactMethods}
            label="Comment préférez-vous être contacté ?"
            description="Pour un suivi de cette enquête"
            value={contact}
            onValueChange={setContact}
            color="secondary"
            orientation="horizontal"
          />

          <div className="flex gap-4 pt-4">
            <Button
              color="primary"
              size="lg"
              className="flex-1"
              isDisabled={!satisfaction || !recommendation}
            >
              Envoyer l'enquête
            </Button>
            <Button variant="bordered" size="lg" className="flex-1">
              Annuler
            </Button>
          </div>
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
    const items: RadioItemProps[] = [
      { value: 'option1', label: 'Première option' },
      { value: 'option2', label: 'Deuxième option' },
    ];

    return (
      <div className="w-full max-w-2xl space-y-8">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          États du RadioGroup
        </h3>
        
        <div className="space-y-6">
          <RadioGroup
            items={items}
            label="RadioGroup normal"
            description="État normal du groupe"
            color="primary"
            defaultValue="option1"
          />

          <RadioGroup
            items={items}
            label="RadioGroup requis"
            description="Ce groupe est obligatoire"
            color="primary"
            isRequired
          />

          <RadioGroup
            items={items}
            label="RadioGroup désactivé"
            description="Groupe non interactif"
            color="default"
            isDisabled
            defaultValue="option1"
          />

          <RadioGroup
            items={items}
            label="RadioGroup avec erreur"
            description="Veuillez sélectionner une option valide"
            color="danger"
            isInvalid
            errorMessage="Une sélection est requise"
            isRequired
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};