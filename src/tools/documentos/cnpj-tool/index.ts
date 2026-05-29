import { cnpjConfig } from './cnpjConfig';
import { cnpjToolComponent } from './cnpjToolComponent';
import * as utils from './cnpjToolUtils';
import type { ToolModule } from '../../../types/tool';

export const cnpjToolModule: ToolModule = {
  config: cnpjConfig,
  Component: cnpjToolComponent,
  utils
};
