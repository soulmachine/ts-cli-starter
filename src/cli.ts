#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import yargs from 'yargs';

import { createReadStream } from 'fs';
import { CarReader } from '@ipld/car';
// import ipfs_car from 'ipfs-car/dist/esm/cli';
// import type {packToFs as ptf} from 'ipfs-car/pack/fs';
// // @ts-expect-error can't find types
import { packToFs } from 'ipfs-car/pack/fs';
import { NFTStorage } from 'nft.storage';
import * as fs from 'fs/promises';

const API_TOKEN = process.env.NFT_STORAGE_API_TOKEN;

async function storeCarFile(filename: string, token = API_TOKEN) {
  const stats = await fs.stat(filename);
  const car = await CarReader.fromIterable(createReadStream(filename));
  let total = 0;
  function onStoredChunk(i: number) {
    total += i;
    console.log(`${((total / stats.size) * 100).toFixed(1)}%`);
  }
  if (!token) {
    throw new Error('NFT_STORAGE_API_TOKEN is missing');
  }
  const client = new NFTStorage({ token });
  return client.storeCar(car, { onStoredChunk });
}

function makeLink(s: string): string {
  return `https://${s}.ipfs.dweb.link`;
}
console.log(chalk.blue(figlet.textSync('NFT CLI')));

// eslint-disable-next-line no-var
yargs
  .scriptName('nft')
  .command(
    'upload <car>',
    'upload .car file to nft.storage',
    (y) => {
      y.positional('car', {
        describe: 'path to car file to be uploaded',
        default: 'index.car',
      }).option('api-key', {
        type: 'string',
      });
    },
    async (argv) => {
      console.log('yay', argv['api-key']);
      return;
      const CID = await storeCarFile(argv.$0);
      const link = makeLink(CID);
      console.log(CID);
      console.log(link);
    },
  )
  .command(
    'pack <directory>',
    'pack a directory into a .car file',
    (y) => {
      y.option('output', { type: 'string', default: 'index.car' });
    },
    async (argv) => {
      const input = argv.directory as string;
      const output = argv.output as string;
      const { root, filename } = await pack({input, output});
      // tslint:disable-next-line: no-console
      console.log(`root CID: ${root.toString()}`);
      // tslint:disable-next-line: no-console
      console.log(`  output: ${filename}`);
    },
  ).argv;


async function pack({output, input}: {output: string, input: string}) {
  return packToFs({
    input,
    output,
    wrapWithDirectory: false,
  });
}