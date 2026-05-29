/**
 * Lógica pura do Módulo JSON Formatter & Linter
 * TypeScript Puro
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export const validateJSON = (jsonStr: string): ValidationResult => {
  if (!jsonStr.trim()) {
    return { isValid: true };
  }
  try {
    JSON.parse(jsonStr);
    return { isValid: true };
  } catch (e: any) {
    return {
      isValid: false,
      error: e.message || 'JSON Inválido'
    };
  }
};

export const formatJSON = (jsonStr: string, indent: number = 2): string => {
  if (!jsonStr.trim()) return '';
  try {
    const obj = JSON.parse(jsonStr);
    return JSON.stringify(obj, null, indent);
  } catch (e) {
    return jsonStr; // Retorna original em caso de erro
  }
};

export const minifyJSON = (jsonStr: string): string => {
  if (!jsonStr.trim()) return '';
  try {
    const obj = JSON.parse(jsonStr);
    return JSON.stringify(obj);
  } catch (e) {
    return jsonStr;
  }
};
