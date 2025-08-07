import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconMessage,
  IconMail,
  IconFileText,
  IconNotes,
  IconBug,
  IconStarFilled,
  IconUser,
  IconBuildingStore,
  IconMapPin,
  IconPhone,
  IconCalendar,
  IconClock,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconEdit,
  IconQuestionMark,
} from '@tabler/icons-react';
import { Textarea } from './Textarea';
import { Button } from '../button/Button';
import { useState } from 'react';

const meta: Meta<typeof Textarea> = {
  title: 'Form/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Textarea** - Composant de zone de texte multi-ligne avec validation personnalisée et styles avancés.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['bordered', 'flat', 'faded', 'underlined'],
      description: 'Style visuel du textarea',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du textarea',
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
    width: {
      control: 'number',
      description: 'Largeur personnalisée (px)',
    },
    height: {
      control: 'number',
      description: 'Hauteur personnalisée (px)',
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
      description: 'Textarea désactivé',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Lecture seule',
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
    maxLength: {
      control: 'number',
      description: 'Nombre maximum de caractères',
    },
    minLength: {
      control: 'number',
      description: 'Nombre minimum de caractères',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Votre message',
    placeholder: 'Saisissez votre message ici...',
    color: 'primary',
    rows: 4,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Variantes de Textarea
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Textarea
          variant="bordered"
          label="Bordered"
          placeholder="Style bordered"
          color="primary"
          rows={3}
        />
        <Textarea
          variant="flat"
          label="Flat"
          placeholder="Style flat"
          color="primary"
          rows={3}
        />
        <Textarea
          variant="faded"
          label="Faded"
          placeholder="Style faded"
          color="primary"
          rows={3}
        />
        <Textarea
          variant="underlined"
          label="Underlined"
          placeholder="Style underlined"
          color="primary"
          rows={3}
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
        <Textarea
          color="default"
          label="Default"
          placeholder="Couleur par défaut"
          variant="bordered"
          rows={3}
        />
        <Textarea
          color="primary"
          label="Primary"
          placeholder="Couleur primaire"
          variant="bordered"
          rows={3}
        />
        <Textarea
          color="secondary"
          label="Secondary"
          placeholder="Couleur secondaire"
          variant="bordered"
          rows={3}
        />
        <Textarea
          color="success"
          label="Success"
          placeholder="Couleur succès"
          variant="bordered"
          rows={3}
        />
        <Textarea
          color="warning"
          label="Warning"
          placeholder="Couleur attention"
          variant="bordered"
          rows={3}
        />
        <Textarea
          color="danger"
          label="Danger"
          placeholder="Couleur danger"
          variant="bordered"
          rows={3}
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
        Tailles de Textarea
      </h3>
      <div className="space-y-4">
        <Textarea
          size="sm"
          label="Small"
          placeholder="Taille small"
          color="primary"
          rows={3}
        />
        <Textarea
          size="md"
          label="Medium"
          placeholder="Taille medium (défaut)"
          color="primary"
          rows={3}
        />
        <Textarea
          size="lg"
          label="Large"
          placeholder="Taille large"
          color="primary"
          rows={3}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const CustomDimensions: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Dimensions Personnalisées
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Textarea
          label="Textarea compacte"
          placeholder="Zone de texte compacte"
          width={300}
          height={100}
          color="primary"
          description="300px × 100px"
        />
        <Textarea
          label="Textarea standard"
          placeholder="Zone de texte standard"
          width={400}
          height={150}
          color="primary"
          description="400px × 150px"
        />
        <Textarea
          label="Textarea large"
          placeholder="Zone de texte large"
          width="100%"
          height={200}
          color="primary"
          description="100% × 200px"
        />
        <Textarea
          label="Textarea extra large"
          placeholder="Zone de texte extra large"
          width="100%"
          height={250}
          color="primary"
          description="100% × 250px"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithValidation: Story = {
  render: () => {
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [review, setReview] = useState('');

    const validateMessage = (value: string) => {
      if (value.length < 10) {
        return 'Le message doit contenir au moins 10 caractères';
      }
      if (value.length > 500) {
        return 'Le message ne peut pas dépasser 500 caractères';
      }
      return true;
    };

    const validateFeedback = (value: string) => {
      const badWords = ['spam', 'fake', 'scam'];
      for (const word of badWords) {
        if (value.toLowerCase().includes(word)) {
          return 'Votre message contient des mots non autorisés';
        }
      }
      return true;
    };

    return (
      <div className="w-full max-w-2xl space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Validation en Temps Réel
        </h3>
        <div className="space-y-6">
          <Textarea
            label="Message avec validation de longueur"
            placeholder="Saisissez votre message (10-500 caractères)"
            value={message}
            onValueChange={setMessage}
            customValidation={validateMessage}
            color="primary"
            description={`${message.length}/500 caractères`}
            maxLength={500}
            rows={4}
          />

          <Textarea
            label="Feedback avec filtre de contenu"
            placeholder="Partagez votre feedback"
            value={feedback}
            onValueChange={setFeedback}
            customValidation={validateFeedback}
            color="secondary"
            description="Évitez les mots inappropriés"
            rows={3}
          />

          <Textarea
            label="Avis produit"
            placeholder="Rédigez votre avis détaillé"
            value={review}
            onValueChange={setReview}
            color="success"
            description="Votre avis nous aide à améliorer nos produits"
            rows={5}
            minLength={20}
            maxLength={1000}
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
        États du Textarea
      </h3>
      <div className="space-y-4">
        <Textarea
          label="Textarea normal"
          placeholder="État normal"
          color="primary"
          rows={3}
        />
        <Textarea
          label="Textarea requis"
          placeholder="Champ obligatoire"
          isRequired
          color="primary"
          description="Ce champ est obligatoire"
          rows={3}
        />
        <Textarea
          label="Textarea désactivé"
          placeholder="Champ désactivé"
          isDisabled
          value="Contenu désactivé"
          color="primary"
          rows={3}
        />
        <Textarea
          label="Lecture seule"
          placeholder="Champ en lecture seule"
          isReadOnly
          value="Ce contenu est en lecture seule et ne peut pas être modifié."
          color="primary"
          rows={3}
        />
        <Textarea
          label="Textarea avec erreur"
          placeholder="Champ invalide"
          isInvalid
          errorMessage="Ce champ contient une erreur"
          color="danger"
          rows={3}
        />
        <Textarea
          label="Textarea avec succès"
          placeholder="Champ valide"
          value="Contenu validé avec succès !"
          color="success"
          description="Le contenu a été validé"
          rows={3}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const ContactForm: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      subject: '',
      message: '',
      details: '',
      feedback: '',
    });

    const handleInputChange = (field: string) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateSubject = (value: string) => {
      if (value.length < 5) {
        return 'Le sujet doit contenir au moins 5 caractères';
      }
      return true;
    };

    const validateMessage = (value: string) => {
      if (value.length < 20) {
        return 'Le message doit contenir au moins 20 caractères';
      }
      return true;
    };

    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <IconMail size={28} />
            Formulaire de Contact
          </h2>
          <p className="text-default-500">
            Contactez-nous pour toute question ou demande d'information
          </p>
        </div>

        <form className="space-y-6">
          <Textarea
            label="Sujet"
            placeholder="Ex: Demande d'information sur vos services"
            value={formData.subject}
            onValueChange={handleInputChange('subject')}
            customValidation={validateSubject}
            isRequired
            color="primary"
            rows={2}
            startContent={<IconFileText className="text-default-400" size={18} />}
            description="Décrivez brièvement l'objet de votre message"
          />

          <Textarea
            label="Message principal"
            placeholder="Décrivez votre demande en détail..."
            value={formData.message}
            onValueChange={handleInputChange('message')}
            customValidation={validateMessage}
            isRequired
            color="primary"
            rows={6}
            startContent={<IconMessage className="text-default-400" size={18} />}
            description={`${formData.message.length} caractères (minimum 20)`}
            maxLength={2000}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea
              label="Détails techniques (optionnel)"
              placeholder="Informations techniques complémentaires..."
              value={formData.details}
              onValueChange={handleInputChange('details')}
              color="secondary"
              rows={4}
              variant="faded"
              description="Spécifications, références, etc."
            />

            <Textarea
              label="Feedback sur notre service"
              placeholder="Comment pouvons-nous nous améliorer ?"
              value={formData.feedback}
              onValueChange={handleInputChange('feedback')}
              color="success"
              rows={4}
              variant="faded"
              description="Vos suggestions sont précieuses"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              color="primary"
              size="lg"
              className="flex-1"
              isDisabled={!formData.subject || !formData.message}
              startContent={<IconMail size={18} />}
            >
              Envoyer le message
            </Button>
            <Button variant="bordered" size="lg" className="flex-1">
              Réinitialiser
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

export const BugReportForm: Story = {
  render: () => {
    const [bugReport, setBugReport] = useState({
      title: '',
      description: '',
      steps: '',
      expected: '',
      actual: '',
      additional: '',
    });

    const updateField = (field: string) => (value: string) => {
      setBugReport(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <IconBug size={28} className="text-danger" />
            Rapport de Bug
          </h2>
          <p className="text-default-500">
            Aidez-nous à corriger les problèmes en décrivant le bug rencontré
          </p>
        </div>

        <form className="space-y-6">
          <Textarea
            label="Titre du bug"
            placeholder="Résumé court et descriptif du problème"
            value={bugReport.title}
            onValueChange={updateField('title')}
            isRequired
            color="danger"
            rows={2}
            startContent={<IconAlertCircle className="text-danger" size={18} />}
            description="Soyez précis et concis"
          />

          <Textarea
            label="Description détaillée"
            placeholder="Décrivez le problème en détail..."
            value={bugReport.description}
            onValueChange={updateField('description')}
            isRequired
            color="danger"
            rows={4}
            description="Que s'est-il passé exactement ?"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea
              label="Étapes pour reproduire"
              placeholder="1. Aller sur la page...&#10;2. Cliquer sur...&#10;3. Voir l'erreur"
              value={bugReport.steps}
              onValueChange={updateField('steps')}
              isRequired
              color="warning"
              rows={5}
              description="Comment reproduire le bug ?"
            />

            <div className="space-y-4">
              <Textarea
                label="Résultat attendu"
                placeholder="Ce qui devrait se passer normalement"
                value={bugReport.expected}
                onValueChange={updateField('expected')}
                color="success"
                rows={2}
                startContent={<IconCheck className="text-success" size={16} />}
              />

              <Textarea
                label="Résultat actuel"
                placeholder="Ce qui se passe réellement"
                value={bugReport.actual}
                onValueChange={updateField('actual')}
                color="danger"
                rows={2}
                startContent={<IconX className="text-danger" size={16} />}
              />
            </div>
          </div>

          <Textarea
            label="Informations complémentaires"
            placeholder="Navigateur, OS, version, logs d'erreur, captures d'écran..."
            value={bugReport.additional}
            onValueChange={updateField('additional')}
            color="default"
            rows={4}
            variant="faded"
            description="Toute information utile pour diagnostiquer le problème"
          />

          <div className="flex gap-4 pt-4">
            <Button
              color="danger"
              size="lg"
              className="flex-1"
              startContent={<IconBug size={18} />}
            >
              Signaler le bug
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
        <Textarea
          label="Label Inside (défaut)"
          labelPlacement="inside"
          placeholder="Label à l'intérieur"
          color="primary"
          rows={3}
        />
        <Textarea
          label="Label Outside"
          labelPlacement="outside"
          placeholder="Label à l'extérieur"
          color="primary"
          rows={3}
        />
        <Textarea
          label="Label Outside Left"
          labelPlacement="outside-left"
          placeholder="Label à gauche"
          color="primary"
          rows={3}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const ProductReview: Story = {
  render: () => {
    const [reviewData, setReviewData] = useState({
      title: '',
      pros: '',
      cons: '',
      overall: '',
    });

    const updateReviewField = (field: string) => (value: string) => {
      setReviewData(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="w-full max-w-3xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <IconStarFilled size={28} className="text-warning" />
            Avis Produit Détaillé
          </h2>
          <p className="text-default-500">
            Partagez votre expérience pour aider d'autres clients
          </p>
        </div>

        <form className="space-y-6">
          <Textarea
            label="Titre de votre avis"
            placeholder="Résumez votre expérience en quelques mots"
            value={reviewData.title}
            onValueChange={updateReviewField('title')}
            isRequired
            color="warning"
            rows={2}
            maxLength={100}
            description={`${reviewData.title.length}/100 caractères`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Textarea
              label="Points positifs"
              placeholder="Ce que vous avez aimé..."
              value={reviewData.pros}
              onValueChange={updateReviewField('pros')}
              color="success"
              rows={4}
              startContent={<IconCheck className="text-success" size={18} />}
              description="Les aspects que vous recommandez"
            />

            <Textarea
              label="Points d'amélioration"
              placeholder="Ce qui pourrait être mieux..."
              value={reviewData.cons}
              onValueChange={updateReviewField('cons')}
              color="warning"
              rows={4}
              startContent={<IconEdit className="text-warning" size={18} />}
              description="Les aspects à améliorer"
            />
          </div>

          <Textarea
            label="Avis global"
            placeholder="Décrivez votre expérience complète avec ce produit..."
            value={reviewData.overall}
            onValueChange={updateReviewField('overall')}
            isRequired
            color="primary"
            rows={6}
            minLength={50}
            maxLength={1000}
            description={`${reviewData.overall.length}/1000 caractères (minimum 50)`}
          />

          <div className="flex gap-4 pt-4">
            <Button
              color="warning"
              size="lg"
              className="flex-1"
              startContent={<IconStarFilled size={18} />}
              isDisabled={!reviewData.title || !reviewData.overall}
            >
              Publier l'avis
            </Button>
            <Button variant="bordered" size="lg" className="flex-1">
              Sauvegarder brouillon
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