/**
 * Lógica pura do Módulo CNH (Geração e Validação)
 * TypeScript Puro
 */

export const validateCNH = (cnh: string): boolean => {
  const clean = cnh.replace(/\D/g, '');
  if (clean.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(clean)) return false;

  const base = clean.substring(0, 9);
  
  let sum = 0;
  for (let i = 0, j = 9; i < 9; i++, j--) {
    sum += parseInt(base.charAt(i)) * j;
  }
  
  let d1 = sum % 11;
  let dsc = 0;
  if (d1 >= 10) {
    d1 = 0;
    dsc = 2;
  }

  sum = 0;
  for (let i = 0, j = 1; i < 9; i++, j++) {
    sum += parseInt(base.charAt(i)) * j;
  }

  let d2 = (sum % 11) - dsc;
  if (d2 < 0) d2 += 11;
  if (d2 >= 10) d2 = 0;

  return parseInt(clean.charAt(9)) === d1 && parseInt(clean.charAt(10)) === d2;
};

export const generateCNH = (): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  let num: number[];
  
  // Garante que não geramos sequências repetidas
  while (true) {
    num = Array.from({ length: 9 }, randomDigit);
    if (!num.every(val => val === num[0])) break;
  }
  
  let sum = 0;
  for (let i = 0, j = 9; i < 9; i++, j--) {
    sum += num[i] * j;
  }
  let d1 = sum % 11;
  let dsc = 0;
  if (d1 >= 10) {
    d1 = 0;
    dsc = 2;
  }
  num.push(d1);

  sum = 0;
  for (let i = 0, j = 1; i < 9; i++, j++) {
    sum += num[i] * j;
  }
  let d2 = (sum % 11) - dsc;
  if (d2 < 0) d2 += 11;
  if (d2 >= 10) d2 = 0;
  num.push(d2);

  return num.join('');
};
