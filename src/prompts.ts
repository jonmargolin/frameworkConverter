// prompts.ts

export const PROMPTS = {
  INTRO_PROMPT: `
Hi, i would like to preform using your help a simple conversion process from one js framework to another (will provide the acutal frame works below), but please pay attention for the way i want this process to take place, first of all
i want to provide you with the component in a specific way, it will be an array of component files, when each has a name, extention and content of the file. in addition i will provide you a special feature called "file extention". the overall object will look like this:

{
    "componentFiles": [
        {
            "name": "OriginalFileName",
            "extension": "OriginalFileExtension",
            "content": "The original file content..."
        }
    ],
    "targetExtension": "TargetFileExtension"
}

after providing you with the original component in the way i explained above, i would like you to generate a new array of component files, with the same properties (name, extention and content), but I want you to create the values of theese properties based on the following set of rules :

Please avoid adding any additional text beyond your generated response.

Please take into account that extention and name are two separate fields when constructing your response

Please take into account that the content not related to coding or specific naming instructions shouldnt be changed. 

The conversion process will follow the rules detailed below to generate the converted component's content, name, and extension:
`,

  ANGULAR_TO_REACT: `
  the component will be converted from Angular to React`,
  REACT_TO_ANGULAR: `
  the component will be converted from React to Angular`,

  UNIFY_TEMPLATE_LOGIC:
    'Merge the logic (ts) and template (html) files into one unified component.',
  KEEP_CSS_EXTENSION:
    'css or css based files shouldnt be changed content or name wise',
  ADD_COMPONENT_SUFFIX:
    "Add '.component' to the filename, so 'example' becomes 'example.component'.",
  REMOVE_COMPONENT_SUFFIX:
    "Transform the Angular component filenames from kebab-case with '.component' suffix (e.g., 'app.component') to React's PascalCase naming convention (e.g., 'AppComponent')",
  CONSIDER_TARGET_EXTENSION: `
    Ensure the logic file extention property is using provided target extension, and align the syntax of the content to match langauge of the target extention.
    `,
  RESPONSE_FORMAT: `
Again, Please respond only with the conversion result, using the provided output format 
`
};
