import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconDownload,
  IconUpload,
  IconCloudUpload,
  IconDatabase,
  IconServer,
  IconCpu,
  IconMemory,
  IconBatteryCharging,
  IconWifi,
  IconVolume,
} from '@tabler/icons-react';
import { Progress } from './Progress';
import { CircularProgress } from './CircularProgress';
import { Button } from '../button/Button';
import { useState, useEffect } from 'react';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Progress** - Composants de progression linéaire et circulaire avec formatage avancé, labels personnalisés et animations fluides.',
      },
    },
  },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valeur de progression (0-100)',
    },
    minValue: {
      control: 'number',
      description: 'Valeur minimum',
    },
    maxValue: {
      control: 'number',
      description: 'Valeur maximum',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille de la barre de progression',
    },
    label: {
      control: 'text',
      description: 'Label de la progression',
    },
    labelPosition: {
      control: 'select',
      options: ['top', 'bottom', 'none'],
      description: 'Position du label',
    },
    showValueLabel: {
      control: 'boolean',
      description: 'Afficher la valeur',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Progression indéterminée',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Story par défaut
export const Default: Story = {
  args: {
    value: 65,
    label: 'Progression par défaut',
    color: 'primary',
  },
};

// Progress linéaire - Couleurs
export const LinearColors: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map((color) => (
        <Progress
          key={color}
          value={65}
          label={`Progression ${color}`}
          color={color}
        />
      ))}
    </div>
  ),
};

// Progress linéaire - Tailles
export const LinearSizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Progress
        value={45}
        label="Small"
        size="sm"
        color="primary"
      />
      <Progress
        value={65}
        label="Medium"
        size="md"
        color="secondary"
      />
      <Progress
        value={85}
        label="Large"
        size="lg"
        color="success"
      />
    </div>
  ),
};

// Progress linéaire - États
export const LinearStates: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Progress
        value={100}
        label="Terminé"
        color="success"
      />
      <Progress
        value={75}
        label="En cours"
        color="primary"
      />
      <Progress
        value={25}
        label="En démarrage"
        color="warning"
      />
      <Progress
        value={0}
        label="Pas commencé"
        color="default"
        showZero
      />
      <Progress
        isIndeterminate
        label="Chargement..."
        color="primary"
        showValueLabel={false}
      />
    </div>
  ),
};

// Progress linéaire - Formatage personnalisé
export const LinearFormatting: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Progress
        value={1250}
        maxValue={2000}
        label="Téléchargement"
        formatOptions={{ style: 'decimal', unit: 'byte' }}
        color="primary"
      />
      <Progress
        value={75}
        label="Pourcentage"
        formatOptions={{ style: 'percent' }}
        color="success"
      />
      <Progress
        value={8.5}
        maxValue={10}
        label="Note"
        valueLabel="8.5/10"
        color="warning"
      />
      <Progress
        value={45}
        maxValue={60}
        label="Temps restant"
        valueLabel="45 min"
        color="danger"
      />
    </div>
  ),
};

// Progress linéaire - Positions des labels
export const LinearLabelPositions: Story = {
  render: () => (
    <div className="space-y-8 w-80">
      <Progress
        value={65}
        label="Label en haut"
        labelPosition="top"
        color="primary"
      />
      <Progress
        value={75}
        label="Label en bas"
        labelPosition="bottom"
        color="secondary"
      />
      <Progress
        value={85}
        labelPosition="none"
        color="success"
      />
    </div>
  ),
};

// CircularProgress - Basique
export const CircularBasic: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <CircularProgress value={25} color="primary" size="sm" />
        <p className="text-xs mt-2 text-default-500">Small</p>
      </div>
      <div className="text-center">
        <CircularProgress value={50} color="secondary" size="md" />
        <p className="text-xs mt-2 text-default-500">Medium</p>
      </div>
      <div className="text-center">
        <CircularProgress value={75} color="success" size="lg" />
        <p className="text-xs mt-2 text-default-500">Large</p>
      </div>
    </div>
  ),
};

// CircularProgress - Couleurs
export const CircularColors: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      {(['default', 'primary', 'secondary', 'success', 'warning', 'danger'] as const).map((color) => (
        <div key={color} className="text-center">
          <CircularProgress value={65} color={color} size="lg" showValueLabel />
          <p className="text-xs mt-2 text-default-500 capitalize">{color}</p>
        </div>
      ))}
    </div>
  ),
};

// CircularProgress - Avec valeurs personnalisées
export const CircularCustomValues: Story = {
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <CircularProgress
          value={85}
          color="success"
          size="lg"
          showValueLabel
          valueLabel="A+"
        />
        <p className="text-xs mt-2 text-default-500">Note</p>
      </div>
      <div className="text-center">
        <CircularProgress
          value={7.5}
          maxValue={10}
          color="primary"
          size="lg"
          showValueLabel
          valueLabel="7.5/10"
        />
        <p className="text-xs mt-2 text-default-500">Évaluation</p>
      </div>
      <div className="text-center">
        <CircularProgress
          value={3}
          maxValue={5}
          color="warning"
          size="lg"
          showValueLabel
          valueLabel="★★★☆☆"
        />
        <p className="text-xs mt-2 text-default-500">Étoiles</p>
      </div>
    </div>
  ),
};

// CircularProgress - Auto-increment
export const CircularAutoIncrement: Story = {
  render: () => {
    const [isRunning, setIsRunning] = useState(false);
    
    return (
      <div className="flex flex-col items-center gap-4">
        <CircularProgress
          autoIncrement={isRunning}
          incrementInterval={100}
          incrementStep={1}
          color="primary"
          size="lg"
          showValueLabel
        />
        <Button
          color={isRunning ? 'danger' : 'primary'}
          onPress={() => setIsRunning(!isRunning)}
        >
          {isRunning ? 'Arrêter' : 'Démarrer'}
        </Button>
      </div>
    );
  },
};

// Progress animé en temps réel
export const AnimatedProgress: Story = {
  render: () => {
    const [values, setValues] = useState({
      download: 0,
      upload: 0,
      processing: 0,
    });

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      if (!isAnimating) return;

      const interval = setInterval(() => {
        setValues(prev => ({
          download: Math.min(100, prev.download + Math.random() * 5),
          upload: Math.min(100, prev.upload + Math.random() * 3),
          processing: Math.min(100, prev.processing + Math.random() * 2),
        }));
      }, 200);

      return () => clearInterval(interval);
    }, [isAnimating]);

    const resetValues = () => {
      setValues({ download: 0, upload: 0, processing: 0 });
      setIsAnimating(false);
    };

    return (
      <div className="space-y-8 w-96">
        <div className="flex gap-4 justify-center">
          <Button
            color="primary"
            onPress={() => setIsAnimating(!isAnimating)}
            disabled={values.download >= 100 && values.upload >= 100 && values.processing >= 100}
          >
            {isAnimating ? 'Pause' : 'Démarrer'}
          </Button>
          <Button variant="bordered" onPress={resetValues}>
            Reset
          </Button>
        </div>

        <div className="space-y-6">
          <Progress
            value={values.download}
            label="Téléchargement"
            color="primary"
            size="lg"
          />
          <Progress
            value={values.upload}
            label="Upload"
            color="success"
            size="lg"
          />
          <Progress
            value={values.processing}
            label="Traitement"
            color="warning"
            size="lg"
          />
        </div>

        <div className="flex gap-6 justify-center">
          <CircularProgress
            value={values.download}
            color="primary"
            size="md"
            showValueLabel
            valueLabel={`${Math.round(values.download)}%`}
          />
          <CircularProgress
            value={values.upload}
            color="success"
            size="md"
            showValueLabel
            valueLabel={`${Math.round(values.upload)}%`}
          />
          <CircularProgress
            value={values.processing}
            color="warning"
            size="md"
            showValueLabel
            valueLabel={`${Math.round(values.processing)}%`}
          />
        </div>
      </div>
    );
  },
};

// Showcase du système
export const SystemShowcase: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Tableau de Bord Système
        </h2>
        <p className="text-default-500">
          Monitoring en temps réel avec indicateurs de progression
        </p>
      </div>

      {/* Métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-content1 rounded-lg text-center">
          <CircularProgress
            value={87}
            color="primary"
            size="lg"
            showValueLabel
            strokeWidth={4}
          />
          <div className="mt-4">
            <h4 className="font-semibold flex items-center justify-center gap-2">
              <IconCpu size={18} />
              CPU
            </h4>
            <p className="text-sm text-default-500">Utilisation processeur</p>
          </div>
        </div>

        <div className="p-6 bg-content1 rounded-lg text-center">
          <CircularProgress
            value={65}
            color="success"
            size="lg"
            showValueLabel
            strokeWidth={4}
          />
          <div className="mt-4">
            <h4 className="font-semibold flex items-center justify-center gap-2">
              <IconMemory size={18} />
              RAM
            </h4>
            <p className="text-sm text-default-500">Mémoire utilisée</p>
          </div>
        </div>

        <div className="p-6 bg-content1 rounded-lg text-center">
          <CircularProgress
            value={45}
            color="warning"
            size="lg"
            showValueLabel
            strokeWidth={4}
          />
          <div className="mt-4">
            <h4 className="font-semibold flex items-center justify-center gap-2">
              <IconDatabase size={18} />
              Disque
            </h4>
            <p className="text-sm text-default-500">Espace utilisé</p>
          </div>
        </div>

        <div className="p-6 bg-content1 rounded-lg text-center">
          <CircularProgress
            value={92}
            color="danger"
            size="lg"
            showValueLabel
            strokeWidth={4}
          />
          <div className="mt-4">
            <h4 className="font-semibold flex items-center justify-center gap-2">
              <IconServer size={18} />
              Charge
            </h4>
            <p className="text-sm text-default-500">Charge système</p>
          </div>
        </div>
      </div>

      {/* Transferts de données */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <IconCloudUpload size={20} />
          Transferts de Données
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Progress
              value={1250}
              maxValue={2000}
              label="Upload - Document.pdf"
              formatOptions={{ style: 'decimal', unit: 'byte' }}
              color="primary"
              size="lg"
            />
            <Progress
              value={850}
              maxValue={1200}
              label="Download - Images.zip"
              formatOptions={{ style: 'decimal', unit: 'byte' }}
              color="success"
              size="lg"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Progress
              value={75}
              label="Synchronisation"
              color="secondary"
              leftIcon={<IconUpload size={16} />}
            />
            <Progress
              value={90}
              label="Sauvegarde"
              color="success"
              leftIcon={<IconDatabase size={16} />}
            />
            <Progress
              isIndeterminate
              label="Analyse..."
              color="warning"
              showValueLabel={false}
            />
          </div>
        </div>
      </div>

      {/* Statut des services */}
      <div className="p-6 bg-content1 rounded-lg">
        <h3 className="text-lg font-semibold mb-6">Statut des Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-sm text-default-600">Connectivité</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CircularProgress value={100} color="success" size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium">WiFi</p>
                  <p className="text-xs text-default-500">Excellent signal</p>
                </div>
                <IconWifi size={16} className="text-success" />
              </div>
              
              <div className="flex items-center gap-3">
                <CircularProgress value={85} color="primary" size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium">VPN</p>
                  <p className="text-xs text-default-500">Connecté</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-default-600">Matériel</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CircularProgress value={78} color="warning" size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Batterie</p>
                  <p className="text-xs text-default-500">En charge</p>
                </div>
                <IconBatteryCharging size={16} className="text-warning" />
              </div>
              
              <div className="flex items-center gap-3">
                <CircularProgress value={60} color="secondary" size="sm" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Volume</p>
                  <p className="text-xs text-default-500">Modéré</p>
                </div>
                <IconVolume size={16} className="text-secondary" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-sm text-default-600">Performance</h4>
            <div className="space-y-3">
              <Progress
                value={92}
                label="Uptime"
                size="sm"
                color="success"
                showValueLabel
              />
              
              <Progress
                value={15}
                label="Erreurs"
                size="sm"
                color="danger"
                showValueLabel
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};