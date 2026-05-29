import { rgConfig } from './rgConfig';
import { rgToolComponent } from './rgToolComponent';
import * as utils from './rgToolUtils';
import type { ToolModule } from '../../../types/tool';

export const rgToolModule: ToolModule = {
  config: rgConfig,
  Component: rgToolComponent,
  utils
};
