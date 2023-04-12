import {BIP32Interface} from 'bip32';
import * as ethUtil from 'ethereumjs-util';
import {INetwork} from './types';

export class Account {
  network: INetwork;
  xprv: BIP32Interface;
  xpub: BIP32Interface;
  fingerprint: Buffer;
  depth: number;

  constructor(
    network: INetwork,
    xprv: BIP32Interface,
    xpub: BIP32Interface,
    fingerprint: Buffer,
    depth: number,
  ) {
    this.fingerprint = fingerprint;
    this.network = network;
    this.depth = depth;
    this.xprv = xprv;
    this.xpub = xpub;
  }

  public toAddress() {
    switch (this.network.symbol) {
      case 'BBA':
        break;
      case 'BSC':
      case 'ETH':
        const pubKey = ethUtil.privateToPublic(this.xprv.privateKey);
        const addr = ethUtil.publicToAddress(pubKey).toString('hex');
        return ethUtil.toChecksumAddress(addr);
      case 'TRX':
        break;
      default:
        break;
    }
    return null;
  }
}
