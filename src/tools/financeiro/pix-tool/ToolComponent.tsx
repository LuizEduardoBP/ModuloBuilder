import React from 'react';
import { useTool } from './useTool';
import { Copy, Check, RefreshCw, RotateCcw, CreditCard, ArrowRight } from 'lucide-react';

export const ToolComponent: React.FC = () => {
  const {
    keyType,
    generatedKey,
    copied,
    setKeyType,
    handleGenerate,
    handleCopy,
    handleClear
  } = useTool();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-indigo-400" />
            Gerador de Chave PIX Fictícia
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Gere chaves PIX de homologação fictícias (CPFs/CNPJs válidos, e-mails, celulares e chaves aleatórias EVP).
          </p>
        </div>

        {generatedKey && (
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
        
        {/* Painel de Controles */}
        <div className="md:col-span-1 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Parâmetros da Chave
            </h3>

            <div className="space-y-1">
              <label className="text-xs text-gray-400 font-medium">Tipo de Chave PIX:</label>
              <select
                value={keyType}
                onChange={(e) => setKeyType(e.target.value as any)}
                className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-indigo-500/50 transition-colors w-full cursor-pointer"
              >
                <option value="aleatoria">Chave Aleatória (EVP)</option>
                <option value="cpf">CPF</option>
                <option value="cnpj">CNPJ</option>
                <option value="email">E-mail de Homologação</option>
                <option value="celular">Celular</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <RefreshCw className="w-4 h-4" />
            Gerar Chave PIX
          </button>
        </div>

        {/* Painel da Chave Gerada */}
        <div className="md:col-span-2 bg-zinc-900/30 border border-white/5 rounded-2xl p-6 flex flex-col justify-center min-h-[180px]">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-3">
            Chave PIX de Teste
          </span>

          <div className="bg-black/40 border border-white/10 rounded-xl px-5 py-5 flex items-center justify-between min-h-[64px] gap-4">
            <span className="text-md sm:text-lg font-mono font-bold text-indigo-200 break-all select-all">
              {generatedKey || <span className="text-gray-600 font-sans text-sm font-normal">Nenhuma chave gerada ainda...</span>}
            </span>

            {generatedKey && (
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/20 text-indigo-300 hover:text-white transition-all cursor-pointer shrink-0"
                title="Copiar Chave PIX"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>

          {generatedKey && (
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-500">
              <ArrowRight className="w-3.5 h-3.5 text-indigo-500/60" />
              <span>Chave fictícia gerada estritamente para homologação local de sistemas.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
