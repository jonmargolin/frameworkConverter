import inquirer from 'inquirer';
import { findFile } from './utils/fsutils';
async function getConversionFramework(): Promise<string> {
  console.log('Choose the framework you would like to convert to:');

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Choose the framework you would like to convert to:',
      choices: ['React', 'Vue', 'Angular']
    }
  ]);

  switch (answers.framework) {
    case 'React':
      return 'React';
    case 'Vue':
      return 'Vue';
    case 'Angular':
      return 'Angular';
    default:
      return 'Invalid choice.';
  }
}
async function getLLMModel(): Promise<string> {
  console.log('Choose the llm model you would like to use:');

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'LLM',
      message: 'Choose the llm model you would like to use:',
      choices: ['GPT', 'claude']
    }
  ]);

  switch (answers.LLM) {
    case 'GPT':
      return 'GPT';
    case 'Claude':
      return 'Claude';
    default:
      return 'Invalid choice.';
  }
}
async function getApiKey(): Promise<string> {
  console.log('Choose the framework you would like to convert to:');

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'apiKey',
      message: 'enter your api key:'
    }
  ]);
  return answers.apiKey;
}
async function getFilePath() {
  const { fileName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'fileName',
      message: 'Enter the path to your file:',
      validate: (input: string) =>
        input.trim() !== '' || 'Please enter a valid file name'
    }
  ]);
  const rootDirectory = process.cwd(); // or specify your root directory

  try {
    const filePath = await findFile(fileName, rootDirectory);
    if (filePath) {
      console.log(`File found at: ${filePath}`);
      return filePath;
    } else {
      console.log('File not found');
      return null;
    }
  } catch (error) {
    console.error('Error searching for file:', error);
    return null;
  }
}
export const main = async () => {
  const framework = await getConversionFramework();
  const llmModel = await getLLMModel();
  const apiKey = await getApiKey();
  const filePath = await getFilePath();
  console.log(
    `Your api ${apiKey}! \n You llms ${llmModel}! \n You fremwork ${framework}! \n You file path ${filePath}!
    \n your file is ${filePath}
    `
  );
};
