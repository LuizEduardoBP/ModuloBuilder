import React from 'react';
import { cartaoUseTool } from './cartaoUseTool';
import { Copy, Check, RefreshCw, RotateCcw } from 'lucide-react';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import { Panel } from '../../../components/ui/Panel';
import { Button } from '../../../components/ui/Button';
import type { CardBrand } from './cartaoToolUtils';

const BRANDS: readonly { id: CardBrand; label: string }[] = [
  { id: 'visa', label: 'Visa' },
  { id: 'mastercard', label: 'Mastercard' },
  { id: 'amex', label: 'Amex' },
  { id: 'elo', label: 'Elo' },
];

const CARD_SURFACE: Record<CardBrand, string> = {
  visa: 'bg-[#172844] border-[#2B436B]',
  mastercard: 'bg-[#261D1A] border-[#4A362F]',
  amex: 'bg-[#142D28] border-[#255249]',
  elo: 'bg-[#222220] border-[#3F3E3A]',
};

export const cartaoToolComponent: React.FC = () => {
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
    setCopiedExpiry,
  } = cartaoUseTool();

  return (
    <div className="space-y-6">
      <ToolHeader
        icon="CreditCard"
        title="Gerador de Cartão de Crédito"
        description="Gere dados fictícios matematicamente válidos pelo algoritmo de Luhn para homologação de gateways."
        actions={
          card ? (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar
            </Button>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel title="Bandeira do Cartão" className="lg:col-span-1 justify-between gap-5">
          <div className="grid grid-cols-2 gap-2">
            {BRANDS.map((b) => {
              const isSelected = selectedBrand === b.id;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelectedBrand(b.id)}
                  className={`py-2.5 px-3 border rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-theme-brand-light border-theme-brand-border text-theme-brand'
                      : 'bg-theme-inset border-theme-border text-theme-text-muted hover:text-theme-text hover:border-theme-border-strong'
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>

          <Button onClick={handleGenerate} fullWidth size="lg">
            <RefreshCw className="w-4 h-4" />
            Gerar Cartão Válido
          </Button>
        </Panel>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-5 gap-5">
          {/* Cartão Visual Editorial Fosco */}
          <div className="md:col-span-3 flex items-center justify-center">
            <div
              className={`w-full max-w-[350px] aspect-[1.586] rounded-xl p-6 border shadow-lg flex flex-col justify-between relative overflow-hidden select-none transition-colors duration-200 ${CARD_SURFACE[selectedBrand]}`}
            >
              {/* Micro-textura geométrica sutil */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at 85% 15%, rgba(255,255,255,0.25), transparent 55%)',
                }}
              />

              <div className="relative flex justify-between items-start">
                <div className="w-10 h-7 bg-[#D8B467] rounded border border-[#EBD296]/50 flex flex-col justify-between p-1">
                  <div className="h-[1.5px] bg-[#8E6F2E]/50 w-full" />
                  <div className="flex justify-between gap-1 h-2">
                    <div className="flex-1 border border-[#8E6F2E]/40 rounded-[1px]" />
                    <div className="flex-1 border border-[#8E6F2E]/40 rounded-[1px]" />
                  </div>
                  <div className="h-[1.5px] bg-[#8E6F2E]/50 w-full" />
                </div>

                <span className="font-display text-xs font-bold tracking-[0.2em] text-white/90 uppercase">
                  {selectedBrand}
                </span>
              </div>

              <div className="relative space-y-1">
                <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase block">
                  Número do Cartão
                </span>
                <span className="text-lg sm:text-xl font-mono font-semibold tracking-widest text-white block">
                  {card ? card.formattedNumber : '•••• •••• •••• ••••'}
                </span>
              </div>

              <div className="relative flex justify-between items-end">
                <div>
                  <span className="font-mono text-[9px] text-white/50 tracking-wider uppercase block">
                    Validade
                  </span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {card ? card.expiry : 'MM/AA'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[9px] text-white/50 tracking-wider uppercase block">
                    CVV
                  </span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {card ? card.cvv : '•••'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dados Individuais */}
          <Panel title="Dados para Cópia" className="md:col-span-2 justify-between gap-3">
            {card ? (
              <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  {[
                    {
                      label: 'NÚMERO',
                      value: card.number,
                      copied: copiedNumber,
                      onCopy: () => handleCopy(card.number, setCopiedNumber),
                    },
                    {
                      label: 'VALIDADE',
                      value: card.expiry,
                      copied: copiedExpiry,
                      onCopy: () => handleCopy(card.expiry, setCopiedExpiry),
                    },
                    {
                      label: 'CVV',
                      value: card.cvv,
                      copied: copiedCvv,
                      onCopy: () => handleCopy(card.cvv, setCopiedCvv),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-theme-inset border border-theme-border rounded-md px-3 py-2 flex items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <span className="font-mono text-[9px] text-theme-text-subtle font-semibold block">
                          {item.label}
                        </span>
                        <span className="font-mono text-xs font-medium text-theme-text truncate block">
                          {item.value}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={item.onCopy}
                        className={`p-1.5 rounded border transition-colors cursor-pointer shrink-0 ${
                          item.copied
                            ? 'bg-theme-success-bg border-theme-success-border text-theme-success'
                            : 'bg-theme-card border-theme-border hover:border-theme-border-strong text-theme-text-muted hover:text-theme-text'
                        }`}
                        title={`Copiar ${item.label.toLowerCase()}`}
                      >
                        {item.copied ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>

                <Button variant="secondary" size="sm" fullWidth onClick={handleCopyAll}>
                  {copiedAll ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-theme-success" />
                      <span>Bloco copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar bloco inteiro</span>
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-xs text-theme-text-subtle py-6">
                Selecione uma bandeira e clique em &ldquo;Gerar Cartão Válido&rdquo;.
              </div>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
};
