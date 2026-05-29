import { useState } from 'react';
import * as utils from './cnhToolUtils';

export const cnhUseTool = () => {
  const [generatedCnh, setGeneratedCnh] = useState('');
  const [copied, setCopied] = useState(false);

  // Validador
  const [cnhInput, setCnhInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerate = () => {
    const cnh = utils.generateCNH();
    setGeneratedCnh(cnh);
  };

  const handleCopy = async () => {
    if (!generatedCnh) return;
    try {
      await navigator.clipboard.writeText(generatedCnh);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleValidate = (val: string) => {
    const clean = val.replace(/\D/g, '');
    setCnhInput(clean);
    if (clean.length === 0) {
      setIsValid(null);
      return;
    }
    setIsValid(utils.validateCNH(clean));
  };

  return {
    generatedCnh,
    copied,
    cnhInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate
  };
};
