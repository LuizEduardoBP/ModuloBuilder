import React from 'react';
import { cpfUseTool } from './cpfUseTool';
import { RefreshCw, Clipboard } from 'lucide-react';
import { GeneratorValidatorLayout } from '../../../components/layouts/GeneratorValidatorLayout';
import { OutputBox } from '../../../components/ui/OutputBox';
import { Button } from '../../../components/ui/Button';
import { ToggleSwitch } from '../../../components/ui/ToggleSwitch';
import { ValidationStatus } from '../../../components/ui/ValidationStatus';

export const cpfToolComponent: React.FC = () => {
  const {
    generatedCpf,
    copied,
    formatted,
    cpfInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
    handleFormatToggle,
  } = cpfUseTool();

  return (
    <GeneratorValidatorLayout
      icon="CreditCard"
      title="Gerador & Validador de CPF"
      description="Gere CPFs de teste matematicamente válidos e faça validações sintáticas instantâneas offline."
      generatorTitle="Gerar CPF de Teste"
      generatorControls={
        <ToggleSwitch
          checked={formatted}
          onChange={handleFormatToggle}
          label="Gerar com pontuação"
          description="Exibe no formato 000.000.000-00"
        />
      }
      generatorOutput={
        <OutputBox
          value={generatedCpf}
          placeholder="000.000.000-00"
          copied={copied}
          onCopy={handleCopy}
          copyLabel="Copiar"
        />
      }
      generatorAction={
        <Button onClick={handleGenerate} fullWidth size="lg">
          <RefreshCw className="w-4 h-4" />
          Gerar CPF Válido
        </Button>
      }
      validatorTitle="Validar CPF Existente"
      validatorInput={
        <div className="relative">
          <Clipboard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-subtle pointer-events-none" />
          <input
            type="text"
            value={cpfInput}
            onChange={(e) => handleValidate(e.target.value)}
            placeholder="Cole ou digite o CPF para validar..."
            maxLength={14}
            className="w-full bg-theme-inset border border-theme-border rounded-md pl-10 pr-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono"
          />
        </div>
      }
      validatorStatus={
        isValid === null ? (
          <ValidationStatus
            state="idle"
            message="Aguardando a digitação de um CPF de 11 dígitos."
          />
        ) : isValid ? (
          <ValidationStatus
            state="valid"
            title="CPF Válido"
            message="O CPF inserido atende a todos os critérios matemáticos."
          />
        ) : (
          <ValidationStatus
            state="invalid"
            title="CPF Inválido"
            message="Os dígitos verificadores do CPF não coincidem."
          />
        )
      }
    />
  );
};
