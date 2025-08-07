import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  IconBell,
  IconMoon,
  IconSun,
  IconWifi,
  IconVolume,
  IconVolumeOff,
  IconEye,
  IconEyeOff,
  IconShield,
  IconLock,
  IconUnlock,
  IconDeviceMobile,
  IconMail,
  IconBrandTwitter,
  IconBrandFacebook,
  IconNotification,
  IconSettings,
  IconUserCheck,
  IconGlobe,
  IconLocation,
} from '@tabler/icons-react';
import { Switch } from './Switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Form/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '**Switch** - Composant d\'interrupteur élégant pour les options binaires avec personnalisations de taille et styles.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Taille du switch',
    },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'danger'],
      description: 'Couleur thématique',
    },
    width: {
      control: 'number',
      description: 'Largeur personnalisée (px ou string)',
    },
    height: {
      control: 'number',
      description: 'Hauteur personnalisée (px ou string)',
    },
    isSelected: {
      control: 'boolean',
      description: 'État activé/désactivé',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Switch désactivé',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Lecture seule',
    },
    children: {
      control: 'text',
      description: 'Texte du label',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Activer les notifications',
    color: 'primary',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Tailles de Switch
      </h3>
      <div className="space-y-4">
        <Switch size="sm" color="primary">
          Switch Small
        </Switch>
        <Switch size="md" color="primary">
          Switch Medium (défaut)
        </Switch>
        <Switch size="lg" color="primary">
          Switch Large
        </Switch>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Couleurs Disponibles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Switch color="default" defaultSelected>
          Default
        </Switch>
        <Switch color="primary" defaultSelected>
          Primary
        </Switch>
        <Switch color="secondary" defaultSelected>
          Secondary
        </Switch>
        <Switch color="success" defaultSelected>
          Success
        </Switch>
        <Switch color="warning" defaultSelected>
          Warning
        </Switch>
        <Switch color="danger" defaultSelected>
          Danger
        </Switch>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const WithIcons: Story = {
  render: () => {
    const [darkMode, setDarkMode] = useState(false);
    const [notifications, setNotifications] = useState(true);
    const [wifi, setWifi] = useState(true);
    const [sound, setSound] = useState(false);

    return (
      <div className="w-full max-w-md space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Switches avec Icônes
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
            <div className="flex items-center gap-3">
              {darkMode ? <IconMoon size={20} /> : <IconSun size={20} />}
              <span>Mode sombre</span>
            </div>
            <Switch
              isSelected={darkMode}
              onValueChange={setDarkMode}
              color="primary"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
            <div className="flex items-center gap-3">
              <IconBell size={20} />
              <span>Notifications</span>
            </div>
            <Switch
              isSelected={notifications}
              onValueChange={setNotifications}
              color="primary"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
            <div className="flex items-center gap-3">
              <IconWifi size={20} />
              <span>Wi-Fi</span>
            </div>
            <Switch
              isSelected={wifi}
              onValueChange={setWifi}
              color="success"
            />
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
            <div className="flex items-center gap-3">
              {sound ? <IconVolume size={20} /> : <IconVolumeOff size={20} />}
              <span>Son</span>
            </div>
            <Switch
              isSelected={sound}
              onValueChange={setSound}
              color="warning"
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

export const CustomSizes: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Tailles Personnalisées
      </h3>
      <div className="space-y-4">
        <Switch width={60} height={30} color="primary">
          Switch compact (60x30)
        </Switch>
        <Switch width={80} height={40} color="primary">
          Switch standard (80x40)
        </Switch>
        <Switch width={100} height={50} color="primary">
          Switch large (100x50)
        </Switch>
        <Switch width="120px" height="60px" color="primary">
          Switch extra large (120x60)
        </Switch>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const States: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        États du Switch
      </h3>
      <div className="space-y-4">
        <Switch color="primary">
          Switch normal (désactivé)
        </Switch>
        <Switch defaultSelected color="primary">
          Switch normal (activé)
        </Switch>
        <Switch isDisabled color="primary">
          Switch désactivé (off)
        </Switch>
        <Switch isDisabled defaultSelected color="primary">
          Switch désactivé (on)
        </Switch>
        <Switch isReadOnly defaultSelected color="primary">
          Switch en lecture seule
        </Switch>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      emailAlerts: false,
      darkMode: false,
      autoSave: true,
      twoFactor: false,
      locationSharing: false,
      profilePublic: true,
      newsletter: false,
      soundEffects: true,
      mobileSync: false,
    });

    const updateSetting = (key: keyof typeof settings) => (value: boolean) => {
      setSettings(prev => ({ ...prev, [key]: value }));
    };

    return (
      <div className="w-full max-w-2xl mx-auto p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Paramètres de l'Application
          </h2>
          <p className="text-default-500">
            Configurez vos préférences avec les switches
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <IconBell size={20} />
              Notifications
            </h3>
            <div className="space-y-3 ml-7">
              <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
                <div className="flex items-center gap-3">
                  <IconNotification size={18} />
                  <div>
                    <div className="font-medium">Notifications push</div>
                    <div className="text-sm text-default-500">
                      Recevoir des notifications en temps réel
                    </div>
                  </div>
                </div>
                <Switch
                  isSelected={settings.notifications}
                  onValueChange={updateSetting('notifications')}
                  color="primary"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
                <div className="flex items-center gap-3">
                  <IconMail size={18} />
                  <div>
                    <div className="font-medium">Alertes email</div>
                    <div className="text-sm text-default-500">
                      Notifications par email
                    </div>
                  </div>
                </div>
                <Switch
                  isSelected={settings.emailAlerts}
                  onValueChange={updateSetting('emailAlerts')}
                  color="primary"
                />
              </div>
            </div>
          </div>

          {/* Apparence */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <IconSettings size={20} />
              Apparence
            </h3>
            <div className="space-y-3 ml-7">
              <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
                <div className="flex items-center gap-3">
                  {settings.darkMode ? <IconMoon size={18} /> : <IconSun size={18} />}
                  <div>
                    <div className="font-medium">Mode sombre</div>
                    <div className="text-sm text-default-500">
                      Interface en thème sombre
                    </div>
                  </div>
                </div>
                <Switch
                  isSelected={settings.darkMode}
                  onValueChange={updateSetting('darkMode')}
                  color="secondary"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
                <div className="flex items-center gap-3">
                  <IconVolume size={18} />
                  <div>
                    <div className="font-medium">Effets sonores</div>
                    <div className="text-sm text-default-500">
                      Sons d'interface
                    </div>
                  </div>
                </div>
                <Switch
                  isSelected={settings.soundEffects}
                  onValueChange={updateSetting('soundEffects')}
                  color="warning"
                />
              </div>
            </div>
          </div>

          {/* Sécurité */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <IconShield size={20} />
              Sécurité
            </h3>
            <div className="space-y-3 ml-7">
              <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
                <div className="flex items-center gap-3">
                  {settings.twoFactor ? <IconLock size={18} /> : <IconUnlock size={18} />}
                  <div>
                    <div className="font-medium">Authentification à deux facteurs</div>
                    <div className="text-sm text-default-500">
                      Sécurité renforcée
                    </div>
                  </div>
                </div>
                <Switch
                  isSelected={settings.twoFactor}
                  onValueChange={updateSetting('twoFactor')}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
                <div className="flex items-center gap-3">
                  <IconLocation size={18} />
                  <div>
                    <div className="font-medium">Partage de localisation</div>
                    <div className="text-sm text-default-500">
                      Permettre le géo-positionnement
                    </div>
                  </div>
                </div>
                <Switch
                  isSelected={settings.locationSharing}
                  onValueChange={updateSetting('locationSharing')}
                  color="danger"
                />
              </div>
            </div>
          </div>

          {/* Synchronisation */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <IconDeviceMobile size={20} />
              Synchronisation
            </h3>
            <div className="space-y-3 ml-7">
              <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
                <div className="flex items-center gap-3">
                  <IconSettings size={18} />
                  <div>
                    <div className="font-medium">Sauvegarde automatique</div>
                    <div className="text-sm text-default-500">
                      Sauvegarder les modifications automatiquement
                    </div>
                  </div>
                </div>
                <Switch
                  isSelected={settings.autoSave}
                  onValueChange={updateSetting('autoSave')}
                  color="success"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-default-50">
                <div className="flex items-center gap-3">
                  <IconDeviceMobile size={18} />
                  <div>
                    <div className="font-medium">Synchronisation mobile</div>
                    <div className="text-sm text-default-500">
                      Synchro avec l'app mobile
                    </div>
                  </div>
                </div>
                <Switch
                  isSelected={settings.mobileSync}
                  onValueChange={updateSetting('mobileSync')}
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isOnline, setIsOnline] = useState(false);
    const [isLocked, setIsLocked] = useState(true);

    return (
      <div className="w-full max-w-md space-y-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Démonstration Interactive
        </h3>
        
        <div className="space-y-4">
          <div className="p-4 border rounded-lg bg-default-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {isVisible ? <IconEye size={20} /> : <IconEyeOff size={20} />}
                <span className="font-medium">Visibilité du contenu</span>
              </div>
              <Switch
                isSelected={isVisible}
                onValueChange={setIsVisible}
                color="primary"
              />
            </div>
            {isVisible && (
              <div className="text-sm text-default-600 bg-primary-50 p-3 rounded">
                Ce contenu est maintenant visible ! 👁️
              </div>
            )}
          </div>

          <div className="p-4 border rounded-lg bg-default-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success' : 'bg-danger'}`} />
                <span className="font-medium">
                  Statut: {isOnline ? 'En ligne' : 'Hors ligne'}
                </span>
              </div>
              <Switch
                isSelected={isOnline}
                onValueChange={setIsOnline}
                color={isOnline ? 'success' : 'danger'}
              />
            </div>
            <div className="text-sm text-default-600">
              {isOnline 
                ? '🟢 Vous êtes maintenant en ligne'
                : '🔴 Vous êtes hors ligne'
              }
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-default-50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {isLocked ? <IconLock size={20} /> : <IconUnlock size={20} />}
                <span className="font-medium">
                  {isLocked ? 'Verrouillé' : 'Déverrouillé'}
                </span>
              </div>
              <Switch
                isSelected={!isLocked}
                onValueChange={(value) => setIsLocked(!value)}
                color={isLocked ? 'danger' : 'success'}
              />
            </div>
            <div className="text-sm text-default-600">
              {isLocked 
                ? '🔒 Contenu protégé et verrouillé'
                : '🔓 Accès libre au contenu'
              }
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'fullscreen',
  },
};