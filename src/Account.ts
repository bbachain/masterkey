import {BIP32Interface} from 'bip32';
import {INetwork} from './types';
import {
  AccountBBA,
  AccountBSC,
  AccountETH,
  AccountTRX,
  IChainAccount,
} from './chains';

export class Account {
  network: INetwork;
  account: IChainAccount;

  constructor(network: INetwork, xprv: BIP32Interface) {
    this.network = network;
    switch (this.network.symbol) {
      case 'BBA':
        this.account = new AccountBBA(xprv.neutered(), xprv);
        break;
      case 'BSC':
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

  public toAddress() {
    return this.account.toAddress();
  }

  public validateAddress() {
    return this.account.validateAddress();
  }
}
