import Web3 from 'web3';
import {BIP32Interface} from 'bip32';
import Wallet from 'ethereumjs-wallet';
import {IChainAccount} from './IChainAccount';

export class AccountETH implements IChainAccount {
  base: number;
  xpub: BIP32Interface;
  xprv?: BIP32Interface;
  endpoint: string;
  wallet: Wallet;
  web3: Web3;

  constructor(xpub: BIP32Interface, xprv?: BIP32Interface) {
    this.xpub = xpub;
    this.xprv = xprv;
    this.wallet = this.xprv
      ? Wallet.fromExtendedPrivateKey(this.xprv.toBase58())
      : Wallet.fromExtendedPublicKey(this.xpub.toBase58());
    this.endpoint =
      'https://goerli.infura.io/v3/e68e9eb0a4aa4c23840da2924a83b392';
    this.web3 = new Web3(new Web3.providers.HttpProvider(this.endpoint));
  }

  public toPrivateKey() {
    return this.wallet.getPrivateKey().toString('hex');
  }

  public toAddress() {
    return this.wallet.getChecksumAddressString();
  }

  public validateAddress(address: string) {
    return this.web3.utils.isAddress(address);
  }

  public async getBalance(address?: string) {
    let balance = '';
    const destAddr = address || this.toAddress();
    await this.web3.eth.getBalance(destAddr).then(value => (balance = value));
    return (this.web3.utils.fromWei(balance, 'ether') as unknown as number) / 1;
  }
}
