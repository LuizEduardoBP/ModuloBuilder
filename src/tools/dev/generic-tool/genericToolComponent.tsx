import React from 'react';
import { genericUseTool } from './genericUseTool';
import { Copy, Check, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import { Panel } from '../../../components/ui/Panel';
import { Button } from '../../../components/ui/Button';
import { SegmentedControl } from '../../../components/ui/SegmentedControl';
import { ToggleSwitch } from '../../../components/ui/ToggleSwitch';

const MODE_OPTIONS = [
  { value: 'base64-encode', label: 'Base64 Encode' },
  { value: 'base64-decode', label: 'Base64 Decode' },
  { value: 'reverse', label: 'Inverter Texto' },
] as const;

export const genericToolComponent: React.FC<{ onBack?: () => void }> = () => {
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
    handleUppercaseChange,
  } = genericUseTool();

  return (
    <div className="space-y-6">
      <ToolHeader
        icon="Binary"
        title="Utils de Texto & Base64"
        description="Codificação e decodificação Base64 com suporte UTF-8, inversão de strings e métricas em tempo real."
        actions={
          <>
            <Button variant="secondary" size="sm" onClick={handleClear}>
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar
            </Button>
            <Button
              variant={showAdvanced ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setShowAdvanced(!showAdvanced)}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Ajustes
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Painel Esquerdo: Entrada/Saída */}
        <div className="lg:col-span-2 space-y-5">
          <SegmentedControl
            options={MODE_OPTIONS}
            value={mode}
            onChange={handleModeChange}
            className="w-full sm:w-auto"
          />

          {/* Área de Entrada */}
          <div className="bg-theme-card border border-theme-border rounded-lg overflow-hidden focus-within:border-theme-brand transition-colors">
            <div className="flex justify-between items-center bg-theme-inset px-4 py-2 border-b border-theme-border text-xs text-theme-text-muted font-medium">
              <span className="font-mono uppercase tracking-wider text-[11px]">
                Texto de Entrada
              </span>
              <span className="font-mono text-[11px] text-theme-text-subtle">
                {stats.chars} caracteres
              </span>
            </div>
            <textarea
              value={inputText}
              onChange={handleTextChange}
              placeholder="Cole ou digite seu texto aqui..."
              rows={5}
              className="w-full bg-transparent px-4 py-3 text-theme-text placeholder-theme-text-subtle focus:outline-none resize-y text-sm font-mono"
            />
          </div>

          {/* Área de Saída */}
          <div className="bg-theme-card border border-theme-border rounded-lg overflow-hidden">
            <div className="flex justify-between items-center bg-theme-inset px-4 py-2 border-b border-theme-border text-xs text-theme-text-muted font-medium">
              <span className="font-mono uppercase tracking-wider text-[11px]">
                Texto Processado
              </span>
              {outputText && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border transition-colors cursor-pointer ${
                    copied
                      ? 'bg-theme-success-bg border-theme-success-border text-theme-success'
                      : 'bg-theme-card border-theme-border hover:border-theme-border-strong text-theme-text-muted hover:text-theme-text'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar</span>
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
              className="w-full bg-theme-inset/40 px-4 py-3 text-theme-text placeholder-theme-text-subtle focus:outline-none resize-y text-sm font-mono"
            />
          </div>
        </div>

        {/* Painel Direito: Estatísticas & Opções Avançadas */}
        <div className="space-y-5">
          <Panel title="Estatísticas">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-theme-inset p-3 rounded-md border border-theme-border text-center">
                <span className="block font-mono text-lg font-bold text-theme-text">
                  {stats.chars}
                </span>
                <span className="text-[11px] text-theme-text-muted">Caracteres</span>
              </div>
              <div className="bg-theme-inset p-3 rounded-md border border-theme-border text-center">
                <span className="block font-mono text-lg font-bold text-theme-text">
                  {stats.words}
                </span>
                <span className="text-[11px] text-theme-text-muted">Palavras</span>
              </div>
              <div className="bg-theme-inset p-3 rounded-md border border-theme-border text-center">
                <span className="block font-mono text-lg font-bold text-theme-text">
                  {stats.lines}
                </span>
                <span className="text-[11px] text-theme-text-muted">Linhas</span>
              </div>
            </div>
          </Panel>

          {showAdvanced && (
            <Panel title="Parâmetros de Ajuste" className="space-y-4">
              <ToggleSwitch
                checked={autoTrim}
                onChange={handleTrimChange}
                label="Auto Trim"
                description="Remove espaços nas pontas"
              />
              <div className="border-t border-theme-border pt-3">
                <ToggleSwitch
                  checked={outputUppercase}
                  onChange={handleUppercaseChange}
                  label="Caixa alta"
                  description="Força saída em maiúsculas"
                />
              </div>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
};
