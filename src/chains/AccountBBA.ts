import {BIP32Interface} from 'bip32';
import {
  BBA_DALTON_UNIT,
  Connection,
  Keypair,
  PublicKey,
} from '@bbachain/web3.js';
import {IChainAccount} from './IChainAccount';

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
    this.connection = new Connection('https://api-testnet.bbachain.com');
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
}
