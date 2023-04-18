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

export interface IChainTransaction {
  hash: string;
  blockHash: string;
  blockNumber: number;
  destination: string;
  source: string;
  value: number;
  fee: number;
}

export type TWorkCount = 12 | 15 | 18 | 21 | 24;
