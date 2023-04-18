import * as mocha from 'mocha';
import * as chai from 'chai';
import {NETWORKS, asignMasterKey} from '../src/index';

const expect = chai.expect;

describe('Should be asign mnemonic to master key', async () => {
  const masterKey = asignMasterKey({
    id: '123456',
    name: 'Master Key',
    seed: '7ebc8af963a8527c6f930b8e6e9790c522c1760193b21c14aebf4b350dc274ad12b1781671c078d31c1ca59d52a92fa021beabeefce9fa9346d8e9a68d854ac8',
    mnemonic:
      'stick antique gadget enter build accident report session eagle exhibit pizza boost',
  } as any);

  it(`should be a valid derive address ${NETWORKS[0].name}`, async () => {
    const account = masterKey.derive(NETWORKS[0]);
    const address = account.toAddress();
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive address ${NETWORKS[1].name}`, async () => {
    const account = masterKey.derive(NETWORKS[1]);
    const address = account.toAddress();
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive address ${NETWORKS[2].name}`, async () => {
    const account = masterKey.derive(NETWORKS[2]);
    const address = account.toAddress();
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive address ${NETWORKS[3].name}`, async () => {
    const account = masterKey.derive(NETWORKS[3]);
    const address = account.toAddress();
    expect(account.validateAddress(address)).to.equal(true);
  });
});
