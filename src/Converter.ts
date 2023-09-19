import { ConversionRequest, Framework } from './types';
import OpenAI from 'openai';



export class Converter {
  private conversionRequest: ConversionRequest;
  private openai: OpenAI;
  private responseFormat: string = `
    Please respond in the following JSON structure:
    {
      "componentFiles": [
        {
          "name": "OriginalFileName",
          "extension": "TARGET_EXTENSION",
          "content": "The actual converted component content..."
        }
        // ... more components if necessary
      ]
    }`;

  constructor (conversionRequest: ConversionRequest) {

    this.conversionRequest = conversionRequest;
    this.openai = new OpenAI({ apiKey: conversionRequest.apiKey });
  }

  private async callGPT4API (prompt: string): Promise<string> {
    try {
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
    } catch (err) {
      if (err instanceof OpenAI.APIError) {
        console.error(err.status);
        console.error(err.message);
        console.error(err.code);
        console.error(err.type);
      } else {
        console.error(err); // Non-API error
      }
      throw new Error('Error connecting to GPT API.');
    }
  }

  public async convert (): Promise<string> {
    let prompt = '';

    switch (this.conversionRequest.origin) {
      case Framework.ANGULAR:
        if (this.conversionRequest.target === Framework.REACT) {
          prompt = `Convert the following Angular component(s) to React. Consider logic files with extension: ${
            this.conversionRequest.targetLogicExtension
          } and style files with extension: ${
            this.conversionRequest.targetStyleExtension
          }. Component(s): ${JSON.stringify(
            this.conversionRequest.componentFiles
          )} ${this.responseFormat}`;
        }
        break;
      case Framework.REACT:
        if (this.conversionRequest.target === Framework.ANGULAR) {
          prompt = `Convert the following React component(s) to Angular. Consider logic files with extension: ${
            this.conversionRequest.targetLogicExtension
          } and style files with extension: ${
            this.conversionRequest.targetStyleExtension
          }. Component(s): ${JSON.stringify(
            this.conversionRequest.componentFiles
          )} ${this.responseFormat}`;
        }
        break;
    }

    const convertedComponents = await this.callGPT4API(prompt);
    return convertedComponents;
  }
}
