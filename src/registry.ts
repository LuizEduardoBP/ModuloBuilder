import type { ToolModule } from './types/tool';
import { genericToolModule } from './tools/dev/generic-tool';
import { jsonToolModule } from './tools/dev/json-tool';
import { hashToolModule } from './tools/dev/hash-tool';
import { uuidToolModule } from './tools/dev/uuid-tool';
import { cpfToolModule } from './tools/documentos/cpf-tool';
import { cnpjToolModule } from './tools/documentos/cnpj-tool';
import { cnhToolModule } from './tools/documentos/cnh-tool';
import { tituloToolModule } from './tools/documentos/titulo-tool';
import { pisToolModule } from './tools/documentos/pis-tool';
import { rgToolModule } from './tools/documentos/rg-tool';

export const toolRegistry: Record<string, ToolModule> = {
  [genericToolModule.config.id]: genericToolModule,
  [jsonToolModule.config.id]: jsonToolModule,
  [hashToolModule.config.id]: hashToolModule,
  [uuidToolModule.config.id]: uuidToolModule,
  [cpfToolModule.config.id]: cpfToolModule,
  [cnpjToolModule.config.id]: cnpjToolModule,
  [cnhToolModule.config.id]: cnhToolModule,
  [tituloToolModule.config.id]: tituloToolModule,
  [pisToolModule.config.id]: pisToolModule,
  [rgToolModule.config.id]: rgToolModule,
};

export const getToolById = (id: string): ToolModule | undefined => {
  return toolRegistry[id];
};

export const getAllTools = (): ToolModule[] => {
  return Object.values(toolRegistry);
};

export const getToolsByCategory = (category: string): ToolModule[] => {
  return getAllTools().filter(tool => tool.config.category === category);
};
