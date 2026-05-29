/**
 * Lógica do Módulo Genérico: Utilitários de Texto & Criptografia (Base64)
 * TypeScript Puro
 */

export const toBase64 = (str: string): string => {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch (e) {
    return 'Erro ao codificar para Base64';
  }
};

export const fromBase64 = (str: string): string => {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch (e) {
    return 'Erro ao decodificar Base64 inválido';
  }
};

export const reverseText = (str: string): string => {
  return str.split('').reverse().join('');
};

export const countCharacters = (str: string): { chars: number; words: number; lines: number } => {
  return {
    chars: str.length,
    words: str.trim() === '' ? 0 : str.trim().split(/\s+/).length,
    lines: str.split('\n').length
  };
};
