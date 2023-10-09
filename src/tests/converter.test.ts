import { Converter } from '../Converter';
import {
  Framework,
  LogicExtension,
  StyleExtension,
  TemplateExtention
} from '../types';
import 'dotenv/config';

describe('Converter class tests', () => {
  test('Convert a multi-file Angular component to React', async () => {
    const conversionRequest = {
      origin: Framework.ANGULAR,
      target: Framework.REACT,
      apiKey: process.env.OPENAI_SECRET_KEY,
      componentFiles: [
        {
          name: 'AppComponent',
          content: `
            import { Component } from '@angular/core';
            @Component({
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.css']
            })
            export class AppComponent {}
          `,
          extension: LogicExtension.TS
        },
        {
          name: 'app.component',
          content: '<div>Hello Angular</div>',
          extension: TemplateExtention.HTML
        },
        {
          name: 'app.component',
          content: 'body { color: red; }',
          extension: StyleExtension.CSS
        }
      ],
      targetExtension: LogicExtension.JSX
    };
    const converter = new Converter(conversionRequest);
    const result = await converter.convert();
    const parsedResult = JSON.parse(result);
    expect(parsedResult.componentFiles[0].name).toBe('AppComponent');
    expect(parsedResult.componentFiles[0].extension).toBe(LogicExtension.JSX);
    expect(parsedResult.componentFiles[1].content).toContain('color: red');
    expect(parsedResult.componentFiles[1].extension).toBe(StyleExtension.CSS);
  });

  test('Convert a single-file React component to Angular', async () => {
    const conversionRequest = {
      origin: Framework.REACT,
      target: Framework.ANGULAR,
      apiKey: process.env.OPENAI_SECRET_KEY,
      componentFiles: [
        {
          name: 'MyComponent',
          content: `
            import React, { useEffect } from 'react';
            const MyComponent = () => {
              useEffect(() => {
                const handleSomething = () => {
                  console.log('Handling something...');
                };
                handleSomething();
              }, []);
              
              return (
                <div>Hello React</div>
              );
            };
            export default MyComponent;
          `,
          extension: LogicExtension.JSX
        }
      ],
      targetExtension: LogicExtension.TS
    };
    const converter = new Converter(conversionRequest);
    const result = await converter.convert();
    const parsedResult = JSON.parse(result);
    expect(parsedResult.componentFiles[0].name).toBe('MyComponent.component');
    expect(parsedResult.componentFiles[0].extension).toBe(LogicExtension.TS);
    expect(parsedResult.componentFiles[0].content).toContain('ngOnInit');
    expect(parsedResult.componentFiles[0].content).toContain('console.log');
  });
});
