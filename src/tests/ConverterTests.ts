import { Converter } from '../Converter';
import { Framework, LogicExtension, StyleExtension } from '../types';
import 'dotenv/config';

(async () => {
    const components = [
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

    const conversionReq = {
        origin: Framework.ANGULAR,
        target: Framework.REACT,
        componentFiles: components,
        targetLogicExtension: LogicExtension.JSX,
        targetStyleExtension: StyleExtension.CSS,
        apiKey:process.env.OPENAI_SECRET_KEY
    };

    const converter = new Converter(conversionReq);
    try {
        const reactComponents = await converter.convert();
        console.log(reactComponents);
    } catch (error) {
        console.error(error);
    }
})();
