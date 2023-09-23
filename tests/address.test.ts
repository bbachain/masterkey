import * as mocha from 'mocha';
import * as chai from 'chai';
import {DefaultNetwork, Networks, builder} from '../src/index';

const expect = chai.expect;

describe('Should be asign mnemonic to master key', async () => {
  const account = await builder({
    mnemonic:
      'stick antique gadget enter build accident report session eagle exhibit pizza boost',
    network: DefaultNetwork,
  });

  it(`should be a valid derive address ${Networks[0].name}`, async () => {
    const address = account.toAddress();
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive address ${Networks[1].name}`, async () => {
    const address = account.toAddress();
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive address ${Networks[2].name}`, async () => {
    const address = account.toAddress();
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive address ${Networks[3].name}`, async () => {
    const address = account.toAddress();
    expect(account.validateAddress(address)).to.equal(true);
  });
});
