import { ConversionType } from './types';
import { Prompts, promptMethods, PromptMethod } from './prompts';

export const CONVERSION_RULES: Record<
  ConversionType,
  (Prompts | ReturnType<PromptMethod>)[]
> = {
  [ConversionType.ANGULAR_TO_REACT]: [
    Prompts.INTRO_PROMPT,
    promptMethods.originToTarget('Angular', 'React'),
    Prompts.UNIFY_TEMPLATE_LOGIC,
    Prompts.REMOVE_COMPONENT_SUFFIX,
    Prompts.CONSIDER_TARGET_EXTENSION,
    Prompts.KEEP_CSS_EXTENSION,
    Prompts.RESPONSE_FORMAT
  ],
  [ConversionType.REACT_TO_ANGULAR]: [
    Prompts.INTRO_PROMPT,
    promptMethods.originToTarget('React', 'Angular'),
    Prompts.ADD_COMPONENT_SUFFIX,
    Prompts.CONSIDER_TARGET_EXTENSION,
    Prompts.KEEP_CSS_EXTENSION,
    Prompts.RESPONSE_FORMAT
  ]
};
