import type { ToolConfig } from '../../../types/tool';

export const config: ToolConfig = {
  id: 'rg-tool',
  name: 'Gerador Registro Geral (RG)',
  description: 'Geração e validação de RG (Padrão São Paulo) com suporte a dígito verificador X.',
  category: 'documentos',
  icon: 'Shield',
  keywords: ['rg', 'identidade', 'documento', 'gerador', 'validador', 'sp']
};
