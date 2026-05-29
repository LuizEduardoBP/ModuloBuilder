import { config } from './config';
import { ToolComponent } from './ToolComponent';
import * as utils from './toolUtils';
import type { ToolModule } from '../../../types/tool';

export const cpfToolModule: ToolModule = {
  config,
  Component: ToolComponent,
  utils
};
