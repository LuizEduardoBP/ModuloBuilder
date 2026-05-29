import { jsonConfig } from './jsonConfig';
import { jsonToolComponent } from './jsonToolComponent';
import * as utils from './jsonToolUtils';
import type { ToolModule } from '../../../types/tool';

export const jsonToolModule: ToolModule = {
  config: jsonConfig,
  Component: jsonToolComponent,
  utils
};
