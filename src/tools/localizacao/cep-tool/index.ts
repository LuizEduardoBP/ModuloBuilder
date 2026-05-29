import { cepConfig } from './cepConfig';
import { cepToolComponent } from './cepToolComponent';
import * as utils from './cepToolUtils';
import type { ToolModule } from '../../../types/tool';

export const cepToolModule: ToolModule = {
  config: cepConfig,
  Component: cepToolComponent,
  utils
};
