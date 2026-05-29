import { useState } from 'react';
import type { AddressData } from './cepToolUtils';
import * as utils from './cepToolUtils';

export const cepUseTool = () => {
  const [generatedCep, setGeneratedCep] = useState('');
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(true);

  // Validador / Buscador
  const [cepInput, setCepInput] = useState('');
  const [address, setAddress] = useState<AddressData | null>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleValidateAndSearch = async (val: string) => {
    // Remove máscara apenas para controle interno, mas exibe formatado no input
    const clean = val.replace(/\D/g, '');
    
    // Atualiza o input mantendo uma formatação amigável se digitar completo
    if (clean.length <= 8) {
      setCepInput(val);
    }

    if (clean.length === 0) {
      setIsValid(null);
      setAddress(null);
      setError(null);
      setLoading(false);
      return;
    }

    const valid = utils.validateCEP(clean);
    setIsValid(valid);

    if (valid) {
      setLoading(true);
      setError(null);
      setAddress(null);
      try {
        const response = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
        if (!response.ok) {
          throw new Error('Falha na comunicação com o serviço ViaCep.');
        }
        const data = await response.json();
        
        if (data.erro) {
          setError('CEP válido estruturalmente, mas não encontrado na base de dados.');
          setAddress(null);
        } else {
          setAddress(data as AddressData);
          setError(null);
        }
      } catch (err: any) {
        setError(err.message || 'Erro ao conectar à API do ViaCep.');
        setAddress(null);
      } finally {
        setLoading(false);
      }
    } else {
      setAddress(null);
      setError(null);
      setLoading(false);
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
    loading,
    error,
    handleGenerate,
    handleCopy,
    handleValidateAndSearch,
    handleFormatToggle
  };
};
