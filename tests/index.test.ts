import * as mocha from 'mocha';
import * as chai from 'chai';
import {NETWORKS, asignMasterKey} from '../src/index';
import { Account } from '../src/Account';
import { Network } from '../src/Network';

const expect = chai.expect;
const wordsCount: any = [12, 15, 18, 21, 24];

describe('Should be a valid mnemonic words count', async () => {
  const element = wordsCount[0];
  const masterKey = asignMasterKey({
    id: '123456',
    name: 'Master Key',
    seed: '7ebc8af963a8527c6f930b8e6e9790c522c1760193b21c14aebf4b350dc274ad12b1781671c078d31c1ca59d52a92fa021beabeefce9fa9346d8e9a68d854ac8',
    mnemonic: 'stick antique gadget enter build accident report session eagle exhibit pizza boost',
    derive: function (network: Network): Account {
      throw new Error('Function not implemented.');
    }
  });

  it(`should be a valid mnemonic ${element} words`, async () => {
    expect(element).to.equal(masterKey.mnemonic.split(' ').length);
  });

  it(`should be a valid derive account BBA`, async () => {
    const account = masterKey.derive(NETWORKS[0]);
    const address = account.toAddress();
    const balance = await account.getBalance();
    console.log(`Address ${address}: ${balance}`);
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive account BSC`, async () => {
    const account = masterKey.derive(NETWORKS[1]);
    const address = account.toAddress();
    const privkey = account.toPrivateKey();
    const balance = await account.getBalance();
    console.log({privkey, address, balance});
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive account ETH`, async () => {
    const account = masterKey.derive(NETWORKS[2]);
    const address = account.toAddress();
    const privkey = account.toPrivateKey();
    const balance = await account.getBalance();
    console.log({privkey, address, balance});
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive account TRX`, async () => {
    const account = masterKey.derive(NETWORKS[3]);
    const address = account.toAddress();
    const privkey = account.toPrivateKey();
    const balance = await account.getBalance();
    console.log({privkey, address, balance});
    expect(account.validateAddress(address)).to.equal(true);
  });
});
