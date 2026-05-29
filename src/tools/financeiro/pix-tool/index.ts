import { pixConfig } from './pixConfig';
import { pixToolComponent } from './pixToolComponent';
import * as utils from './pixToolUtils';
import type { ToolModule } from '../../../types/tool';

export const pixToolModule: ToolModule = {
  config: pixConfig,
  Component: pixToolComponent,
  utils
};
