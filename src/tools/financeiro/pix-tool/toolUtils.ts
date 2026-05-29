/**
 * Lógica pura do Módulo PIX (Geração de Chaves Fictícias)
 * TypeScript Puro
 */

import { generateCPF } from '../../documentos/cpf-tool/toolUtils';
import { generateCNPJ } from '../../documentos/cnpj-tool/toolUtils';

export type PixKeyType = 'cpf' | 'cnpj' | 'email' | 'celular' | 'aleatoria';

export const generateRandomEVP = (): string => {
  // Gera uma chave aleatória no formato EVP (UUID v4 do Banco Central)
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generatePixKey = (type: PixKeyType): string => {
  switch (type) {
    case 'cpf':
      return generateCPF(true);
    case 'cnpj':
      return generateCNPJ(true);
    case 'email': {
      const randomSuf = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      return `pix_homologacao_${randomSuf}@teste.com.br`;
    }
    case 'celular': {
      const ddds = ['11', '19', '21', '31', '41', '51', '61', '71', '81', '91'];
      const ddd = ddds[Math.floor(Math.random() * ddds.length)];
      const num = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
      return `+55 (${ddd}) 9${num.substring(0, 4)}-${num.substring(4)}`;
    }
    case 'aleatoria':
    default:
      return generateRandomEVP();
  }
};
