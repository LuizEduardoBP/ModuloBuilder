import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import type { ToolCategory } from './types/tool';
import { getAllTools, getToolById } from './registry';
import * as Icons from 'lucide-react';
import { Search, Command, ArrowRight, ArrowLeft } from 'lucide-react';

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
    <div className="flex h-screen bg-zinc-950 text-zinc-100 overflow-hidden font-sans">
      {/* Barra Lateral */}
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveToolId(null); // Volta para a listagem ao mudar categoria
        }}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-900 to-black">
        {/* Cabeçalho */}
        <header className="h-16 border-b border-white/5 px-8 flex items-center justify-between bg-zinc-950/40 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4 w-full max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar ferramenta... (Ctrl + K)"
                className="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="flex items-center gap-1.5 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-sm"
            >
              <Command className="w-3.5 h-3.5" />
              ABRIR TERMINAL
            </button>
          </div>
        </header>

        {/* Corpo do Workspace */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTool ? (
            /* Área de Visualização da Ferramenta Ativa */
            <div className="max-w-6xl mx-auto space-y-6">
              <button
                onClick={() => setActiveToolId(null)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer group mb-2"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                Voltar para os Módulos
              </button>

              <div className="bg-zinc-900/40 border border-white/5 rounded-2xl p-6 backdrop-blur-xl">
                <activeTool.Component onBack={() => setActiveToolId(null)} />
              </div>
            </div>
          ) : (
            /* Dashboard: Grid de Cards */
            <div className="max-w-6xl mx-auto space-y-8">
              {/* Boas-vindas Banner */}
              <div className="mt-5 relative overflow-hidden rounded-2xl border border-white/5 bg-linear-to-r from-indigo-950/40 via-purple-950/20 to-zinc-950 p-8 shadow-xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10 space-y-2">
                  <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                    ModuloBuilder DevTools
                  </h2>
                  <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
                    Plataforma unificada e modular de utilitários rápidos para desenvolvedores. Acesse ferramentas instantâneas de geração, validação.
                  </p>
                </div>
              </div>

              {/* Grid das Ferramentas */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-gray-400 tracking-wider uppercase">
                  {selectedCategory === 'all' ? 'Todas as Ferramentas' : `Categoria: ${selectedCategory}`}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Renderização das Ferramentas Reais */}
                  {filteredTools.map((tool) => (
                    <div
                      key={tool.config.id}
                      onClick={() => setActiveToolId(tool.config.id)}
                      className="group relative bg-zinc-900/30 hover:bg-zinc-900/60 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-0.5"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-indigo-400 group-hover:bg-indigo-500/10 group-hover:border-indigo-500/25 transition-all">
                            <LucideIcon name={tool.config.icon} className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-semibold uppercase tracking-wider">
                            {tool.config.category}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                            {tool.config.name}
                          </h4>
                          <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                            {tool.config.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-semibold group-hover:text-indigo-400 transition-colors">
                        <span>Iniciar utilitário</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </div>
                    </div>
                  ))}

                  {/* Se nada corresponder à busca */}
                  {filteredTools.length === 0 && (
                    <div className="col-span-full py-12 text-center text-gray-500">
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
