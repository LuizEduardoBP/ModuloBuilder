import React from 'react';
import { jsonUseTool } from './jsonUseTool';
import { Copy, Check, RotateCcw, AlignLeft, Minimize2 } from 'lucide-react';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import { Button } from '../../../components/ui/Button';
import { SegmentedControl } from '../../../components/ui/SegmentedControl';
import { ValidationStatus } from '../../../components/ui/ValidationStatus';

const INDENT_OPTIONS = [
  { value: '2', label: '2 Espaços' },
  { value: '4', label: '4 Espaços' },
] as const;

export const jsonToolComponent: React.FC = () => {
  const {
    inputText,
    outputText,
    copied,
    indent,
    validation,
    handleTextChange,
    handleFormat,
    handleMinify,
    handleCopy,
    handleClear,
    handleIndentChange,
  } = jsonUseTool();

  return (
    <div className="space-y-6">
      <ToolHeader
        icon="Braces"
        title="Formatador & Linter JSON"
        description="Formate, valide sintaxe, ajuste indentação e minifique payloads JSON localmente."
        actions={
          <Button variant="secondary" size="sm" onClick={handleClear}>
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar Tudo
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Entrada */}
        <div className="space-y-3 flex flex-col">
          <div className="flex flex-wrap justify-between items-center gap-2 min-h-[32px]">
            <span className="font-mono text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider">
              JSON Bruto / Entrada
            </span>
            <SegmentedControl
              options={INDENT_OPTIONS}
              value={String(indent) as '2' | '4'}
              onChange={(val) => handleIndentChange(Number(val) as 2 | 4)}
            />
          </div>

          <textarea
            value={inputText}
            onChange={handleTextChange}
            placeholder='Cole seu JSON aqui. Ex: {"nome":"João","idade":30}'
            rows={12}
            className="w-full bg-theme-inset border border-theme-border rounded-lg px-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono resize-y"
          />

          <div>
            {!inputText.trim() ? (
              <ValidationStatus
                state="idle"
                message="Cole uma string JSON para validar e formatar."
              />
            ) : validation.isValid ? (
              <ValidationStatus
                state="valid"
                title="Sintaxe JSON válida"
                message="Estrutura pronta para formatação ou minificação."
              />
            ) : (
              <ValidationStatus
                state="invalid"
                title="Erro de sintaxe"
                message={validation.error || 'JSON inválido'}
              />
            )}
          </div>
        </div>

        {/* Saída Processada */}
        <div className="space-y-3 flex flex-col">
          <div className="flex justify-between items-center min-h-[32px]">
            <span className="font-mono text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider">
              JSON Formatado / Saída
            </span>

            {outputText && (
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
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            )}
          </div>

          <textarea
            value={outputText}
            readOnly
            placeholder="O JSON formatado aparecerá aqui..."
            rows={12}
            className="w-full flex-1 bg-theme-inset/60 border border-theme-border rounded-lg px-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none font-mono resize-y"
          />

          <div className="grid grid-cols-2 gap-3 pt-1">
            <Button
              onClick={handleFormat}
              disabled={!validation.isValid || !inputText.trim()}
              size="lg"
            >
              <AlignLeft className="w-4 h-4" />
              Formatar JSON
            </Button>
            <Button
              variant="secondary"
              onClick={handleMinify}
              disabled={!validation.isValid || !inputText.trim()}
              size="lg"
            >
              <Minimize2 className="w-4 h-4" />
              Minificar JSON
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
