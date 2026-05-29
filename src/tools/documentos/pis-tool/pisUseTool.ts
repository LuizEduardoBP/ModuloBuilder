import { useState } from 'react';
import * as utils from './pisToolUtils';

export const pisUseTool = () => {
  const [generatedPis, setGeneratedPis] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  // Validador
  const [pisInput, setPisInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerate = () => {
    const pis = utils.generatePIS(formatted);
    setGeneratedPis(pis);
  };

  const handleCopy = async () => {
    if (!generatedPis) return;
    try {
      await navigator.clipboard.writeText(generatedPis);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleValidate = (val: string) => {
    const clean = val.replace(/\D/g, '');
    setPisInput(clean);
    if (clean.length === 0) {
      setIsValid(null);
      return;
    }
    setIsValid(utils.validatePIS(clean));
  };

  const handleFormatToggle = (checked: boolean) => {
    setFormatted(checked);
    if (generatedPis) {
      const clean = generatedPis.replace(/\D/g, '');
      setGeneratedPis(checked ? utils.formatPIS(clean) : clean);
    }
  };

  return {
    generatedPis,
    copied,
    formatted,
    pisInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
    handleFormatToggle
  };
};
