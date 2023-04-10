export class Account {
  id: string;
  name: string;
  mnemonic: string;

  constructor(id: string, name: string, mnemonic: string) {
    this.id = id;
    this.name = name;
    this.mnemonic = mnemonic;
  }

  public toAddress() {
    return 'my-address';
  }
}
