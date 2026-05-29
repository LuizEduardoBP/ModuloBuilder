import { genericConfig } from './genericConfig';
import { genericToolComponent } from './genericToolComponent';
import * as utils from './genericToolUtils';
import type { ToolModule } from '../../../types/tool';

export const genericToolModule: ToolModule = {
  config: genericConfig,
  Component: genericToolComponent,
  utils
};
