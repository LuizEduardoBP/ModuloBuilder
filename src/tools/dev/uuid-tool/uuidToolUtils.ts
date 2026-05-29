/**
 * Lógica pura do Módulo UUID v4 Generator
 * TypeScript Puro
 */

export const generateUUIDv4 = (): string => {
  // Padrão RFC 4122 v4 UUID generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const generateMultipleUUIDs = (count: number): string[] => {
  const list = [];
  const limit = Math.min(100, Math.max(1, count));
  for (let i = 0; i < limit; i++) {
    list.push(generateUUIDv4());
  }
  return list;
};
