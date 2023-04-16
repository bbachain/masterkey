import {BIP32Interface} from 'bip32';
import {Keypair, PublicKey} from '@bbachain/web3.js';
import {IChainAccount} from './IChainAccount';

export class AccountBBA implements IChainAccount {
  xpub: BIP32Interface;
  xprv?: BIP32Interface;

  keypair: Keypair;

  constructor(xpub: BIP32Interface, xprv: BIP32Interface) {
    this.xpub = xpub;
    this.xprv = xprv;
    this.keypair = Keypair.fromSeed(this.xprv.privateKey);
  }

  public toPrivateKey() {
    return this.keypair.secretKey.toString();
  }

  public toAddress() {
    return this.keypair.publicKey.toBase58();
  }

  public validateAddress(address: string) {
    return PublicKey.isOnCurve(new PublicKey(address));
  }

  public async getBalance(address?: string) {
    return await Promise.resolve(0);
  }
}
