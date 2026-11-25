import React from 'react';
import { cnhUseTool } from './cnhUseTool';
import { RefreshCw, Clipboard } from 'lucide-react';
import { GeneratorValidatorLayout } from '../../../components/layouts/GeneratorValidatorLayout';
import { OutputBox } from '../../../components/ui/OutputBox';
import { Button } from '../../../components/ui/Button';
import { ValidationStatus } from '../../../components/ui/ValidationStatus';

export const cnhToolComponent: React.FC = () => {
  const {
    generatedCnh,
    copied,
    cnhInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
  } = cnhUseTool();

  return (
    <GeneratorValidatorLayout
      icon="ShieldAlert"
      title="Gerador & Validador de CNH"
      description="Gere Carteiras Nacionais de Habilitação (CNH) válidas para simulações seguindo o algoritmo oficial do Denatran."
      generatorTitle="Gerar CNH de Teste"
      generatorSubtitle="Número de 11 dígitos com ambos os dígitos verificadores corretos."
      generatorOutput={
        <OutputBox
          value={generatedCnh}
          placeholder="00000000000"
          copied={copied}
          onCopy={handleCopy}
          copyLabel="Copiar"
        />
      }
      generatorAction={
        <Button onClick={handleGenerate} fullWidth size="lg">
          <RefreshCw className="w-4 h-4" />
          Gerar CNH Válida
        </Button>
      }
      validatorTitle="Validar CNH Existente"
      validatorInput={
        <div className="relative">
          <Clipboard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-subtle pointer-events-none" />
          <input
            type="text"
            value={cnhInput}
            onChange={(e) => handleValidate(e.target.value)}
            placeholder="Cole ou digite a CNH para validar..."
            maxLength={11}
            className="w-full bg-theme-inset border border-theme-border rounded-md pl-10 pr-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono"
          />
        </div>
      }
      validatorStatus={
        isValid === null ? (
          <ValidationStatus
            state="idle"
            message="Aguardando a digitação de uma CNH de 11 dígitos."
          />
        ) : isValid ? (
          <ValidationStatus
            state="valid"
            title="CNH Válida"
            message="O número atende a todos os critérios e algoritmos oficiais."
          />
        ) : (
          <ValidationStatus
            state="invalid"
            title="CNH Inválida"
            message="Os dígitos verificadores calculados não coincidem com o documento digitado."
          />
        )
      }
    />
  );
};
