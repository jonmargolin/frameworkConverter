// promptGenerator.ts

import { CONVERSION_RULES } from './ConversionRules';
import { ConversionType, PromptGeneratorArgs } from './types';

export class PromptGenerator {
  private conversionType: string;
  private componentFiles: Array<{
    name: string;
    extension: string;
    content: string;
  }>;
  private targetExtension: string;

  constructor(args: PromptGeneratorArgs) {
    this.conversionType = `${args.origin}_TO_${args.target}` as ConversionType;
    this.componentFiles = args.componentFiles;
    this.targetExtension = args.targetExtension;
  }

  public generate(): string {
    const rulesDescription = CONVERSION_RULES[this.conversionType].join(' ');
    const filesDescription = this.getFileDescription();

    return `${rulesDescription}
    
    {
        "componentFiles": [
            ${filesDescription}
        ],
        "targetExtension": "${this.targetExtension}"
    }`;
  }

  private getFileDescription(): string {
    return this.componentFiles
      .map(
        (file) =>
          `{
                "name": "${file.name}",
                "extension": "${file.extension}",
                "content": "${file.content
                  .replace(/"/g, '\\"')
                  .replace(/\n/g, '\\n')}"
            }`
      )
      .join(',');
  }
}
