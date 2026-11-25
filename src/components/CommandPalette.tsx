import React, { useState, useEffect, useRef } from 'react';
import { getAllTools } from '../registry';
import { Search, ArrowRight } from 'lucide-react';
import { ToolIcon } from './ToolIcon';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTool: (id: string) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  documentos: 'Documentos',
  dev: 'Dev',
  financeiro: 'Financeiro',
  localizacao: 'Localização',
  outros: 'Outros',
};

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTool,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tools = getAllTools();

  const filteredTools = tools.filter((tool) => {
    const term = search.toLowerCase();
    return (
      tool.config.name.toLowerCase().includes(term) ||
      tool.config.description.toLowerCase().includes(term) ||
      tool.config.category.toLowerCase().includes(term) ||
      tool.config.keywords.some((kw) => kw.toLowerCase().includes(term))
    );
  });

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [isOpen]);

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

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length)
        );
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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[14vh] px-4 bg-black/50 backdrop-blur-[2px] animate-fade-in">
      <div
        ref={containerRef}
        className="w-full max-w-xl bg-theme-card border border-theme-border-strong rounded-xl shadow-xl overflow-hidden flex flex-col max-h-[440px]"
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-theme-border bg-theme-inset/60">
          <Search className="w-4 h-4 text-theme-text-subtle shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Ir para módulo (ex: cpf, json, pix, cep)..."
            className="flex-1 bg-transparent text-theme-text placeholder-theme-text-subtle focus:outline-none text-sm"
          />
          <kbd className="hidden sm:inline-flex items-center bg-theme-card text-[10px] text-theme-text-muted border border-theme-border rounded px-1.5 py-0.5 font-mono">
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
                  type="button"
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => {
                    onSelectTool(tool.config.id);
                    onClose();
                  }}
                  className={`w-full text-left flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors duration-100 cursor-pointer border ${
                    isSelected
                      ? 'bg-theme-brand-light border-theme-brand-border text-theme-text'
                      : 'text-theme-text-muted hover:bg-theme-inset border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-md border shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-theme-card border-theme-brand-border text-theme-brand'
                          : 'bg-theme-inset border-theme-border text-theme-text-muted'
                      }`}
                    >
                      <ToolIcon name={tool.config.icon} className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-theme-text truncate">
                          {tool.config.name}
                        </h4>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-theme-inset border border-theme-border text-theme-text-subtle shrink-0">
                          {CATEGORY_LABELS[tool.config.category] || tool.config.category}
                        </span>
                      </div>
                      <p className="text-xs text-theme-text-muted mt-0.5 line-clamp-1">
                        {tool.config.description}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <ArrowRight className="w-4 h-4 text-theme-brand shrink-0" />
                  )}
                </button>
              );
            })
          ) : (
            <div className="py-10 px-4 text-center text-theme-text-muted text-sm">
              Nenhum módulo encontrado para &ldquo;{search}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer Help */}
        <div className="px-4 py-2 bg-theme-inset/60 border-t border-theme-border text-[11px] text-theme-text-subtle flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            Navegar:
            <kbd className="bg-theme-card border border-theme-border px-1.5 py-0.5 rounded text-[10px] font-mono text-theme-text-muted">
              ↑
            </kbd>
            <kbd className="bg-theme-card border border-theme-border px-1.5 py-0.5 rounded text-[10px] font-mono text-theme-text-muted">
              ↓
            </kbd>
          </span>
          <span className="flex items-center gap-1.5">
            Abrir:
            <kbd className="bg-theme-card border border-theme-border px-1.5 py-0.5 rounded text-[10px] font-mono text-theme-text-muted">
              Enter
            </kbd>
          </span>
        </div>
      </div>
    </div>
  );
};
