import {BIP32Interface} from 'bip32';

export interface IChainAccount {
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
}
