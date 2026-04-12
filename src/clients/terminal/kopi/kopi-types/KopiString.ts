import { assert } from "../utils.ts";

import { KopiValue } from "../shared.ts";
// import KopiNumber from "./KopiNumber.ts";

class KopiString extends KopiValue {
  static symbol = Symbol("KopiString");
  static methods: {
    [key: string]: (thisArg: KopiValue, thatArg: KopiValue) => KopiValue
  };

  readonly value: string;

  constructor(value: string) {
    super();

    this.value = value;
  }

  override async inspect(): Promise<string> {
    return this.value;
  }
}

KopiString.methods = {
  "+": (thisArg: KopiValue, thatArg: KopiValue) => {
    assert(thisArg instanceof KopiString && thatArg instanceof KopiString);

    return new KopiString(thisArg.value + thatArg.value);
  },
  [KopiString.symbol]: (thisArg: KopiValue, thatArg: KopiValue) => {
    return thisArg;
  },
  // [KopiNumber.symbol]: (thisArg: KopiValue, thatArg: KopiValue) => {
  //   assert(thisArg instanceof KopiString);

  //   return new KopiNumber(Number(thisArg.value));
  // },
};

export default KopiString;
