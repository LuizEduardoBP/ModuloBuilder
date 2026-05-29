import { cnhConfig } from './cnhConfig';
import { cnhToolComponent } from './cnhToolComponent';
import * as utils from './cnhToolUtils';
import type { ToolModule } from '../../../types/tool';

export const cnhToolModule: ToolModule = {
  config: cnhConfig,
  Component: cnhToolComponent,
  utils
};
