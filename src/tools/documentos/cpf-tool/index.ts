import { cpfConfig } from './cpfConfig';
import { cpfToolComponent } from './cpfToolComponent';
import * as utils from './cpfToolUtils';
import type { ToolModule } from '../../../types/tool';

export const cpfToolModule: ToolModule = {
  config: cpfConfig,
  Component: cpfToolComponent,
  utils
};
