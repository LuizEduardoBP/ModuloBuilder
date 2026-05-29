/**
 * Lógica pura do Módulo Cartão de Crédito (Geração via Algoritmo Luhn)
 * TypeScript Puro
 */

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'elo';

export interface CardDetails {
  brand: CardBrand;
  number: string;
  formattedNumber: string;
  cvv: string;
  expiry: string;
}

// Validador Luhn
export const validateLuhn = (numStr: string): boolean => {
  const clean = numStr.replace(/\D/g, '');
  if (!clean) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = clean.length - 1; i >= 0; i--) {
    let digit = parseInt(clean.charAt(i));
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

// Formatação com espaçamentos
export const formatCardNumber = (numStr: string, brand: CardBrand): string => {
  const clean = numStr.replace(/\D/g, '');
  if (brand === 'amex') {
    // Amex é 4-6-5: xxxx xxxxxx xxxxx
    return clean.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3').trim();
  }
  // Outros são 4-4-4-4
  return clean.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

export const generateCreditCard = (brand: CardBrand): CardDetails => {
  let prefix = '';
  let length = 16;

  switch (brand) {
    case 'visa':
      prefix = '4';
      length = 16;
      break;
    case 'mastercard': {
      const prefixes = ['51', '52', '53', '54', '55'];
      prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      length = 16;
      break;
    }
    case 'amex': {
      const prefixes = ['34', '37'];
      prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      length = 15;
      break;
    }
    case 'elo': {
      // Prefixo Elo padrão
      const prefixes = ['5067', '5090', '6363', '6362'];
      prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      length = 16;
      break;
    }
  }

  // Gera dígitos aleatórios até length - 1
  const ccDigits = prefix.split('').map(d => parseInt(d));
  while (ccDigits.length < length - 1) {
    ccDigits.push(Math.floor(Math.random() * 10));
  }

  // Calcula o dígito de controle usando Luhn
  let sum = 0;
  let shouldDouble = true;
  for (let i = ccDigits.length - 1; i >= 0; i--) {
    let digit = ccDigits[i];
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }

  const checkDigit = (10 - (sum % 10)) % 10;
  ccDigits.push(checkDigit);

  const cardNumber = ccDigits.join('');

  // CVV
  const cvvLength = brand === 'amex' ? 4 : 3;
  const cvv = Array.from({ length: cvvLength }, () => Math.floor(Math.random() * 10)).join('');

  // Validade futura (1 a 8 anos no futuro)
  const today = new Date();
  const expMonth = Math.floor(Math.random() * 12) + 1;
  const expYear = today.getFullYear() + Math.floor(Math.random() * 7) + 1;
  const expiry = `${expMonth.toString().padStart(2, '0')}/${expYear.toString().substring(2)}`;

  return {
    brand,
    number: cardNumber,
    formattedNumber: formatCardNumber(cardNumber, brand),
    cvv,
    expiry
  };
};
