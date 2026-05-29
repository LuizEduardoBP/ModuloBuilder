import React from 'react';
import { useTool } from './useTool';
import { Copy, Check, RefreshCw, RotateCcw, CreditCard, ShieldAlert } from 'lucide-react';

export const ToolComponent: React.FC = () => {
  const {
    selectedBrand,
    card,
    copiedNumber,
    copiedCvv,
    copiedExpiry,
    copiedAll,
    setSelectedBrand,
    handleGenerate,
    handleCopy,
    handleCopyAll,
    handleClear,
    setCopiedNumber,
    setCopiedCvv,
    setCopiedExpiry
  } = useTool();

  // Mapeamento de cores de cartão por bandeira
  const getCardBg = () => {
    switch (selectedBrand) {
      case 'visa':
        return 'from-blue-600 to-indigo-900';
      case 'mastercard':
        return 'from-amber-600 to-rose-900';
      case 'amex':
        return 'from-emerald-600 to-teal-900';
      case 'elo':
      default:
        return 'from-purple-600 to-indigo-950';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <CreditCard className="w-7 h-7 text-indigo-400" />
            Gerador de Cartão de Crédito
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Gere dados de cartões de crédito fictícios matematicamente válidos (Luhn) para homologação de gateways de pagamento.
          </p>
        </div>

        {card && (
          <button
            onClick={handleClear}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Painel de Controles */}
        <div className="lg:col-span-1 bg-zinc-900/50 border border-white/5 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Bandeira do Cartão
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {(['visa', 'mastercard', 'amex', 'elo'] as const).map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`py-2 px-3 border rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${
                    selectedBrand === b
                      ? 'bg-indigo-600/10 border-indigo-500 text-indigo-300'
                      : 'border-white/5 bg-black/20 text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <RefreshCw className="w-4 h-4" />
            Gerar Cartão Válido
          </button>
        </div>

        {/* Mockup do Cartão Visual */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Visual Card Card */}
            <div className="md:col-span-3 flex justify-center">
              <div className={`w-full max-w-[340px] aspect-[1.586] bg-gradient-to-br ${getCardBg()} rounded-2xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden border border-white/10 select-none animate-in zoom-in-95 duration-200`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_60%)] pointer-events-none"></div>
                
                {/* Top Row: Chip and Brand */}
                <div className="flex justify-between items-start">
                  {/* Microchip */}
                  <div className="w-10 h-8 bg-amber-400/80 rounded-md border border-amber-300/40 relative overflow-hidden flex flex-col justify-between p-1.5 shadow">
                    <div className="h-[2px] bg-amber-600/30 w-full rounded"></div>
                    <div className="flex justify-between w-full h-[6px]">
                      <div className="w-[10px] bg-amber-600/30 rounded-sm"></div>
                      <div className="w-[10px] bg-amber-600/30 rounded-sm"></div>
                    </div>
                    <div className="h-[2px] bg-amber-600/30 w-full rounded"></div>
                  </div>

                  {/* Brand name */}
                  <span className="text-sm font-black tracking-widest text-white/90 uppercase italic">
                    {selectedBrand}
                  </span>
                </div>

                {/* Card Number */}
                <div className="space-y-1">
                  <span className="text-xs text-white/40 tracking-wider font-semibold block">NÚMERO DO CARTÃO</span>
                  <span className="text-lg md:text-xl font-mono font-bold tracking-widest text-white block">
                    {card ? card.formattedNumber : '•••• •••• •••• ••••'}
                  </span>
                </div>

                {/* Bottom Row: Expiry and CVV */}
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-[9px] text-white/40 font-bold block">VALIDADE</span>
                    <span className="font-mono text-sm font-bold text-white">
                      {card ? card.expiry : 'MM/AA'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-white/40 font-bold block">CVV</span>
                    <span className="font-mono text-sm font-bold text-white">
                      {card ? card.cvv : '•••'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ações e Copiador de Dados */}
            <div className="md:col-span-2 flex flex-col justify-between space-y-4">
              {card ? (
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Copiar Dados Individuais
                  </h4>

                  {/* Número */}
                  <div className="bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-500 font-bold">NÚMERO</span>
                      <span className="font-mono text-xs text-indigo-200">{card.number}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(card.number, setCopiedNumber)}
                      className="p-1.5 rounded bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/20 text-indigo-300 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedNumber ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Validade */}
                  <div className="bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-500 font-bold">VALIDADE</span>
                      <span className="font-mono text-xs text-indigo-200">{card.expiry}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(card.expiry, setCopiedExpiry)}
                      className="p-1.5 rounded bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/20 text-indigo-300 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedExpiry ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* CVV */}
                  <div className="bg-black/40 border border-white/5 rounded-xl px-3 py-2.5 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-500 font-bold">CVV</span>
                      <span className="font-mono text-xs text-indigo-200">{card.cvv}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(card.cvv, setCopiedCvv)}
                      className="p-1.5 rounded bg-indigo-500/10 hover:bg-indigo-500/25 border border-indigo-500/20 text-indigo-300 hover:text-white transition-all cursor-pointer"
                    >
                      {copiedCvv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <button
                    onClick={handleCopyAll}
                    className="w-full py-2 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 rounded-xl text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-2"
                  >
                    {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAll ? 'Copiado!' : 'Copiar Bloco Inteiro'}</span>
                  </button>
                </div>
              ) : (
                <div className="border border-white/5 bg-white/5 rounded-xl p-4 flex items-start gap-3 text-xs text-gray-500 h-full justify-center flex-col">
                  <ShieldAlert className="w-5 h-5 text-gray-500 shrink-0" />
                  <span>Escolha uma bandeira e clique em &ldquo;Gerar Cartão Válido&rdquo;. Os dados do cartão simulado aparecerão aqui.</span>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
