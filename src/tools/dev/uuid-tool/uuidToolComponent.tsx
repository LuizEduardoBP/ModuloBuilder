import React from 'react';
import { uuidUseTool } from './uuidUseTool';
import { Copy, Check, RefreshCw, RotateCcw } from 'lucide-react';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import { Panel } from '../../../components/ui/Panel';
import { Button } from '../../../components/ui/Button';
import { ToggleSwitch } from '../../../components/ui/ToggleSwitch';

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
    handleClear,
  } = uuidUseTool();

  return (
    <div className="space-y-6">
      <ToolHeader
        icon="Terminal"
        title="Gerador de UUID v4"
        description="Gere identificadores únicos universais RFC 4122 v4 individuais ou em lote."
        actions={
          uuids.length > 0 ? (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar
            </Button>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Panel title="Configurações" className="md:col-span-1 justify-between gap-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-theme-text-muted">Quantidade</span>
                <span className="font-mono font-bold text-theme-text">{count}</span>
              </div>
              <input
                type="range"
                min={1}
                max={50}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-theme-inset rounded-lg appearance-none cursor-pointer accent-[var(--theme-brand)]"
              />
              <div className="flex justify-between font-mono text-[10px] text-theme-text-subtle">
                <span>1</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>

            <div className="border-t border-theme-border pt-4">
              <ToggleSwitch
                checked={uppercase}
                onChange={setUppercase}
                label="Letras maiúsculas"
                description="Exibe caracteres hex em caixa alta"
              />
            </div>
          </div>

          <Button onClick={handleGenerate} fullWidth size="lg">
            <RefreshCw className="w-4 h-4" />
            Gerar UUIDs
          </Button>
        </Panel>

        <Panel
          title="Identificadores Gerados"
          className="md:col-span-2 min-h-[300px]"
          headerAction={
            uuids.length > 0 ? (
              <button
                type="button"
                onClick={handleCopy}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                  copied
                    ? 'bg-theme-success-bg border-theme-success-border text-theme-success'
                    : 'bg-theme-inset border-theme-border hover:border-theme-border-strong text-theme-text-muted hover:text-theme-text'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Lista copiada</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar todos</span>
                  </>
                )}
              </button>
            ) : undefined
          }
        >
          <div className="flex-1 overflow-y-auto max-h-[320px] rounded-md bg-theme-inset border border-theme-border p-3 font-mono text-sm text-theme-text space-y-1">
            {uuids.length > 0 ? (
              uuids.map((uuid, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-1.5 px-2 rounded hover:bg-theme-card border border-transparent hover:border-theme-border group transition-colors"
                >
                  <span className="select-all break-all text-xs sm:text-sm">{uuid}</span>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(uuid)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded bg-theme-inset border border-theme-border text-theme-text-muted hover:text-theme-text transition-opacity cursor-pointer shrink-0 ml-2"
                    title="Copiar UUID"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center h-full min-h-[200px] text-theme-text-subtle text-xs font-sans">
                Clique em &ldquo;Gerar UUIDs&rdquo; para popular a lista.
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
};
