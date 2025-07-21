import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import { Card } from '../card/Card';
import { Avatar } from '../avatar/Avatar';
import {
  IconPackage,
  IconPalette,
  IconMoon,
  IconDeviceMobile,
  IconAccessible,
  IconCode,
  IconLeaf,
  IconBolt,
  IconHeart,
  IconStar,
  IconDownload,
  IconBrandGithub,
  IconBook,
  IconRocket,
  IconSettings,
  IconUsers,
  IconTrendingUp,
  IconShield,
  IconBrandReact,
  IconBrandTypescript,
  IconBrandTailwind
} from '@tabler/icons-react';

const IntroductionComponent = () => (
  <div className="min-h-screen bg-gradient-to-br from-background via-default-50/30 to-default-100/50 dark:from-background dark:via-default-950/30 dark:to-default-900/50">
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-16">
      
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl rounded-full"></div>
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 dark:from-primary-400 dark:via-secondary-400 dark:to-primary-400 bg-clip-text text-transparent mb-6">
              @xefi/x-react
            </h1>
            <p className="text-2xl md:text-3xl text-default-600 dark:text-default-400 font-light max-w-4xl mx-auto leading-relaxed">
              Une bibliothèque de composants React moderne et complète construite avec TypeScript
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex justify-center gap-8 pt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">25+</div>
            <div className="text-sm text-default-500">Composants</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">100%</div>
            <div className="text-sm text-default-500">TypeScript</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">0</div>
            <div className="text-sm text-default-500">Dependencies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-foreground">Tree</div>
            <div className="text-sm text-default-500">Shakeable</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            size="lg"
            color="primary"
            variant="shadow"
            leftIcon={<IconRocket size={20} />}
            className="text-lg px-8 py-6"
          >
            Commencer maintenant
          </Button>
          <Button
            size="lg"
            variant="bordered"
            leftIcon={<IconBrandGithub size={20} />}
            className="text-lg px-8 py-6"
          >
            Voir sur GitHub
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">🚀 Caractéristiques Principales</h2>
          <p className="text-xl text-default-500 max-w-3xl mx-auto">
            Découvrez pourquoi @xefi/x-react est le choix parfait pour vos projets React modernes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Design System */}
          <Card className="p-8 text-center h-full" isHoverable shadow="lg">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-200 to-primary-500 dark:from-primary-800 dark:to-primary-500 rounded-3xl mx-auto flex items-center justify-center">
                <IconPalette size={32} className="text-primary-700 dark:text-primary-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Design System Complet</h3>
              <p className="text-default-600 leading-relaxed">
                Plus de 25 composants soigneusement conçus avec des variantes cohérentes et une API intuitive.
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <div className="w-3 h-3 bg-secondary rounded-full"></div>
                <div className="w-3 h-3 bg-success rounded-full"></div>
                <div className="w-3 h-3 bg-warning rounded-full"></div>
                <div className="w-3 h-3 bg-danger rounded-full"></div>
              </div>
            </div>
          </Card>

          {/* Dark Mode */}
          <Card className="p-8 text-center h-full" isHoverable shadow="lg">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-200 to-indigo-500 dark:from-purple-800 dark:to-indigo-500 rounded-3xl mx-auto flex items-center justify-center">
                <IconMoon size={32} className="text-purple-700 dark:text-purple-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Thème Sombre/Clair</h3>
              <p className="text-default-600 leading-relaxed">
                Support natif du mode sombre avec next-themes. Transition fluide et personnalisation complète.
              </p>
              <div className="flex justify-center items-center gap-2 pt-2">
                <div className="w-6 h-6 bg-white border-2 border-default-300 rounded-full"></div>
                <IconBolt size={16} className="text-primary" />
                <div className="w-6 h-6 bg-black border-2 border-default-600 rounded-full"></div>
              </div>
            </div>
          </Card>

          {/* Responsive */}
          <Card className="p-8 text-center h-full" isHoverable shadow="lg">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-200 to-emerald-500 dark:from-green-800 dark:to-emerald-500 rounded-3xl mx-auto flex items-center justify-center">
                <IconDeviceMobile size={32} className="text-green-700 dark:text-green-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Entièrement Responsive</h3>
              <p className="text-default-600 leading-relaxed">
                Optimisé pour tous les écrans avec des breakpoints intelligents et des composants adaptatifs.
              </p>
              <div className="flex justify-center gap-1 pt-2">
                <div className="w-2 h-4 bg-success rounded-sm"></div>
                <div className="w-3 h-5 bg-success rounded-sm"></div>
                <div className="w-4 h-6 bg-success rounded-sm"></div>
              </div>
            </div>
          </Card>

          {/* Accessibility */}
          <Card className="p-8 text-center h-full" isHoverable shadow="lg">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-cyan-500 dark:from-blue-800 dark:to-cyan-500 rounded-3xl mx-auto flex items-center justify-center">
                <IconAccessible size={32} className="text-blue-700 dark:text-blue-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Accessible par Défaut</h3>
              <p className="text-default-600 leading-relaxed">
                Conformité ARIA et bonnes pratiques d'accessibilité intégrées dans chaque composant.
              </p>
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
                <span className="text-sm text-blue-700 dark:text-blue-300 font-medium">WCAG 2.1 AA</span>
              </div>
            </div>
          </Card>

          {/* TypeScript */}
          <Card className="p-8 text-center h-full" isHoverable shadow="lg">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-200 to-blue-500 dark:from-indigo-800 dark:to-blue-500 rounded-3xl mx-auto flex items-center justify-center">
                <IconCode size={32} className="text-indigo-700 dark:text-indigo-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">100% TypeScript</h3>
              <p className="text-default-600 leading-relaxed">
                Typage complet avec IntelliSense avancé pour une expérience développeur exceptionnelle.
              </p>
              <div className="flex justify-center gap-2 pt-2">
                <IconBrandTypescript size={24} className="text-blue-600" />
                <IconBrandReact size={24} className="text-blue-500" />
              </div>
            </div>
          </Card>

          {/* Performance */}
          <Card className="p-8 text-center h-full" isHoverable shadow="lg">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-red-500 dark:from-orange-800 dark:to-red-500 rounded-3xl mx-auto flex items-center justify-center">
                <IconLeaf size={32} className="text-orange-700 dark:text-orange-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Tree-shakeable</h3>
              <p className="text-default-600 leading-relaxed">
                Import sélectif pour optimiser la taille du bundle. Chaque composant peut être importé individuellement.
              </p>
              <div className="text-sm text-success font-mono bg-success-50 dark:bg-success-950 px-3 py-1 rounded-lg">
                {"import { Button } from '@xefi/x-react/button'"}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">🛠️ Technologies Utilisées</h2>
          <p className="text-xl text-default-500 max-w-3xl mx-auto">
            Construit avec les meilleures technologies modernes pour garantir performance et fiabilité
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center" isHoverable>
            <div className="space-y-3">
              <IconBrandReact size={48} className="text-blue-500 mx-auto" />
              <div>
                <div className="font-semibold text-foreground">React 18+</div>
                <div className="text-sm text-default-500">Concurrent Features</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 text-center" isHoverable>
            <div className="space-y-3">
              <IconBrandTypescript size={48} className="text-blue-600 mx-auto" />
              <div>
                <div className="font-semibold text-foreground">TypeScript</div>
                <div className="text-sm text-default-500">Type Safety</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 text-center" isHoverable>
            <div className="space-y-3">
              <IconBrandTailwind size={48} className="text-cyan-500 mx-auto" />
              <div>
                <div className="font-semibold text-foreground">Tailwind CSS</div>
                <div className="text-sm text-default-500">Utility-First</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 text-center" isHoverable>
            <div className="space-y-3">
              <IconBolt size={48} className="text-purple-500 mx-auto" />
              <div>
                <div className="font-semibold text-foreground">Vite</div>
                <div className="text-sm text-default-500">Fast Build</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Installation */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">📦 Installation Rapide</h2>
          <p className="text-xl text-default-500">
            Commencez en quelques secondes avec votre gestionnaire de paquets préféré
          </p>
        </div>

        <Card className="max-w-4xl mx-auto p-8" shadow="lg">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-default-50 dark:bg-default-800 rounded-lg">
                <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <IconPackage size={20} />
                  NPM
                </div>
                <code className="text-sm font-mono text-default-600">
                  npm install github:AbdelLyon/xefi-x-react
                </code>
              </div>
              
              <div className="p-4 bg-default-50 dark:bg-default-800 rounded-lg">
                <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <IconPackage size={20} />
                  Yarn
                </div>
                <code className="text-sm font-mono text-default-600">
                  yarn add github:AbdelLyon/xefi-x-react
                </code>
              </div>
              
              <div className="p-4 bg-default-50 dark:bg-default-800 rounded-lg">
                <div className="font-semibold text-foreground mb-2 flex items-center gap-2">
                  <IconPackage size={20} />
                  PNPM
                </div>
                <code className="text-sm font-mono text-default-600">
                  pnpm add github:AbdelLyon/xefi-x-react
                </code>
              </div>
            </div>

            <div className="border-t border-divider pt-6">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <IconCode size={20} />
                Utilisation
              </h4>
              <div className="bg-default-900 dark:bg-default-950 p-4 rounded-lg overflow-x-auto">
                <pre className="text-sm text-green-400">
{`import { Button } from "@xefi/x-react/button"
import { Card } from "@xefi/x-react/card"
import { useToggle } from "@xefi/x-react/hooks"
import "@xefi/x-react/style.css"

function App() {
  const [isToggled, toggle] = useToggle()
  
  return (
    <Card header="Mon Application">
      <Button 
        color="primary" 
        onClick={toggle}
        loading={isToggled}
      >
        {isToggled ? "Chargement..." : "Cliquez-moi"}
      </Button>
    </Card>
  )
}`}
                </pre>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Components Preview */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">✨ Aperçu des Composants</h2>
          <p className="text-xl text-default-500">
            Découvrez quelques-uns de nos composants les plus populaires
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Buttons Preview */}
          <Card className="p-6 space-y-4" shadow="lg">
            <h4 className="font-bold text-foreground text-lg">Buttons</h4>
            <div className="space-y-3">
              <Button color="primary" className="w-full">Primary Button</Button>
              <Button color="secondary" variant="bordered" className="w-full">Secondary Button</Button>
              <Button color="success" variant="light" leftIcon={<IconHeart size={16} />} className="w-full">
                With Icon
              </Button>
            </div>
          </Card>

          {/* Cards Preview */}
          <Card className="p-6 space-y-4" shadow="lg">
            <h4 className="font-bold text-foreground text-lg">Cards & Layout</h4>
            <Card className="p-4" isHoverable shadow="sm">
              <div className="flex items-center gap-3">
                <Avatar size="sm" src="https://i.pravatar.cc/40?u=preview" />
                <div>
                  <div className="font-medium text-foreground">John Doe</div>
                  <div className="text-sm text-default-500">Designer</div>
                </div>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-2">
              <Card className="p-3 text-center text-sm" isHoverable>
                <div className="font-bold text-foreground">127</div>
                <div className="text-default-500">Projects</div>
              </Card>
              <Card className="p-3 text-center text-sm" isHoverable>
                <div className="font-bold text-foreground">2.4k</div>
                <div className="text-default-500">Followers</div>
              </Card>
            </div>
          </Card>

          {/* Interactive Preview */}
          <Card className="p-6 space-y-4" shadow="lg">
            <h4 className="font-bold text-foreground text-lg">Interactive Elements</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Notifications</span>
                <Button size="sm" color="success" variant="flat">ON</Button>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-default-200 dark:bg-default-700 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <Button variant="bordered" leftIcon={<IconSettings size={16} />} className="w-full">
                Paramètres
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Call to Action Final */}
      <div className="text-center space-y-8 py-16">
        <div className="space-y-4">
          <h2 className="text-5xl font-bold text-foreground">Prêt à commencer ?</h2>
          <p className="text-xl text-default-500 max-w-2xl mx-auto">
            Explorez tous nos composants dans la barre latérale et découvrez la puissance de @xefi/x-react
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button
            size="lg"
            color="primary"
            variant="shadow"
            leftIcon={<IconBook size={20} />}
            className="text-lg px-12 py-6"
          >
            Explorer les Composants
          </Button>
          <Button
            size="lg"
            variant="bordered"
            leftIcon={<IconDownload size={20} />}
            className="text-lg px-12 py-6"
          >
            Télécharger
          </Button>
        </div>

        {/* Footer */}
        <div className="pt-16 border-t border-divider">
          <p className="text-default-400">
            Fait avec <IconHeart size={16} className="inline text-red-500 mx-1" /> par l'équipe DailyApps
          </p>
        </div>
      </div>

    </div>
  </div>
);

const meta: Meta<typeof IntroductionComponent> = {
  title: 'Welcome/Introduction',
  component: IntroductionComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Documentation interactive complète de la bibliothèque @xefi/x-react avec tous les composants et leurs variations.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};