import { config } from './config';
import { ToolComponent } from './ToolComponent';
import * as utils from './toolUtils';
import type { ToolModule } from '../../types/tool';

export const cnpjToolModule: ToolModule = {
  config,
  Component: ToolComponent,
  utils
};
