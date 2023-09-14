const nodeFetch = require('node-fetch');
const OpenAI = require("openai");
require("dotenv").config();

class AngularToReactConverter {
    private component: string;
    private openai: any;

    constructor(component: string) {
        this.component = component;
        
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

    public async convertToReact(): Promise<string> {
        const prompt = `Convert the following Angular component to React: ${this.component}`;
        const convertedComponent = await this.callGPT4API({ prompt });
        return convertedComponent;
    }
}

// Test the class
(async () => {
    const myAngularComponent = `
    @Component({
        selector: 'app-root',
        template: '<div>Hello Angular</div>',
    })
    export class AppComponent {}
    `;

    const converter = new AngularToReactConverter(myAngularComponent);
    try {
        const reactComponent = await converter.convertToReact();
        console.log(reactComponent);
    } catch (error) {
        console.error(error);
    }
})();
