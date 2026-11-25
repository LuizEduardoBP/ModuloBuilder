import React from 'react';
import { rgUseTool } from './rgUseTool';
import { RefreshCw, Clipboard } from 'lucide-react';
import { GeneratorValidatorLayout } from '../../../components/layouts/GeneratorValidatorLayout';
import { OutputBox } from '../../../components/ui/OutputBox';
import { Button } from '../../../components/ui/Button';
import { ToggleSwitch } from '../../../components/ui/ToggleSwitch';
import { ValidationStatus } from '../../../components/ui/ValidationStatus';

export const rgToolComponent: React.FC = () => {
  const {
    generatedRg,
    copied,
    formatted,
    rgInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
    handleFormatToggle,
  } = rgUseTool();

  return (
    <GeneratorValidatorLayout
      icon="Shield"
      title="Gerador & Validador de RG"
      description="Gere RGs (Registro Geral - Padrão SP) válidos para homologações com suporte ao dígito verificador X."
      generatorTitle="Gerar RG de Teste"
      generatorControls={
        <ToggleSwitch
          checked={formatted}
          onChange={handleFormatToggle}
          label="Gerar com pontuação"
          description="Exibe no formato 00.000.000-0"
        />
      }
      generatorOutput={
        <OutputBox
          value={generatedRg}
          placeholder="00.000.000-0"
          copied={copied}
          onCopy={handleCopy}
          copyLabel="Copiar"
        />
      }
      generatorAction={
        <Button onClick={handleGenerate} fullWidth size="lg">
          <RefreshCw className="w-4 h-4" />
          Gerar RG Válido
        </Button>
      }
      validatorTitle="Validar RG Existente"
      validatorInput={
        <div className="relative">
          <Clipboard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-subtle pointer-events-none" />
          <input
            type="text"
            value={rgInput}
            onChange={(e) => handleValidate(e.target.value)}
            placeholder="Cole ou digite o RG para validar..."
            maxLength={12}
            className="w-full bg-theme-inset border border-theme-border rounded-md pl-10 pr-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono"
          />
        </div>
      }
      validatorStatus={
        isValid === null ? (
          <ValidationStatus
            state="idle"
            message="Aguardando a digitação de um RG de 9 dígitos."
          />
        ) : isValid ? (
          <ValidationStatus
            state="valid"
            title="RG Válido"
            message="O número atende aos critérios e algoritmos oficiais de São Paulo."
          />
        ) : (
          <ValidationStatus
            state="invalid"
            title="RG Inválido"
            message="O dígito verificador inserido não confere com o cálculo oficial."
          />
        )
      }
    />
  );
};
