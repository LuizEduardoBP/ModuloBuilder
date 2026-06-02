import React from 'react';
import type { ToolCategory } from '../types/tool';
import { getAllTools } from '../registry';
import {
  Layers,
  FileText,
  HelpCircle,
  Terminal,
  CreditCard,
  MapPin,
  X,
  Palette,
  Leaf,
  Flame,
  Crown,
  ShieldAlert,
  Sun,
  Moon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { themes, type ThemeId } from '../styles/colors';

// Mapeador de ícones para temas
const ThemeIcon = ({ name, className }: { name: string; className?: string }) => {
  const iconsMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Terminal,
    Leaf,
    Flame,
    Crown,
    Layers,
    ShieldAlert,
    Sun,
    Moon
  };
  const IconComponent = iconsMap[name] || Palette;
  return <IconComponent className={className} />;
};

interface SidebarProps {
  selectedCategory: 'all' | ToolCategory;
  onSelectCategory: (category: 'all' | ToolCategory) => void;
  currentThemeId: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  currentThemeId,
  onSelectTheme,
  isMobile = false,
  onClose
}) => {
  const tools = getAllTools();
  const [isThemeExpanded, setIsThemeExpanded] = React.useState(false);
  const activeTheme = themes.find(t => t.id === currentThemeId) || themes[0];

  const categories: { id: 'all' | ToolCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Todos os Módulos', icon: <Layers className="w-4 h-4" /> },
    { id: 'documentos', label: 'Documentos', icon: <FileText className="w-4 h-4" /> },
    { id: 'dev', label: 'Utilitários Dev', icon: <Terminal className="w-4 h-4" /> },
    { id: 'financeiro', label: 'Dados Financeiros', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'localizacao', label: 'Localização', icon: <MapPin className="w-4 h-4" /> },
    { id: 'outros', label: 'Outros', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const getCount = (catId: 'all' | ToolCategory) => {
    if (catId === 'all') return tools.length;
    return tools.filter(t => t.config.category === catId).length;
  };

  return (
    <aside className="w-64 bg-theme-card border-r border-theme-border flex flex-col h-full backdrop-blur-xl transition-all duration-300">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-theme-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-theme-brand-light rounded-lg border border-theme-brand-border text-theme-brand transition-colors duration-300">
            <Terminal className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="text-md font-bold text-theme-text tracking-wide transition-colors">ModuloBuilder</h1>
            <span className="text-[10px] font-semibold tracking-wider text-theme-brand uppercase">DevTools Platform</span>
          </div>
        </div>

        {/* Botão de Fechar no Mobile */}
        {isMobile && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/5 border border-transparent hover:border-theme-border text-theme-text-muted hover:text-theme-text transition-all cursor-pointer"
            title="Fechar Menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <span className="px-3 text-[10px] font-semibold text-theme-text-muted/60 tracking-wider uppercase block mb-3">
          CATEGORIAS
        </span>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = getCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer ${isActive
                  ? 'bg-theme-brand-light border border-theme-brand-border text-theme-brand'
                  : 'text-theme-text-muted hover:text-theme-text hover:bg-white/5 border border-transparent'
                }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-theme-brand' : 'text-theme-text-muted/60 group-hover:text-theme-text transition-colors'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold transition-all ${isActive
                  ? 'bg-theme-brand/20 text-theme-brand'
                  : 'bg-white/5 text-theme-text-muted/50 group-hover:text-theme-text-muted'
                }`}>
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Seletor de Temas */}
      <div className="p-4 border-t border-theme-border bg-black/10 transition-all duration-300">
        <button
          onClick={() => setIsThemeExpanded(!isThemeExpanded)}
          className="w-full flex items-center justify-between px-2 py-1 rounded hover:bg-white/5 border border-transparent hover:border-theme-border/20 transition-all text-left cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-theme-brand-light rounded border border-theme-brand-border text-theme-brand">
              <ThemeIcon name={activeTheme.icon} className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-semibold text-theme-text-muted/60 tracking-wider uppercase leading-none mb-1">
                TEMA ATUAL
              </span>
              <span className="text-[11px] font-bold text-theme-text leading-none">
                {activeTheme.name}
              </span>
            </div>
          </div>
          {isThemeExpanded ? (
            <ChevronUp className="w-4 h-4 text-theme-text-muted" />
          ) : (
            <ChevronDown className="w-4 h-4 text-theme-text-muted" />
          )}
        </button>

        {isThemeExpanded && (
          <div className="grid grid-cols-2 gap-2 mt-4 animate-fade-in">
            {themes.map((t) => {
              const isSelected = currentThemeId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => onSelectTheme(t.id)}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-lg text-[11px] font-medium border transition-all cursor-pointer group text-left ${isSelected
                    ? 'bg-theme-brand-light border-theme-brand-border text-theme-brand font-semibold'
                    : 'bg-white/5 border-transparent text-theme-text-muted hover:text-theme-text hover:border-theme-border'
                  }`}
                  title={t.name}
                >
                  <ThemeIcon 
                    name={t.icon} 
                    className={`w-3.5 h-3.5 transition-all shrink-0 ${isSelected ? 'text-theme-brand' : 'text-theme-text-muted/60 group-hover:text-theme-text'}`} 
                  />
                  <span className="truncate">{t.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-theme-border bg-black/20 text-center">
        <div className="text-[11px] text-theme-text-muted">
          Atalho Rápido:{' '}
          <kbd className="bg-white/5 text-theme-text px-1.5 py-0.5 rounded border border-theme-border text-[10px] font-mono shadow-sm">
            Ctrl + K
          </kbd>
        </div>
      </div>
    </aside>
  );
};
