import { KopiValue } from "./shared.ts";

//
// KopiNumber
//

class KopiNumber extends KopiValue {
  readonly value: number;

  constructor(value: number) {
    super();

    this.value = value;
  }

  override async inspect(): Promise<string> {
    return this.value.toString();
  }

  static methods = {
    "+": (thisArg: KopiValue, thatArg: KopiValue) => {
      if (!(thisArg instanceof KopiNumber) || !(thatArg instanceof KopiNumber)) {
        throw new Error("Error");
      }

      return new KopiNumber(thisArg.value + thatArg.value);
    }
  };
}

//
// KopiTuple
//

class KopiTuple extends KopiValue {
  static readonly empty = new KopiTuple([], true);

  readonly elements: Promise<KopiValue>[];

  constructor(elements: Promise<KopiValue>[], isEmptySingleton = false) {
    super();

    this.elements = elements;

    if (elements.length === 0 && !isEmptySingleton) {
      return KopiTuple.empty;
    }
  }

  override async inspect(): Promise<string> {
    const elements = await Promise.all(
      this.elements.map(async (element, index) => (await element).inspect())
    );

    return `(${elements.join(", ")})`;
  }
}

export {
  KopiNumber,
  KopiTuple
};
