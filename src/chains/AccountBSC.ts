import Web3 from 'web3';
import {AccountETH} from './AccountETH';
import {BIP32Interface} from 'bip32';

export class AccountBSC extends AccountETH {
  // Addition Propeties
  coingeckoId: string = 'binancecoin';

  constructor(xpub: BIP32Interface, xprv: BIP32Interface, isTest: boolean) {
    super(xpub, xprv, isTest);
    this.endpoint = this.isTest
      ? 'https://data-seed-prebsc-1-s1.binance.org:8545'
      : 'https://bsc-dataseed1.binance.org';
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.endpoint));
  }
}
