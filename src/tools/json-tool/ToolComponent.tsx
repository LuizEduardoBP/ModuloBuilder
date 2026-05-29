import React, { useState } from 'react';
import * as utils from './toolUtils';
import { Braces, Copy, Check, RotateCcw, ShieldAlert, ShieldCheck, FileJson, AlignLeft } from 'lucide-react';

export const ToolComponent: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<2 | 4>(2);
  const [validation, setValidation] = useState<utils.ValidationResult>({ isValid: true });

  const handleProcess = (val: string, currentIndent = indent) => {
    const res = utils.validateJSON(val);
    setValidation(res);

    if (res.isValid && val.trim()) {
      setOutputText(utils.formatJSON(val, currentIndent));
    } else {
      setOutputText('');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    handleProcess(val);
  };

  const handleFormat = () => {
    handleProcess(inputText);
  };

  const handleMinify = () => {
    const res = utils.validateJSON(inputText);
    setValidation(res);
    if (res.isValid && inputText.trim()) {
      setOutputText(utils.minifyJSON(inputText));
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setValidation({ isValid: true });
  };

  const handleIndentChange = (val: 2 | 4) => {
    setIndent(val);
    handleProcess(inputText, val);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent flex items-center gap-2">
            <Braces className="w-7 h-7 text-indigo-400" />
            Formatador & Linter JSON
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Formate, valide, corrija identação e simplifique strings JSON em tempo real.
          </p>
        </div>

        <button
          onClick={handleClear}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer font-semibold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Limpar Tudo
        </button>
      </div>

      {/* Editor Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Entrada */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              JSON Bruto / Entrada
            </span>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-semibold">Espaçamento:</span>
              <button
                onClick={() => handleIndentChange(2)}
                className={`px-2 py-0.5 text-xs rounded transition-all cursor-pointer ${
                  indent === 2 ? 'bg-indigo-600 text-white font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                2 Espaços
              </button>
              <button
                onClick={() => handleIndentChange(4)}
                className={`px-2 py-0.5 text-xs rounded transition-all cursor-pointer ${
                  indent === 4 ? 'bg-indigo-600 text-white font-bold' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                4 Espaços
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur opacity-5 group-focus-within:opacity-15 transition duration-300"></div>
            <textarea
              value={inputText}
              onChange={handleTextChange}
              placeholder='Cole seu JSON bruto aqui. Ex: {"nome":"João","idade":30}'
              rows={12}
              className="relative w-full bg-zinc-950/80 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/50 transition-colors font-mono"
            />
          </div>

          {/* Validação Banner */}
          <div>
            {!inputText.trim() ? (
              <div className="border border-white/5 bg-white/5 rounded-xl p-3 flex items-center gap-2 text-xs text-gray-400 font-medium">
                <FileJson className="w-4 h-4 text-gray-500" />
                Cole uma string JSON para formatar e debugar.
              </div>
            ) : validation.isValid ? (
              <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-3 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Sintaxe JSON Válida!
              </div>
            ) : (
              <div className="border border-rose-500/20 bg-rose-500/5 rounded-xl p-3 flex items-start gap-2 text-xs text-rose-300">
                <ShieldAlert className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold block">Erro de Sintaxe:</span>
                  <span className="text-rose-400/80 font-mono mt-0.5 block">{validation.error}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Saída Processada */}
        <div className="space-y-4 flex flex-col h-full">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              JSON Formatado / Saída
            </span>

            {outputText && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-indigo-500/10 hover:bg-indigo-500/25 text-indigo-300 hover:text-white transition-all cursor-pointer text-xs border border-indigo-500/20 font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar Saída</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="relative group flex-1 flex flex-col">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-5 transition duration-300"></div>
            <textarea
              value={outputText}
              readOnly
              placeholder="O JSON formatado aparecerá aqui..."
              rows={12}
              className="relative w-full flex-1 bg-zinc-950/40 border border-white/5 rounded-xl px-4 py-3 text-sm text-indigo-200/90 placeholder-gray-700 focus:outline-none font-mono resize-none"
            />
          </div>

          {/* Quick Actions no Rodapé */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleFormat}
              disabled={!validation.isValid || !inputText.trim()}
              className="py-2.5 px-4 bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-400 disabled:opacity-40 disabled:hover:bg-transparent disabled:border-white/5 disabled:text-gray-600 rounded-xl font-medium transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <AlignLeft className="w-4 h-4" />
              Format JSON
            </button>
            <button
              onClick={handleMinify}
              disabled={!validation.isValid || !inputText.trim()}
              className="py-2.5 px-4 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 text-purple-400 disabled:opacity-40 disabled:hover:bg-transparent disabled:border-white/5 disabled:text-gray-600 rounded-xl font-medium transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <AlignLeft className="w-4 h-4 rotate-90" />
              Minify JSON
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
