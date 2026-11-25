import { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { ToolIcon } from './components/ToolIcon';
import type { ToolCategory } from './types/tool';
import { getAllTools, getToolById } from './registry';
import { Search, ArrowLeft, ArrowUpRight, Menu, X, ChevronRight, Clock } from 'lucide-react';
import { getThemeById, isThemeId, DEFAULT_THEME_ID, type ThemeId } from './styles/colors';

const CATEGORY_META: Record<
  'all' | ToolCategory,
  { title: string; subtitle: string; codePrefix: string }
> = {
  all: {
    title: 'Catálogo de Módulos',
    subtitle: 'Utilitários locais para QA, homologação e desenvolvimento de software.',
    codePrefix: 'MOD',
  },
  documentos: {
    title: 'Documentos Brasileiros',
    subtitle: 'Geradores e validadores matemáticos para testes cadastrais.',
    codePrefix: 'DOC',
  },
  dev: {
    title: 'Utilitários Dev',
    subtitle: 'Manipulação de strings, JSON, hashes criptográficos e identificadores.',
    codePrefix: 'DEV',
  },
  financeiro: {
    title: 'Dados Financeiros',
    subtitle: 'Chaves PIX fictícias e cartões de crédito válidos pelo algoritmo de Luhn.',
    codePrefix: 'FIN',
  },
  localizacao: {
    title: 'Localização',
    subtitle: 'Geração estrutural de CEPs e consulta de endereços via ViaCEP.',
    codePrefix: 'LOC',
  },
  outros: {
    title: 'Outros',
    subtitle: 'Ferramentas complementares.',
    codePrefix: 'OUT',
  },
};

const RECENT_STORAGE_KEY = 'modulobuilder-recent';

function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_STORAGE_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
    } catch {
      return [];
    }
  });

  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('modulobuilder-theme');
    return isThemeId(saved) ? saved : DEFAULT_THEME_ID;
  });

  const applyThemeTokens = (themeId: ThemeId) => {
    const theme = getThemeById(themeId);
    document.documentElement.style.colorScheme = theme.mode;
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem('modulobuilder-theme', theme.id);
  };

  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    applyThemeTokens(currentThemeId);
  }, [currentThemeId]);

  const handleSelectTheme = (nextThemeId: ThemeId) => {
    if (nextThemeId === currentThemeId) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setCurrentThemeId(nextThemeId);
      return;
    }

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => unknown;
    };

    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => {
        flushSync(() => {
          setCurrentThemeId(nextThemeId);
        });
        applyThemeTokens(nextThemeId);
      });
      return;
    }

    // Fallback para navegadores sem View Transitions API
    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current);
    }
    document.documentElement.classList.add('theme-transition');
    setCurrentThemeId(nextThemeId);
    transitionTimerRef.current = window.setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 320);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const openTool = (id: string) => {
    setActiveToolId(id);
    setRecentIds((prev) => {
      const next = [id, ...prev.filter((item) => item !== id)].slice(0, 3);
      localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const tools = getAllTools();

  // Gera código técnico estável por categoria (ex: DEV·01, DOC·02)
  const toolCodeMap = new Map<string, string>();
  const categoryCounters: Record<string, number> = {};
  tools.forEach((tool) => {
    const cat = tool.config.category;
    categoryCounters[cat] = (categoryCounters[cat] || 0) + 1;
    const prefix = CATEGORY_META[cat].codePrefix;
    const num = String(categoryCounters[cat]).padStart(2, '0');
    toolCodeMap.set(tool.config.id, `${prefix}·${num}`);
  });

  const filteredTools = tools.filter((tool) => {
    const matchesCategory =
      selectedCategory === 'all' || tool.config.category === selectedCategory;
    const term = searchQuery.toLowerCase();
    const matchesSearch =
      tool.config.name.toLowerCase().includes(term) ||
      tool.config.description.toLowerCase().includes(term) ||
      tool.config.keywords.some((kw) => kw.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  const activeTool = activeToolId ? getToolById(activeToolId) : null;
  const currentCategoryMeta = CATEGORY_META[selectedCategory];
  const recentTools = recentIds
    .map((id) => getToolById(id))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  return (
    <div className="flex h-screen bg-theme-bg text-theme-text overflow-hidden font-sans transition-colors duration-200">
      {/* Barra Lateral - Desktop */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveToolId(null);
          }}
          currentThemeId={currentThemeId}
          onSelectTheme={handleSelectTheme}
        />
      </div>

      {/* Barra Lateral - Mobile (Drawer) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative z-10 w-64 h-full shadow-xl animate-slide-in">
            <Sidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveToolId(null);
                setIsMobileSidebarOpen(false);
              }}
              currentThemeId={currentThemeId}
              onSelectTheme={handleSelectTheme}
              isMobile={true}
              onClose={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-theme-bg">
        {/* Cabeçalho */}
        <header className="h-16 border-b border-theme-border px-4 md:px-8 flex items-center justify-between bg-theme-card/80 backdrop-blur-sm shrink-0 gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex md:hidden items-center justify-center p-2 rounded-md bg-theme-inset border border-theme-border text-theme-text hover:border-theme-border-strong transition-colors cursor-pointer shrink-0"
              title="Abrir Menu"
            >
              <Menu className="w-4 h-4" />
            </button>

            {activeTool ? (
              <nav aria-label="Navegação estrutural" className="flex items-center gap-1.5 text-sm min-w-0">
                <button
                  type="button"
                  onClick={() => setActiveToolId(null)}
                  className="text-theme-text-muted hover:text-theme-text transition-colors cursor-pointer shrink-0"
                >
                  Módulos
                </button>
                <ChevronRight className="w-3.5 h-3.5 text-theme-text-subtle shrink-0" />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory(activeTool.config.category);
                    setActiveToolId(null);
                  }}
                  className="hidden sm:inline text-theme-text-muted hover:text-theme-text transition-colors cursor-pointer shrink-0"
                >
                  {CATEGORY_META[activeTool.config.category].title}
                </button>
                <ChevronRight className="hidden sm:inline w-3.5 h-3.5 text-theme-text-subtle shrink-0" />
                <span className="font-semibold text-theme-text truncate">
                  {activeTool.config.name}
                </span>
              </nav>
            ) : (
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-subtle pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtrar módulos por nome ou palavra-chave..."
                  className="w-full bg-theme-inset border border-theme-border rounded-md pl-9 pr-16 py-1.5 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-theme-text-subtle hover:text-theme-text cursor-pointer"
                    title="Limpar busca"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsCommandPaletteOpen(true)}
                    className="hidden sm:inline-flex items-center gap-1 absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-theme-card border border-theme-border text-[10px] font-mono text-theme-text-muted hover:text-theme-text cursor-pointer"
                    title="Abrir busca rápida"
                  >
                    Ctrl K
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-md bg-theme-inset hover:bg-theme-card border border-theme-border hover:border-theme-border-strong text-xs font-medium text-theme-text-muted hover:text-theme-text transition-colors cursor-pointer shrink-0"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Trocar módulo</span>
            <kbd className="hidden md:inline font-mono text-[10px] text-theme-text-subtle">
              ⌘K
            </kbd>
          </button>
        </header>

        {/* Corpo do Workspace */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTool ? (
            <div className="max-w-5xl mx-auto space-y-5">
              <button
                type="button"
                onClick={() => setActiveToolId(null)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-theme-text-muted hover:text-theme-text transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform text-theme-brand" />
                Voltar ao catálogo
              </button>

              <div className="bg-theme-card border border-theme-border rounded-xl p-5 md:p-7">
                <activeTool.Component onBack={() => setActiveToolId(null)} />
              </div>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto space-y-7">
              {/* Cabeçalho Editorial da Seção */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-theme-border pb-5">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-theme-text">
                    {currentCategoryMeta.title}
                  </h2>
                  <p className="text-sm text-theme-text-muted mt-1">
                    {currentCategoryMeta.subtitle}
                  </p>
                </div>
                <span className="font-mono text-xs text-theme-text-subtle shrink-0">
                  {filteredTools.length}{' '}
                  {filteredTools.length === 1 ? 'módulo' : 'módulos'}
                </span>
              </div>

              {/* Atalhos de Usados Recentemente */}
              {recentTools.length > 0 && !searchQuery && selectedCategory === 'all' && (
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-theme-text-subtle mr-1">
                    <Clock className="w-3 h-3" />
                    Recentes:
                  </span>
                  {recentTools.map((tool) => (
                    <button
                      key={tool.config.id}
                      type="button"
                      onClick={() => openTool(tool.config.id)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-theme-card border border-theme-border hover:border-theme-brand-border text-xs font-medium text-theme-text hover:text-theme-brand transition-colors cursor-pointer"
                    >
                      <ToolIcon name={tool.config.icon} className="w-3.5 h-3.5 text-theme-brand" />
                      <span>{tool.config.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Grid de Catálogo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => {
                  const code = toolCodeMap.get(tool.config.id) || 'MOD';
                  return (
                    <button
                      key={tool.config.id}
                      type="button"
                      onClick={() => openTool(tool.config.id)}
                      className="group text-left bg-theme-card border border-theme-border hover:border-theme-border-strong rounded-lg p-5 transition-all duration-150 cursor-pointer flex flex-col justify-between gap-4 hover:shadow-sm"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[11px] font-medium text-theme-text-subtle tracking-wide">
                            {code}
                          </span>
                          <ArrowUpRight className="w-4 h-4 text-theme-text-subtle opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-theme-brand transition-all duration-150" />
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 text-theme-brand shrink-0">
                            <ToolIcon name={tool.config.icon} className="w-5 h-5" />
                          </span>
                          <div className="space-y-1 min-w-0">
                            <h3 className="font-display text-base font-bold text-theme-text group-hover:text-theme-brand transition-colors leading-snug">
                              {tool.config.name}
                            </h3>
                            <p className="text-xs text-theme-text-muted leading-relaxed line-clamp-2">
                              {tool.config.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}

                {filteredTools.length === 0 && (
                  <div className="col-span-full py-12 text-center text-theme-text-muted bg-theme-card border border-theme-border border-dashed rounded-lg text-sm">
                    Nenhum módulo encontrado para &ldquo;{searchQuery}&rdquo;.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Paleta de Comandos */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectTool={(id) => {
          openTool(id);
          setIsCommandPaletteOpen(false);
        }}
      />
    </div>
  );
}

export default App;
