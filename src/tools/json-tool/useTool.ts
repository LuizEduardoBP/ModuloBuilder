import { useState } from 'react';
import * as utils from './toolUtils';

export const useTool = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<2 | 4>(2);
  const [validation, setValidation] = useState<utils.ValidationResult>({ isValid: true });

  const handleProcess = (val: string, currentIndent = indent) => {
    const res = utils.validateJSON(val);
    setValidation(res);

    if (res.isValid && val.trim()) {
      setOutputText(utils.formatJSON(val, currentIndent));
    } else {
      setOutputText('');
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    handleProcess(val);
  };

  const handleFormat = () => {
    handleProcess(inputText);
  };

  const handleMinify = () => {
    const res = utils.validateJSON(inputText);
    setValidation(res);
    if (res.isValid && inputText.trim()) {
      setOutputText(utils.minifyJSON(inputText));
    }
  };

  const handleCopy = async () => {
    if (!outputText) return;
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
    setValidation({ isValid: true });
  };

  const handleIndentChange = (val: 2 | 4) => {
    setIndent(val);
    handleProcess(inputText, val);
  };

  return {
    inputText,
    outputText,
    copied,
    indent,
    validation,
    handleTextChange,
    handleFormat,
    handleMinify,
    handleCopy,
    handleClear,
    handleIndentChange
  };
};
