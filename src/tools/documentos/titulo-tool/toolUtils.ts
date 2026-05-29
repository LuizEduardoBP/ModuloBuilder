/**
 * Lógica pura do Módulo Título de Eleitor (Geração e Validação)
 * TypeScript Puro
 */

export const validateTitulo = (titulo: string): boolean => {
  const clean = titulo.replace(/\D/g, '');
  if (clean.length !== 12) return false;

  const base = clean.substring(0, 10);
  const stateCode = parseInt(base.substring(8, 10));
  
  if (stateCode < 1 || stateCode > 28) return false;

  // DV1
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(base.charAt(i)) * (i + 2);
  }
  let dv1 = sum % 11;
  if (dv1 === 10) dv1 = 0;

  // DV2
  let sum2 = parseInt(base.charAt(8)) * 7 + parseInt(base.charAt(9)) * 8 + dv1 * 9;
  let dv2 = sum2 % 11;
  if (dv2 === 10) dv2 = 0;

  return parseInt(clean.charAt(10)) === dv1 && parseInt(clean.charAt(11)) === dv2;
};

export const generateTitulo = (stateCodeStr?: string): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const num = Array.from({ length: 8 }, randomDigit);

  // UF Code
  let uf = stateCodeStr ? parseInt(stateCodeStr) : Math.floor(Math.random() * 28) + 1;
  if (isNaN(uf) || uf < 1 || uf > 28) {
    uf = 1;
  }
  
  const ufStr = uf.toString().padStart(2, '0');
  num.push(parseInt(ufStr.charAt(0)), parseInt(ufStr.charAt(1)));

  // DV1
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += num[i] * (i + 2);
  }
  let dv1 = sum % 11;
  if (dv1 === 10) dv1 = 0;
  num.push(dv1);

  // DV2
  let sum2 = num[8] * 7 + num[9] * 8 + dv1 * 9;
  let dv2 = sum2 % 11;
  if (dv2 === 10) dv2 = 0;
  num.push(dv2);

  return num.join('');
};

export const STATES_LIST = [
  { code: '01', name: 'São Paulo (SP)' },
  { code: '02', name: 'Minas Gerais (MG)' },
  { code: '03', name: 'Rio de Janeiro (RJ)' },
  { code: '04', name: 'Rio Grande do Sul (RS)' },
  { code: '05', name: 'Bahia (BA)' },
  { code: '06', name: 'Paraná (PR)' },
  { code: '07', name: 'Ceará (CE)' },
  { code: '08', name: 'Pernambuco (PE)' },
  { code: '09', name: 'Ceará (CE)' },
  { code: '10', name: 'Rio Grande do Norte (RN)' },
  { code: '11', name: 'Paraíba (PB)' },
  { code: '12', name: 'Espírito Santo (ES)' },
  { code: '13', name: 'Amazonas (AM)' },
  { code: '14', name: 'Mato Grosso (MT)' },
  { code: '15', name: 'Mato Grosso do Sul (MS)' },
  { code: '16', name: 'Goiás (GO)' },
  { code: '17', name: 'Maranhão (MA)' },
  { code: '18', name: 'Piauí (PI)' },
  { code: '19', name: 'Santa Catarina (SC)' },
  { code: '20', name: 'Paraíba (PB)' },
  { code: '21', name: 'Rondônia (RO)' },
  { code: '22', name: 'Acre (AC)' },
  { code: '23', name: 'Amapá (AP)' },
  { code: '24', name: 'Roraima (RR)' },
  { code: '25', name: 'Tocantins (TO)' },
  { code: '26', name: 'Distrito Federal (DF)' },
  { code: '27', name: 'Exterior (ZZ)' },
];
