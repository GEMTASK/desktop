import { KopiValue } from "../shared.ts";

class KopiNumber extends KopiValue {
  readonly value: number;

  constructor(value: number) {
    super();

    this.value = value;
  }

  override async toString(): Promise<string> {
    return this.value.toString();
  }

  static symbol = Symbol("KopiNumber");

  static methods = {
    "+": (thisArg: KopiValue, thatArg: KopiValue) => {
      if (!(thisArg instanceof KopiNumber) || !(thatArg instanceof KopiNumber)) {
        throw new Error("Error");
      }

      return new KopiNumber(thisArg.value + thatArg.value);
    }
  };
}

export default KopiNumber;
