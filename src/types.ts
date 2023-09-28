export enum Framework {
  ANGULAR = 'ANGULAR',
  REACT = 'REACT'
}

export enum LogicExtension {
  TS = 'ts',
  TSX = 'tsx',
  JS = 'js',
  JSX = 'jsx'
}

export enum StyleExtension {
  CSS = 'css',
  SCSS = 'scss',
  STYL = 'styl',
  LESS = 'less'
}

export enum TemplateExtention {
  HTML = 'html'
}

export interface ComponentFile {
  name: string;
  content: string;
  extension: LogicExtension | StyleExtension | TemplateExtention;
}

export interface ConversionRequest {
  origin: Framework;
  target: Framework;
  componentFiles: ComponentFile[];
  targetExtension: LogicExtension;
  apiKey: string;
}
export type PromptGeneratorArgs = Omit<ConversionRequest, 'apiKey'>;
export enum ConversionType {
  ANGULAR_TO_REACT = 'ANGULAR_TO_REACT',
  REACT_TO_ANGULAR = 'REACT_TO_ANGULAR'
}
