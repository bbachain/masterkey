import * as mocha from 'mocha';
import * as chai from 'chai';
import * as bip39 from "bip39";
import {createAccount, derivationAccount} from '../src/index';

const expect = chai.expect;
describe('Should be able to create an new account', () => {
  it('should be a valid seed' , async () => {
    const account = await createAccount('1', 'a1');
    const seed = await bip39.mnemonicToSeed(account.mnemonic);
    expect(account.seed).to.equal(seed.toString('hex'));
  });

  it('should be a valid derive account' , async () => {
    const seedBuffer = await bip39.mnemonicToSeed('nephew bring year lava invite mass choice immune certain excess horror upon');
    const child = derivationAccount(seedBuffer.toString('hex'), `m/44'/60'/0'/0`);
    // expect(child.privateExtendedKey).to.equal('xprvA1jh5wC5vb5di8ZEeMByhzHgZK8bUiRiUGYEUVexb3mbTnbe6qxpxSsXv72MqFL4yhMSCofvDYokaTqVbwYCGpWwzVyKq9tLczj661sJFGs');
    // expect(child.publicExtendedKey).to.equal('xpub6Ej3VSiykxdvvcdhkNiz58ER7Ly5tB9ZqVTqGt4a9PJaLavnePH5WFC1mMaj1SD9AUGWaJ41Z6HthuLV2ZzswCSsxUj9zYfPMgWv6rJhhy1');
  });
});
