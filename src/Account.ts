import {BIP32Interface} from 'bip32';

import {
  AccountBBA,
  AccountBSC,
  AccountETH,
  AccountTRX,
  IChainAccount,
} from './chains';
import {INetwork} from './types';

export class Account {
  network: INetwork;
  account: IChainAccount;

  constructor(network: INetwork, xprv: BIP32Interface) {
    this.network = network;
    switch (this.network.symbol) {
      case 'BBA':
        this.account = new AccountBBA(xprv.neutered(), xprv);
        break;
      case 'BNB':
        this.account = new AccountBSC(xprv.neutered(), xprv);
        break;
      case 'ETH':
        this.account = new AccountETH(xprv.neutered(), xprv);
        break;
      case 'TRX':
        this.account = new AccountTRX(xprv.neutered(), xprv);
        break;
      default:
        throw Error('Unsupport network');
    }
  }

  public toPrivateKey() {
    return this.account.toPrivateKey();
  }

  public toAddress() {
    return this.account.toAddress();
  }

  public validateAddress(address: string) {
    return this.account.validateAddress(address);
  }

  public getBalance(address?: string) {
    return this.account.getBalance(address);
  }

  public getTransactions(address?: string) {
    return this.account.getTransactions(address);
  }
}
