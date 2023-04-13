import * as bip39 from 'bip39';
import {v4 as uuid} from 'uuid';

import {MasterKey} from './MasterKey';
import {wordsCountToStrength} from './utils';

/**
 * Create a new masterkey
 * @param name The masterkey's identify name
 * @param words The materkey's words count
 * @returns
 */
export const create = async (name: string, words: 12 | 15 | 18 | 21 | 24) => {
  const id: string = uuid();
  const mnemonic = bip39.generateMnemonic(wordsCountToStrength(words));
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return new MasterKey(id, name, mnemonic, seed.toString('hex'));
};
