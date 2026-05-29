import { hashConfig } from './hashConfig';
import { hashToolComponent } from './hashToolComponent';
import * as utils from './hashToolUtils';
import type { ToolModule } from '../../../types/tool';

export const hashToolModule: ToolModule = {
  config: hashConfig,
  Component: hashToolComponent,
  utils
};
