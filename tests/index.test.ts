import * as mocha from 'mocha';
import * as chai from 'chai';
import {create} from '../src/index';
import {MasterKey} from '../src/MasterKey';
import {Blockchain} from '../src/Blockchain';

const expect = chai.expect;
const wordsCount: any = [12, 15, 18, 21, 24];

describe('Should be a valid mnemonic words count', async () => {
  const blockchain = new Blockchain('Ethereum', 'ETH', 18, 60);

  for (let index = 0; index < wordsCount.length; index++) {
    const element = wordsCount[index];
    let masterKey: MasterKey = await create(`Master Key ${index + 1}`, element);

    it(`should be a valid mnemonic words count` , async () => {
      expect(element).to.equal(masterKey.mnemonic.split(" ").length);
    });

    it(`should be a valid derive key` , async () => {
      const derived = masterKey.derive(blockchain);
      console.log(derived);
    });
  }
});
