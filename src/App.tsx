import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import type { ToolCategory } from './types/tool';
import { getAllTools, getToolById } from './registry';
import * as Icons from 'lucide-react';
import { Search, Command, ArrowRight, ArrowLeft, Menu } from 'lucide-react';
import { getThemeById, type ThemeId } from './styles/colors';

// Componente utilitário para renderizar ícones dinâmicos do Lucide
const LucideIcon = ({ name, className }: { name: string; className?: string }) => {
  const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
  return <IconComponent className={className} />;
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ToolCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Estado de controle de tema
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(() => {
    const saved = localStorage.getItem('modulobuilder-theme');
    return (saved as ThemeId) || 'indigo-cyber';
  });

  // Efeito para injetar variáveis do tema dinamicamente no DOM
  useEffect(() => {
    const theme = getThemeById(currentThemeId);
    Object.entries(theme.colors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
    localStorage.setItem('modulobuilder-theme', currentThemeId);
  }, [currentThemeId]);

  // Captura atalho Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const tools = getAllTools();

  // Filtragem de ferramentas reais
  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'all' || tool.config.category === selectedCategory;
    const matchesSearch =
      tool.config.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.config.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.config.keywords.some(kw => kw.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const activeTool = activeToolId ? getToolById(activeToolId) : null;

  return (
    <div className="flex h-screen bg-theme-bg text-theme-text overflow-hidden font-sans transition-colors duration-300">
      
      {/* Barra Lateral - Desktop */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            setActiveToolId(null); // Volta para a listagem ao mudar categoria
          }}
          currentThemeId={currentThemeId}
          onSelectTheme={setCurrentThemeId}
        />
      </div>

      {/* Barra Lateral - Mobile (Drawer) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden animate-fade-in">
          {/* Backdrop overlay com desfoque */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          
          {/* Sidebar Drawer Container */}
          <div className="relative z-10 w-64 h-full shadow-2xl animate-slide-in">
            <Sidebar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveToolId(null);
                setIsMobileSidebarOpen(false); // Fecha ao selecionar no celular
              }}
              currentThemeId={currentThemeId}
              onSelectTheme={setCurrentThemeId}
              isMobile={true}
              onClose={() => setIsMobileSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-theme-bg via-theme-bg to-theme-card/30 transition-all duration-300">
        {/* Cabeçalho */}
        <header className="h-16 border-b border-theme-border px-4 md:px-8 flex items-center justify-between bg-theme-card/30 backdrop-blur-md shrink-0 gap-3">
          
          {/* Lado Esquerdo: Hambúrguer para Mobile & Busca */}
          <div className="flex items-center gap-3 w-full max-w-md">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="flex md:hidden items-center justify-center p-2 rounded-lg bg-theme-brand-light border border-theme-brand-border text-theme-brand hover:bg-theme-brand/20 transition-all cursor-pointer"
              title="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-theme-text-muted/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar ferramenta... (Ctrl + K)"
                className="w-full bg-white/5 border border-theme-border rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-theme-brand/50 transition-colors placeholder-theme-text-muted/40"
              />
            </div>
          </div>

          {/* Lado Direito: Ações rápidas */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-1.5 bg-theme-brand-light hover:bg-theme-brand/20 border border-theme-brand-border text-theme-brand px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm"
            >
              <Command className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">ABRIR TERMINAL</span>
              <span className="sm:hidden">MENU</span>
            </button>
          </div>
        </header>

        {/* Corpo do Workspace */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTool ? (
            /* Área de Visualização da Ferramenta Ativa */
            <div className="max-w-6xl mx-auto space-y-6">
              <button
                onClick={() => setActiveToolId(null)}
                className="flex items-center gap-2 text-sm text-theme-text-muted hover:text-theme-text transition-colors cursor-pointer group mb-2"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform text-theme-brand" />
                Voltar para os Módulos
              </button>

              <div className="bg-theme-card/40 border border-theme-border rounded-2xl p-4 md:p-6 backdrop-blur-xl shadow-lg transition-all duration-300">
                <activeTool.Component onBack={() => setActiveToolId(null)} />
              </div>
            </div>
          ) : (
            /* Dashboard: Grid de Cards */
            <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">

              {/* Grid das Ferramentas */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-theme-text-muted tracking-wider uppercase">
                  {selectedCategory === 'all' ? 'Todas as Ferramentas' : `Categoria: ${selectedCategory}`}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {/* Renderização das Ferramentas Reais */}
                  {filteredTools.map((tool) => (
                    <div
                      key={tool.config.id}
                      onClick={() => setActiveToolId(tool.config.id)}
                      className="group relative bg-theme-card/20 hover:bg-theme-card/50 border border-theme-border hover:border-theme-brand-border rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-lg hover:shadow-theme-brand/5 hover:-translate-y-0.5"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-white/5 border border-theme-border rounded-xl text-theme-brand group-hover:bg-theme-brand-light group-hover:border-theme-brand-border transition-all">
                            <LucideIcon name={tool.config.icon} className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-theme-brand-light border border-theme-brand-border text-theme-brand font-semibold uppercase tracking-wider">
                            {tool.config.category}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-theme-text group-hover:text-theme-brand transition-colors">
                            {tool.config.name}
                          </h4>
                          <p className="text-xs text-theme-text-muted leading-relaxed line-clamp-2">
                            {tool.config.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between text-xs text-theme-text-muted font-semibold group-hover:text-theme-brand transition-colors">
                        <span>Iniciar utilitário</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-theme-brand" />
                      </div>
                    </div>
                  ))}

                  {/* Se nada corresponder à busca */}
                  {filteredTools.length === 0 && (
                    <div className="col-span-full py-12 text-center text-theme-text-muted bg-theme-card/10 border border-theme-border border-dashed rounded-2xl">
                      Nenhuma ferramenta encontrada para a busca atual.
                    </div>
                  )}
                </div>
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
          setActiveToolId(id);
          setIsCommandPaletteOpen(false);
        }}
      />
    </div>
  );
}

export default App;
