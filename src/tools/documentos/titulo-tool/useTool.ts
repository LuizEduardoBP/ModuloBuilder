import { useState } from 'react';
import * as utils from './toolUtils';

export const useTool = () => {
  const [generatedTitulo, setGeneratedTitulo] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedUf, setSelectedUf] = useState('');

  // Validador
  const [tituloInput, setTituloInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerate = () => {
    const tit = utils.generateTitulo(selectedUf || undefined);
    setGeneratedTitulo(tit);
  };

  const handleCopy = async () => {
    if (!generatedTitulo) return;
    try {
      await navigator.clipboard.writeText(generatedTitulo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleValidate = (val: string) => {
    const clean = val.replace(/\D/g, '');
    setTituloInput(clean);
    if (clean.length === 0) {
      setIsValid(null);
      return;
    }
    setIsValid(utils.validateTitulo(clean));
  };

  return {
    generatedTitulo,
    copied,
    selectedUf,
    tituloInput,
    isValid,
    setSelectedUf,
    handleGenerate,
    handleCopy,
    handleValidate
  };
};
