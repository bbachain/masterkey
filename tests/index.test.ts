import * as mocha from 'mocha';
import * as chai from 'chai';
import {INetwork, MasterKey, NETWORKS, create} from '../src/index';

const expect = chai.expect;
const wordsCount: any = [12, 15, 18, 21, 24];

const testMasterKet = async (words: number, network: INetwork) => {
  const masterKey: MasterKey = await create(
    `Master Key 1`,
    words as any,
  );

  return {
    masterKey,
    account: masterKey.derive(network),
  }
};

describe('Should be a valid mnemonic words count', () => {
  const element = wordsCount[4];
  
  it(`should be a valid mnemonic ${element} words`, async () => {
    const {masterKey} = await testMasterKet(element, NETWORKS[0]);
    expect(element).to.equal(masterKey.mnemonic.split(' ').length);
  });

  it(`should be a valid derive account BBA`, async () => {
    const {account} = await testMasterKet(element, NETWORKS[0]);
    expect(account.validateAddress()).to.equal(true);
  });

  it(`should be a valid derive account BSC`, async () => {
    const {account} = await testMasterKet(element, NETWORKS[1]);
    expect(account.validateAddress()).to.equal(true);
  });

  it(`should be a valid derive account ETH`, async () => {
    const {account} = await testMasterKet(element, NETWORKS[2]);
    expect(account.validateAddress()).to.equal(true);
  });

  it(`should be a valid derive account TRX`, async () => {
    const {account} = await testMasterKet(element, NETWORKS[3]);
    expect(account.validateAddress()).to.equal(true);
  });
});
