import { ConversionType } from './types';
import { PROMPTS } from './prompts';

export const CONVERSION_RULES: Record<ConversionType, string[]> = {
  [ConversionType.ANGULAR_TO_REACT]: [
    PROMPTS.INTRO_PROMPT,
    PROMPTS.originToTarget('Angular', 'React'),
    PROMPTS.UNIFY_TEMPLATE_LOGIC,
    PROMPTS.REMOVE_COMPONENT_SUFFIX,
    PROMPTS.CONSIDER_TARGET_EXTENSION,
    PROMPTS.KEEP_CSS_EXTENSION,
    PROMPTS.RESPONSE_FORMAT
  ],
  [ConversionType.REACT_TO_ANGULAR]: [
    PROMPTS.INTRO_PROMPT,
    PROMPTS.originToTarget('React', 'Angular'),
    PROMPTS.ADD_COMPONENT_SUFFIX,
    PROMPTS.CONSIDER_TARGET_EXTENSION,
    PROMPTS.KEEP_CSS_EXTENSION,
    PROMPTS.RESPONSE_FORMAT
  ]
};
