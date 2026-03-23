import { KopiValue } from "./types.ts";

class KopiNumber extends KopiValue {
  readonly value: number;

  constructor(value: number) {
    super();

    this.value = value;
  }

  _inspect(): string {
    return Number.toString();
  }

  ["+"](that: KopiNumber) {
    return new KopiNumber(this.value + that.value);
  }
}

export {
  KopiNumber
};
