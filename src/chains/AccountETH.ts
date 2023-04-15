import {BIP32Interface} from 'bip32';
import Wallet from 'ethereumjs-wallet';
import Web3 from 'web3';

import {IChainAccount} from './IChainAccount';

export class AccountETH implements IChainAccount {
  xpub: BIP32Interface;
  xprv?: BIP32Interface;
  wallet: Wallet;
  web3: Web3;

  constructor(xpub: BIP32Interface, xprv?: BIP32Interface) {
    this.xpub = xpub;
    this.xprv = xprv;
    this.wallet = this.xprv
      ? Wallet.fromExtendedPrivateKey(this.xprv.toBase58())
      : Wallet.fromExtendedPublicKey(this.xpub.toBase58());
    this.web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  }

  public toPrivateKey() {
    return this.wallet.getPrivateKey().toString('hex');
  }

  public toAddress() {
    return this.wallet.getChecksumAddressString();
  }

  public validateAddress(address: string) {
    return true;
    // return this.web3.utils.isAddress(address);
  }
}
