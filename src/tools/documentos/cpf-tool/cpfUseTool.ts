import { useState } from 'react';
import * as utils from './cpfToolUtils';

export const cpfUseTool = () => {
  const [generatedCpf, setGeneratedCpf] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  // Validador
  const [cpfInput, setCpfInput] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleGenerate = () => {
    const cpf = utils.generateCPF(formatted);
    setGeneratedCpf(cpf);
  };

  const handleCopy = async () => {
    if (!generatedCpf) return;
    try {
      await navigator.clipboard.writeText(generatedCpf);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleValidate = (val: string) => {
    setCpfInput(val);
    if (val.replace(/\D/g, '').length === 0) {
      setIsValid(null);
      return;
    }
    setIsValid(utils.validateCPF(val));
  };

  const handleFormatToggle = (checked: boolean) => {
    setFormatted(checked);
    if (generatedCpf) {
      const clean = generatedCpf.replace(/\D/g, '');
      setGeneratedCpf(checked ? utils.formatCPF(clean) : clean);
    }
  };

  return {
    generatedCpf,
    copied,
    formatted,
    cpfInput,
    isValid,
    handleGenerate,
    handleCopy,
    handleValidate,
    handleFormatToggle
  };
};
