import { pisConfig } from './pisConfig';
import { pisToolComponent } from './pisToolComponent';
import * as utils from './pisToolUtils';
import type { ToolModule } from '../../../types/tool';

export const pisToolModule: ToolModule = {
  config: pisConfig,
  Component: pisToolComponent,
  utils
};
