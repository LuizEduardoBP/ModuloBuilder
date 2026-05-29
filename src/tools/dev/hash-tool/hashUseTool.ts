import { useState, useEffect } from 'react';
import * as utils from './hashToolUtils';

export const hashUseTool = () => {
  const [inputText, setInputText] = useState('');
  const [md5Hash, setMd5Hash] = useState('');
  const [sha1Hash, setSha1Hash] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');

  // Copied states
  const [copiedMd5, setCopiedMd5] = useState(false);
  const [copiedSha1, setCopiedSha1] = useState(false);
  const [copiedSha256, setCopiedSha256] = useState(false);

  // Computa hashes sempre que o input mudar
  useEffect(() => {
    if (!inputText.trim()) {
      setMd5Hash('');
      setSha1Hash('');
      setSha256Hash('');
      return;
    }

    setMd5Hash(utils.md5(inputText));

    utils.hashMessage('SHA-1', inputText).then(hash => setSha1Hash(hash));
    utils.hashMessage('SHA-256', inputText).then(hash => setSha256Hash(hash));
  }, [inputText]);

  const handleCopy = async (text: string, setCopiedFn: (val: boolean) => void) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFn(true);
      setTimeout(() => setCopiedFn(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setInputText('');
  };

  return {
    inputText,
    md5Hash,
    sha1Hash,
    sha256Hash,
    copiedMd5,
    copiedSha1,
    copiedSha256,
    setInputText,
    handleCopy,
    handleClear,
    setCopiedMd5,
    setCopiedSha1,
    setCopiedSha256
  };
};
