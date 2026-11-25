import React from 'react';
import { cepUseTool } from './cepUseTool';
import { RefreshCw, Clipboard, CheckCircle2 } from 'lucide-react';
import { GeneratorValidatorLayout } from '../../../components/layouts/GeneratorValidatorLayout';
import { OutputBox } from '../../../components/ui/OutputBox';
import { Button } from '../../../components/ui/Button';
import { ToggleSwitch } from '../../../components/ui/ToggleSwitch';
import { ValidationStatus } from '../../../components/ui/ValidationStatus';

export const cepToolComponent: React.FC = () => {
  const {
    generatedCep,
    copied,
    formatted,
    cepInput,
    address,
    isValid,
    loading,
    error,
    handleGenerate,
    handleCopy,
    handleValidateAndSearch,
    handleFormatToggle,
  } = cepUseTool();

  const renderValidatorStatus = () => {
    if (loading) {
      return (
        <ValidationStatus
          state="loading"
          title="Consultando ViaCEP"
          message="Buscando endereço na base dos Correios..."
        />
      );
    }

    if (error) {
      return <ValidationStatus state="invalid" title="Não encontrado" message={error} />;
    }

    if (isValid === null) {
      return (
        <ValidationStatus
          state="idle"
          message="Aguardando digitação de um CEP completo com 8 dígitos."
        />
      );
    }

    if (!isValid) {
      return (
        <ValidationStatus
          state="invalid"
          title="CEP Inválido"
          message="CEP estruturalmente inválido. Deve possuir 8 dígitos."
        />
      );
    }

    if (address) {
      return (
        <div className="border border-theme-success-border bg-theme-success-bg rounded-md p-4 space-y-3">
          <div className="flex items-center gap-2 text-theme-success font-semibold text-sm border-b border-theme-success-border/60 pb-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>CEP Localizado</span>
          </div>

          <dl className="space-y-1.5 font-mono text-xs">
            <div className="flex justify-between gap-4">
              <dt className="text-theme-text-muted shrink-0">Logradouro:</dt>
              <dd className="text-theme-text font-semibold text-right truncate">
                {address.logradouro || 'CEP geral'}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-theme-text-muted shrink-0">Bairro:</dt>
              <dd className="text-theme-text font-semibold text-right truncate">
                {address.bairro || 'Sem bairro'}
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-theme-text-muted shrink-0">Cidade:</dt>
              <dd className="text-theme-text font-semibold text-right">
                {address.localidade} ({address.uf})
              </dd>
            </div>
          </dl>
        </div>
      );
    }

    return null;
  };

  return (
    <GeneratorValidatorLayout
      icon="MapPin"
      title="Buscador & Gerador de CEP"
      description="Gere CEPs brasileiros válidos e consulte endereços reais instantaneamente via API ViaCEP."
      generatorTitle="Gerar CEP de Teste"
      generatorControls={
        <ToggleSwitch
          checked={formatted}
          onChange={handleFormatToggle}
          label="Gerar com máscara"
          description="Exibe no formato 00000-000"
        />
      }
      generatorOutput={
        <OutputBox
          value={generatedCep}
          placeholder="00000-000"
          copied={copied}
          onCopy={handleCopy}
          copyLabel="Copiar"
        />
      }
      generatorAction={
        <Button onClick={handleGenerate} fullWidth size="lg">
          <RefreshCw className="w-4 h-4" />
          Gerar CEP Válido
        </Button>
      }
      validatorTitle="Consultar / Validar CEP"
      validatorInput={
        <div className="relative">
          <Clipboard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-subtle pointer-events-none" />
          <input
            type="text"
            value={cepInput}
            onChange={(e) => handleValidateAndSearch(e.target.value)}
            placeholder="Cole ou digite o CEP de 8 dígitos..."
            maxLength={9}
            className="w-full bg-theme-inset border border-theme-border rounded-md pl-10 pr-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono"
          />
        </div>
      }
      validatorStatus={renderValidatorStatus()}
    />
  );
};
