import React from 'react';
import { cnpjUseTool } from './cnpjUseTool';
import { RefreshCw, Clipboard } from 'lucide-react';
import { GeneratorValidatorLayout } from '../../../components/layouts/GeneratorValidatorLayout';
import { OutputBox } from '../../../components/ui/OutputBox';
import { Button } from '../../../components/ui/Button';
import { ToggleSwitch } from '../../../components/ui/ToggleSwitch';
import { ValidationStatus } from '../../../components/ui/ValidationStatus';

export const cnpjToolComponent: React.FC = () => {
  const {
    generatedCnpj,
    copied,
    formatted,
    cnpjInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
    handleFormatToggle,
  } = cnpjUseTool();

  return (
    <GeneratorValidatorLayout
      icon="Briefcase"
      title="Gerador & Validador de CNPJ"
      description="Criação rápida de CNPJs matematicamente válidos para homologações e testes."
      generatorTitle="Gerar CNPJ de Teste"
      generatorControls={
        <ToggleSwitch
          checked={formatted}
          onChange={handleFormatToggle}
          label="Gerar com pontuação"
          description="Exibe no formato 00.000.000/0001-00"
        />
      }
      generatorOutput={
        <OutputBox
          value={generatedCnpj}
          placeholder="00.000.000/0000-00"
          copied={copied}
          onCopy={handleCopy}
          copyLabel="Copiar"
        />
      }
      generatorAction={
        <Button onClick={handleGenerate} fullWidth size="lg">
          <RefreshCw className="w-4 h-4" />
          Gerar CNPJ Válido
        </Button>
      }
      validatorTitle="Validar CNPJ Existente"
      validatorInput={
        <div className="relative">
          <Clipboard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-subtle pointer-events-none" />
          <input
            type="text"
            value={cnpjInput}
            onChange={(e) => handleValidate(e.target.value)}
            placeholder="Cole ou digite o CNPJ para validar..."
            maxLength={18}
            className="w-full bg-theme-inset border border-theme-border rounded-md pl-10 pr-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono"
          />
        </div>
      }
      validatorStatus={
        isValid === null ? (
          <ValidationStatus
            state="idle"
            message="Aguardando a digitação de um CNPJ de 14 dígitos."
          />
        ) : isValid ? (
          <ValidationStatus
            state="valid"
            title="CNPJ Válido"
            message="O CNPJ atende a todos os critérios e algoritmos da Receita Federal."
          />
        ) : (
          <ValidationStatus
            state="invalid"
            title="CNPJ Inválido"
            message="Os dígitos verificadores calculados não coincidem com o CNPJ digitado."
          />
        )
      }
    />
  );
};
