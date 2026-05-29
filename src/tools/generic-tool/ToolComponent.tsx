import React from 'react';
import { useTool } from './useTool';
import { Copy, Check, RotateCcw, FileText, Binary, RefreshCw, HelpCircle } from 'lucide-react';

export const ToolComponent: React.FC<{ onBack?: () => void }> = () => {
  const {
    inputText,
    outputText,
    copied,
    mode,
    showAdvanced,
    autoTrim,
    outputUppercase,
    stats,
    setShowAdvanced,
    handleTextChange,
    handleModeChange,
    handleCopy,
    handleClear,
    handleTrimChange,
    handleUppercaseChange
  } = useTool();

  return (
    <div className="space-y-6">
      {/* Header do Módulo */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <Binary className="w-7 h-7 text-indigo-400" />
            Utils de Texto & Base64
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Módulo plug-and-play para codificação, decodificação e análise de strings em tempo real.
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleClear}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Limpar
          </button>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-1.5 text-sm border rounded-lg transition-all cursor-pointer ${
              showAdvanced
                ? 'bg-indigo-500/20 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/30'
                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${showAdvanced ? 'rotate-180' : ''} transition-transform duration-300`} />
            Opções Avançadas
          </button>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Painel Esquerdo: Entrada/Saída */}
        <div className="lg:col-span-2 space-y-6">
          {/* Seletor de Modo */}
          <div className="grid grid-cols-3 gap-2 bg-black/40 p-1.5 rounded-xl border border-white/5">
            <button
              onClick={() => handleModeChange('base64-encode')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === 'base64-encode'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Base64 Encode
            </button>
            <button
              onClick={() => handleModeChange('base64-decode')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === 'base64-decode'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Base64 Decode
            </button>
            <button
              onClick={() => handleModeChange('reverse')}
              className={`py-2 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                mode === 'reverse'
                  ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Inverter Texto
            </button>
          </div>

          {/* Área de Entrada */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-10 group-focus-within:opacity-20 transition duration-300"></div>
            <div className="relative bg-zinc-900/90 border border-white/10 rounded-xl overflow-hidden focus-within:border-indigo-500/50 transition-all">
              <div className="flex justify-between items-center bg-white/5 px-4 py-2 border-b border-white/5 text-xs text-gray-400 font-medium">
                <span>TEXTO DE ENTRADA</span>
                <span className="flex items-center gap-1 text-indigo-400">
                  <FileText className="w-3 h-3" />
                  {stats.chars} caracteres
                </span>
              </div>
              <textarea
                value={inputText}
                onChange={handleTextChange}
                placeholder="Cole ou digite seu text aqui..."
                rows={5}
                className="w-full bg-transparent px-4 py-3 text-white placeholder-gray-500 focus:outline-none resize-y text-sm font-mono"
              />
            </div>
          </div>

          {/* Área de Saída */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-10 transition duration-300"></div>
            <div className="relative bg-zinc-900/90 border border-white/10 rounded-xl overflow-hidden">
              <div className="flex justify-between items-center bg-white/5 px-4 py-2 border-b border-white/5 text-xs text-gray-400 font-medium">
                <span>TEXTO PROCESSADO</span>
                {outputText && (
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 hover:text-indigo-200 transition-all cursor-pointer text-[11px] border border-indigo-500/20"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copiar Saída</span>
                      </>
                    )}
                  </button>
                )}
              </div>
              <textarea
                value={outputText}
                readOnly
                placeholder="O resultado aparecerá aqui em tempo real..."
                rows={5}
                className="w-full bg-transparent px-4 py-3 text-indigo-200/90 placeholder-gray-600 focus:outline-none resize-y text-sm font-mono"
              />
            </div>
          </div>
        </div>

        {/* Painel Direito: Estatísticas & Opções Avançadas */}
        <div className="space-y-6">
          {/* Métricas Rápidas */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-gray-400" />
              Estatísticas
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                <span className="block text-xl font-bold text-white">{stats.chars}</span>
                <span className="text-[10px] text-gray-400">Caracteres</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                <span className="block text-xl font-bold text-white">{stats.words}</span>
                <span className="text-[10px] text-gray-400">Palavras</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                <span className="block text-xl font-bold text-white">{stats.lines}</span>
                <span className="text-[10px] text-gray-400">Linhas</span>
              </div>
            </div>
          </div>

          {/* Opções Avançadas */}
          {showAdvanced && (
            <div className="bg-zinc-900/50 border border-indigo-500/10 rounded-xl p-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <h3 className="text-sm font-semibold text-white tracking-wider uppercase flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-400" />
                  Parâmetros de Ajuste
                </h3>
              </div>

              <div className="space-y-3 text-sm">
                <label className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-gray-200 font-medium">Auto Trim</span>
                    <span className="text-xs text-gray-400">Remove espaços em branco nas pontas</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoTrim}
                    onChange={(e) => handleTrimChange(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-900"
                  />
                </label>

                <label className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="flex flex-col">
                    <span className="text-gray-200 font-medium">LETRAS MAIÚSCULAS</span>
                    <span className="text-xs text-gray-400">Força a saída em caixa alta</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={outputUppercase}
                    onChange={(e) => handleUppercaseChange(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-900"
                  />
                </label>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
