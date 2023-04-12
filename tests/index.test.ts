import * as mocha from 'mocha';
import * as chai from 'chai';
import {NETWORKS, create} from '../src/index';
import {MasterKey} from '../src/MasterKey';

const expect = chai.expect;
const wordsCount: any = [12, 15, 18, 21, 24];

describe('Should be a valid mnemonic words count', async () => {
  for (let index = 0; index < wordsCount.length; index++) {
    const element = wordsCount[index];
    const masterKey: MasterKey = await create(`Master Key ${index + 1}`, element);

    it(`should be a valid mnemonic ${element} words`, async () => {
      expect(element).to.equal(masterKey.mnemonic.split(' ').length);
    });

    it(`should be a valid derive account BBA`, async () => {
      const account = masterKey.derive(NETWORKS[0]);
      expect(account.validateAddress()).to.equal(true);
    });

    it(`should be a valid derive account BSC`, async () => {
      const account = masterKey.derive(NETWORKS[1]);
      expect(account.validateAddress()).to.equal(true);
    });

    it(`should be a valid derive account ETH`, async () => {
      const account = masterKey.derive(NETWORKS[2]);
      expect(account.validateAddress()).to.equal(true);
    });

    it(`should be a valid derive account TRX`, async () => {
      const account = masterKey.derive(NETWORKS[3]);
      expect(account.validateAddress()).to.equal(true);
    });
  }
});
