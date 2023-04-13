import * as bip39 from 'bip39';
import * as ecc from 'tiny-secp256k1';
import BIP32Factory, {BIP32Interface} from 'bip32';
import {v4 as uuid} from 'uuid';

import { MasterKey } from './MasterKey';
import { wordsCountToStrength } from './utils';

const bip32 = BIP32Factory(ecc);

export const create = async (name: string, words: 12 | 15 | 18 | 21 | 24) => {
  const id: string = uuid();
  const mnemonic = bip39.generateMnemonic(wordsCountToStrength(words));
  const seed = await bip39.mnemonicToSeed(mnemonic);
  return new MasterKey(id, name, mnemonic, seed.toString('hex'));
};

/**
 *
 * @param id
 * @param name
 * @param strength
 * @returns
 * @deprecated util version v0.0.6, use create(name, words) instead
 */
export const createAccount = async (
  id: string,
  name: string,
  strength = 128,
) => {
  const mnemonic = bip39.generateMnemonic(strength);
  const seed = await bip39.mnemonicToSeed(mnemonic);

  return {
    id,
    name,
    seed: seed.toString('hex'),
    mnemonic,
  };
};

export const derivationAccount = (seed: string, path: string) => {
  const buffer = Buffer.from(seed, 'hex');
  const root: BIP32Interface = bip32.fromSeed(buffer);
  return root.derivePath(path);
};
