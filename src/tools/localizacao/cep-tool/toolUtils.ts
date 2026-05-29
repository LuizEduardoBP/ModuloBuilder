/**
 * Lógica pura do Módulo CEP (Geração e Validação offline)
 * TypeScript Puro
 */

export interface AddressMock {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

const CEP_DATABASE: AddressMock[] = [
  { cep: '01001-000', logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' },
  { cep: '20040-002', logradouro: 'Avenida Rio Branco', bairro: 'Centro', localidade: 'Rio de Janeiro', uf: 'RJ' },
  { cep: '30140-010', logradouro: 'Avenida Cristóvão Colombo', bairro: 'Savassi', localidade: 'Belo Horizonte', uf: 'MG' },
  { cep: '40020-000', logradouro: 'Praça da Sé', bairro: 'Pelourinho', localidade: 'Salvador', uf: 'BA' },
  { cep: '70002-900', logradouro: 'Esplanada dos Ministérios', bairro: 'Zona Cívico-Administrativa', localidade: 'Brasília', uf: 'DF' },
  { cep: '80010-000', logradouro: 'Rua XV de Novembro', bairro: 'Centro', localidade: 'Curitiba', uf: 'PR' },
  { cep: '90010-000', logradouro: 'Rua dos Andradas', bairro: 'Centro Histórico', localidade: 'Porto Alegre', uf: 'RS' },
  { cep: '60010-000', logradouro: 'Rua Barão do Rio Branco', bairro: 'Centro', localidade: 'Fortaleza', uf: 'CE' },
];

export const formatCEP = (cep: string): string => {
  const clean = cep.replace(/\D/g, '');
  if (clean.length !== 8) return clean;
  return clean.replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const validateCEP = (cep: string): boolean => {
  const clean = cep.replace(/\D/g, '');
  return clean.length === 8;
};

export const getAddressByCEP = (cep: string): AddressMock => {
  const clean = cep.replace(/\D/g, '');
  const formatted = formatCEP(clean);

  // Busca na base
  const found = CEP_DATABASE.find(item => item.cep.replace(/\D/g, '') === clean);
  if (found) return found;

  // Gerador determinístico de endereços fictícios caso não esteja no banco
  const ddds = [
    { uf: 'SP', localidade: 'São Paulo', bairro: 'Jardins', logradouro: 'Avenida Paulista' },
    { uf: 'RJ', localidade: 'Niterói', bairro: 'Icaraí', logradouro: 'Rua Ator Paulo Gustavo' },
    { uf: 'MG', localidade: 'Contagem', bairro: 'Eldorado', logradouro: 'Avenida João César de Oliveira' },
    { uf: 'SC', localidade: 'Florianópolis', bairro: 'Centro', logradouro: 'Rua Bocaiúva' },
    { uf: 'PR', localidade: 'Londrina', bairro: 'Gleba Palhano', logradouro: 'Avenida Ayrton Senna' }
  ];

  const index = parseInt(clean.charAt(0)) % ddds.length;
  const match = ddds[index];

  return {
    cep: formatted,
    logradouro: `${match.logradouro}, nº ${parseInt(clean.substring(5)) || 100}`,
    bairro: match.bairro,
    localidade: match.localidade,
    uf: match.uf
  };
};

export const generateCEP = (formatted: boolean = true): string => {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const num = Array.from({ length: 8 }, randomDigit);
  const cepString = num.join('');
  return formatted ? formatCEP(cepString) : cepString;
};
