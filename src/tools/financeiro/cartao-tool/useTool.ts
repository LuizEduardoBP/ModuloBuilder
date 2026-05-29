import { useState } from 'react';
import * as utils from './toolUtils';

export const useTool = () => {
  const [selectedBrand, setSelectedBrand] = useState<utils.CardBrand>('visa');
  const [card, setCard] = useState<utils.CardDetails | null>(null);
  
  // Copied states
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedCvv, setCopiedCvv] = useState(false);
  const [copiedExpiry, setCopiedExpiry] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleGenerate = () => {
    const newCard = utils.generateCreditCard(selectedBrand);
    setCard(newCard);
  };

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

  const handleCopyAll = async () => {
    if (!card) return;
    const text = `Cartão: ${card.formattedNumber}\nValidade: ${card.expiry}\nCVV: ${card.cvv}\nBandeira: ${card.brand.toUpperCase()}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClear = () => {
    setCard(null);
  };

  return {
    selectedBrand,
    card,
    copiedNumber,
    copiedCvv,
    copiedExpiry,
    copiedAll,
    setSelectedBrand,
    handleGenerate,
    handleCopy,
    handleCopyAll,
    handleClear,
    setCopiedNumber,
    setCopiedCvv,
    setCopiedExpiry
  };
};
