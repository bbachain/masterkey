import TronWeb from 'tronweb';
import { BIP32Interface } from 'bip32';
import {AccountETH} from './AccountETH';

export class AccountTRX extends AccountETH {
  tronWeb: any;

  constructor(xpub: BIP32Interface, xprv?: BIP32Interface) {
    super(xpub, xprv);
    this.tronWeb = new TronWeb({
      fullHost: 'https://api.trongrid.io',
    });
  }

  public toAddress() {
    const quick: boolean = true;
    if (!quick) {
      const privateKeyBuffer = this.xprv.privateKey;
      const addressBytes = this.tronWeb.utils.crypto.getAddressFromPriKey(privateKeyBuffer);
      const address = this.tronWeb.utils.crypto.getBase58CheckAddress(addressBytes);
      return this.validateAddress(address) ? address : Error('Unsupport address');
    }
    return this.tronWeb.utils.crypto.pkToAddress(this.toPrivateKey());
  }

  public validateAddress(address: string) {
    return this.tronWeb.utils.crypto.isAddressValid(address);
  }
}
