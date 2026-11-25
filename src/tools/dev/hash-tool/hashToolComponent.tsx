import React from 'react';
import { hashUseTool } from './hashUseTool';
import { RotateCcw } from 'lucide-react';
import { ToolHeader } from '../../../components/ui/ToolHeader';
import { Panel } from '../../../components/ui/Panel';
import { Button } from '../../../components/ui/Button';
import { OutputBox } from '../../../components/ui/OutputBox';

export const hashToolComponent: React.FC = () => {
  const {
    inputText,
    md5Hash,
    sha1Hash,
    sha256Hash,
    copiedMd5,
    copiedSha1,
    copiedSha256,
    setInputText,
    handleCopy,
    handleClear,
    setCopiedMd5,
    setCopiedSha1,
    setCopiedSha256,
  } = hashUseTool();

  return (
    <div className="space-y-6">
      <ToolHeader
        icon="Fingerprint"
        title="Gerador de Hash MD5, SHA-1 & SHA-256"
        description="Calcule assinaturas criptográficas e checksums em tempo real no navegador."
        actions={
          <Button variant="secondary" size="sm" onClick={handleClear}>
            <RotateCcw className="w-3.5 h-3.5" />
            Limpar Entrada
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel title="Texto de Entrada" className="lg:col-span-1">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Digite ou cole o texto para computar os hashes..."
            rows={10}
            className="w-full flex-1 bg-theme-inset border border-theme-border rounded-md px-3.5 py-3 text-sm text-theme-text placeholder-theme-text-subtle focus:outline-none focus:border-theme-brand transition-colors font-mono resize-y"
          />
        </Panel>

        <Panel title="Hashes Computados" className="lg:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <span className="font-mono text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider block">
              MD5 · 128 bits
            </span>
            <OutputBox
              size="md"
              value={md5Hash}
              placeholder="Aguardando entrada..."
              copied={copiedMd5}
              onCopy={() => handleCopy(md5Hash, setCopiedMd5)}
            />
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider block">
              SHA-1 · 160 bits
            </span>
            <OutputBox
              size="md"
              value={sha1Hash}
              placeholder="Aguardando entrada..."
              copied={copiedSha1}
              onCopy={() => handleCopy(sha1Hash, setCopiedSha1)}
            />
          </div>

          <div className="space-y-1.5">
            <span className="font-mono text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider block">
              SHA-256 · 256 bits
            </span>
            <OutputBox
              size="md"
              value={sha256Hash}
              placeholder="Aguardando entrada..."
              copied={copiedSha256}
              onCopy={() => handleCopy(sha256Hash, setCopiedSha256)}
            />
          </div>
        </Panel>
      </div>
    </div>
  );
};
