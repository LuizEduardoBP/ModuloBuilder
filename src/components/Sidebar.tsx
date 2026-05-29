import React from 'react';
import type { ToolCategory } from '../types/tool';
import { getAllTools } from '../registry';
import { 
  Layers, 
  PlusCircle, 
  CheckSquare, 
  Binary, 
  HelpCircle,
  Terminal
} from 'lucide-react';

interface SidebarProps {
  selectedCategory: 'all' | ToolCategory;
  onSelectCategory: (category: 'all' | ToolCategory) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  onSelectCategory
}) => {
  const tools = getAllTools();

  const categories: { id: 'all' | ToolCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Todos os Módulos', icon: <Layers className="w-4 h-4" /> },
    { id: 'geradores', label: 'Geradores', icon: <PlusCircle className="w-4 h-4" /> },
    { id: 'validadores', label: 'Validadores', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'formatadores', label: 'Formatadores', icon: <Binary className="w-4 h-4" /> },
    { id: 'outros', label: 'Outros', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const getCount = (catId: 'all' | ToolCategory) => {
    if (catId === 'all') return tools.length;
    return tools.filter(t => t.config.category === catId).length;
  };

  return (
    <aside className="w-64 bg-zinc-950/80 border-r border-white/5 flex flex-col h-full backdrop-blur-xl">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="p-2 bg-indigo-600/10 rounded-lg border border-indigo-500/20 text-indigo-400">
          <Terminal className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-md font-bold text-white tracking-wide">ModuloBuilder</h1>
          <span className="text-[10px] font-semibold tracking-wider text-indigo-400 uppercase">DevTools Platform</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        <span className="px-3 text-[10px] font-semibold text-gray-500 tracking-wider uppercase block mb-3">
          CATEGORIAS
        </span>

        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = getCount(cat.id);

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-indigo-600/10 border border-indigo-500/20 text-indigo-300'
                  : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={isActive ? 'text-indigo-400' : 'text-gray-500 group-hover:text-white transition-colors'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold transition-all ${
                isActive 
                  ? 'bg-indigo-500/20 text-indigo-300' 
                  : 'bg-white/5 text-gray-500 group-hover:text-gray-300'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-white/5 bg-black/20 text-center">
        <div className="text-[11px] text-gray-500">
          Atalho Rápido: <kbd className="bg-zinc-800 text-gray-300 px-1.5 py-0.5 rounded border border-white/10 text-[10px] font-mono shadow-sm">Ctrl + K</kbd>
        </div>
      </div>
    </aside>
  );
};
