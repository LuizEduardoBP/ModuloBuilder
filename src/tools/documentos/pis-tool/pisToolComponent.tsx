import React from 'react';
import { pisUseTool } from './pisUseTool';
import { RefreshCw, Clipboard } from 'lucide-react';
import { GeneratorValidatorLayout } from '../../../components/layouts/GeneratorValidatorLayout';
import { OutputBox } from '../../../components/ui/OutputBox';
import { Button } from '../../../components/ui/Button';
import { ToggleSwitch } from '../../../components/ui/ToggleSwitch';
import { ValidationStatus } from '../../../components/ui/ValidationStatus';

export const pisToolComponent: React.FC = () => {
  const {
    generatedPis,
    copied,
    formatted,
    pisInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
    handleFormatToggle,
  } = pisUseTool();

  return (
    <GeneratorValidatorLayout
      icon="Calendar"
      title="Gerador & Validador de PIS/PASEP"
      description="Crie números de PIS/PASEP válidos para testes integrados de holerites e cadastros governamentais."
      generatorTitle="Gerar PIS/PASEP"
      generatorControls={
        <ToggleSwitch
          checked={formatted}
          onChange={handleFormatToggle}
          label="Gerar com pontuação"
          description="Exibe no formato 000.00000.00-0"
        />
      }
      generatorOutput={
        <OutputBox
          value={generatedPis}
          placeholder="000.00000.00-0"
          copied={copied}
          onCopy={handleCopy}
          copyLabel="Copiar"
        />
      }
      generatorAction={
        <Button onClick={handleGenerate} fullWidth size="lg">
          <RefreshCw className="w-4 h-4" />
          Gerar PIS Válido
        </Button>
      }
      validatorTitle="Validar PIS Existente"
      validatorInput={
        <div className="relative">
          <Clipboard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-theme-text-subtle pointer-events-none" />
          <input
            type="text"
            value={pisInput}
            onChange={(e) => handleValidate(e.target.value)}
            placeholder="Cole ou digite o PIS/PASEP para validar..."
            maxLength={14}
            className="w-full bg-theme-inset border border-theme-border rounded-md pl-10 pr-4 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono"
          />
        </div>
      }
      validatorStatus={
        isValid === null ? (
          <ValidationStatus
            state="idle"
            message="Aguardando a digitação de um PIS/PASEP de 11 dígitos."
          />
        ) : isValid ? (
          <ValidationStatus
            state="valid"
            title="PIS/PASEP Válido"
            message="O número atende aos critérios e cálculos de dígitos do FGTS."
          />
        ) : (
          <ValidationStatus
            state="invalid"
            title="PIS/PASEP Inválido"
            message="O dígito verificador calculado não condiz com o documento fornecido."
          />
        )
      }
    />
  );
};
