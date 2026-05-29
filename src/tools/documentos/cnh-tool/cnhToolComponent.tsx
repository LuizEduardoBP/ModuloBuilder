import React from 'react';
import { cnhUseTool } from './cnhUseTool';
import { Copy, Check, RefreshCw, ShieldAlert, ShieldCheck, Clipboard, FileText } from 'lucide-react';

export const cnhToolComponent: React.FC = () => {
  const {
    generatedCnh,
    copied,
    cnhInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate
  } = cnhUseTool();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          <FileText className="w-7 h-7 text-indigo-400" />
          Gerador & Validador de CNH
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Gere Carteiras Nacionais de Habilitação (CNH) válidas para simulações e faça validações sintáticas estruturais.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gerador */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Gerar CNH de Teste
            </h3>
            <p className="text-xs text-gray-500">
              Gera um número de CNH de 11 dígitos matematicamente válido contendo ambos os dígitos verificadores corretos.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="bg-black/40 border border-white/10 rounded-xl px-4 py-4 flex items-center justify-between min-h-[64px]">
              <span className="text-xl font-mono font-bold tracking-widest text-indigo-200">
                {generatedCnh || '-----------'}
              </span>

              {generatedCnh && (
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/20 text-indigo-300 hover:text-white transition-all cursor-pointer"
                  title="Copiar CNH"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>

            <button
              onClick={handleGenerate}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              Gerar CNH Válida
            </button>
          </div>
        </div>

        {/* Validador */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Validar CNH Existente
            </h3>
            
            <div className="relative">
              <Clipboard className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={cnhInput}
                onChange={(e) => handleValidate(e.target.value)}
                placeholder="Cole ou digite a CNH para validar..."
                maxLength={11}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="pt-2">
            {isValid === null ? (
              <div className="border border-white/5 bg-white/5 rounded-xl p-4 flex items-center gap-3 text-sm text-gray-400">
                <ShieldAlert className="w-5 h-5 text-gray-500 shrink-0" />
                Aguardando a digitação de uma CNH de 11 dígitos.
              </div>
            ) : isValid ? (
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-4 flex items-center gap-3 text-sm text-emerald-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-bold block">CNH Válida!</span>
                  <span className="text-xs text-emerald-400/80">O número atende a todos os critérios e algoritmos oficiais.</span>
                </div>
              </div>
            ) : (
              <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-4 flex items-center gap-3 text-sm text-rose-300">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                <div>
                  <span className="font-bold block">CNH Inválida!</span>
                  <span className="text-xs text-rose-400/80">Os dígitos verificadores calculados não coincidem com o documento digitado.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
