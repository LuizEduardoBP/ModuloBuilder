import { useState } from 'react';
import * as utils from './genericToolUtils';

export const genericUseTool = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<'base64-encode' | 'base64-decode' | 'reverse'>('base64-encode');
  const [showAdvanced, setShowAdvanced] = useState(true);

  // Opções avançadas
  const [autoTrim, setAutoTrim] = useState(false);
  const [outputUppercase, setOutputUppercase] = useState(false);

  const stats = utils.countCharacters(inputText);

  const handleProcess = (text: string, currentMode = mode, trim = autoTrim, upper = outputUppercase) => {
    let processed = text;
    if (trim) {
      processed = processed.trim();
    }

    if (currentMode === 'base64-encode') {
      processed = utils.toBase64(processed);
    } else if (currentMode === 'base64-decode') {
      processed = utils.fromBase64(processed);
    } else if (currentMode === 'reverse') {
      processed = utils.reverseText(processed);
    }

    if (upper) {
      processed = processed.toUpperCase();
    }

    setOutputText(processed);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    handleProcess(val);
  };

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    handleProcess(inputText, newMode);
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const handleTrimChange = (val: boolean) => {
    setAutoTrim(val);
    handleProcess(inputText, mode, val, outputUppercase);
  };

  const handleUppercaseChange = (val: boolean) => {
    setOutputUppercase(val);
    handleProcess(inputText, mode, autoTrim, val);
  };

  return {
    inputText,
    outputText,
    copied,
    mode,
    showAdvanced,
    autoTrim,
    outputUppercase,
    stats,
    setShowAdvanced,
    handleTextChange,
    handleModeChange,
    handleCopy,
    handleClear,
    handleTrimChange,
    handleUppercaseChange
  };
};
