import { cartaoConfig } from './cartaoConfig';
import { cartaoToolComponent } from './cartaoToolComponent';
import * as utils from './cartaoToolUtils';
import type { ToolModule } from '../../../types/tool';

export const cartaoToolModule: ToolModule = {
  config: cartaoConfig,
  Component: cartaoToolComponent,
  utils
};
