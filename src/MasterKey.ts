import BIP32Factory, {BIP32Interface} from 'bip32';
import * as ecc from 'tiny-secp256k1';
import {Network} from './Network';
import {Account} from './Account';

const bip32 = BIP32Factory(ecc);

export class MasterKey {
  /**
   * The id of master key
   */
  id: string;

  /**
   * The name of master key
   */
  name: string;

  /**
   * The seed of master key
   */
  seed: string;

  /**
   * The mnemonic of master key
   */
  mnemonic: string;

  constructor(id: string, name: string, mnemonic: string, seed: string) {
    this.id = id;
    this.name = name;
    this.seed = seed;
    this.mnemonic = mnemonic;
  }

  /**
   * Derive master key to child key via blockchain
   */
  public derive(network: Network) {
    const path = `m/44'/${network.type}'/0'/0`;
    const buffer = Buffer.from(this.seed, 'hex');
    const root: BIP32Interface = bip32.fromSeed(buffer);
    return new Account(network, root.derivePath(path));
  }
}
