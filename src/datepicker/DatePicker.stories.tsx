import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconCalendar,
  IconCalendarEvent,
  IconCalendarTime,
  IconClock,
  IconPlane,
  IconHome,
  IconBriefcase,
  IconHeart,
  IconUser,
  IconMapPin,
  IconGift,
  IconStar,
  IconBuildingStore,
  IconTicket,
  IconCamera,
  IconBeach,
  IconMountain,
} from '@tabler/icons-react';
import { DatePicker, DateRangePicker, type RangeValue } from './DatePicker';
import { Button } from '../button/Button';
import { useState } from 'react';
import { CalendarDate, parseDate, today, getLocalTimeZone } from '@internationalized/date';

const meta: Meta<typeof DatePicker> = {
  title: 'Form/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**DatePicker** - Composants de sélection de date avec support des plages de dates et personnalisations avancées.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['bordered', 'flat', 'faded', 'underlined'],
      description: 'Style visuel du datepicker',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du datepicker',
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
      description: 'DatePicker désactivé',
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
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Date de naissance',
    placeholder: 'Sélectionnez une date',
    color: 'primary',
  },
};

export const SingleDatePicker: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

    return (
      <div className="w-full max-w-md space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Sélecteur de Date Simple
        </h3>
        <div className="space-y-4">
          <DatePicker
            label="Date d'événement"
            placeholder="Choisissez une date"
            value={selectedDate}
            onChange={setSelectedDate}
            color="primary"
            description="Sélectionnez la date de votre événement"
            startContent={<IconCalendarEvent className="text-default-400" size={18} />}
          />

          <DatePicker
            label="Date limite"
            placeholder="Date limite du projet"
            color="warning"
            description="Date limite pour finaliser le projet"
            startContent={<IconClock className="text-warning" size={18} />}
          />

          <DatePicker
            label="Date d'anniversaire"
            placeholder="Votre date d'anniversaire"
            color="success"
            description="Pour vous envoyer des félicitations"
            startContent={<IconGift className="text-success" size={18} />}
          />
        </div>

        {selectedDate && (
          <div className="p-4 bg-default-50 rounded-lg">
            <p className="text-sm text-default-600">
              <strong>Date sélectionnée :</strong> {selectedDate.toString()}
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const DateRangePickerExample: Story = {
  render: () => {
    const [dateRange, setDateRange] = useState<RangeValue<CalendarDate> | null>(null);

    return (
      <div className="w-full max-w-md space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Sélecteur de Plage de Dates
        </h3>
        <div className="space-y-4">
          <DateRangePicker
            label="Période de vacances"
            placeholder="Du ... au ..."
            value={dateRange}
            onChange={setDateRange}
            color="primary"
            description="Sélectionnez vos dates de vacances"
            startContent={<IconPlane className="text-primary" size={18} />}
          />

          <DateRangePicker
            label="Période de formation"
            placeholder="Dates de formation"
            color="secondary"
            description="Durée de la formation"
            startContent={<IconBriefcase className="text-secondary" size={18} />}
          />

          <DateRangePicker
            label="Séjour romantique"
            placeholder="Weekend romantique"
            color="danger"
            description="Planifiez votre escapade"
            startContent={<IconHeart className="text-danger" size={18} />}
          />
        </div>

        {dateRange && (
          <div className="p-4 bg-default-50 rounded-lg">
            <p className="text-sm text-default-600">
              <strong>Période sélectionnée :</strong>
            </p>
            <p className="text-sm text-default-600">
              Du {dateRange.start?.toString()} au {dateRange.end?.toString()}
            </p>
          </div>
        )}
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Variantes de DatePicker
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          variant="bordered"
          label="Bordered"
          placeholder="Style bordered"
          color="primary"
        />
        <DatePicker
          variant="flat"
          label="Flat"
          placeholder="Style flat"
          color="primary"
        />
        <DatePicker
          variant="faded"
          label="Faded"
          placeholder="Style faded"
          color="primary"
        />
        <DatePicker
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
        <DatePicker
          color="default"
          label="Default"
          placeholder="Couleur par défaut"
          variant="bordered"
        />
        <DatePicker
          color="primary"
          label="Primary"
          placeholder="Couleur primaire"
          variant="bordered"
        />
        <DatePicker
          color="secondary"
          label="Secondary"
          placeholder="Couleur secondaire"
          variant="bordered"
        />
        <DatePicker
          color="success"
          label="Success"
          placeholder="Couleur succès"
          variant="bordered"
        />
        <DatePicker
          color="warning"
          label="Warning"
          placeholder="Couleur attention"
          variant="bordered"
        />
        <DatePicker
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
        Tailles de DatePicker
      </h3>
      <div className="space-y-4">
        <DatePicker
          size="sm"
          label="Small"
          placeholder="Taille small"
          color="primary"
        />
        <DatePicker
          size="md"
          label="Medium"
          placeholder="Taille medium (défaut)"
          color="primary"
        />
        <DatePicker
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

export const States: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        États du DatePicker
      </h3>
      <div className="space-y-4">
        <DatePicker
          label="DatePicker normal"
          placeholder="État normal"
          color="primary"
        />
        <DatePicker
          label="DatePicker requis"
          placeholder="Champ obligatoire"
          isRequired
          color="primary"
          description="Ce champ est obligatoire"
        />
        <DatePicker
          label="DatePicker désactivé"
          placeholder="Champ désactivé"
          isDisabled
          color="primary"
        />
        <DatePicker
          label="Lecture seule"
          placeholder="Champ en lecture seule"
          isReadOnly
          value={today(getLocalTimeZone())}
          color="primary"
        />
        <DatePicker
          label="DatePicker avec erreur"
          placeholder="Champ invalide"
          isInvalid
          errorMessage="Veuillez sélectionner une date valide"
          color="danger"
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const BookingSystem: Story = {
  render: () => {
    const [bookingData, setBookingData] = useState({
      checkIn: null as CalendarDate | null,
      checkOut: null as CalendarDate | null,
      eventDate: null as CalendarDate | null,
      tripDates: null as RangeValue<CalendarDate> | null,
    });

    const updateBookingData = (field: string) => (value: any) => {
      setBookingData(prev => ({ ...prev, [field]: value }));
    };

    // Calculer le nombre de nuits
    const calculateNights = () => {
      if (bookingData.checkIn && bookingData.checkOut) {
        const start = bookingData.checkIn.toDate(getLocalTimeZone());
        const end = bookingData.checkOut.toDate(getLocalTimeZone());
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
      }
      return 0;
    };

    const nights = calculateNights();

    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <IconBuildingStore size={28} />
            Système de Réservation
          </h2>
          <p className="text-default-500">
            Planifiez vos voyages et réservations avec notre système de dates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Hôtel */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <IconHome size={20} />
              Réservation d'Hôtel
            </h3>
            
            <div className="space-y-4">
              <DatePicker
                label="Date d'arrivée"
                placeholder="Check-in"
                value={bookingData.checkIn}
                onChange={updateBookingData('checkIn')}
                color="primary"
                isRequired
                minValue={today(getLocalTimeZone())}
                description="Date d'arrivée à l'hôtel"
                startContent={<IconCalendar className="text-primary" size={18} />}
              />

              <DatePicker
                label="Date de départ"
                placeholder="Check-out"
                value={bookingData.checkOut}
                onChange={updateBookingData('checkOut')}
                color="primary"
                isRequired
                minValue={bookingData.checkIn || today(getLocalTimeZone())}
                description="Date de départ de l'hôtel"
                startContent={<IconCalendar className="text-primary" size={18} />}
              />

              {nights > 0 && (
                <div className="p-4 bg-primary-50 rounded-lg">
                  <p className="text-sm text-primary-600">
                    <strong>Durée du séjour :</strong> {nights} nuit{nights > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section Événement */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <IconTicket size={20} />
              Événement Spécial
            </h3>
            
            <div className="space-y-4">
              <DatePicker
                label="Date de l'événement"
                placeholder="Choisissez la date"
                value={bookingData.eventDate}
                onChange={updateBookingData('eventDate')}
                color="warning"
                isRequired
                minValue={today(getLocalTimeZone())}
                description="Date de votre événement spécial"
                startContent={<IconStar className="text-warning" size={18} />}
              />

              <DateRangePicker
                label="Voyage complet"
                placeholder="Dates du voyage"
                value={bookingData.tripDates}
                onChange={updateBookingData('tripDates')}
                color="success"
                description="Dates complètes de votre voyage"
                startContent={<IconPlane className="text-success" size={18} />}
              />
            </div>
          </div>
        </div>

        {/* Résumé */}
        <div className="mt-8 p-6 bg-default-50 rounded-lg">
          <h4 className="font-semibold mb-4">Résumé de votre réservation :</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Hôtel :</strong>
              <div className="text-default-600 mt-1">
                {bookingData.checkIn && bookingData.checkOut
                  ? `Du ${bookingData.checkIn.toString()} au ${bookingData.checkOut.toString()} (${nights} nuit${nights > 1 ? 's' : ''})`
                  : 'Dates non sélectionnées'}
              </div>
            </div>
            <div>
              <strong>Événement :</strong>
              <div className="text-default-600 mt-1">
                {bookingData.eventDate ? bookingData.eventDate.toString() : 'Date non sélectionnée'}
              </div>
            </div>
          </div>
          {bookingData.tripDates && (
            <div className="mt-4">
              <strong>Voyage complet :</strong>
              <div className="text-default-600 mt-1">
                Du {bookingData.tripDates.start?.toString()} au {bookingData.tripDates.end?.toString()}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <Button
            color="primary"
            size="lg"
            className="flex-1"
            isDisabled={!bookingData.checkIn || !bookingData.checkOut}
            startContent={<IconTicket size={18} />}
          >
            Confirmer la réservation
          </Button>
          <Button variant="bordered" size="lg" className="flex-1">
            Annuler
          </Button>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const TravelPlanner: Story = {
  render: () => {
    const [travelPlans, setTravelPlans] = useState({
      departure: null as CalendarDate | null,
      return: null as CalendarDate | null,
      vacation: null as RangeValue<CalendarDate> | null,
      businessTrip: null as RangeValue<CalendarDate> | null,
      conference: null as CalendarDate | null,
    });

    const updateTravelPlan = (field: string) => (value: any) => {
      setTravelPlans(prev => ({ ...prev, [field]: value }));
    };

    return (
      <div className="w-full max-w-5xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <IconPlane size={28} />
            Planificateur de Voyage
          </h2>
          <p className="text-default-500">
            Organisez tous vos déplacements et voyages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voyage d'affaires */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <IconBriefcase size={20} />
              Voyage d'affaires
            </h3>
            
            <div className="space-y-4">
              <DatePicker
                label="Départ"
                placeholder="Date de départ"
                value={travelPlans.departure}
                onChange={updateTravelPlan('departure')}
                color="primary"
                minValue={today(getLocalTimeZone())}
                startContent={<IconPlane className="text-primary" size={18} />}
              />

              <DatePicker
                label="Retour"
                placeholder="Date de retour"
                value={travelPlans.return}
                onChange={updateTravelPlan('return')}
                color="primary"
                minValue={travelPlans.departure || today(getLocalTimeZone())}
                startContent={<IconHome className="text-primary" size={18} />}
              />

              <DateRangePicker
                label="Mission complète"
                placeholder="Période de mission"
                value={travelPlans.businessTrip}
                onChange={updateTravelPlan('businessTrip')}
                color="secondary"
                description="Durée totale de la mission"
                startContent={<IconBriefcase className="text-secondary" size={18} />}
              />
            </div>
          </div>

          {/* Vacances */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <IconBeach size={20} />
              Vacances
            </h3>
            
            <div className="space-y-4">
              <DateRangePicker
                label="Congés d'été"
                placeholder="Période de vacances"
                value={travelPlans.vacation}
                onChange={updateTravelPlan('vacation')}
                color="success"
                description="Vos dates de congés"
                startContent={<IconBeach className="text-success" size={18} />}
              />

              <DatePicker
                label="Conférence"
                placeholder="Date de conférence"
                value={travelPlans.conference}
                onChange={updateTravelPlan('conference')}
                color="warning"
                description="Événement professionnel"
                startContent={<IconCamera className="text-warning" size={18} />}
              />
            </div>
          </div>

          {/* Activités */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <IconMountain size={20} />
              Activités
            </h3>
            
            <div className="space-y-4">
              <DatePicker
                label="Randonnée"
                placeholder="Date de randonnée"
                color="success"
                variant="faded"
                startContent={<IconMountain className="text-success" size={18} />}
              />

              <DatePicker
                label="Visite culturelle"
                placeholder="Date de visite"
                color="secondary"
                variant="faded"
                startContent={<IconCamera className="text-secondary" size={18} />}
              />

              <DatePicker
                label="Spa & Détente"
                placeholder="Journée détente"
                color="danger"
                variant="faded"
                startContent={<IconHeart className="text-danger" size={18} />}
              />
            </div>
          </div>
        </div>

        {/* Calendrier récapitulatif */}
        <div className="mt-8 p-6 bg-default-50 rounded-lg">
          <h4 className="font-semibold mb-4 flex items-center gap-2">
            <IconCalendar size={20} />
            Récapitulatif de vos dates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <strong>Voyage d'affaires :</strong>
              <div className="text-default-600 mt-1">
                {travelPlans.departure && travelPlans.return
                  ? `${travelPlans.departure.toString()} → ${travelPlans.return.toString()}`
                  : 'Dates non définies'}
              </div>
            </div>
            <div>
              <strong>Vacances :</strong>
              <div className="text-default-600 mt-1">
                {travelPlans.vacation
                  ? `${travelPlans.vacation.start?.toString()} → ${travelPlans.vacation.end?.toString()}`
                  : 'Période non définie'}
              </div>
            </div>
            <div>
              <strong>Conférence :</strong>
              <div className="text-default-600 mt-1">
                {travelPlans.conference ? travelPlans.conference.toString() : 'Date non définie'}
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <Button color="primary" size="lg" className="flex-1">
            Enregistrer le planning
          </Button>
          <Button variant="bordered" size="lg" className="flex-1">
            Exporter calendrier
          </Button>
        </div>
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
        <DatePicker
          label="Label Inside (défaut)"
          labelPlacement="inside"
          placeholder="Label à l'intérieur"
          color="primary"
        />
        <DatePicker
          label="Label Outside"
          labelPlacement="outside"
          placeholder="Label à l'extérieur"
          color="primary"
        />
        <DatePicker
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