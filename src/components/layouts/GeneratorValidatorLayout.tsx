import React from 'react';
import { ToolHeader } from '../ui/ToolHeader';
import { Panel } from '../ui/Panel';

interface GeneratorValidatorLayoutProps {
  icon: string;
  title: string;
  description: string;
  code?: string;
  generatorTitle: string;
  generatorSubtitle?: string;
  generatorControls?: React.ReactNode;
  generatorOutput: React.ReactNode;
  generatorAction: React.ReactNode;
  validatorTitle: string;
  validatorSubtitle?: string;
  validatorInput: React.ReactNode;
  validatorStatus: React.ReactNode;
}

export const GeneratorValidatorLayout: React.FC<GeneratorValidatorLayoutProps> = ({
  icon,
  title,
  description,
  code,
  generatorTitle,
  generatorSubtitle,
  generatorControls,
  generatorOutput,
  generatorAction,
  validatorTitle,
  validatorSubtitle,
  validatorInput,
  validatorStatus,
}) => {
  return (
    <div className="space-y-6">
      <ToolHeader icon={icon} title={title} description={description} code={code} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Panel
          title={generatorTitle}
          subtitle={generatorSubtitle}
          className="justify-between gap-5"
        >
          {generatorControls && <div className="space-y-3">{generatorControls}</div>}
          <div className="space-y-3 mt-auto">
            {generatorOutput}
            {generatorAction}
          </div>
        </Panel>

        <Panel
          title={validatorTitle}
          subtitle={validatorSubtitle}
          className="justify-between gap-5"
        >
          <div>{validatorInput}</div>
          <div className="mt-auto">{validatorStatus}</div>
        </Panel>
      </div>
    </div>
  );
};
