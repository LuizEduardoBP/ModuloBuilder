/**
 * Lógica pura do Módulo RG (Registro Geral - Padrão SP)
 * TypeScript Puro
 */

export const formatRG = (rg: string): string => {
  const clean = rg.replace(/[^\dX]/gi, '').toUpperCase();
  if (clean.length !== 9) return clean;
  return clean.replace(/(\d{2})(\d{3})(\d{3})([\dX])/, '$1.$2.$3-$4');
};

export const validateRG = (rg: string): boolean => {
  const clean = rg.replace(/[^\dX]/gi, '').toUpperCase();
  if (clean.length !== 9) return false;
  if (/^(\d)\1{8}$/.test(clean)) return false;

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(clean.charAt(i)) * (i + 2);
  }

  const rest = sum % 11;
  let expectedDv = rest.toString();
  if (rest === 10) expectedDv = 'X';

  return clean.charAt(8) === expectedDv;
};

export const generateRG = (formatted: boolean = true): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const num: (number | string)[] = Array.from({ length: 8 }, randomDigit);

  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += (num[i] as number) * (i + 2);
  }

  const rest = sum % 11;
  let dv = rest.toString();
  if (rest === 10) dv = 'X';
  num.push(dv);

  const rgString = num.join('');
  return formatted ? formatRG(rgString) : rgString;
};
