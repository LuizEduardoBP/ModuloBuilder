import type { ToolConfig } from '../../../types/tool';

export const cartaoConfig: ToolConfig = {
  id: 'cartao-tool',
  name: 'Gerador Cartão Crédito',
  description: 'Gera números de cartão de crédito matematicamente válidos (Luhn) para Visa, Mastercard, Amex e Elo.',
  category: 'financeiro',
  icon: 'CreditCard',
  keywords: ['cartão', 'crédito', 'luhn', 'visa', 'mastercard', 'amex', 'elo', 'homologação', 'financeiro']
};
