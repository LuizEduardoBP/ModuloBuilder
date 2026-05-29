/**
 * Lógica pura do Módulo PIS/PASEP (Geração e Validação)
 * TypeScript Puro
 */

export const formatPIS = (pis: string): string => {
  const clean = pis.replace(/\D/g, '');
  if (clean.length !== 11) return clean;
  return clean.replace(/(\d{3})(\d{4})(\d{3})(\d{1})/, '$1.$2.$3-$4');
};

export const validatePIS = (pis: string): boolean => {
  const clean = pis.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(clean.charAt(i)) * weights[i];
  }

  const rest = sum % 11;
  let dv = 11 - rest;
  if (dv === 10 || dv === 11) dv = 0;

  return parseInt(clean.charAt(10)) === dv;
};

export const generatePIS = (formatted: boolean = true): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  let num: number[];
  
  while (true) {
    num = Array.from({ length: 10 }, randomDigit);
    if (!num.every(val => val === num[0])) break;
  }

  const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += num[i] * weights[i];
  }

  const rest = sum % 11;
  let dv = 11 - rest;
  if (dv === 10 || dv === 11) dv = 0;
  num.push(dv);

  const pisString = num.join('');
  return formatted ? formatPIS(pisString) : pisString;
};
