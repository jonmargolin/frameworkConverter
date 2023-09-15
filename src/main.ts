#!/usr/bin/env node
/* eslint-disable */
import { program } from 'commander';
import {
  AngularToReactConverter,
  myAngularComponent
} from './AngularToReactConverter';
program.version('1.0.0').description('My CLI tool');

program
  .command('convert')
  .description('Print a name')
  .action(async () => {
    console.log(`start convert`);
    const converter = new AngularToReactConverter(myAngularComponent);
    try {
      const reactComponent = await converter.convertToReact();
      console.log(reactComponent);
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);
