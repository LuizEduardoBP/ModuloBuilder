import { useState } from 'react';
import * as utils from './toolUtils';

export const useTool = () => {
  const [generatedCep, setGeneratedCep] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  // Validador / Buscador
  const [cepInput, setCepInput] = useState('');
  const [address, setAddress] = useState<utils.AddressMock | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerate = () => {
    const cep = utils.generateCEP(formatted);
    setGeneratedCep(cep);
  };

  const handleCopy = async () => {
    if (!generatedCep) return;
    try {
      await navigator.clipboard.writeText(generatedCep);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleValidateAndSearch = (val: string) => {
    const clean = val.replace(/\D/g, '');
    setCepInput(clean);
    
    if (clean.length === 0) {
      setIsValid(null);
      setAddress(null);
      return;
    }
    
    const valid = utils.validateCEP(clean);
    setIsValid(valid);
    
    if (valid) {
      setAddress(utils.getAddressByCEP(clean));
    } else {
      setAddress(null);
    }
  };

  const handleFormatToggle = (checked: boolean) => {
    setFormatted(checked);
    if (generatedCep) {
      const clean = generatedCep.replace(/\D/g, '');
      setGeneratedCep(checked ? utils.formatCEP(clean) : clean);
    }
  };

  return {
    generatedCep,
    copied,
    formatted,
    cepInput,
    address,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidateAndSearch,
    handleFormatToggle
  };
};
