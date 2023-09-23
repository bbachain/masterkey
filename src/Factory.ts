import * as bip39 from 'bip39';
import * as ecc from 'tiny-secp256k1';
import BIP32Factory, {BIP32Interface} from 'bip32';
import {v4 as uuid} from 'uuid';

import {MasterKey} from './MasterKey';
import {wordsCountToStrength} from './utils';
import {IMasterKey, INetwork} from './types';
import {Account} from './Account';

const bip32 = BIP32Factory(ecc);

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

export const recovery = async (name: string, mnemonic: string) => {
  if (bip39.validateMnemonic(mnemonic)) {
    const id: string = uuid();
    const seed = await bip39.mnemonicToSeed(mnemonic);
    return new MasterKey(id, name, mnemonic, seed.toString('hex'));
  }
  return null;
};

export const asignMasterKey = (obj: IMasterKey) => {
  return new MasterKey(obj.id, obj.name, obj.mnemonic, obj.seed);
};

export const builder = async ({
  mnemonic,
  network,
  index = 0,
}: {
  mnemonic: string;
  network: INetwork;
  index?: number;
}) => {
  const path = `m/44'/${network.type}'/0'/0/${index}`;
  const seed = await bip39.mnemonicToSeed(mnemonic);
  const root: BIP32Interface = bip32.fromSeed(seed);
  return new Account(network, root.derivePath(path));
};
