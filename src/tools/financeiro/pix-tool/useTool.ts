import { useState } from 'react';
import * as utils from './toolUtils';

export const useTool = () => {
  const [keyType, setKeyType] = useState<utils.PixKeyType>('aleatoria');
  const [generatedKey, setGeneratedKey] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const key = utils.generatePixKey(keyType);
    setGeneratedKey(key);
  };

  const handleCopy = async () => {
    if (!generatedKey) return;
    try {
      await navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setGeneratedKey('');
  };

  return {
    keyType,
    generatedKey,
    copied,
    setKeyType,
    handleGenerate,
    handleCopy,
    handleClear
  };
};
