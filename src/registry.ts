import type { ToolModule } from './types/tool';
import { genericToolModule } from './tools/generic-tool';
import { cpfToolModule } from './tools/cpf-tool';
import { cnpjToolModule } from './tools/cnpj-tool';
import { jsonToolModule } from './tools/json-tool';
import { cnhToolModule } from './tools/cnh-tool';
import { tituloToolModule } from './tools/titulo-tool';
import { pisToolModule } from './tools/pis-tool';
import { rgToolModule } from './tools/rg-tool';

export const toolRegistry: Record<string, ToolModule> = {
  [genericToolModule.config.id]: genericToolModule,
  [cpfToolModule.config.id]: cpfToolModule,
  [cnpjToolModule.config.id]: cnpjToolModule,
  [jsonToolModule.config.id]: jsonToolModule,
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
