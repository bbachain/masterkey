import {BIP32Interface} from 'bip32';
import {
  BBA_DALTON_UNIT,
  Connection,
  Keypair,
  PublicKey,
  clusterApiUrl,
} from '@bbachain/web3.js';
import {IChainAccount} from './IChainAccount';
import {ChainTransaction} from './ChainTransaction';

export class AccountBBA implements IChainAccount {
  base: number;
  xpub: BIP32Interface;
  xprv?: BIP32Interface;
  connection: Connection;
  keypair: Keypair;

  constructor(xpub: BIP32Interface, xprv: BIP32Interface) {
    this.base = BBA_DALTON_UNIT;
    this.xpub = xpub;
    this.xprv = xprv;
    this.connection = new Connection(clusterApiUrl('testnet', true));
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
    const destAddr = address ? new PublicKey(address) : this.keypair.publicKey;
    const daltonBalance = await this.connection.getBalance(destAddr);
    return daltonBalance > 0 ? daltonBalance / this.base : 0;
  }

  public async getTransactions(address: string) {
    const destAddr = address ? new PublicKey(address) : this.keypair.publicKey;
    const signatures = await this.connection.getSignaturesForAddress(destAddr);

    let temp: string[] = []; // just a temp array to get the signatures
    signatures.map(x => temp.push(x.signature));
    const transactions = await this.connection.getTransactions(temp);
    return transactions.map(t => {
      return t;
      return new ChainTransaction(
        t.transaction.signatures[0],
        t.transaction.signatures[0],
        t.slot,
        t.transaction.signatures[0],
        t.transaction.signatures[0],
        t.slot,
        t.meta.fee,
      );
    });
  }
}
