import * as mocha from 'mocha';
import * as chai from 'chai';
import {GetAllsNetwork, asignMasterKey} from '../src/index';

const expect = chai.expect;

describe('Should be valid address balance', () => {
  const masterKey = asignMasterKey({
    id: '123456',
    name: 'Master Key',
    seed: '7ebc8af963a8527c6f930b8e6e9790c522c1760193b21c14aebf4b350dc274ad12b1781671c078d31c1ca59d52a92fa021beabeefce9fa9346d8e9a68d854ac8',
    mnemonic:
      'stick antique gadget enter build accident report session eagle exhibit pizza boost',
  } as any);

  it(`should be create a valid tx ${GetAllsNetwork()[0].name}`, async () => {
    const account = masterKey.derive(GetAllsNetwork()[0]);
    const address = account.toAddress();
    const estimate = await account.estimateMaxTransfer(address);
    const tx = await account.createTransaction(address, estimate);
    const hash = await account.sendTransaction(tx);
    expect(hash).to.be.a('string');
  });

  it(`should be create a valid tx ${GetAllsNetwork()[1].name}`, async () => {
    const account = masterKey.derive(GetAllsNetwork()[1]);
    const address = account.toAddress();
    const estimate = await account.estimateMaxTransfer(address);
    const tx = await account.createTransaction(address, estimate);
    const hash = await account.sendTransaction(tx);
    expect(hash).to.be.a('string');
  });

  it(`should be failure send rawTx ${GetAllsNetwork()[2].name}`, async () => {
    const account = masterKey.derive(GetAllsNetwork()[2]);
    const address = account.toAddress();
    const estimate = await account.estimateMaxTransfer(address);
    const tx = await account.createTransaction(address, estimate);
    const hash = await account.sendTransaction(tx);
    expect(hash).to.equal(null);
  });

  it(`should be create a valid tx ${GetAllsNetwork()[3].name}`, async () => {
    const account = masterKey.derive(GetAllsNetwork()[3]);
    const address = 'TRSiWBFYdJtNRqB1q2JZb33EMMw1fVkQRa';
    const tx = await account.createTransaction(address, 0.01);
    const hash = await account.sendTransaction(tx);
    expect(hash).to.be.a('string');
  });
});
