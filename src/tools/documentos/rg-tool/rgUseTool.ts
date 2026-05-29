import { useState } from 'react';
import * as utils from './rgToolUtils';

export const rgUseTool = () => {
  const [generatedRg, setGeneratedRg] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  // Validador
  const [rgInput, setRgInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerate = () => {
    const rg = utils.generateRG(formatted);
    setGeneratedRg(rg);
  };

  const handleCopy = async () => {
    if (!generatedRg) return;
    try {
      await navigator.clipboard.writeText(generatedRg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleValidate = (val: string) => {
    const clean = val.replace(/[^\dX]/gi, '').toUpperCase();
    setRgInput(clean);
    if (clean.length === 0) {
      setIsValid(null);
      return;
    }
    setIsValid(utils.validateRG(clean));
  };

  const handleFormatToggle = (checked: boolean) => {
    setFormatted(checked);
    if (generatedRg) {
      const clean = generatedRg.replace(/[^\dX]/gi, '');
      setGeneratedRg(checked ? utils.formatRG(clean) : clean);
    }
  };

  return {
    generatedRg,
    copied,
    formatted,
    rgInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
    handleFormatToggle
  };
};
