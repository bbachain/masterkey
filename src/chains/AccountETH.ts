import {BIP32Interface} from 'bip32';
import Wallet from 'ethereumjs-wallet';
import {IChainAccount} from './IChainAccount';

export class AccountETH implements IChainAccount {
  xpub: BIP32Interface;
  xprv?: BIP32Interface;
  wallet: Wallet;

  constructor(xpub: BIP32Interface, xprv?: BIP32Interface) {
    this.xpub = xpub;
    this.xprv = xprv;
    this.wallet = this.xprv
      ? Wallet.fromExtendedPrivateKey(this.xprv.toBase58())
      : Wallet.fromExtendedPublicKey(this.xpub.toBase58());
  }

  public toAddress() {
    return '0x' + this.wallet.getAddress().toString('hex');
  }
}
