import { KopiValue } from "./shared.ts";

class KopiNumber extends KopiValue {
  readonly value: number;

  constructor(value: number) {
    super();

    this.value = value;
  }

  override _inspect(): string {
    return this.value.toString();
  }

  ["+"](that: KopiNumber) {
    return new KopiNumber(this.value + that.value);
  }

  ["-"](that: KopiNumber) {
    return new KopiNumber(this.value - that.value);
  }
}

export {
  KopiNumber
};
