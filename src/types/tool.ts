import React from 'react';

export type ToolCategory = 'documentos' | 'formatadores' | 'outros';

export interface ToolConfig {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string; // O nome do ícone do Lucide (ex: 'CreditCard', 'Hash')
  keywords: string[]; // Palavras-chave adicionais para o Command Palette / busca
}

export interface ToolModule {
  config: ToolConfig;
  Component: React.ComponentType<{
    onBack?: () => void;
  }>;
  utils?: any;
}
