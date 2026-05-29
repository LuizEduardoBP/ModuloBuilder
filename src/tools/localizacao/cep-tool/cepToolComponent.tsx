import React from 'react';
import { cepUseTool } from './cepUseTool';
import { Copy, Check, RefreshCw, ShieldAlert, ShieldCheck, Clipboard, MapPin, Loader2 } from 'lucide-react';

export const cepToolComponent: React.FC = () => {
  const {
    generatedCep,
    copied,
    formatted,
    cepInput,
    address,
    isValid,
    loading,
    error,
    handleGenerate,
    handleCopy,
    handleValidateAndSearch,
    handleFormatToggle
  } = cepUseTool();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
          <MapPin className="w-7 h-7 text-indigo-400" />
          Buscador & Gerador de CEP
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Gere CEPs brasileiros válidos e consulte endereços reais instantaneamente via API ViaCep.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gerador */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Gerar CEP de Teste
            </h3>
            
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formatted}
                  onChange={(e) => handleFormatToggle(e.target.checked)}
                  className="rounded border-gray-700 bg-gray-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-gray-900 w-4 h-4"
                />
                Gerar com Máscara
              </label>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="bg-black/40 border border-white/10 rounded-xl px-4 py-4 flex items-center justify-between min-h-[64px]">
              <span className="text-xl font-mono font-bold tracking-widest text-indigo-200">
                {generatedCep || '-----\u2013---'}
              </span>

              {generatedCep && (
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/20 text-indigo-300 hover:text-white transition-all cursor-pointer"
                  title="Copiar CEP"
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
              Gerar CEP Válido
            </button>
          </div>
        </div>

        {/* Validador & Buscador */}
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Consultar / Validar CEP
            </h3>
            
            <div className="relative">
              <Clipboard className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
              <input
                type="text"
                value={cepInput}
                onChange={(e) => handleValidateAndSearch(e.target.value)}
                placeholder="Cole ou digite o CEP de 8 dígitos..."
                maxLength={9}
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors font-mono"
              />
            </div>
          </div>

          <div className="pt-2 flex-1 flex flex-col justify-center min-h-[140px]">
            {loading ? (
              <div className="border border-indigo-500/20 bg-indigo-500/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-sm text-indigo-300">
                <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                <span>Buscando endereço na base dos Correios...</span>
              </div>
            ) : error ? (
              <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-4 flex items-center gap-3 text-sm text-rose-300">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            ) : isValid === null ? (
              <div className="border border-white/5 bg-white/5 rounded-xl p-4 flex items-center gap-3 text-sm text-gray-400">
                <ShieldAlert className="w-5 h-5 text-gray-500 shrink-0" />
                Aguardando digitação de CEP completo.
              </div>
            ) : !isValid ? (
              <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-4 flex items-center gap-3 text-sm text-rose-300">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                <span>CEP estruturalmente inválido. Deve possuir 8 dígitos.</span>
              </div>
            ) : address ? (
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-4 space-y-3 text-sm text-indigo-200">
                <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-white/5 pb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>CEP Localizado!</span>
                </div>
                
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500 shrink-0">Rua:</span>
                    <span className="text-white font-bold text-right truncate">{address.logradouro || 'Sem logradouro (CEP geral)'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500 shrink-0">Bairro:</span>
                    <span className="text-white font-bold text-right truncate">{address.bairro || 'Sem bairro'}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500 shrink-0">Cidade:</span>
                    <span className="text-white font-bold text-right">{address.localidade} ({address.uf})</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
