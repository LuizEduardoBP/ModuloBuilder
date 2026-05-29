import { useState } from 'react';
import * as utils from './toolUtils';

export const useTool = () => {
  const [generatedCnpj, setGeneratedCnpj] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  // Validador
  const [cnpjInput, setCnpjInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerate = () => {
    const cnpj = utils.generateCNPJ(formatted);
    setGeneratedCnpj(cnpj);
  };

  const handleCopy = async () => {
    if (!generatedCnpj) return;
    try {
      await navigator.clipboard.writeText(generatedCnpj);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleValidate = (val: string) => {
    setCnpjInput(val);
    if (val.replace(/\D/g, '').length === 0) {
      setIsValid(null);
      return;
    }
    setIsValid(utils.validateCNPJ(val));
  };

  const handleFormatToggle = (checked: boolean) => {
    setFormatted(checked);
    if (generatedCnpj) {
      const clean = generatedCnpj.replace(/\D/g, '');
      setGeneratedCnpj(checked ? utils.formatCNPJ(clean) : clean);
    }
  };

  return {
    generatedCnpj,
    copied,
    formatted,
    cnpjInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
    handleFormatToggle
  };
};
