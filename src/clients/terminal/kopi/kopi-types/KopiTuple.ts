import { KopiValue } from "../shared.ts";

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

export default KopiTuple;
