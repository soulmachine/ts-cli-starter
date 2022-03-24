import { createReadStream } from 'fs';
import { CarReader } from '@ipld/car';
import { NFTStorage } from 'nft.storage';
import * as fs from 'fs/promises';

export async function storeCarFile(filename: string, token: string) {
  const stats = await fs.stat(filename);
  const car = await CarReader.fromIterable(createReadStream(filename));
  let total = 0;
  function onStoredChunk(i: number) {
    total += i;
    console.log(`${((total / stats.size) * 100).toFixed(1)}%`);
  }
  const client = new NFTStorage({ token });
  return client.storeCar(car, { onStoredChunk });
}