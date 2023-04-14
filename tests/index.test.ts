import * as mocha from 'mocha';
import * as chai from 'chai';
import {IMasterKey, INetwork, NETWORKS, create} from '../src/index';

const expect = chai.expect;
const wordsCount: any = [12, 15, 18, 21, 24];

const testMasterKet = async (words: number, network: INetwork) => {
  const masterKey: IMasterKey = await create(`Master Key 1`, words as any);
  return {
    masterKey,
  };
};

describe('Should be a valid mnemonic words count', async () => {
  const element = wordsCount[4];
  const {masterKey} = await testMasterKet(element, NETWORKS[0]);

  it(`should be a valid mnemonic ${element} words`, async () => {
    expect(element).to.equal(masterKey.mnemonic.split(' ').length);
  });

  it(`should be a valid derive account BBA`, async () => {
    const account = masterKey.derive(NETWORKS[0]);
    const privateKey = account.toPrivateKey();
    const address = account.toAddress();
    console.log({privateKey, address});
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive account BSC`, async () => {
    const account = masterKey.derive(NETWORKS[1]);
    const privateKey = account.toPrivateKey();
    const address = account.toAddress();
    console.log({privateKey, address});
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive account ETH`, async () => {
    const account = masterKey.derive(NETWORKS[2]);
    const privateKey = account.toPrivateKey();
    const address = account.toAddress();
    console.log({privateKey, address});
    expect(account.validateAddress(address)).to.equal(true);
  });

  it(`should be a valid derive account TRX`, async () => {
    const account = masterKey.derive(NETWORKS[3]);
    const privateKey = account.toPrivateKey();
    const address = account.toAddress();
    console.log({privateKey, address});
    expect(account.validateAddress(address)).to.equal(true);
  });
});
