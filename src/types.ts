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
  HTML = 'html',
  CSS = 'css',
  SCSS = 'scss',
  STYL = 'styl',
  LESS = 'less'
}
export interface ComponentFile {
  name: string;
  content: string;
  extension: LogicExtension | StyleExtension;
}

export interface ConversionRequest {
  origin: Framework;
  target: Framework;
  componentFiles: ComponentFile[];
  targetLogicExtension: LogicExtension;
  targetStyleExtension: StyleExtension;
  apiKey: string;
}
