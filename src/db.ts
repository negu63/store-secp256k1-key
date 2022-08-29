import Dexie, { Table } from "dexie";

export interface Key {
  encryptedKey: string;
  salt: string;
  iv: string;
}

export class MySubClassedDexie extends Dexie {
  key!: Table<Key>;

  constructor() {
    super("keyStore");
    this.version(1).stores({
      key: "encryptedKey, salt, iv",
    });
  }
}

export const db = new MySubClassedDexie();
