import React, { useState, useEffect, useRef } from 'react';
import { getAllTools } from '../registry';
import { Search, Command, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (id: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTool
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tools = getAllTools();

  // Filtra as ferramentas com base no termo digitado
  const filteredTools = tools.filter(tool => {
    const term = search.toLowerCase();
    return (
      tool.config.name.toLowerCase().includes(term) ||
      tool.config.description.toLowerCase().includes(term) ||
      tool.config.keywords.some(kw => kw.toLowerCase().includes(term))
    );
  });

  // Foco no input ao abrir
  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Atalhos de teclado dentro da paleta
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredTools.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredTools[selectedIndex]) {
          onSelectTool(filteredTools[selectedIndex].config.id);
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredTools, selectedIndex, onSelectTool, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        ref={containerRef}
        className="w-full max-w-lg bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[400px] animate-in zoom-in-95 duration-200"
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-zinc-950/40">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Digite para buscar qualquer ferramenta..."
            className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-sm"
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 bg-zinc-800 text-[10px] text-gray-400 border border-white/5 rounded px-1.5 py-0.5 font-mono shadow">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={tool.config.id}
                  onClick={() => {
                    onSelectTool(tool.config.id);
                    onClose();
                  }}
                  className={`w-full text-left flex items-center justify-between p-3 rounded-xl transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-indigo-600/10 border border-indigo-500/35 text-indigo-100 shadow-md shadow-indigo-600/5' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-lg border transition-all ${
                      isSelected 
                        ? 'bg-indigo-500/20 border-indigo-400/20 text-indigo-300' 
                        : 'bg-white/5 border-white/5 text-gray-500'
                    }`}>
                      <Command className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className={`text-sm font-semibold ${isSelected ? 'text-indigo-200' : 'text-gray-200'}`}>
                        {tool.config.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {tool.config.description}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <ArrowRight className="w-4 h-4 text-indigo-400 animate-pulse" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-gray-500 text-sm">
              Nenhuma ferramenta encontrada para &ldquo;{search}&rdquo;
            </div>
          )}
        </div>

        {/* Action Help Bar */}
        <div className="px-4 py-2 bg-zinc-950/40 border-t border-white/5 text-[11px] text-gray-500 flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            Navegar: 
            <kbd className="bg-zinc-800 border border-white/5 px-1 py-0.5 rounded text-[9px] font-mono font-bold">↑</kbd>
            <kbd className="bg-zinc-800 border border-white/5 px-1 py-0.5 rounded text-[9px] font-mono font-bold">↓</kbd>
          </span>
          <span className="flex items-center gap-1.5">
            Selecionar: 
            <kbd className="bg-zinc-800 border border-white/5 px-1 py-0.5 rounded text-[9px] font-mono font-bold">↵ Enter</kbd>
          </span>
        </div>
      </div>
    </div>
  );
};
