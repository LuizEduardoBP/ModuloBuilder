/**
 * Lógica pura do Módulo CEP (Geração e Validação)
 * TypeScript Puro
 */

export interface AddressData {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
}

export const formatCEP = (cep: string): string => {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return clean;
  return clean.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const validateCEP = (cep: string): boolean => {
  const clean = cep.replace(/\D/g, '');
  return clean.length === 8;
};

export const generateCEP = (formatted: boolean = true): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const num = Array.from({ length: 8 }, randomDigit);
  const cepString = num.join('');
  return formatted ? formatCEP(cepString) : cepString;
};
