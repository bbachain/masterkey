import {subtract} from 'lodash';
import {BIP32Interface} from 'bip32';
import {
  BBA_DALTON_UNIT,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from '@bbachain/web3.js';
import {CoinGeckoCurrentPrice, IChainAccount} from '../types';

export class AccountBBA implements IChainAccount {
  base: number;
  xpub: BIP32Interface;
  xprv?: BIP32Interface;
  connection: Connection;
  keypair: Keypair;
  isTest: boolean;

  constructor(xpub: BIP32Interface, xprv: BIP32Interface, isTest: boolean) {
    this.base = BBA_DALTON_UNIT;
    this.xpub = xpub;
    this.xprv = xprv;
    this.isTest = isTest;
    this.connection = new Connection(
      clusterApiUrl(this.isTest ? 'testnet' : 'mainnet', true),
      'confirmed',
    );
    this.keypair = Keypair.fromSeed(this.xprv.privateKey);
  }

  public toPrivateKey() {
    return this.keypair.secretKey.toString();
  }

  public toAddress() {
    return this.keypair.publicKey.toBase58();
  }

  public async getPrice() {
    return {
      eur: 0.19,
      usd: 0.2,
    } as CoinGeckoCurrentPrice;
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
      // return new ChainTransaction(
      //   t.transaction.signatures[0],
      //   t.transaction.signatures[0],
      //   t.slot,
      //   t.transaction.signatures[0],
      //   t.transaction.signatures[0],
      //   t.slot,
      //   t.meta.fee,
      // );
    });
  }

  public async createTransaction(address: string, amount: number) {
    const latestBlockhash = await this.connection.getLatestBlockhash();
    const lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
    const blockhash = latestBlockhash.blockhash;

    return new Transaction({
      feePayer: this.keypair.publicKey,
      lastValidBlockHeight,
      blockhash,
    }).add(
      SystemProgram.transfer({
        fromPubkey: this.keypair.publicKey,
        toPubkey: new PublicKey(address),
        daltons: this.base * amount,
      }),
    );
  }

  public async getEstimatedFee(tx: Transaction) {
    const estimatedFee = await tx.getEstimatedFee(this.connection);
    return estimatedFee / this.base;
  }

  public async estimateMaxTransfer(address: string) {
    const tx = await this.createTransaction(address, 0.000001);
    const fee = await this.getEstimatedFee(tx);
    const balance = await this.getBalance();
    const estimated =
      balance > fee ? subtract(balance * this.base, fee * this.base) : 0;
    return estimated / this.base;
  }

  public async sendTransaction(tx: Transaction) {
    return await this.connection.sendTransaction(tx, [this.keypair]);
  }
}
