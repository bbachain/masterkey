import * as mocha from 'mocha';
import * as chai from 'chai';
import {DNETWORK, create} from '../src/index';
import {MasterKey} from '../src/MasterKey';

const expect = chai.expect;
const wordsCount: any = [12, 15, 18, 21, 24];

describe('Should be a valid mnemonic words count', async () => {
  for (let index = 0; index < wordsCount.length; index++) {
    const element = wordsCount[index];
    let masterKey: MasterKey = await create(`Master Key ${index + 1}`, element);

    it(`should be a valid mnemonic words count`, async () => {
      expect(element).to.equal(masterKey.mnemonic.split(' ').length);
    });

    it(`should be a valid derive key`, async () => {
      const account = masterKey.derive(DNETWORK);
      // const address = account.toAddress();
      console.log(`Created Account`, {
        ...account,
        xprv: account.xprv.toBase58(),
        xpub: account.xpub.toBase58(),
        address: account.toAddress(),
      });
    });
  }
});
