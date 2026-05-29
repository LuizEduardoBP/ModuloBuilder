import { uuidConfig } from './uuidConfig';
import { uuidToolComponent } from './uuidToolComponent';
import * as utils from './uuidToolUtils';
import type { ToolModule } from '../../../types/tool';

export const uuidToolModule: ToolModule = {
  config: uuidConfig,
  Component: uuidToolComponent,
  utils
};
