import React from 'react';
import { pixUseTool } from './pixUseTool';
import { RefreshCw, RotateCcw } from 'lucide-react';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import { Panel } from '../../../components/ui/Panel';
import { Button } from '../../../components/ui/Button';
import { OutputBox } from '../../../components/ui/OutputBox';
import { SegmentedControl } from '../../../components/ui/SegmentedControl';
import type { PixKeyType } from './pixToolUtils';

const PIX_OPTIONS: readonly { value: PixKeyType; label: string }[] = [
  { value: 'aleatoria', label: 'Aleatória (EVP)' },
  { value: 'cpf', label: 'CPF' },
  { value: 'cnpj', label: 'CNPJ' },
  { value: 'email', label: 'E-mail' },
  { value: 'celular', label: 'Celular' },
];

export const pixToolComponent: React.FC = () => {
  const {
    keyType,
    generatedKey,
    copied,
    setKeyType,
    handleGenerate,
    handleCopy,
    handleClear,
  } = pixUseTool();

  return (
    <div className="space-y-6">
      <ToolHeader
        icon="CreditCard"
        title="Gerador de Chave PIX Fictícia"
        description="Gere chaves PIX para homologação nos formatos EVP, CPF, CNPJ, e-mail e telefone celular."
        actions={
          generatedKey ? (
            <Button variant="secondary" size="sm" onClick={handleClear}>
              <RotateCcw className="w-3.5 h-3.5" />
              Limpar
            </Button>
          ) : undefined
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Panel title="Tipo de Chave" className="md:col-span-1 justify-between gap-5">
          <div className="space-y-2">
            <SegmentedControl
              options={PIX_OPTIONS}
              value={keyType}
              onChange={setKeyType}
              className="w-full"
            />
          </div>

          <Button onClick={handleGenerate} fullWidth size="lg">
            <RefreshCw className="w-4 h-4" />
            Gerar Chave PIX
          </Button>
        </Panel>

        <Panel title="Chave PIX de Teste" className="md:col-span-2 justify-center gap-3">
          <OutputBox
            value={generatedKey}
            placeholder="Nenhuma chave gerada ainda..."
            copied={copied}
            onCopy={handleCopy}
            copyLabel="Copiar"
            size="md"
          />

          <p className="text-xs text-theme-text-subtle">
            Chave fictícia gerada estritamente para testes e homologação local de sistemas.
          </p>
        </Panel>
      </div>
    </div>
  );
};
