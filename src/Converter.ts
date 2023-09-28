import OpenAI from 'openai';
import { ConversionRequest, PromptGeneratorArgs } from './types';
import { PromptGenerator } from './PromptGenerator';

export class Converter {
  private conversionRequest: ConversionRequest;
  private openai: OpenAI;

  constructor(conversionRequest: ConversionRequest) {
    this.conversionRequest = conversionRequest;
    this.openai = new OpenAI({ apiKey: conversionRequest.apiKey });
  }

  private async callGPT4API(prompt: string): Promise<string> {
    const GPTOutput = await this.openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    return GPTOutput.choices[0].message.content.trim();
  }

  public async convert(): Promise<string> {
    const promptArgs: PromptGeneratorArgs = {
      origin: this.conversionRequest.origin,
      target: this.conversionRequest.target,
      componentFiles: this.conversionRequest.componentFiles,
      targetExtension: this.conversionRequest.targetExtension
    };

    const promptGenerator = new PromptGenerator(promptArgs);
    const generatedPrompt = promptGenerator.generate();
    const convertedComponents = await this.callGPT4API(generatedPrompt);
    return convertedComponents;
  }
}
