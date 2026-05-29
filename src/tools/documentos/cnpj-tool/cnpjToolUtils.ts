/**
 * Lógica pura do Módulo CNPJ (Geração e Validação)
 * TypeScript Puro
 */

export const formatCNPJ = (cnpj: string): string => {
  const clean = cnpj.replace(/\D/g, '');
  if (clean.length !== 14) return clean;
  return clean.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const validateCNPJ = (cnpj: string): boolean => {
  const clean = cnpj.replace(/\D/g, '');

  if (clean.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(clean)) return false;

  // Valida D1
  let size = clean.length - 2;
  let numbers = clean.substring(0, size);
  const digits = clean.substring(size);
  let sum = 0;
  let pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(0))) return false;

  // Valida D2
  size = size + 1;
  numbers = clean.substring(0, size);
  sum = 0;
  pos = size - 7;
  for (let i = size; i >= 1; i--) {
    sum += parseInt(numbers.charAt(size - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  if (result !== parseInt(digits.charAt(1))) return false;

  return true;
};

export const generateCNPJ = (formatted: boolean = true): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const num: number[] = Array.from({ length: 8 }, randomDigit);
  
  // Adiciona a base padrão de filial de teste: 0001
  num.push(0, 0, 0, 1);

  // Calcula D1
  let sum = 0;
  let pos = 5;
  for (let i = 0; i < 12; i++) {
    sum += num[i] * pos--;
    if (pos < 2) pos = 9;
  }
  let d1 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  num.push(d1);

  // Calcula D2
  sum = 0;
  pos = 6;
  for (let i = 0; i < 13; i++) {
    sum += num[i] * pos--;
    if (pos < 2) pos = 9;
  }
  let d2 = sum % 11 < 2 ? 0 : 11 - (sum % 11);
  num.push(d2);

  const cnpjString = num.join('');
  return formatted ? formatCNPJ(cnpjString) : cnpjString;
};
