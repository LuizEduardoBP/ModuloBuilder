import { tituloConfig } from './tituloConfig';
import { tituloToolComponent } from './tituloToolComponent';
import * as utils from './tituloToolUtils';
import type { ToolModule } from '../../../types/tool';

export const tituloToolModule: ToolModule = {
  config: tituloConfig,
  Component: tituloToolComponent,
  utils
};
