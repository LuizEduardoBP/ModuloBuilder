import React from 'react';
import { hashUseTool } from './hashUseTool';
import { Copy, Check, RotateCcw, Shield } from 'lucide-react';

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
    setCopiedSha256
  } = hashUseTool();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <Shield className="w-7 h-7 text-indigo-400" />
            Gerador de Hash MD5, SHA-1 & SHA-256
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Gere assinaturas digitais e checksums em tempo real para strings.
          </p>
        </div>

        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Limpar Entrada
        </button>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Editor de Entrada */}
        <div className="lg:col-span-1 space-y-4">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
            Texto de Entrada
          </span>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-5 group-focus-within:opacity-15 transition duration-300"></div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Digite o texto aqui para computar os hashes..."
              rows={10}
              className="relative w-full bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors font-mono resize-none"
            />
          </div>
        </div>

        {/* Saídas do Hash */}
        <div className="lg:col-span-2 space-y-5">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
            Hashes Computados
          </span>

          {/* MD5 */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-2 relative group">
            <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
              <span className="text-indigo-400">MD5 (128 bits)</span>
              {md5Hash && (
                <button
                  onClick={() => handleCopy(md5Hash, setCopiedMd5)}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  {copiedMd5 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className={copiedMd5 ? 'text-emerald-400' : ''}>{copiedMd5 ? 'Copiado!' : 'Copiar'}</span>
                </button>
              )}
            </div>
            <div className="font-mono text-sm text-gray-200 break-all select-all min-h-[20px]">
              {md5Hash || <span className="text-gray-600">Aguardando entrada...</span>}
            </div>
          </div>

          {/* SHA-1 */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-2 relative group">
            <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
              <span className="text-indigo-400">SHA-1 (160 bits)</span>
              {sha1Hash && (
                <button
                  onClick={() => handleCopy(sha1Hash, setCopiedSha1)}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  {copiedSha1 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className={copiedSha1 ? 'text-emerald-400' : ''}>{copiedSha1 ? 'Copiado!' : 'Copiar'}</span>
                </button>
              )}
            </div>
            <div className="font-mono text-sm text-gray-200 break-all select-all min-h-[20px]">
              {sha1Hash || <span className="text-gray-600">Aguardando entrada...</span>}
            </div>
          </div>

          {/* SHA-256 */}
          <div className="bg-zinc-900/40 border border-white/5 rounded-xl p-4 space-y-2 relative group">
            <div className="flex justify-between items-center text-xs text-gray-400 font-semibold">
              <span className="text-indigo-400">SHA-256 (256 bits)</span>
              {sha256Hash && (
                <button
                  onClick={() => handleCopy(sha256Hash, setCopiedSha256)}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  {copiedSha256 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className={copiedSha256 ? 'text-emerald-400' : ''}>{copiedSha256 ? 'Copiado!' : 'Copiar'}</span>
                </button>
              )}
            </div>
            <div className="font-mono text-sm text-gray-200 break-all select-all min-h-[20px]">
              {sha256Hash || <span className="text-gray-600">Aguardando entrada...</span>}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
