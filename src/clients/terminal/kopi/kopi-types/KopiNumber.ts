import { assert } from "../utils.ts";

import { KopiValue } from "../shared.ts";
import Comparable from "../traits/Equatable.ts";

class KopiNumber extends KopiValue {
  static symbol = Symbol("KopiNumber");
  static methods: {
    [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue
  };

  readonly value: number;

  constructor(value: number) {
    super();

    this.value = value;
  }

  override async inspect(): Promise<string> {
    return this.value.toString();
  }
}

KopiNumber.methods = {
  "+": (thisArg: KopiValue, thatArg: KopiValue) => {
    assert(thisArg instanceof KopiNumber && thatArg instanceof KopiNumber);

    return new KopiNumber(thisArg.value + thatArg.value);
  }
  // "=="(thisArg: KopiValue, thatArg: KopiValue) {
  //   assert(thisArg instanceof KopiNumber && thatArg instanceof KopiNumber);

  //   return thisArg.value === thatArg.value;
  // },
  // ...Comparable.methods
};

export default KopiNumber;
