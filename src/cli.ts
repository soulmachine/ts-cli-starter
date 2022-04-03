#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';

import { packToFs } from 'ipfs-car/pack/fs';
import { storeCarFile } from './upload';

const API_TOKEN = process.env.NFT_STORAGE_API_TOKEN;

function makeLink(s: string): string {
  return `https://${s}.ipfs.dweb.link`;
}

// eslint-disable-next-line no-var
yargs
  .scriptName('nft')
  .command(
    'pack <directory>',
    'pack a directory into a .car file',
    (y) => {
      y.option('output', { type: 'string', default: 'index.car' });
    },
    async (argv) => {
      const input = argv.directory as string;
      const output = argv.output as string;
      const { root, filename } = await pack({ input, output });
      // tslint:disable-next-line: no-console
      console.log(`root CID: ${root.toString()}`);
      // tslint:disable-next-line: no-console
      console.log(`  output: ${filename}`);
    },
  )
  .command(
    'upload <car>',
    'upload .car file to nft.storage.\nExpects env variable `NFT_STORAGE_API_TOKEN` or --api-key',
    (y) => {
      y.positional('car', {
        describe: 'path to car file to be uploaded',
        default: 'index.car',
      }).option('api-key', {
        type: 'string',
      });
    },
    async (argv) => {
      let apiKey = (argv['api-key'] ?? API_TOKEN) as string | undefined;
      if (!apiKey) {
        throw new Error('API key missing. Need `--api-key` or NFT_STORAGE_API_TOKEN env');
      }

      const CID = await storeCarFile(argv.car as string, apiKey);
      const link = makeLink(CID);
      console.log(CID);
      console.log(link);
    },
  )
  .fail(function (_msg, _err, yargs) {
    // if (err) throw err // preserve stack
    console.log(chalk.blue(figlet.textSync('NFT CLI')));

    console.error(yargs.help());
    process.exit(1);
  }).argv;

async function pack({ output, input }: { output: string; input: string }) {
  return packToFs({
    input,
    output,
    wrapWithDirectory: false,
  });
}
