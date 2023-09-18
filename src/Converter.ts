const OpenAI = require("openai");
require("dotenv").config();

enum Framework {
    ANGULAR = "ANGULAR",
    REACT = "REACT"
}

enum LogicExtension {
    TS = "ts",
    TSX = "tsx",
    JS = "js",
    JSX = "jsx"
}

enum StyleExtension {
    HTML = "html",
    CSS = "css",
    SCSS = "scss",
    STYL = "styl",
    LESS = "less"
}

interface ComponentFile {
    name: string;
    content: string;
    extension: LogicExtension | StyleExtension;
}

interface ConversionRequest {
    origin: Framework;
    target: Framework;
    componentFiles: ComponentFile[];
    targetLogicExtension: LogicExtension;
    targetStyleExtension: StyleExtension;
}

class Converter {
    private conversionRequest: ConversionRequest;
    private openai: any;
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

    constructor(conversionRequest: ConversionRequest) {
        this.conversionRequest = conversionRequest;

        const newConfig = {
            apiKey: process.env.OPENAI_SECRET_KEY
        };
        this.openai = new OpenAI(newConfig);
    }

    private async callGPT4API(data: any): Promise<string> {
        try {
            const GPTOutput = await this.openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: data.prompt
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
                console.log(err); // Non-API error
            }
            throw new Error("Error connecting to GPT API.");
        }
    }

    public async convert(): Promise<string> {
        let prompt = "";

        switch (this.conversionRequest.origin) {
            case Framework.ANGULAR:
                if (this.conversionRequest.target === Framework.REACT) {
                    prompt = `Convert the following Angular component(s) to React. Consider logic files with extension: ${this.conversionRequest.targetLogicExtension} and style files with extension: ${this.conversionRequest.targetStyleExtension}. Component(s): ${JSON.stringify(this.conversionRequest.componentFiles)} ${this.responseFormat}`;
                }
                break;
            case Framework.REACT:
                if (this.conversionRequest.target === Framework.ANGULAR) {
                    prompt = `Convert the following React component(s) to Angular. Consider logic files with extension: ${this.conversionRequest.targetLogicExtension} and style files with extension: ${this.conversionRequest.targetStyleExtension}. Component(s): ${JSON.stringify(this.conversionRequest.componentFiles)} ${this.responseFormat}`;
                }
                break;
        }

        const convertedComponents = await this.callGPT4API({ prompt });
        return convertedComponents;
    }
}

// Test the class
(async () => {
    const components: ComponentFile[] = [
        {
            name: 'AppComponent',
            content: `
            @Component({
                selector: 'app-root',
                template: '<div>Hello Angular</div>',
            })
            export class AppComponent {}
            `,
            extension: LogicExtension.TS
        }
    ];

    const conversionReq: ConversionRequest = {
        origin: Framework.ANGULAR,
        target: Framework.REACT,
        componentFiles: components,
        targetLogicExtension: LogicExtension.JSX,
        targetStyleExtension: StyleExtension.CSS
    };

    const converter = new Converter(conversionReq);
    try {
        const reactComponents = await converter.convert();
        console.log(reactComponents);
    } catch (error) {
        console.error(error);
    }
})();
