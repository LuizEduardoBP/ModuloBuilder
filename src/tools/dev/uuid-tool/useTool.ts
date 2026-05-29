import { useState } from 'react';
import * as utils from './toolUtils';

export const useTool = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    let list = utils.generateMultipleUUIDs(count);
    if (uppercase) {
      list = list.map(id => id.toUpperCase());
    } else {
      list = list.map(id => id.toLowerCase());
    }
    setUuids(list);
  };

  const handleCopy = async () => {
    if (uuids.length === 0) return;
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setUuids([]);
  };

  return {
    uuids,
    count,
    uppercase,
    copied,
    setCount,
    setUppercase,
    handleGenerate,
    handleCopy,
    handleClear
  };
};
