import React from 'react';
import { uuidUseTool } from './uuidUseTool';
import { Copy, Check, RefreshCw, RotateCcw, Terminal, ArrowRight } from 'lucide-react';

export const uuidToolComponent: React.FC = () => {
  const {
    uuids,
    count,
    uppercase,
    copied,
    setCount,
    setUppercase,
    handleGenerate,
    handleCopy,
    handleClear
  } = uuidUseTool();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <Terminal className="w-7 h-7 text-indigo-400" />
            Gerador de UUID v4
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Gere identificadores UUID v4 universais aleatórios individuais ou em lote (bulk).
          </p>
        </div>

        {uuids.length > 0 && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Lado Esquerdo: Controles */}
        <div className="md:col-span-1 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Configurações
            </h3>

            <div className="space-y-2">
              <label className="text-xs text-gray-400 block font-medium">Quantidade a Gerar ({count}):</label>
              <input
                type="range"
                min={1}
                max={50}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-gray-500 font-bold">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer text-sm">
              <span className="text-gray-200 font-medium">Letras Maiúsculas</span>
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-900"
              />
            </label>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <RefreshCw className="w-4 h-4" />
            Gerar UUIDs
          </button>
        </div>

        {/* Lado Direito: UUIDs Gerados */}
        <div className="md:col-span-2 bg-zinc-900/30 border border-white/5 rounded-2xl p-5 flex flex-col min-h-[300px]">
          <div className="flex justify-between items-center pb-3 border-b border-white/5 mb-4">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Identificadores Gerados
            </span>

            {uuids.length > 0 && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-300 hover:text-white transition-all cursor-pointer text-xs border border-indigo-500/20 font-semibold"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className={copied ? 'text-emerald-400' : ''}>{copied ? 'Lista Copiada!' : 'Copiar Todos'}</span>
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto max-h-[320px] rounded-xl bg-black/40 border border-white/5 p-4 font-mono text-sm text-indigo-200/90 space-y-2">
            {uuids.length > 0 ? (
              uuids.map((uuid, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-white/5 last:border-0 hover:bg-white/5 px-2 rounded group transition-all">
                  <span className="select-all break-all">{uuid}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(uuid)}
                    className="opacity-0 group-hover:opacity-100 p-1 bg-white/5 border border-white/5 hover:border-indigo-500/20 rounded transition-all text-gray-400 hover:text-indigo-300 cursor-pointer"
                    title="Copiar UUID individual"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-600 text-xs py-12 space-y-2">
                <ArrowRight className="w-5 h-5 animate-pulse text-indigo-500/40" />
                <span>Clique em &ldquo;Gerar UUIDs&rdquo; para popular a lista.</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
