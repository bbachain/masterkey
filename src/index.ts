import {v4 as uuid} from 'uuid';
import * as bip39 from "bip39";
import { wordsCountToStrength } from "./utils";
import { MasterKey } from './MasterKey';

global.Buffer = global.Buffer || require('buffer').Buffer;

export const create = async (name: string, words: 12 | 15| 18| 21 | 24) => {
  const id: string = uuid();
  const mnemonic = bip39.generateMnemonic(wordsCountToStrength(words));
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return new MasterKey(id, name, mnemonic, seed.toString('hex'));
};

export { Account } from "./Account";
export { Network } from "./Network";
export * from "./Factory";
export * from "./constants";
export * from "./types";
