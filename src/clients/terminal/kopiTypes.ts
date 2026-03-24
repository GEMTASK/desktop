import { KopiValue } from "./shared.ts";

class KopiNumber extends KopiValue {
  readonly value: number;

  constructor(value: number) {
    super();

    this.value = value;
  }

  override async _inspect(): Promise<string> {
    return this.value.toString();
  }

  ["+"](that: KopiNumber) {
    return new KopiNumber(this.value + that.value);
  }

  ["-"](that: KopiNumber) {
    return new KopiNumber(this.value - that.value);
  }
}

class KopiTuple extends KopiValue {
  readonly elements: Promise<KopiValue>[];

  constructor(elements: Promise<KopiValue>[]) {
    super();

    this.elements = elements;
  }

  override async _inspect(): Promise<string> {
    const elements = await Promise.all(
      this.elements.map(async (element, index) => (await element)._inspect())
    );

    return `(${elements.join(", ")})`;
  }
}

export {
  KopiNumber,
  KopiTuple
};
