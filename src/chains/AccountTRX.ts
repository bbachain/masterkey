import TronWeb from 'tronweb';
import {BIP32Interface} from 'bip32';
import {AccountETH} from './AccountETH';

export class AccountTRX extends AccountETH {
  tronWeb: any;

  constructor(xpub: BIP32Interface, xprv?: BIP32Interface) {
    super(xpub, xprv);
    this.tronWeb = new TronWeb({
      fullHost: 'https://api.shasta.trongrid.io',
    });
  }

  public toAddress() {
    return this.tronWeb.address.fromPrivateKey(this.toPrivateKey());
  }

  public validateAddress(address: string) {
    return this.tronWeb.isAddress(address);
  }

  public async getBalance(address?: string) {
    const destAddr = address || this.toAddress();
    const sunBalance = await this.tronWeb.trx.getBalance(destAddr);
    return this.tronWeb.fromSun(sunBalance) / 1;
  }

  public async createTransaction(address: string, amount: number) {
    return await this.tronWeb.transactionBuilder.sendTrx(
      address, // destination
      this.tronWeb.toSun(amount),
      this.toAddress(),
    );
  }

  public async getEstimatedFee(address: string) {
    return 0;
  }

  public async sendTransaction(tx: any) {
    try {
      const signedRawTx = await this.tronWeb.trx.sign(tx, this.toPrivateKey());
      const transaction = await this.tronWeb.trx.sendRawTransaction(signedRawTx);
      return transaction && transaction.result ? transaction.txid : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
