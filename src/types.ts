import {Account} from './Account';
import {Network} from './Network';

export interface INetwork {
  name: string;
  symbol: string;
  decimal: number;
  type: number;
}

export interface IMasterKey {
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

  /**
   * The verified status of master key
   */
  verified?: boolean;

  /**
   * Derive master key to child key via blockchain
   */
  derive: (network: Network) => Account;
}
