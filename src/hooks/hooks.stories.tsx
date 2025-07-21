import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Avatar } from '../avatar/Avatar';
import { 
  useToggle, 
  useCounter, 
  useDebouncedValue, 
  useLocalStorage, 
  useClipboard, 
  useDisclosure,
  useTimeout,
  useInterval,
  useMediaQuery
} from './index';
import {
  IconToggleLeft,
  IconToggleRight,
  IconPlus,
  IconMinus,
  IconRefresh,
  IconCopy,
  IconCheck,
  IconClock,
  IconSearch,
  IconHeart,
  IconEye,
  IconSettings,
  IconUser,
  IconVolume,
  IconDevices,
  IconPhone
} from '@tabler/icons-react';

const meta: Meta = {
  title: 'Hooks/Interactive Examples',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '**Hooks Utilitaires** - Collection de hooks personnalisés React avec des démonstrations interactives et des exemples visuels élégants.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Container de démonstration élégant
const DemoContainer = ({ children, title, description, className = "" }: { 
  children: React.ReactNode, 
  title: string, 
  description?: string,
  className?: string
}) => (
  <div className={`w-full max-w-5xl mx-auto p-8 ${className}`}>
    <div className="mb-8 text-center">
      <h3 className="text-3xl font-bold text-foreground mb-3">{title}</h3>
      {description && <p className="text-default-500 text-lg">{description}</p>}
    </div>
    <div className="p-8 rounded-3xl bg-gradient-to-br from-background via-default-50/30 to-default-100/50 dark:from-background dark:via-default-950/30 dark:to-default-900/50 border border-divider shadow-xl backdrop-blur-sm">
      {children}
    </div>
  </div>
);

export const UseToggleShowcase: Story = {
  render: () => {
    const ToggleExample = () => {
      const isEnabled = useToggle({ values: [false, true], initialValue: false });
      const notifications = useToggle({ values: [false, true], initialValue: true });
      const darkMode = useToggle({ values: [false, true], initialValue: false });
      
      return (
        <DemoContainer title="useToggle Hook" description="Gestion élégante des états booléens avec animations">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Toggle Principal */}
            <Card className="p-6 text-center" isHoverable>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-800 dark:to-primary-600 rounded-2xl mx-auto flex items-center justify-center">
                  {isEnabled ? (
                    <IconToggleRight size={28} className="text-primary-700 dark:text-primary-300" />
                  ) : (
                    <IconToggleLeft size={28} className="text-primary-700 dark:text-primary-300" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Service Principal</h4>
                  <p className="text-sm text-default-500 mb-4">
                    État: <span className={`font-medium ${isEnabled.value ? 'text-success' : 'text-danger'}`}>
                      {isEnabled.value ? 'Activé' : 'Désactivé'}
                    </span>
                  </p>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={() => isEnabled.toggle()} 
                    color={isEnabled.value ? "danger" : "success"}
                    variant="shadow"
                    className="w-full"
                  >
                    {isEnabled.value ? 'Désactiver' : 'Activer'}
                  </Button>
                  <Button 
                    onClick={() => isEnabled.setValue(true)} 
                    size="sm"
                    variant="flat"
                    className="w-full"
                  >
                    Forcer ON
                  </Button>
                </div>
              </div>
            </Card>

            {/* Notifications Toggle */}
            <Card className="p-6 text-center" isHoverable>
              <div className="space-y-4">
                <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-colors ${
                  notifications.value 
                    ? 'bg-gradient-to-br from-success-200 to-success-400 dark:from-success-800 dark:to-success-600' 
                    : 'bg-gradient-to-br from-default-200 to-default-400 dark:from-default-700 dark:to-default-800'
                }`}>
                  <IconHeart 
                    size={28} 
                    className={`transition-colors ${
                      notifications.value ? 'text-success-700 dark:text-success-300' : 'text-default-600 dark:text-default-400'
                    }`}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Notifications</h4>
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    notifications.value 
                      ? 'bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300'
                      : 'bg-default-100 dark:bg-default-800 text-default-600 dark:text-default-400'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${notifications.value ? 'bg-success animate-pulse' : 'bg-default-400'}`} />
                    {notifications.value ? 'Activées' : 'Désactivées'}
                  </div>
                </div>
                <Button 
                  onClick={() => notifications.toggle()} 
                  color={notifications.value ? "default" : "success"}
                  variant="bordered"
                  className="w-full"
                >
                  Basculer
                </Button>
              </div>
            </Card>

            {/* Dark Mode Toggle */}
            <Card className="p-6 text-center" isHoverable>
              <div className="space-y-4">
                <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center transition-all ${
                  darkMode.value 
                    ? 'bg-gradient-to-br from-purple-800 to-indigo-900' 
                    : 'bg-gradient-to-br from-yellow-200 to-orange-300'
                }`}>
                  <div className={`transition-all ${darkMode.value ? 'text-yellow-300' : 'text-orange-600'}`}>
                    {darkMode.value ? '🌙' : '☀️'}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Mode d'Affichage</h4>
                  <p className="text-sm text-default-500">
                    {darkMode.value ? 'Mode Sombre' : 'Mode Clair'}
                  </p>
                </div>
                <Button 
                  onClick={() => darkMode.toggle()} 
                  color="secondary"
                  variant="flat"
                  className="w-full"
                >
                  Changer de thème
                </Button>
              </div>
            </Card>

          </div>
        </DemoContainer>
      );
    };

    return <ToggleExample />;
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const UseCounterShowcase: Story = {
  render: () => {
    const CounterExample = () => {
      const likes = useCounter(42);
      const views = useCounter(1250);
      const score = useCounter(0);
      
      return (
        <DemoContainer title="useCounter Hook" description="Compteurs interactifs avec contrôles avancés">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Likes Counter */}
            <Card className="p-6 text-center" isHoverable>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-200 to-red-400 dark:from-pink-800 dark:to-red-600 rounded-2xl mx-auto flex items-center justify-center">
                  <IconHeart size={28} className="text-red-700 dark:text-red-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">{likes.count}</div>
                  <p className="text-sm text-default-500">Likes</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => likes.increment()} 
                    color="success"
                    size="sm"
                    leftIcon={<IconPlus size={14} />}
                  >
                    Like
                  </Button>
                  <Button 
                    onClick={() => likes.decrement()} 
                    color="danger"
                    variant="bordered"
                    size="sm"
                    leftIcon={<IconMinus size={14} />}
                  >
                    Unlike
                  </Button>
                </div>
                <Button 
                  onClick={() => likes.set(100)} 
                  size="sm" 
                  variant="light"
                  className="w-full"
                >
                  Set to 100
                </Button>
              </div>
            </Card>

            {/* Views Counter */}
            <Card className="p-6 text-center" isHoverable>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-400 dark:from-blue-800 dark:to-cyan-600 rounded-2xl mx-auto flex items-center justify-center">
                  <IconEye size={28} className="text-blue-700 dark:text-blue-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">{views.count.toLocaleString()}</div>
                  <p className="text-sm text-default-500">Vues</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => views.incrementBy(10)} 
                    color="primary"
                    size="sm"
                  >
                    +10
                  </Button>
                  <Button 
                    onClick={() => views.incrementBy(100)} 
                    color="secondary"
                    size="sm"
                  >
                    +100
                  </Button>
                </div>
                <Button 
                  onClick={() => views.reset()} 
                  size="sm" 
                  variant="flat"
                  leftIcon={<IconRefresh size={14} />}
                  className="w-full"
                >
                  Reset
                </Button>
              </div>
            </Card>

            {/* Game Score */}
            <Card className="p-6 text-center" isHoverable>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-400 dark:from-yellow-800 dark:to-orange-600 rounded-2xl mx-auto flex items-center justify-center">
                  <span className="text-2xl">🏆</span>
                </div>
                <div>
                  <div className="text-3xl font-bold text-foreground mb-1">{score.count}</div>
                  <p className="text-sm text-default-500">Score</p>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-1">
                    <Button onClick={() => score.incrementBy(1)} size="sm" variant="flat">+1</Button>
                    <Button onClick={() => score.incrementBy(5)} size="sm" variant="flat">+5</Button>
                    <Button onClick={() => score.incrementBy(10)} size="sm" variant="flat">+10</Button>
                  </div>
                  <Button 
                    onClick={() => score.set(9999)} 
                    color="warning"
                    size="sm"
                    className="w-full"
                  >
                    High Score!
                  </Button>
                </div>
              </div>
            </Card>

          </div>
        </DemoContainer>
      );
    };

    return <CounterExample />;
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const UseDebouncedValueShowcase: Story = {
  render: () => {
    const SearchExample = () => {
      const [searchTerm, setSearchTerm] = useState('');
      const debouncedSearch = useDebouncedValue(searchTerm, 500);
      const [isSearching, setIsSearching] = useState(false);

      // Simuler une recherche
      useEffect(() => {
        if (debouncedSearch.debouncedValue) {
          setIsSearching(true);
          const timer = setTimeout(() => setIsSearching(false), 1000);
          return () => clearTimeout(timer);
        }
      }, [debouncedSearch.debouncedValue]);

      // Simuler des résultats
      const mockResults = debouncedSearch.debouncedValue ? [
        `Résultat 1 pour "${debouncedSearch.debouncedValue}"`,
        `Résultat 2 pour "${debouncedSearch.debouncedValue}"`,
        `Résultat 3 pour "${debouncedSearch.debouncedValue}"`
      ] : [];

      return (
        <DemoContainer title="useDebouncedValue Hook" description="Optimisation des recherches et requêtes avec debouncing">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Search Interface */}
            <Card className="p-6" shadow="lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-200 to-primary-400 dark:from-primary-800 dark:to-primary-600 rounded-xl flex items-center justify-center">
                    <IconSearch size={20} className="text-primary-700 dark:text-primary-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Recherche Intelligente</h4>
                    <p className="text-sm text-default-500">Debounce de 500ms pour optimiser les requêtes</p>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-default-300 dark:border-default-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-background dark:bg-default-50 text-foreground text-lg"
                    placeholder="Tapez votre recherche..."
                  />
                  <IconSearch size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-default-400" />
                  {isSearching && (
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                      <div className="animate-spin w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full" />
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-default-50 dark:bg-default-800 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{searchTerm.length}</div>
                    <div className="text-sm text-default-500">Caractères saisis</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-foreground">{debouncedSearch.debouncedValue.length}</div>
                    <div className="text-sm text-default-500">Recherche active</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Results */}
            {debouncedSearch.debouncedValue && (
              <Card className="p-6" isHoverable>
                <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span>Résultats pour "{debouncedSearch.debouncedValue}"</span>
                  {isSearching && <div className="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />}
                </h5>
                <div className="space-y-3">
                  {mockResults.map((result, index) => (
                    <div key={index} className="p-3 bg-default-50 dark:bg-default-800 rounded-lg hover:bg-default-100 dark:hover:bg-default-700 transition-colors">
                      <p className="text-foreground">{result}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {!debouncedSearch.debouncedValue && searchTerm && (
              <Card className="p-6 text-center">
                <div className="text-default-500">
                  <IconClock size={24} className="mx-auto mb-2" />
                  <p>En attente de la fin de saisie...</p>
                </div>
              </Card>
            )}

          </div>
        </DemoContainer>
      );
    };

    return <SearchExample />;
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const UseClipboardShowcase: Story = {
  render: () => {
    const ClipboardExample = () => {
      const clipboard = useClipboard();
      const [customText, setCustomText] = useState('Hello, Storybook! 👋');
      
      const snippets = [
        { label: 'URL du site', value: 'https://example.com/awesome-page' },
        { label: 'Code API', value: 'const api = new ApiClient("sk-123...")' },
        { label: 'Commande npm', value: 'npm install @xefi/x-react' },
        { label: 'Email support', value: 'support@example.com' }
      ];

      return (
        <DemoContainer title="useClipboard Hook" description="Copie dans le presse-papiers avec feedback visuel élégant">
          <div className="max-w-3xl mx-auto space-y-6">
            
            {/* Custom Text */}
            <Card className="p-6" shadow="lg">
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-secondary-200 to-secondary-400 dark:from-secondary-800 dark:to-secondary-600 rounded-xl flex items-center justify-center">
                    <IconCopy size={20} className="text-secondary-700 dark:text-secondary-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Texte Personnalisé</h4>
                    <p className="text-sm text-default-500">Saisissez et copiez votre propre texte</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <textarea
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    className="w-full px-4 py-3 border border-default-300 dark:border-default-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent bg-background dark:bg-default-50 text-foreground resize-none"
                    rows={3}
                    placeholder="Entrez votre texte ici..."
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={() => clipboard.copy(customText)}
                      color={clipboard.copied ? 'success' : 'secondary'}
                      variant="shadow"
                      leftIcon={clipboard.copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                      disabled={!customText}
                      className="flex-1"
                    >
                      {clipboard.copied ? 'Copié!' : 'Copier le texte'}
                    </Button>
                    <Button
                      onClick={clipboard.reset}
                      variant="bordered"
                      size="md"
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Snippets */}
            <Card className="p-6" shadow="md">
              <h5 className="font-semibold text-foreground mb-4">Snippets Rapides</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {snippets.map((snippet, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-default-50 dark:bg-default-800 rounded-lg hover:bg-default-100 dark:hover:bg-default-700 transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-foreground text-sm">{snippet.label}</div>
                      <div className="text-xs text-default-500 truncate font-mono">{snippet.value}</div>
                    </div>
                    <Button
                      onClick={() => clipboard.copy(snippet.value)}
                      size="sm"
                      variant="light"
                      color={clipboard.copied && clipboard.value === snippet.value ? 'success' : 'default'}
                      leftIcon={clipboard.copied && clipboard.value === snippet.value ? <IconCheck size={14} /> : <IconCopy size={14} />}
                      className="ml-2 opacity-60 group-hover:opacity-100"
                    >
                      {clipboard.copied && clipboard.value === snippet.value ? 'OK' : 'Copier'}
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Status */}
            {clipboard.copied && (
              <Card className="p-4 border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950" shadow="sm">
                <div className="flex items-center gap-3 text-success-700 dark:text-success-300">
                  <IconCheck size={20} />
                  <div>
                    <p className="font-medium">Texte copié avec succès!</p>
                    <p className="text-sm opacity-80">"{clipboard.value?.substring(0, 50)}{clipboard.value && clipboard.value.length > 50 ? '...' : ''}"</p>
                  </div>
                </div>
              </Card>
            )}


          </div>
        </DemoContainer>
      );
    };

    return <ClipboardExample />;
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const MultipleHooksShowcase: Story = {
  render: () => {
    const MultiHooksExample = () => {
      const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
      const volume = useCounter(50, { min: 0, max: 100 });
      const autoSave = useToggle({ values: [false, true], initialValue: true });
      const username = useLocalStorage('demo-username', 'Utilisateur');
      const isDesktop = useMediaQuery('(min-width: 1024px)');
      const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
      const isMobile = useMediaQuery('(max-width: 767px)');

      return (
        <DemoContainer title="Hooks Combinés" description="Démonstration de l'utilisation simultanée de plusieurs hooks">
          <div className="space-y-6">
            
            {/* Device Detection */}
            <Card className="p-6" shadow="lg">
              <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <IconDevices size={20} />
                Détection d'Appareil (useMediaQuery)
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg text-center ${isDesktop ? 'bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300' : 'bg-default-100 dark:bg-default-800 text-default-600'}`}>
                  <IconDevices size={32} className="mx-auto mb-2" />
                  <div className="font-medium">Desktop</div>
                  <div className="text-sm">{isDesktop ? 'Actif' : 'Inactif'}</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${isTablet ? 'bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300' : 'bg-default-100 dark:bg-default-800 text-default-600'}`}>
                  <IconDevices size={32} className="mx-auto mb-2" />
                  <div className="font-medium">Tablette</div>
                  <div className="text-sm">{isTablet ? 'Actif' : 'Inactif'}</div>
                </div>
                <div className={`p-4 rounded-lg text-center ${isMobile ? 'bg-success-100 dark:bg-success-900 text-success-700 dark:text-success-300' : 'bg-default-100 dark:bg-default-800 text-default-600'}`}>
                  <IconPhone size={32} className="mx-auto mb-2" />
                  <div className="font-medium">Mobile</div>
                  <div className="text-sm">{isMobile ? 'Actif' : 'Inactif'}</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Control Panel */}
              <Card className="p-6" isHoverable>
                <h5 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <IconSettings size={20} />
                  Panneau de Contrôle
                </h5>
                <div className="space-y-4">
                  
                  {/* Volume Control */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground flex items-center gap-2">
                        <IconVolume size={16} />
                        Volume
                      </span>
                      <span className="text-sm text-default-500">{volume.count}%</span>
                    </div>
                    <div className="w-full bg-default-200 dark:bg-default-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary-400 to-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${volume.count}%` }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => volume.decrementBy(10)} disabled={volume.count <= 0}>-10</Button>
                      <Button size="sm" onClick={() => volume.incrementBy(10)} disabled={volume.count >= 100}>+10</Button>
                      <Button size="sm" onClick={() => volume.set(50)} variant="flat">50%</Button>
                    </div>
                  </div>

                  {/* Auto Save */}
                  <div className="flex justify-between items-center p-3 bg-default-50 dark:bg-default-800 rounded-lg">
                    <div>
                      <div className="font-medium text-foreground">Sauvegarde automatique</div>
                      <div className="text-sm text-default-500">Sauvegarder les modifications automatiquement</div>
                    </div>
                    <Button
                      onClick={() => autoSave.toggle()}
                      color={autoSave.value ? "success" : "default"}
                      variant={autoSave.value ? "flat" : "bordered"}
                      size="sm"
                    >
                      {autoSave.value ? "ON" : "OFF"}
                    </Button>
                  </div>

                  {/* User Info */}
                  <div className="flex items-center gap-3 p-3 bg-primary-50 dark:bg-primary-950 rounded-lg">
                    <Avatar size="sm" src={`https://i.pravatar.cc/40?u=${username.value}`} />
                    <div>
                      <div className="font-medium text-foreground">Bienvenue, {username.value}!</div>
                      <div className="text-sm text-primary-600 dark:text-primary-400">Données depuis localStorage</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Disclosure Panel */}
              <Card className="p-6" isHoverable>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h5 className="font-semibold text-foreground">Panneau Extensible</h5>
                    <Button onClick={() => onOpenChange()} size="sm" variant="bordered">
                      {isOpen ? 'Fermer' : 'Ouvrir'}
                    </Button>
                  </div>
                  
                  {isOpen && (
                    <div className="space-y-3 p-4 bg-gradient-to-br from-secondary-50 to-secondary-100 dark:from-secondary-950 dark:to-secondary-900 rounded-lg border border-secondary-200 dark:border-secondary-800">
                      <h6 className="font-medium text-foreground">Contenu Révélé</h6>
                      <p className="text-sm text-default-600">
                        Ce contenu n'apparaît que lorsque le panneau est ouvert grâce au hook useDisclosure.
                      </p>
                      <div className="flex gap-2">
                        <Button size="sm" color="secondary" variant="flat">Action 1</Button>
                        <Button size="sm" variant="light">Action 2</Button>
                        <Button size="sm" onClick={() => onClose()} variant="bordered">Fermer</Button>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-default-500 text-center">
                    État du panneau: <span className="font-mono">{isOpen ? 'ouvert' : 'fermé'}</span>
                  </div>
                </div>
              </Card>

            </div>
          </div>
        </DemoContainer>
      );
    };

    return <MultiHooksExample />;
  },
  parameters: {
    layout: 'fullscreen',
  },
};