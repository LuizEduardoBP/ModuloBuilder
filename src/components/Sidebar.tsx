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
} from 'lucide-react';
import { themes, type ThemeId } from '../styles/colors';
import { BrandLogo } from './BrandLogo';

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
  onClose,
}) => {
  const tools = getAllTools();
  const activeTheme = themes.find((t) => t.id === currentThemeId) || themes[0];

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
    return tools.filter((t) => t.config.category === catId).length;
  };

  const visibleCategories = categories.filter(
    (cat) => cat.id === 'all' || getCount(cat.id) > 0
  );

  return (
    <aside className="w-64 bg-theme-card border-r border-theme-border flex flex-col h-full transition-colors duration-200">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-theme-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <BrandLogo className="w-7 h-7 shrink-0" />
          <div className="leading-tight">
            <h1 className="font-display text-base font-bold text-theme-text tracking-tight">
              ModuloBuilder
            </h1>
            <span className="font-mono text-[10px] font-medium tracking-wider text-theme-text-subtle uppercase block">
              Bancada de QA
            </span>
          </div>
        </div>

        {isMobile && (
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md hover:bg-theme-inset text-theme-text-muted hover:text-theme-text transition-colors cursor-pointer"
            title="Fechar Menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        <span className="px-3 text-[10px] font-mono font-semibold text-theme-text-subtle tracking-widest uppercase block mb-2.5">
          Categorias
        </span>

        {visibleCategories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = getCount(cat.id);

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`relative w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors duration-150 group cursor-pointer ${
                isActive
                  ? 'bg-theme-brand-light text-theme-text font-semibold'
                  : 'text-theme-text-muted hover:text-theme-text hover:bg-theme-inset font-medium'
              }`}
            >
              {isActive && (
                <span
                  className="absolute left-0 top-1.5 bottom-1.5 w-0.5 rounded-r bg-theme-brand"
                  aria-hidden="true"
                />
              )}

              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={
                    isActive
                      ? 'text-theme-brand'
                      : 'text-theme-text-subtle group-hover:text-theme-text transition-colors'
                  }
                >
                  {cat.icon}
                </span>
                <span className="truncate">{cat.label}</span>
              </div>

              <span
                className={`font-mono text-[11px] px-1.5 py-0.5 rounded transition-colors ${
                  isActive
                    ? 'text-theme-brand font-semibold'
                    : 'text-theme-text-subtle group-hover:text-theme-text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Seletor de Temas em 1 clique */}
      <div className="p-4 border-t border-theme-border space-y-3 bg-theme-inset/50">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold text-theme-text-subtle uppercase tracking-wider">
            Tema
          </span>
          <span className="text-xs font-medium text-theme-text">
            {activeTheme.name}{' '}
            <span className="text-theme-text-subtle font-normal">
              · {activeTheme.description}
            </span>
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2" role="radiogroup" aria-label="Selecionar tema">
          {themes.map((t) => {
            const isSelected = currentThemeId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onSelectTheme(t.id)}
                title={`${t.name} (${t.description})`}
                className={`group flex flex-col items-center gap-1.5 p-1.5 rounded-md border transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-theme-card border-theme-brand shadow-xs'
                    : 'bg-transparent border-theme-border hover:border-theme-border-strong'
                }`}
              >
                <span
                  className="w-6 h-6 rounded-full border border-black/15 flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: t.preview.bg }}
                >
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: t.preview.brand }}
                  />
                </span>
                <span
                  className={`text-[10px] leading-none truncate w-full text-center ${
                    isSelected
                      ? 'text-theme-text font-semibold'
                      : 'text-theme-text-muted'
                  }`}
                >
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-4 py-3 border-t border-theme-border flex items-center justify-between text-[11px] text-theme-text-subtle">
        <span>Busca rápida</span>
        <kbd className="bg-theme-inset text-theme-text-muted px-1.5 py-0.5 rounded border border-theme-border text-[10px] font-mono">
          Ctrl + K
        </kbd>
      </div>
    </aside>
  );
};
