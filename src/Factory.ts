import * as bip39 from "bip39";
// import BIP32Factory, { BIP32Interface } from 'bip32';
// import * as ecc from 'tiny-secp256k1';
// const bip32 = BIP32Factory(ecc);

export const createAccount = async (id: string, name: string, strength = 128) => {
  const mnemonic = bip39.generateMnemonic(strength);
  const seed = await bip39.mnemonicToSeed(mnemonic);

  return {
    id,
    name,
    seed: seed.toString('hex'),
    mnemonic,
  };
};

export const derivationAccount = (seed: string, path: string) => {
  const buffer = Buffer.from(seed, 'hex');
  // const root: BIP32Interface = bip32.fromSeed(buffer);
  // return root.derivePath(path);
  return buffer.toString('hex');
};
