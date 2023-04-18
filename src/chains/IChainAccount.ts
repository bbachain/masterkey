import {BIP32Interface} from 'bip32';

export interface IChainAccount {
  base: number;
  xpub: BIP32Interface;
  xprv?: BIP32Interface;

  /**\
   * get account private key
   */
  toPrivateKey: () => string;

  /**
   * get account address
   */
  toAddress: () => string;

  /**
   * validate account address
   */
  validateAddress: (address: string) => boolean;

  /**
   * get address balance
   */
  getBalance: (address?: string) => Promise<number>;

  /**
   * get transactions
   * @param address
   * @returns
   */
  getTransactions: (address?: string) => any;
}
