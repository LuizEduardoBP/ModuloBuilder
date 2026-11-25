import React from 'react';
import { tituloUseTool } from './tituloUseTool';
import { STATES_LIST } from './tituloToolUtils';
import { RefreshCw, Clipboard, ChevronDown } from 'lucide-react';
import { GeneratorValidatorLayout } from '../../../components/layouts/GeneratorValidatorLayout';
import { OutputBox } from '../../../components/ui/OutputBox';
import { Button } from '../../../components/ui/Button';
import { ValidationStatus } from '../../../components/ui/ValidationStatus';

export const tituloToolComponent: React.FC = () => {
  const {
    generatedTitulo,
    copied,
    selectedUf,
    tituloInput,
    isValid,
    setSelectedUf,
    handleGenerate,
    handleCopy,
    handleValidate,
  } = tituloUseTool();

  return (
    <GeneratorValidatorLayout
      icon="Fingerprint"
      title="Gerador & Validador de Título de Eleitor"
      description="Gere Títulos de Eleitor válidos mapeados por Estado e faça verificações instantâneas do código da UF emissora."
      generatorTitle="Gerar Título de Teste"
      generatorControls={
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-theme-text-muted block">
            Estado de emissão (opcional)
          </label>
          <div className="relative">
            <select
              value={selectedUf}
              onChange={(e) => setSelectedUf(e.target.value)}
              className="w-full appearance-none bg-theme-inset border border-theme-border rounded-md pl-3 pr-9 py-2.5 text-sm text-theme-text focus:outline-none focus:border-theme-brand transition-colors cursor-pointer"
            >
              <option value="">Qualquer Estado</option>
              {STATES_LIST.map((state: { code: string; name: string }) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-theme-text-subtle absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      }
      generatorOutput={
        <OutputBox
          value={generatedTitulo}
          placeholder="000000000000"
          copied={copied}
          onCopy={handleCopy}
          copyLabel="Copiar"
        />
      }
      generatorAction={
        <Button onClick={handleGenerate} fullWidth size="lg">
          <RefreshCw className="w-4 h-4" />
          Gerar Título Válido
        </Button>
      }
      validatorTitle="Validar Título Existente"
      validatorInput={
        <div className="relative">
          <Clipboard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-subtle pointer-events-none" />
          <input
            type="text"
            value={tituloInput}
            onChange={(e) => handleValidate(e.target.value)}
            placeholder="Cole ou digite o Título para validar..."
            maxLength={12}
            className="w-full bg-theme-inset border border-theme-border rounded-md pl-10 pr-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono"
          />
        </div>
      }
      validatorStatus={
        isValid === null ? (
          <ValidationStatus
            state="idle"
            message="Aguardando a digitação de um Título de 12 dígitos."
          />
        ) : isValid ? (
          <ValidationStatus
            state="valid"
            title="Título de Eleitor Válido"
            message="O número atende aos critérios matemáticos de UF e dígitos verificadores."
          />
        ) : (
          <ValidationStatus
            state="invalid"
            title="Título Inválido"
            message="Os dígitos verificadores calculados ou o código UF não correspondem."
          />
        )
      }
    />
  );
};
